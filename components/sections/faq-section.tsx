"use client";

import { useMemo } from "react";
import { Product } from "@/lib/types";
import SectionWrapper from "@/components/ui/section-wrapper";
import Accordion from "@/components/ui/accordion";
import { trackFaqExpand } from "@/lib/analytics";

interface FaqSectionProps {
  product: Product;
}

export default function FaqSection({ product }: FaqSectionProps) {
  // Merge: negative review FAQ items first (high-impact), then standard FAQ
  const mergedFaq = useMemo(() => {
    const negativeItems = product.negativeReviewFaq.map((f) => ({
      question: f.question,
      answer: f.answer,
      isConcern: true,
    }));
    const standardItems = product.faq.map((f) => ({
      question: f.question,
      answer: f.answer,
      isConcern: false,
    }));
    return [...negativeItems, ...standardItems];
  }, [product.negativeReviewFaq, product.faq]);

  return (
    <SectionWrapper
      id="faq"
      title="Common Questions"
      subtitle="Quick answers to what people ask most"
    >
      <Accordion
        items={mergedFaq}
        onItemOpen={(index) =>
          trackFaqExpand(product.slug, mergedFaq[index].question)
        }
        renderLabel={(item) =>
          (item as { isConcern?: boolean }).isConcern ? "Common Concern" : undefined
        }
      />
    </SectionWrapper>
  );
}
