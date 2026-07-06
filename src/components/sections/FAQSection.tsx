'use client';

import SectionHeader from '@/components/ui/SectionHeader';
import Accordion from '@/components/ui/Accordion';
import { faqItems } from '@/lib/constants';

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about StadiumGPT and how it powers the future of smart venues."
        />
        <Accordion items={faqItems} />
      </div>
    </section>
  );
}
