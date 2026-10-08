import { statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getPublishedCase, publishedCases } from "../content/cases";
import { hasLoadedImage, mediaImageIsVisible } from "../lib/media";
import { homeSectionLinks } from "../lib/navigation";
import { whatsappUrl } from "../lib/site";

describe("public content contracts", () => {
  it("does not publish drafts", () => expect(publishedCases.every((item) => item.status === "published")).toBe(true));
  it("requires real media on published cases", () => expect(publishedCases.every((item) => Boolean(item.image))).toBe(true));
  it("does not resolve draft slugs", () => expect(getPublishedCase("site-empresarial")).toBeUndefined());
  it("encodes whatsapp messages", () => expect(whatsappUrl("Olá & teste")).toContain("Ol%C3%A1%20%26%20teste"));
  it("keeps section navigation valid from nested routes", () => {
    expect(homeSectionLinks.every(([, href]) => href.startsWith("/#"))).toBe(true);
  });
});

describe("media loading", () => {
  it("recognizes an image that finished before hydration", () => {
    expect(hasLoadedImage({ complete: true, naturalWidth: 500 })).toBe(true);
  });
  it("keeps broken or unfinished images out of the ready state", () => {
    expect(hasLoadedImage({ complete: false, naturalWidth: 500 })).toBe(false);
    expect(hasLoadedImage({ complete: true, naturalWidth: 0 })).toBe(false);
  });
  it("never hides a valid image while it is still loading", () => {
    expect(mediaImageIsVisible("loading")).toBe(true);
    expect(mediaImageIsVisible("ready")).toBe(true);
    expect(mediaImageIsVisible("error")).toBe(false);
  });
  it("ships full landing media instead of tiny placeholder files", () => {
    const photo = statSync(join(process.cwd(), "public/images/julio-dassaevy.webp"));
    const dashboard = statSync(join(process.cwd(), "public/cases/students-registration.webp"));
    expect(photo.size).toBeGreaterThan(50_000);
    expect(dashboard.size).toBeGreaterThan(20_000);
  });
});
