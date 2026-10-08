"use client";

import { LoaderCircle } from "lucide-react";
import { useRef, useState } from "react";
import { whatsappUrl } from "@/lib/site";

const options = ["Landing Page", "Site Institucional", "Site Premium", "Sistema / Plataforma", "Automação / Integração", "Ainda não sei"];

export function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const fallbackUrl = whatsappUrl("Olá, Julio! Tentei enviar uma solicitação de orçamento pelo site da Dassaevy Labs e quero conversar sobre meu projeto.");

  async function submit(formData: FormData) {
    if (status === "submitting" || status === "success") return;

    setStatus("submitting");
    try {
      const payload = Object.fromEntries(formData.entries());
      const response = await fetch("/api/orcamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error();
      formRef.current?.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function unlockAfterFeedback() {
    if (status === "success" || status === "error") setStatus("idle");
  }

  return (
    <form
      ref={formRef}
      className="quote-form"
      action={submit}
      aria-busy={status === "submitting"}
      onChange={unlockAfterFeedback}
    >
      <div className="form-grid">
        <label>
          Nome
          <input name="name" required minLength={2} autoComplete="name" placeholder="Seu nome" />
        </label>
        <label>
          Empresa
          <input name="company" autoComplete="organization" placeholder="Nome da empresa" />
        </label>
      </div>
      <label>
        WhatsApp ou e-mail
        <input name="contact" required minLength={5} autoComplete="email" placeholder="Como posso falar com você?" />
      </label>
      <label>
        O que você precisa?
        <select name="service" required defaultValue="">
          <option value="" disabled>Selecione</option>
          {options.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>
      <label>
        Conte um pouco sobre o projeto
        <textarea name="message" required minLength={10} maxLength={2000} rows={5} placeholder="Objetivo, ideia, prazo ou o problema que você quer resolver..." />
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" className="honeypot" aria-hidden="true" />
      <button className="button form-button" disabled={status === "submitting" || status === "success"}>
        {status === "submitting" ? <><LoaderCircle className="spin" size={18} /> Enviando...</> : status === "success" ? "Solicitação enviada ✓" : "Enviar solicitação →"}
      </button>
      <div className={`form-feedback ${status}`} role="status" aria-live="polite">
        {status === "success" && "Recebi sua solicitação. Vou entrar em contato para entender melhor o projeto."}
        {status === "error" && <span>Não consegui enviar agora. <a className="form-fallback" href={fallbackUrl} target="_blank" rel="noreferrer">Falar pelo WhatsApp →</a></span>}
      </div>
    </form>
  );
}
