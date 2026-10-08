import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPublishedCase, publishedCases } from "@/content/cases";
import { MediaFrame } from "@/components/media-frame";
import { Header } from "@/components/header";
export function generateStaticParams() { return publishedCases.map((item) => ({ slug: item.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const item = getPublishedCase(slug); if (!item) return {}; return { title: item.title, description: item.summary, openGraph: item.image ? { images: [item.image.src] } : undefined }; }
export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const item = getPublishedCase(slug); if (!item) notFound(); return <><Header /><main className="case-page shell"><Link className="back" href="/#projetos">← Voltar aos projetos</Link><p className="eyebrow">{item.eyebrow}</p><h1>{item.title}</h1><p className="case-lead">{item.summary}</p>{item.image && <MediaFrame {...item.image} priority />}<div className="case-sections"><section><span>01</span><h2>Problema</h2><p>{item.problem}</p></section><section><span>02</span><h2>Solução</h2><p>{item.solution}</p></section><section><span>03</span><h2>Resultado</h2><p>{item.result}</p></section></div><div className="stack"><p className="eyebrow">TECNOLOGIAS</p>{item.stack.map(s => <span key={s}>{s}</span>)}</div></main></>; }
