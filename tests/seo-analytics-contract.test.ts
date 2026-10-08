import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

describe("SEO, analytics and production domain contracts", () => {
  it("mounts Vercel Analytics from the compatible React integration", () => {
    const pkg = JSON.parse(read("package.json"));
    const layout = read("app/layout.tsx");

    expect(pkg.dependencies["@vercel/analytics"]).toBe("1.2.2");
    expect(layout).toContain('@vercel/analytics/react');
    expect(layout).toContain("<Analytics");
  });

  it("declares the canonical landing URL and rich social metadata", () => {
    const layout = read("app/layout.tsx");

    expect(layout).toContain("alternates:");
    expect(layout).toContain("canonical: site.url");
    expect(layout).toContain("width: 1200");
    expect(layout).toContain("height: 630");
    expect(layout).toContain("alt:");
  });

  it("keeps the Students Registration product on alunos.dassaevylabs.com.br", () => {
    const site = read("lib/site.ts");

    expect(site).toContain('studentsUrl: "https://alunos.dassaevylabs.com.br"');
    expect(site).not.toContain("app.dassaevylabs.com.br");
  });

  it("tracks WhatsApp and quote conversions without personal form data", () => {
    const analytics = read("lib/analytics.ts");
    const header = read("components/header.tsx");
    const mobileCta = read("components/mobile-cta.tsx");
    const quoteForm = read("components/quote-form.tsx");

    expect(analytics).toContain('@vercel/analytics');
    expect(header).toContain('trackConversion("whatsapp_click", "header")');
    expect(mobileCta).toContain('trackConversion("whatsapp_click", "mobile_sticky")');
    expect(quoteForm).toContain('trackConversion("quote_submit_success", "quote_form")');
    expect(quoteForm).toContain('trackConversion("quote_submit_error", "quote_form")');
    expect(quoteForm).not.toContain("trackConversion(payload");
  });

  it("uses Next.js image optimization for local landing media", () => {
    const mediaFrame = read("components/media-frame.tsx");
    expect(mediaFrame).not.toContain("unoptimized");
  });

  it("ships a generated favicon and stronger crawler metadata", () => {
    const robots = read("app/robots.ts");
    const sitemap = read("app/sitemap.ts");

    expect(existsSync(join(process.cwd(), "app/icon.tsx"))).toBe(true);
    expect(robots).toContain("host: site.url");
    expect(sitemap).toContain("changeFrequency");
    expect(sitemap).toContain("priority");
  });
});
