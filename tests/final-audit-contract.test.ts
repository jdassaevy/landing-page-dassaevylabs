import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const motion = readFileSync(join(process.cwd(), "components/motion.tsx"), "utf8");
const header = readFileSync(join(process.cwd(), "components/header.tsx"), "utf8");
const css = readFileSync(join(process.cwd(), "app/motion.css"), "utf8");

describe("final accessibility and semantics audit contracts", () => {
  it("keeps the animated process line outside the ordered-list content model", () => {
    expect(motion).toContain('useRef<HTMLDivElement>(null)');
    expect(motion).toContain('className="process-timeline"');
    expect(motion).toMatch(/<div ref=\{ref\} className="process-timeline">[\s\S]*<motion\.span[\s\S]*<ol className="process">\{children\}<\/ol>[\s\S]*<\/div>/);
  });

  it("removes the superseded process-line animation layer", () => {
    expect(css).not.toContain("@keyframes process-line");
    expect(css).not.toContain(".process::before");
    expect(css).toContain(".process-timeline");
  });

  it("connects the mobile menu button to the controlled navigation panel", () => {
    expect(header).toContain('aria-controls="mobile-navigation"');
    expect(header).toContain('id="mobile-navigation"');
  });
});
