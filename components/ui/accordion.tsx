"use client";

import { useState } from "react";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className="border-b border-gray-100/80 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-4 flex items-start justify-between text-left gap-4 group"
      >
        <span className="font-medium text-gray-900 text-[15px] group-hover:text-gray-700 transition-colors">
          {question}
        </span>
        <span
          className={`text-gray-400 transition-transform duration-200 flex-shrink-0 mt-0.5 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4.5 6.75L9 11.25L13.5 6.75" />
          </svg>
        </span>
      </button>
      <div className={`accordion-content ${isOpen ? "is-open" : ""}`}>
        <div>
          <p className="pb-4 text-gray-600 text-sm leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: Array<{ question: string; answer: string }>;
  onItemOpen?: (index: number) => void;
}

export default function Accordion({ items, onItemOpen }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    if (openIndex !== index) {
      onItemOpen?.(index);
    }
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white border border-gray-100 shadow-sm px-5 lg:px-8">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}
