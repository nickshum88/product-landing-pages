"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Product, Platform } from "@/lib/types";
import { trackChatOpen, trackChatMessage } from "@/lib/analytics";
import ChatMessage from "./chat-message";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatWidgetProps {
  product: Product;
  platform: Platform;
  isOpen: boolean;
  onToggle: () => void;
}

export default function ChatWidget({
  product,
  platform,
  isOpen,
  onToggle,
}: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [isDesktop, setIsDesktop] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Track desktop breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen]);

  // Lock body scroll when chat is open — only on mobile
  useEffect(() => {
    if (isOpen && !isDesktop) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isDesktop]);

  const handleOpen = useCallback(() => {
    onToggle();
    trackChatOpen(product.slug, platform);
  }, [onToggle, product.slug, platform]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setStreamingContent("");

    trackChatMessage(product.slug, messages.length === 0);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          productSlug: product.slug,
          platform,
        }),
      });

      if (!response.ok) throw new Error("Chat request failed");

      if (!response.body) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message },
        ]);
        return;
      }

      // Stream the response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                fullContent += parsed.text;
                setStreamingContent(fullContent);
              }
            } catch {
              // Skip malformed lines
            }
          }
        }
      }

      setStreamingContent("");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: fullContent || "I couldn't generate a response. Please try again." },
      ]);
    } catch {
      setStreamingContent("");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const chatContent = (
    <>
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {messages.length === 0 && !streamingContent && (
          <div className="pt-6 pb-4">
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-brand-50 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-brand-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </div>
            <p className="text-center text-gray-600 text-sm mb-6">
              Hi! I can help with product questions, usage tips, and support.
            </p>
            <div className="space-y-2">
              {product.suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(prompt)}
                  className="block w-full text-left text-[14px] px-4 py-3 bg-white hover:bg-brand-50 text-gray-600 transition-colors border border-gray-100 shadow-sm"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}

        {/* Streaming message */}
        {streamingContent && (
          <ChatMessage role="assistant" content={streamingContent} />
        )}

        {/* Loading dots */}
        {isLoading && !streamingContent && (
          <div className="flex justify-start">
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
            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="flex-shrink-0 border-t border-gray-100 bg-white px-4 py-3 pb-safe">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 px-4 py-2.5 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-200 placeholder:text-gray-400 transition-shadow"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-2.5 bg-brand-500 text-white text-sm font-medium disabled:opacity-30 hover:bg-accent active:scale-95 transition-all"
          >
            <svg
              viewBox="0 0 20 20"
              className="w-4.5 h-4.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 10h10M11 6l4 4-4 4" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );

  // FAB button
  if (!isOpen) {
    return (
      <button
        onClick={handleOpen}
        className="fixed bottom-[4.5rem] lg:bottom-6 right-5 lg:right-6 w-14 h-14 bg-brand-500 text-white rounded-full shadow-lg shadow-brand-500/20 flex items-center justify-center hover:bg-accent active:scale-95 transition-all z-50"
        aria-label="Open chat"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      </button>
    );
  }

  // Desktop: side panel
  if (isDesktop) {
    return (
      <div className="fixed inset-0 z-50">
        {/* Light backdrop */}
        <div
          className="absolute inset-0 bg-black/15 animate-fade-in"
          onClick={onToggle}
        />

        {/* Side panel */}
        <div className="absolute top-0 right-0 bottom-0 w-[420px] bg-gray-50 flex flex-col animate-slide-left shadow-2xl border-l border-gray-200">
          {/* Header */}
          <div className="pt-5 pb-3 px-5 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-semibold text-lg text-gray-900">
                  AI Assistant
                </h3>
                <p className="text-xs text-gray-500">
                  {product.name}
                </p>
              </div>
              <button
                onClick={onToggle}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
                aria-label="Close chat"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4.5 4.5L13.5 13.5M4.5 13.5L13.5 4.5" />
                </svg>
              </button>
            </div>
          </div>

          <div className="h-px bg-gray-100" />
          {chatContent}
        </div>
      </div>
    );
  }

  // Mobile: slide-up drawer
  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 animate-fade-in"
        onClick={onToggle}
      />

      {/* Drawer */}
      <div className="absolute bottom-0 left-0 right-0 h-[85vh] bg-gray-50 rounded-t-2xl flex flex-col animate-slide-up shadow-2xl">
        {/* Handle + Header */}
        <div className="pt-3 pb-2 px-5 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-3" />
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-semibold text-lg text-gray-900">
                AI Assistant
              </h3>
              <p className="text-xs text-gray-400">
                {product.name}
              </p>
            </div>
            <button
              onClick={onToggle}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
              aria-label="Close chat"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4.5 4.5L13.5 13.5M4.5 13.5L13.5 4.5" />
              </svg>
            </button>
          </div>
        </div>

        <div className="h-px bg-gray-100" />
        {chatContent}
      </div>
    </div>
  );
}
