import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const page = readFileSync(join(process.cwd(), "app/page.tsx"), "utf8");
const layout = readFileSync(join(process.cwd(), "app/layout.tsx"), "utf8");
const header = readFileSync(join(process.cwd(), "components/header.tsx"), "utf8");
const form = readFileSync(join(process.cwd(), "components/quote-form.tsx"), "utf8");
const conversionCssPath = join(process.cwd(), "app/mobile-conversion.css");
const css = existsSync(conversionCssPath) ? readFileSync(conversionCssPath, "utf8") : "";

describe("mobile conversion contracts", () => {
  it("mounts a dedicated mobile WhatsApp CTA", () => {
    expect(page).toContain("<MobileCta />");
    expect(page).toContain("@/components/mobile-cta");
    expect(layout).toContain('import "./mobile-conversion.css"');
    expect(css).toContain(".mobile-cta");
    expect(css).toContain("safe-area-inset-bottom");
  });

  it("adds a direct conversion action to the mobile menu", () => {
    expect(header).toContain("mobile-panel-cta");
    expect(header).toContain("Falar sobre meu projeto");
  });

  it("gives failed form submissions an explicit WhatsApp fallback", () => {
    expect(form).toContain("whatsappUrl");
    expect(form).toContain("form-fallback");
    expect(form).toContain("Falar pelo WhatsApp");
  });

  it("prevents accidental duplicate submissions and clears successful forms", () => {
    expect(form).toContain("status === \"success\"");
    expect(form).toContain("formRef.current?.reset()");
    expect(form).toContain("disabled={status === \"submitting\" || status === \"success\"}");
  });

  it("keeps the mobile hero photo intentionally framed instead of clipping the frame", () => {
    expect(css).toMatch(/@media\(max-width:600px\)[\s\S]*\.hero-photo \.media-frame\{[^}]*aspect-ratio:4\/5/);
    expect(css).toMatch(/@media\(max-width:600px\)[\s\S]*\.hero-photo\{[^}]*overflow:visible/);
  });
});
