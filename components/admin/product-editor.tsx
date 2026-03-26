"use client";

import { useState, useCallback, useEffect } from "react";
import { Product, SupportContact } from "@/lib/types";
import { getAllBrands, getBrandBySlug } from "@/lib/brands";

interface ProductEditorProps {
  initialData?: Partial<Product> & {
    _heroImageBase64?: string;
    _heroImageMediaType?: string;
    _importWarnings?: string[];
  };
  isEdit?: boolean;
}

type ArrayField = "trustBadges" | "proTips" | "suggestedPrompts";
type ObjectArrayField = "usageSteps" | "benefits" | "ingredients" | "faq";

const EMPTY_PRODUCT: Product = {
  slug: "",
  name: "",
  brand: "",
  tagline: "",
  heroImage: "",
  amazonUrl: "",
  asin: "",
  colors: { primary: "#4c9c2e", accent: "#ff6b00", background: "#f0f7ec" },
  trustBadges: [],
  usageSteps: [],
  proTips: [],
  benefits: [],
  ingredients: [],
  faq: [],
  chatbotContext: "",
  suggestedPrompts: [],
  formulaSynergy: { summary: "", interactions: [] },
  resultsTimeline: { summary: "", stages: [] },
  featuredReviews: [],
  negativeReviewFaq: [],
  supportContacts: {},
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// --- Section wrapper ---

function Section({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-heading font-semibold text-gray-900">
          {title}
        </span>
        <span className="text-gray-400 text-lg">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="px-5 pb-5 space-y-4">{children}</div>}
    </div>
  );
}

// --- Field components ---

function TextField({
  label,
  value,
  onChange,
  placeholder,
  multiline,
  mono,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
  mono?: boolean;
}) {
  const cls = `w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-gray-900 transition-colors ${mono ? "font-mono text-xs" : ""}`;
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={6}
          className={cls + " resize-y"}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value || "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 border border-gray-300 cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="flex-1 px-3 py-2 border border-gray-300 text-sm font-mono focus:outline-none focus:border-gray-900 transition-colors"
        />
      </div>
    </div>
  );
}

function TagInput({
  label,
  tags,
  onChange,
  placeholder,
}: {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
      setInput("");
    }
  };

  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-sm text-gray-700"
          >
            {tag}
            <button
              type="button"
              onClick={() => onChange(tags.filter((_, j) => j !== i))}
              className="text-gray-400 hover:text-gray-700 ml-0.5"
            >
              x
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          placeholder={placeholder || "Type and press Enter"}
          className="flex-1 px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-gray-900 transition-colors"
        />
        <button
          type="button"
          onClick={addTag}
          className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
}

// --- List item editors ---

