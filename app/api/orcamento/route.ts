import { NextResponse } from "next/server";
import { Resend } from "resend";
import { quoteSchema } from "@/lib/quote";
export async function POST(request: Request) {
  const parsed = quoteSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ ok: true });
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.QUOTE_RECIPIENT_EMAIL;
  if (!key || !from || !to) return NextResponse.json({ error: "Serviço de e-mail não configurado" }, { status: 503 });
  const resend = new Resend(key);
  const { name, company, contact, service, message } = parsed.data;
  const result = await resend.emails.send({ from, to, subject: `Novo orçamento — ${service}`, text: `Nome: ${name}\nEmpresa: ${company || "-"}\nContato: ${contact}\nServiço: ${service}\n\n${message}` });
  if (result.error) return NextResponse.json({ error: "Falha no envio" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
