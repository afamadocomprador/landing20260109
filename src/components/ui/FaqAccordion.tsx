"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqData = [
  {
    question: "¿Qué es el seguro dental DKV?",
    answer:
      "Es un seguro de salud dental que te da acceso a una amplia red de clínicas y profesionales en toda España, con tratamientos gratuitos y otros a precios reducidos.",
  },
  {
    question: "¿Puedo añadir a mi familia?",
    answer:
      "Sí, puedes incluir a tu cónyuge, pareja de hecho e hijos que convivan en el mismo domicilio. Los menores de 15 años no pagan.",
  },
  {
    question: "¿Hay período de carencia?",
    answer:
      "No, no hay períodos de carencia. Puedes disfrutar de todas las ventajas de tu seguro dental desde el primer día.",
  },
  {
    question: "¿Tengo que responder a un cuestionario de salud?",
    answer: "No, para contratar el seguro dental de DKV no es necesario rellenar ningún cuestionario de salud.",
  },
];

export function FaqAccordion() {
  return (
    <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
      {faqData.map((faq, index) => (
        <AccordionItem value={`item-${index}`} key={index}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
