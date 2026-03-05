interface GitHubFile {
  path: string;
  content: string;
}

function getConfig() {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token || !owner || !repo) {
    throw new Error(
      "Missing GitHub config. Set GITHUB_TOKEN, GITHUB_REPO_OWNER, and GITHUB_REPO_NAME."
    );
  }

  return { token, owner, repo, branch };
}

async function githubApi(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const { token, owner, repo } = getConfig();
  const url = `https://api.github.com/repos/${owner}/${repo}${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API ${res.status}: ${body}`);
  }

  return res;
}

export async function getFileContent(path: string): Promise<string | null> {
  const { branch } = getConfig();
  try {
    const res = await githubApi(
      `/contents/${path}?ref=${branch}`
    );
    const data = await res.json();
    return Buffer.from(data.content, "base64").toString("utf-8");
  } catch {
    return null;
  }
}

export async function createCommit(
  files: GitHubFile[],
  message: string
): Promise<string> {
  const { branch } = getConfig();

  // 1. Get the latest commit SHA on the branch
  const refRes = await githubApi(`/git/ref/heads/${branch}`);
  const refData = await refRes.json();
  const latestCommitSha = refData.object.sha;

  // 2. Get the tree SHA from the latest commit
  const commitRes = await githubApi(`/git/commits/${latestCommitSha}`);
  const commitData = await commitRes.json();
  const baseTreeSha = commitData.tree.sha;

  // 3. Create blobs for each file
  const tree = await Promise.all(
    files.map(async (file) => {
      const blobRes = await githubApi("/git/blobs", {
        method: "POST",
        body: JSON.stringify({
          content: file.content,
          encoding: "utf-8",
        }),
      });
      const blobData = await blobRes.json();
      return {
        path: file.path,
        mode: "100644" as const,
        type: "blob" as const,
        sha: blobData.sha,
      };
    })
  );

  // 4. Create a new tree
  const treeRes = await githubApi("/git/trees", {
    method: "POST",
    body: JSON.stringify({
      base_tree: baseTreeSha,
      tree,
    }),
  });
  const treeData = await treeRes.json();

  // 5. Create the commit
  const newCommitRes = await githubApi("/git/commits", {
    method: "POST",
    body: JSON.stringify({
      message,
      tree: treeData.sha,
      parents: [latestCommitSha],
    }),
  });
  const newCommitData = await newCommitRes.json();

  // 6. Update the branch reference
  await githubApi(`/git/refs/heads/${branch}`, {
    method: "PATCH",
    body: JSON.stringify({
      sha: newCommitData.sha,
    }),
  });

  return newCommitData.sha;
}

export async function deleteFile(
  path: string,
  message: string
): Promise<void> {
  const { branch } = getConfig();

  // Get the file SHA (required for deletion)
  const res = await githubApi(`/contents/${path}?ref=${branch}`);
  const data = await res.json();

  await githubApi(`/contents/${path}`, {
    method: "DELETE",
    body: JSON.stringify({
      message,
      sha: data.sha,
      branch,
    }),
  });
}

export async function commitBinaryFile(
  path: string,
  base64Content: string,
  message: string
): Promise<void> {
  const { branch } = getConfig();

  // Check if file exists to get its SHA for update
  let existingSha: string | undefined;
  try {
    const res = await githubApi(`/contents/${path}?ref=${branch}`);
    const data = await res.json();
    existingSha = data.sha;
  } catch {
    // File doesn't exist yet, that's fine
  }

  await githubApi(`/contents/${path}`, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: base64Content,
      branch,
      ...(existingSha ? { sha: existingSha } : {}),
    }),
  });
}
