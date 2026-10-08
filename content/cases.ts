export type CaseStudy = {
  slug: string;
  status: "published" | "draft";
  title: string;
  eyebrow: string;
  summary: string;
  problem: string;
  solution: string;
  result: string;
  stack: string[];
  image?: { src: string; alt: string; width: number; height: number };
};

export const cases: CaseStudy[] = [
  {
    slug: "students-registration",
    status: "published",
    title: "Students Registration",
    eyebrow: "Plataforma SaaS",
    summary: "Gestão de alunos, turmas, pagamentos e automações em uma única plataforma.",
    problem: "A operação dependia de controles espalhados, acompanhamento manual de pagamentos e comunicação pouco automatizada.",
    solution: "Uma plataforma web centralizada com gestão de alunos e casais, turmas, financeiro, autenticação e automações de cobrança e confirmação.",
    result: "Mais organização, menos trabalho manual e uma visão única da operação da academia.",
    stack: ["JavaScript", "Supabase", "PostgreSQL", "Vercel", "Resend", "WhatsApp Cloud API"],
    image: { src: "/cases/students-registration.webp", alt: "Dashboard real do Students Registration", width: 1280, height: 674 },
  },
  {
    slug: "site-empresarial",
    status: "draft",
    title: "Site empresarial",
    eyebrow: "Web Design",
    summary: "Case em preparação.",
    problem: "",
    solution: "",
    result: "",
    stack: [],
  },
  {
    slug: "automacao-integracao",
    status: "draft",
    title: "Automação & Integração",
    eyebrow: "Automation",
    summary: "Case em preparação.",
    problem: "",
    solution: "",
    result: "",
    stack: [],
  },
];

export const publishedCases = cases.filter((item) => item.status === "published" && item.image);
export function getPublishedCase(slug: string) {
  return publishedCases.find((item) => item.slug === slug);
}
