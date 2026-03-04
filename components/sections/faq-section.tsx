"use client";

import { Product } from "@/lib/types";
import SectionWrapper from "@/components/ui/section-wrapper";
import Accordion from "@/components/ui/accordion";
import { trackFaqExpand } from "@/lib/analytics";

interface FaqSectionProps {
  product: Product;
}

export default function FaqSection({ product }: FaqSectionProps) {
  return (
    <SectionWrapper
      id="faq"
      title="Common Questions"
      subtitle="Quick answers to what people ask most"
    >
      <Accordion
        items={product.faq}
        onItemOpen={(index) =>
          trackFaqExpand(product.slug, product.faq[index].question)
        }
      />
    </SectionWrapper>
  );
}
