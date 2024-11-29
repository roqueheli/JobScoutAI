"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the billing cycle work?",
    answer:
      "Our plans are billed monthly or annually, with a 20% discount for annual billing. The billing cycle starts on the day you subscribe to a plan.",
  },
  {
    question: "Can I switch plans at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the new rate will apply at the start of your next billing cycle.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express) and can also arrange invoicing for Enterprise plans.",
  },
  {
    question: "Is there a minimum contract period?",
    answer:
      "No, our monthly plans can be cancelled at any time. Annual plans are paid upfront for the year but come with a significant discount.",
  },
  {
    question: "What's included in the Enterprise plan?",
    answer:
      "The Enterprise plan includes custom features, dedicated support, API access, and can be tailored to your organization's specific needs. Contact our sales team for a custom quote.",
  },
];

export function PricingFAQ() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground">
          Common questions about our pricing and plans
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
