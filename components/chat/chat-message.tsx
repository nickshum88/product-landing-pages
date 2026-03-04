interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";
  const lines = content.split("\n");

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-brand-50 flex items-center justify-center flex-shrink-0 mr-2 mt-1">
          <svg
            viewBox="0 0 16 16"
            className="w-3.5 h-3.5 text-brand-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M13 8.5a1 1 0 01-1 1H6l-2 2V4a1 1 0 011-1h7a1 1 0 011 1v4.5z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed ${
          isUser
            ? "bg-gray-900 text-white rounded-br-md"
            : "bg-white border border-gray-100 text-gray-800 rounded-bl-md shadow-sm"
        }`}
      >
        {lines.map((line, i) => (
          <span key={i}>
            {line}
            {i < lines.length - 1 && <br />}
          </span>
        ))}
      </div>
    </div>
  );
}
