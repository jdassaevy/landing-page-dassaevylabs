import { describe, expect, it } from "vitest";
import { getPublishedCase, publishedCases } from "../content/cases";
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
