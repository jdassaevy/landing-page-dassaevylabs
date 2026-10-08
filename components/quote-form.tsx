"use client";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

const options = ["Landing Page", "Site Institucional", "Site Premium", "Sistema / Plataforma", "Automação / Integração", "Ainda não sei"];
export function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  async function submit(formData: FormData) {
    setStatus("submitting");
    try {
      const payload = Object.fromEntries(formData.entries());
      const response = await fetch("/api/orcamento", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error();
      setStatus("success");
    } catch { setStatus("error"); }
  }
  return <form className="quote-form" action={submit} aria-busy={status === "submitting"}>
    <div className="form-grid"><label>Nome<input name="name" required minLength={2} autoComplete="name" /></label><label>Empresa<input name="company" autoComplete="organization" /></label></div>
    <label>WhatsApp ou e-mail<input name="contact" required autoComplete="email" /></label>
    <label>O que você precisa?<select name="service" required defaultValue=""><option value="" disabled>Selecione</option>{options.map(o => <option key={o}>{o}</option>)}</select></label>
    <label>Conte um pouco sobre o projeto<textarea name="message" required minLength={10} rows={5} /></label>
    <input name="website" tabIndex={-1} autoComplete="off" className="honeypot" aria-hidden="true" />
    <button className="button form-button" disabled={status === "submitting"}>{status === "submitting" ? <><LoaderCircle className="spin" size={18} /> Enviando...</> : "Enviar solicitação →"}</button>
    <div className="form-feedback" role="status">{status === "success" && "Recebi sua solicitação. Vou entrar em contato para entender melhor o projeto."}{status === "error" && "Não consegui enviar agora. Tente novamente ou fale comigo pelo WhatsApp."}</div>
  </form>;
}
