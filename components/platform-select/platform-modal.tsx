"use client";

import { Platform } from "@/lib/types";
import { PLATFORM_LABELS } from "@/lib/constants";

interface PlatformModalProps {
  productName: string;
  onSelect: (platform: Platform) => void;
}

const platforms: { id: Platform; icon: React.ReactNode; desc: string }[] = [
  {
    id: "amazon",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705a.66.66 0 01-.753.077c-1.06-.878-1.248-1.284-1.828-2.119-1.746 1.78-2.983 2.312-5.246 2.312-2.68 0-4.764-1.653-4.764-4.96 0-2.582 1.399-4.339 3.393-5.2 1.727-.753 4.139-.889 5.984-1.096v-.41c0-.753.058-1.642-.384-2.294-.384-.565-1.117-.798-1.765-.798-1.2 0-2.266.616-2.527 1.89a.57.57 0 01-.481.488l-2.695-.29a.484.484 0 01-.407-.572C6.2 1.99 9.36.5 12.233.5c1.468 0 3.386.39 4.542 1.502 1.468 1.39 1.328 3.248 1.328 5.269v4.772c0 1.435.596 2.064 1.156 2.838.197.275.24.604-.011.808-.628.524-1.746 1.502-2.36 2.048l-.744.058z" />
        <path d="M21.394 19.527C18.844 21.478 15.04 22.5 11.77 22.5c-4.558 0-8.663-1.685-11.77-4.49-.244-.22-.026-.521.267-.35 3.353 1.95 7.498 3.127 11.782 3.127 2.89 0 6.065-.598 8.987-1.84.44-.187.81.29.358.58z" />
      </svg>
    ),
    desc: "Amazon.com or Amazon app",
  },
  {
    id: "tiktok",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9a6.33 6.33 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.86 4.43V13.1a8.16 8.16 0 004.77 1.53h.81V11.2a4.85 4.85 0 01-.81.07 4.85 4.85 0 01-3.77-1.8V2.44h3.58z" />
      </svg>
    ),
    desc: "TikTok Shop in-app purchase",
  },
  {
    id: "website",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    desc: "Purchased from our website",
  },
];

export default function PlatformModal({
  productName,
  onSelect,
}: PlatformModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center p-6">
      <div className="max-w-sm w-full animate-scale-in">
        <div className="text-center mb-10">
          <div className="w-12 h-12 mx-auto mb-5 bg-brand-50 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 text-brand-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
          </div>
          <h1 className="font-heading text-3xl font-600 text-gray-900 mb-2">
            Welcome
          </h1>
          <p className="text-gray-600 text-[15px] leading-relaxed">
            Where did you purchase your{" "}
            <span className="text-gray-900 font-medium">{productName}</span>?
          </p>
        </div>

        <div className="space-y-3">
          {platforms.map(({ id, icon, desc }) => (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className="w-full p-5 bg-gray-50 hover:bg-brand-50 active:scale-[0.98] text-left transition-all flex items-center gap-4 border border-gray-100 hover:border-brand-200"
            >
              <span className="w-12 h-12 bg-white flex items-center justify-center text-gray-700 flex-shrink-0 border border-gray-100">
                {icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-600 text-gray-900">
                  {PLATFORM_LABELS[id]}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
              </div>
              <svg
                viewBox="0 0 20 20"
                className="w-5 h-5 text-gray-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M7 5l5 5-5 5" />
              </svg>
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-500 text-center mt-8">
          This helps us show the right support information for your purchase.
        </p>
      </div>
    </div>
  );
}