function ListItemCard({
  children,
  index,
  total,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  children: React.ReactNode;
  index: number;
  total: number;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  return (
    <div className="border border-gray-200 p-4 bg-gray-50 relative">
      <div className="absolute top-2 right-2 flex items-center gap-1">
        <button
          type="button"
          onClick={onMoveUp}
          disabled={index === 0}
          className="p-1 text-xs text-gray-400 hover:text-gray-700 disabled:opacity-30"
          title="Move up"
        >
          ↑
        </button>
        <button
          type="button"
          onClick={onMoveDown}
          disabled={index === total - 1}
          className="p-1 text-xs text-gray-400 hover:text-gray-700 disabled:opacity-30"
          title="Move down"
        >
          ↓
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="p-1 text-xs text-red-400 hover:text-red-600"
          title="Remove"
        >
          x
        </button>
      </div>
      <div className="space-y-3 pr-16">{children}</div>
    </div>
  );
}

// --- Main editor ---

export default function ProductEditor({
  initialData,
  isEdit,
}: ProductEditorProps) {
  const [product, setProduct] = useState<Product>({
    ...EMPTY_PRODUCT,
    ...initialData,
  });
  const [publishing, setPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [dirty, setDirty] = useState(false);
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState<string>(
    initialData?.heroImage || ""
  );
  const [importedHeroBase64, setImportedHeroBase64] = useState<string | null>(
    initialData?._heroImageBase64 || null
  );
  const [importedHeroMediaType, setImportedHeroMediaType] = useState<string | null>(
    initialData?._heroImageMediaType || null
  );

  // Re-import state
  const [reimporting, setReimporting] = useState(false);
  const [reimportProgress, setReimportProgress] = useState<string[]>([]);
  const [reimportError, setReimportError] = useState("");
  const [reimportData, setReimportData] = useState<(Partial<Product> & { _heroImageBase64?: string; _heroImageMediaType?: string }) | null>(null);
  const [reimportBrandUrl, setReimportBrandUrl] = useState("");
  const [showReimportForm, setShowReimportForm] = useState(false);
  const [mergeSelections, setMergeSelections] = useState<Record<string, boolean>>({});

  // Track unsaved changes
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  // Auto-generate slug from name (only for new products)
  const updateName = useCallback(
    (name: string) => {
      setProduct((prev) => ({
        ...prev,
        name,
        ...(!isEdit ? { slug: slugify(name) } : {}),
      }));
      setDirty(true);
    },
    [isEdit]
  );

  const update = useCallback(
    <K extends keyof Product>(field: K, value: Product[K]) => {
      setProduct((prev) => ({ ...prev, [field]: value }));
      setDirty(true);
    },
    []
  );

  const updateColor = useCallback(
    (key: "primary" | "accent" | "background", value: string) => {
      setProduct((prev) => ({
        ...prev,
        colors: { ...prev.colors, [key]: value },
      }));
      setDirty(true);
    },
    []
  );

  // Array helpers for object arrays
  const addObjectItem = useCallback(
    (field: ObjectArrayField, item: Record<string, string>) => {
      setProduct((prev) => ({
        ...prev,
        [field]: [...(prev[field] as Record<string, string>[]), item],
      }));
      setDirty(true);
    },
    []
  );

  const updateObjectItem = useCallback(
    (
      field: ObjectArrayField,
      index: number,
      updates: Record<string, string>
    ) => {
      setProduct((prev) => ({
        ...prev,
        [field]: (prev[field] as Record<string, string>[]).map((item, i) =>
          i === index ? { ...item, ...updates } : item
        ),
      }));
      setDirty(true);
    },
    []
  );

  const removeItem = useCallback(
    (field: ObjectArrayField | ArrayField, index: number) => {
      setProduct((prev) => ({
        ...prev,
        [field]: (prev[field] as unknown[]).filter((_, i) => i !== index),
      }));
      setDirty(true);
    },
    []
  );

  const moveItem = useCallback(
    (field: ObjectArrayField | ArrayField, from: number, to: number) => {
      setProduct((prev) => {
        const arr = [...(prev[field] as unknown[])];
        const [item] = arr.splice(from, 1);
        arr.splice(to, 0, item);
        return { ...prev, [field]: arr };
      });
      setDirty(true);
    },
    []
  );

  // Support contacts helper
  const updateSupportContact = useCallback(
    (platform: "amazon" | "tiktok" | "website", updates: Partial<SupportContact>) => {
      setProduct((prev) => ({
        ...prev,
        supportContacts: {
          ...prev.supportContacts,
          [platform]: {
            ...(prev.supportContacts?.[platform] || {}),
            ...updates,
          },
        },
      }));
      setDirty(true);
    },
    []
  );

  // Hero image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setHeroFile(file);
    const url = URL.createObjectURL(file);
    setHeroPreview(url);
    const ext = file.name.split(".").pop() || "jpg";
    update("heroImage", `/products/${product.slug}.${ext}`);
  };

  // Publish
  const handlePublish = async () => {
    if (!product.name || !product.slug) {
      setPublishResult({
        success: false,
        message: "Product name and slug are required.",
      });
      return;
    }

    setPublishing(true);
    setPublishResult(null);

    try {
      // Upload hero image: use manual file, or fall back to imported base64
      let heroImageBase64: string | null = null;
      let heroImageExt: string | null = null;

      if (heroFile) {
        const buffer = await heroFile.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        let binary = "";
        for (let i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        heroImageBase64 = btoa(binary);
        heroImageExt = heroFile.name.split(".").pop() || null;
      } else if (importedHeroBase64) {
        heroImageBase64 = importedHeroBase64;
        // Derive extension from media type (e.g. "image/jpeg" -> "jpg")
        const ext = importedHeroMediaType?.split("/")[1] || "jpg";
        heroImageExt = ext === "jpeg" ? "jpg" : ext;
        // Set heroImage path if not already set
        if (!product.heroImage || product.heroImage === "") {
          product.heroImage = `/products/${product.slug}.${heroImageExt}`;
        }
      }

      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product,
          heroImageBase64,
          heroImageExt,
          isEdit,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setDirty(false);
        setPublishResult({
          success: true,
          message: `Published! Live at /product/${product.slug} (deploys in ~30s)`,
        });
      } else {
        setPublishResult({
          success: false,
          message: data.error || "Publish failed",
        });
      }
    } catch (err) {
      setPublishResult({
        success: false,
        message: `Publish error: ${err instanceof Error ? err.message : "Unknown error"}`,
      });
    } finally {
      setPublishing(false);
    }
  };

  // Re-import from Amazon
  const handleReimport = async () => {
    if (!product.asin || !reimportBrandUrl) return;

    setReimporting(true);
    setReimportProgress([]);
    setReimportError("");
    setReimportData(null);

    try {
      const res = await fetch("/api/admin/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amazonUrl: product.asin, brandUrl: reimportBrandUrl }),
      });

      if (!res.ok) {
        const data = await res.json();
        setReimportError(data.error || "Re-import failed");
        setReimporting(false);
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) { setReimportError("Failed to read stream"); setReimporting(false); return; }

      let buffer = "";
      let productData: (Partial<Product> & { _heroImageBase64?: string; _heroImageMediaType?: string }) | null = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6);
          if (payload === "[DONE]") continue;
          try {
            const data = JSON.parse(payload);
            if (data.progress) setReimportProgress((prev) => [...prev, data.progress]);
            if (data.product) productData = data.product;
            if (data.error) setReimportError(data.error);
          } catch { /* skip */ }
        }
      }

      if (productData) {
        setReimportData(productData);
        // Default all sections to selected
        setMergeSelections({
          name: true,
          tagline: true,
          heroImage: true,
          trustBadges: true,
          usageSteps: true,
          proTips: true,
          benefits: true,
          ingredients: true,
          faq: true,
          chatbotContext: true,
          suggestedPrompts: true,
          colors: true,
        });
      }
    } catch (err) {
      setReimportError(err instanceof Error ? err.message : "Re-import failed");
    } finally {
      setReimporting(false);
    }
  };

  const applyMerge = () => {
    if (!reimportData) return;
    setProduct((prev) => {
      const updated = { ...prev };
      if (mergeSelections.name && reimportData.name) updated.name = reimportData.name;
      if (mergeSelections.tagline && reimportData.tagline) updated.tagline = reimportData.tagline;
      if (mergeSelections.colors && reimportData.colors) updated.colors = reimportData.colors;
      if (mergeSelections.trustBadges && reimportData.trustBadges) updated.trustBadges = reimportData.trustBadges;
      if (mergeSelections.usageSteps && reimportData.usageSteps) updated.usageSteps = reimportData.usageSteps;
      if (mergeSelections.proTips && reimportData.proTips) updated.proTips = reimportData.proTips;
      if (mergeSelections.benefits && reimportData.benefits) updated.benefits = reimportData.benefits;
      if (mergeSelections.ingredients && reimportData.ingredients) updated.ingredients = reimportData.ingredients;
      if (mergeSelections.faq && reimportData.faq) updated.faq = reimportData.faq;
      if (mergeSelections.chatbotContext && reimportData.chatbotContext) updated.chatbotContext = reimportData.chatbotContext;
      if (mergeSelections.suggestedPrompts && reimportData.suggestedPrompts) updated.suggestedPrompts = reimportData.suggestedPrompts;
      if (mergeSelections.formulaSynergy && reimportData.formulaSynergy) updated.formulaSynergy = reimportData.formulaSynergy;
      if (mergeSelections.resultsTimeline && reimportData.resultsTimeline) updated.resultsTimeline = reimportData.resultsTimeline;
      if (mergeSelections.featuredReviews && reimportData.featuredReviews) updated.featuredReviews = reimportData.featuredReviews;
      if (mergeSelections.negativeReviewFaq && reimportData.negativeReviewFaq) updated.negativeReviewFaq = reimportData.negativeReviewFaq;
      return updated;
    });
    if (mergeSelections.heroImage && reimportData._heroImageBase64) {
      setImportedHeroBase64(reimportData._heroImageBase64);
      setImportedHeroMediaType(reimportData._heroImageMediaType || null);
    }
    setDirty(true);
    setReimportData(null);
    setShowReimportForm(false);
  };

  const MERGE_SECTIONS = [
    { key: "name", label: "Name" },
    { key: "tagline", label: "Tagline" },
    { key: "colors", label: "Colors" },
    { key: "heroImage", label: "Hero Image" },
    { key: "trustBadges", label: "Trust Badges" },
    { key: "usageSteps", label: "Usage Steps" },
    { key: "proTips", label: "Pro Tips" },
    { key: "benefits", label: "Benefits" },
    { key: "ingredients", label: "Ingredients" },
    { key: "faq", label: "FAQ" },
    { key: "chatbotContext", label: "Chatbot Context" },
    { key: "suggestedPrompts", label: "Suggested Prompts" },
    { key: "formulaSynergy", label: "Formula Synergy" },
    { key: "resultsTimeline", label: "Results Timeline" },
    { key: "featuredReviews", label: "Featured Reviews" },
    { key: "negativeReviewFaq", label: "Negative Review FAQ" },
  ];

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex items-center justify-between bg-white border border-gray-200 px-5 py-3 sticky top-0 z-10">
        <div>
          <h2 className="font-heading font-semibold text-gray-900">
            {isEdit ? `Edit: ${product.name}` : "New Product"}
          </h2>
          {dirty && (
            <span className="text-xs text-amber-600">Unsaved changes</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {isEdit && product.asin && (
            <button
              type="button"
              onClick={() => setShowReimportForm(true)}
              className="px-4 py-2 text-sm bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Re-import
            </button>
          )}
          {product.slug && (
            <a
              href={`/product/${product.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Preview
            </a>
          )}
          <button
            type="button"
            onClick={handlePublish}
            disabled={publishing || !product.name || !product.slug}
            className="px-5 py-2 text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 disabled:bg-gray-400 transition-colors"
          >
            {publishing ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      {publishResult && (
        <div
          className={`px-4 py-3 text-sm ${
            publishResult.success
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {publishResult.message}
        </div>
      )}

      {/* Import warnings + [NEEDS REVIEW] scan */}
      {(() => {
        const importWarnings = initialData?._importWarnings || [];
        // Scan all string fields in the product for [NEEDS REVIEW]
        const needsReviewFields: string[] = [];
        const scanValue = (val: unknown, path: string) => {
          if (typeof val === "string" && val.includes("[NEEDS REVIEW]")) {
            needsReviewFields.push(path);
          } else if (Array.isArray(val)) {
            val.forEach((item, i) => scanValue(item, `${path}[${i}]`));
          } else if (val && typeof val === "object") {
            Object.entries(val).forEach(([k, v]) => scanValue(v, `${path}.${k}`));
          }
        };
        scanValue(product, "product");

        if (importWarnings.length === 0 && needsReviewFields.length === 0) return null;

        return (
          <div className="bg-amber-50 border border-amber-200 p-4">
            <div className="flex items-start gap-2.5">
              <span className="text-amber-600 text-lg leading-none mt-0.5">&#9888;</span>
              <div className="flex-1">
                <p className="font-semibold text-sm text-amber-900 mb-1">
                  Review Required Before Publishing
                </p>
                {importWarnings.length > 0 && (
                  <div className="mb-2">
                    <p className="text-xs font-medium text-amber-800 mb-1">Import issues:</p>
                    <ul className="text-xs text-amber-800 space-y-0.5">
                      {importWarnings.map((w, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-amber-500 flex-shrink-0" />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {needsReviewFields.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-amber-800 mb-1">
                      {needsReviewFields.length} field(s) contain &quot;[NEEDS REVIEW]&quot; — search and fix before publishing:
                    </p>
                    <ul className="text-xs text-amber-800 space-y-0.5">
                      {needsReviewFields.slice(0, 10).map((f, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-amber-500 flex-shrink-0" />
                          <code className="text-amber-900">{f}</code>
                        </li>
                      ))}
                      {needsReviewFields.length > 10 && (
                        <li className="text-amber-700">
                          ...and {needsReviewFields.length - 10} more
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Re-import modal */}
      {showReimportForm && !reimportData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-6">
            <h3 className="font-heading font-semibold text-gray-900 mb-1">
              Re-import from Amazon
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Re-pull data for ASIN <strong>{product.asin}</strong>. You&apos;ll choose which sections to update.
            </p>

            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand Website URL
                </label>
                <input
                  type="text"
                  value={reimportBrandUrl}
                  onChange={(e) => setReimportBrandUrl(e.target.value)}
                  placeholder="https://yourbrand.com"
                  className="w-full px-3 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-gray-900 transition-colors"
                  disabled={reimporting}
                />
              </div>
            </div>

            {reimportError && (
              <div className="px-4 py-3 mb-3 bg-red-50 border border-red-200 text-sm text-red-800">
                {reimportError}
              </div>
            )}

            {reimportProgress.length > 0 && (
              <div className="px-4 py-3 mb-3 bg-gray-50 border border-gray-200 space-y-1 max-h-40 overflow-y-auto">
                {reimportProgress.map((msg, i) => (
                  <p key={i} className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="text-green-500">
                      {i < reimportProgress.length - 1 || !reimporting ? "✓" : "..."}
                    </span>
                    {msg}
                  </p>
                ))}
                {reimporting && (
                  <p className="text-sm text-gray-400 animate-pulse">Processing...</p>
                )}
              </div>
            )}

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => { setShowReimportForm(false); setReimportError(""); setReimportProgress([]); }}
                disabled={reimporting}
                className="px-4 py-2 text-sm border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReimport}
                disabled={reimporting || !reimportBrandUrl}
                className="px-4 py-2 text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 disabled:bg-gray-400 transition-colors"
              >
                {reimporting ? "Importing..." : "Re-import"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Merge selection modal */}
      {reimportData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-6">
            <h3 className="font-heading font-semibold text-gray-900 mb-1">
              Select Sections to Update
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Choose which sections to replace with the newly imported data. Unchecked sections keep their current values.
            </p>

            <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
              {MERGE_SECTIONS.map(({ key, label }) => {
                const hasData = key === "heroImage"
                  ? !!reimportData._heroImageBase64
                  : !!(reimportData as Record<string, unknown>)[key];
                return (
                  <label
                    key={key}
                    className={`flex items-center gap-3 px-3 py-2 border ${hasData ? "border-gray-200 cursor-pointer hover:bg-gray-50" : "border-gray-100 opacity-40 cursor-not-allowed"} transition-colors`}
                  >
                    <input
                      type="checkbox"
                      checked={!!mergeSelections[key] && hasData}
                      onChange={(e) => setMergeSelections((prev) => ({ ...prev, [key]: e.target.checked }))}
                      disabled={!hasData}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                    {!hasData && <span className="text-xs text-gray-400 ml-auto">No data</span>}
                  </label>
                );
              })}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setMergeSelections(Object.fromEntries(MERGE_SECTIONS.map(({ key }) => [key, true])))}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Select all
                </button>
                <button
                  onClick={() => setMergeSelections({})}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Deselect all
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setReimportData(null)}
                  className="px-4 py-2 text-sm border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={applyMerge}
                  className="px-4 py-2 text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 transition-colors"
                >
                  Apply Selected
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Basic Info */}
      <Section title="Basic Info">
        <TextField
          label="Product Name"
          value={product.name}
          onChange={updateName}
          placeholder="e.g. Vitamin B12 Sublingual Drops"
        />
        <div className="grid grid-cols-3 gap-4">
          <TextField
            label="Slug (URL path)"
            value={product.slug}
            onChange={(v) => update("slug", v)}
            placeholder="e.g. b12-sublingual-drops"
          />
          <TextField
            label="ASIN"
            value={product.asin}
            onChange={(v) => update("asin", v)}
            placeholder="e.g. B0XXXXXXXXX"
          />
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Brand
            </label>
            <select
              value={product.brand}
              onChange={(e) => {
                const newBrand = e.target.value;
                update("brand", newBrand);
                // Auto-fill support contacts from brand defaults if currently empty
                const hasContacts = product.supportContacts &&
                  (product.supportContacts.website?.phone || product.supportContacts.website?.email ||
                   product.supportContacts.amazon?.phone || product.supportContacts.amazon?.email ||
                   product.supportContacts.tiktok?.phone || product.supportContacts.tiktok?.email);
                if (!hasContacts && newBrand) {
                  const brandConfig = getBrandBySlug(newBrand);
                  if (brandConfig?.defaultSupportContacts) {
                    setProduct((prev) => ({
                      ...prev,
                      brand: newBrand,
                      supportContacts: brandConfig.defaultSupportContacts,
                    }));
                  }
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-gray-900 transition-colors bg-white"
            >
              <option value="">Select brand...</option>
              {getAllBrands().map((b) => (
                <option key={b.slug} value={b.slug}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <TextField
          label="Tagline"
          value={product.tagline}
          onChange={(v) => update("tagline", v)}
          placeholder="One-sentence product description"
        />
        <TextField
          label="Amazon URL"
          value={product.amazonUrl}
          onChange={(v) => update("amazonUrl", v)}
          placeholder="https://www.amazon.com/dp/..."
        />
      </Section>

      {/* Colors */}
      <Section title="Colors">
        <div className="grid grid-cols-3 gap-4">
          <ColorField
            label="Primary"
            value={product.colors.primary}
            onChange={(v) => updateColor("primary", v)}
          />
          <ColorField
            label="Accent"
            value={product.colors.accent}
            onChange={(v) => updateColor("accent", v)}
          />
          <ColorField
            label="Background"
            value={product.colors.background}
            onChange={(v) => updateColor("background", v)}
          />
        </div>
      </Section>

      {/* Hero Image */}
      <Section title="Hero Image">
        <div className="flex items-start gap-6">
          <div className="w-32 h-32 border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0">
            {heroPreview ? (
              <img
                src={heroPreview}
                alt="Hero preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-xs text-gray-400">No image</span>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <label className="block">
              <span className="text-xs font-medium text-gray-600">
                Upload Image
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500 mt-1 file:mr-3 file:py-2 file:px-4 file:border file:border-gray-300 file:text-sm file:bg-white file:hover:bg-gray-50 file:cursor-pointer"
              />
            </label>
            <TextField
              label="Image Path (or URL)"
              value={product.heroImage}
              onChange={(v) => {
                update("heroImage", v);
                if (v.startsWith("http") || v.startsWith("/")) {
                  setHeroPreview(v);
                }
              }}
              placeholder="/products/my-product.jpg"
            />
          </div>
        </div>
      </Section>

      {/* Trust Badges */}
      <Section title="Trust Badges">
        <TagInput
          label="Badges"
          tags={product.trustBadges}
          onChange={(tags) => update("trustBadges", tags)}
          placeholder='e.g. "Vegan", "Non-GMO", "GMP Certified"'
        />
      </Section>

      {/* Usage Steps */}
      <Section title="Usage Steps">
        <div className="space-y-3">
          {product.usageSteps.map((step, i) => (
            <ListItemCard
              key={i}
              index={i}
              total={product.usageSteps.length}
              onRemove={() => removeItem("usageSteps", i)}
              onMoveUp={() => moveItem("usageSteps", i, i - 1)}
              onMoveDown={() => moveItem("usageSteps", i, i + 1)}
            >
              <div className="grid grid-cols-[60px_1fr] gap-3">
                <TextField
                  label="Icon"
                  value={step.icon}
                  onChange={(v) =>
                    updateObjectItem("usageSteps", i, { icon: v })
                  }
                  placeholder="emoji"
                />
                <TextField
                  label="Title"
                  value={step.title}
                  onChange={(v) =>
                    updateObjectItem("usageSteps", i, { title: v })
                  }
                  placeholder="Step title"
                />
              </div>
              <TextField
                label="Detail"
                value={step.detail}
                onChange={(v) =>
                  updateObjectItem("usageSteps", i, { detail: v })
                }
                placeholder="Step description"
              />
            </ListItemCard>
          ))}
          <button
            type="button"
            onClick={() =>
              addObjectItem("usageSteps", {
                icon: "",
                title: "",
                detail: "",
              })
            }
            className="w-full py-2 text-sm text-gray-500 border border-dashed border-gray-300 hover:border-gray-400 hover:text-gray-700 transition-colors"
          >
            + Add Usage Step
          </button>
        </div>
      </Section>

      {/* Pro Tips */}
      <Section title="Pro Tips">
        <div className="space-y-2">
          {product.proTips.map((tip, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={tip}
                onChange={(e) => {
                  const newTips = [...product.proTips];
                  newTips[i] = e.target.value;
                  update("proTips", newTips);
                }}
                className="flex-1 px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-gray-900 transition-colors"
                placeholder="Pro tip..."
              />
              <button
                type="button"
                onClick={() => removeItem("proTips", i)}
                className="px-3 py-2 text-sm text-red-400 hover:text-red-600 border border-gray-300"
              >
                x
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => update("proTips", [...product.proTips, ""])}
            className="w-full py-2 text-sm text-gray-500 border border-dashed border-gray-300 hover:border-gray-400 hover:text-gray-700 transition-colors"
          >
            + Add Pro Tip
          </button>
        </div>
      </Section>

      {/* Benefits */}
      <Section title="Benefits">
        <div className="space-y-3">
          {product.benefits.map((b, i) => (
            <ListItemCard
              key={i}
              index={i}
              total={product.benefits.length}
              onRemove={() => removeItem("benefits", i)}
              onMoveUp={() => moveItem("benefits", i, i - 1)}
              onMoveDown={() => moveItem("benefits", i, i + 1)}
            >
              <div className="grid grid-cols-[60px_1fr] gap-3">
                <TextField
                  label="Icon"
                  value={b.icon}
                  onChange={(v) =>
                    updateObjectItem("benefits", i, { icon: v })
                  }
                  placeholder="emoji"
                />
                <TextField
                  label="Title"
                  value={b.title}
                  onChange={(v) =>
                    updateObjectItem("benefits", i, { title: v })
                  }
                  placeholder="Benefit title"
                />
              </div>
              <TextField
                label="Description"
                value={b.description}
                onChange={(v) =>
                  updateObjectItem("benefits", i, { description: v })
                }
                placeholder="Educational description of this benefit"
              />
            </ListItemCard>
          ))}
          <button
            type="button"
            onClick={() =>
              addObjectItem("benefits", {
                icon: "",
                title: "",
                description: "",
              })
            }
            className="w-full py-2 text-sm text-gray-500 border border-dashed border-gray-300 hover:border-gray-400 hover:text-gray-700 transition-colors"
          >
            + Add Benefit
          </button>
        </div>
      </Section>

      {/* Ingredients */}
      <Section title="Ingredients">
        <div className="space-y-3">
          {product.ingredients.map((ing, i) => (
            <ListItemCard
              key={i}
              index={i}
              total={product.ingredients.length}
              onRemove={() => removeItem("ingredients", i)}
              onMoveUp={() => moveItem("ingredients", i, i - 1)}
              onMoveDown={() => moveItem("ingredients", i, i + 1)}
            >
              <div className="grid grid-cols-2 gap-3">
                <TextField
                  label="Name"
                  value={ing.name}
                  onChange={(v) =>
                    updateObjectItem("ingredients", i, { name: v })
                  }
                  placeholder="e.g. Methylcobalamin (Vitamin B12)"
                />
                <TextField
                  label="Amount"
                  value={ing.amount}
                  onChange={(v) =>
                    updateObjectItem("ingredients", i, { amount: v })
                  }
                  placeholder="e.g. 2,500 mcg per serving"
                />
              </div>
              <TextField
                label="Description"
                value={ing.description}
                onChange={(v) =>
                  updateObjectItem("ingredients", i, { description: v })
                }
                placeholder="What this ingredient does"
              />
            </ListItemCard>
          ))}
          <button
            type="button"
            onClick={() =>
              addObjectItem("ingredients", {
                name: "",
                amount: "",
                description: "",
              })
            }
            className="w-full py-2 text-sm text-gray-500 border border-dashed border-gray-300 hover:border-gray-400 hover:text-gray-700 transition-colors"
          >
            + Add Ingredient
          </button>
        </div>
      </Section>

      {/* FAQ */}
      <Section title="FAQ">
        <div className="space-y-3">
          {product.faq.map((f, i) => (
            <ListItemCard
              key={i}
              index={i}
              total={product.faq.length}
              onRemove={() => removeItem("faq", i)}
              onMoveUp={() => moveItem("faq", i, i - 1)}
              onMoveDown={() => moveItem("faq", i, i + 1)}
            >
              <TextField
                label="Question"
                value={f.question}
                onChange={(v) =>
                  updateObjectItem("faq", i, { question: v })
                }
                placeholder="Customer question"
              />
              <TextField
                label="Answer"
                value={f.answer}
                onChange={(v) => updateObjectItem("faq", i, { answer: v })}
                placeholder="Answer"
                multiline
              />
            </ListItemCard>
          ))}
          <button
            type="button"
            onClick={() =>
              addObjectItem("faq", { question: "", answer: "" })
            }
            className="w-full py-2 text-sm text-gray-500 border border-dashed border-gray-300 hover:border-gray-400 hover:text-gray-700 transition-colors"
          >
            + Add FAQ
          </button>
        </div>
      </Section>

      {/* Chatbot */}
      <Section title="Chatbot Configuration" defaultOpen={false}>
        <TextField
          label="Chatbot Context (system prompt)"
          value={product.chatbotContext}
          onChange={(v) => update("chatbotContext", v)}
          placeholder="Product knowledge and rules for the AI chatbot..."
          multiline
          mono
        />
        <TagInput
          label="Suggested Prompts"
          tags={product.suggestedPrompts}
          onChange={(tags) => update("suggestedPrompts", tags)}
          placeholder="e.g. How do I take this?"
        />
      </Section>

      {/* Support & Returns */}
      <Section title="Support & Returns" defaultOpen={false}>
        <p className="text-xs text-gray-500 mb-2">
          Customize how customers can reach support for each purchase platform.
          Leave fields blank to use the default return flow.
        </p>

        {/* Website */}
        <div className="border border-gray-200 p-4 bg-gray-50 space-y-3">
          <h4 className="text-sm font-semibold text-gray-700">Website Purchases</h4>
          <div className="grid grid-cols-2 gap-3">
            <TextField
              label="Phone"
              value={product.supportContacts?.website?.phone || ""}
              onChange={(v) => updateSupportContact("website", { phone: v })}
              placeholder="e.g. 415-800-4758"
            />
            <TextField
              label="Email"
              value={product.supportContacts?.website?.email || ""}
              onChange={(v) => updateSupportContact("website", { email: v })}
              placeholder="e.g. hello@brand.com"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <TextField
              label="Return Portal URL"
              value={product.supportContacts?.website?.url || ""}
              onChange={(v) => updateSupportContact("website", { url: v })}
              placeholder="https://yourdomain.com/returns"
            />
            <TextField
              label="Button Label"
              value={product.supportContacts?.website?.urlLabel || ""}
              onChange={(v) => updateSupportContact("website", { urlLabel: v })}
              placeholder="e.g. Go to Return Portal"
            />
          </div>
        </div>

        {/* Amazon */}
        <div className="border border-gray-200 p-4 bg-gray-50 space-y-3">
          <h4 className="text-sm font-semibold text-gray-700">Amazon Purchases</h4>
          <p className="text-xs text-gray-400">Returns are always handled through Amazon. These optional fields add extra contact info.</p>
          <div className="grid grid-cols-2 gap-3">
            <TextField
              label="Phone"
              value={product.supportContacts?.amazon?.phone || ""}
              onChange={(v) => updateSupportContact("amazon", { phone: v })}
              placeholder="Optional"
            />
            <TextField
              label="Email"
              value={product.supportContacts?.amazon?.email || ""}
              onChange={(v) => updateSupportContact("amazon", { email: v })}
              placeholder="Optional"
            />
          </div>
        </div>

        {/* TikTok */}
        <div className="border border-gray-200 p-4 bg-gray-50 space-y-3">
          <h4 className="text-sm font-semibold text-gray-700">TikTok Shop Purchases</h4>
          <p className="text-xs text-gray-400">Returns are handled through TikTok. These optional fields add extra contact info.</p>
          <div className="grid grid-cols-2 gap-3">
            <TextField
              label="Phone"
              value={product.supportContacts?.tiktok?.phone || ""}
              onChange={(v) => updateSupportContact("tiktok", { phone: v })}
              placeholder="Optional"
            />
            <TextField
              label="Email"
              value={product.supportContacts?.tiktok?.email || ""}
              onChange={(v) => updateSupportContact("tiktok", { email: v })}
              placeholder="Optional"
            />
          </div>
        </div>
      </Section>

      {/* Bottom publish bar */}
      <div className="flex items-center justify-between bg-white border border-gray-200 px-5 py-3">
        <div className="text-sm text-gray-500">
          {product.slug ? `/product/${product.slug}` : "Set a name to generate the URL"}
        </div>
        <button
          type="button"
          onClick={handlePublish}
          disabled={publishing || !product.name || !product.slug}
          className="px-5 py-2 text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 disabled:bg-gray-400 transition-colors"
        >
          {publishing ? "Publishing..." : "Publish"}
        </button>
      </div>
    </div>
  );
}
