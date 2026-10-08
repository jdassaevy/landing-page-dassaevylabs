import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const home = readFileSync(join(process.cwd(), "components/home.tsx"), "utf8");
const motion = readFileSync(join(process.cwd(), "components/motion.tsx"), "utf8");
const css = readFileSync(join(process.cwd(), "app/motion.css"), "utf8");

describe("premium motion contracts", () => {
  it("mounts a page scroll progress indicator", () => {
    expect(motion).toContain("export function ScrollProgress");
    expect(home).toContain("<ScrollProgress />");
    expect(css).toContain(".scroll-progress");
  });

  it("sequences the hero copy instead of revealing it as one block", () => {
    expect(motion).toContain("export function HeroSequence");
    expect(home).toContain("<HeroSequence");
    expect(home.match(/<HeroStep/g)?.length ?? 0).toBeGreaterThanOrEqual(5);
  });

  it("adds scroll-linked depth to the featured case", () => {
    expect(motion).toContain("export function Parallax");
    expect(home).toContain("className=\"case-parallax\"");
  });

  it("keeps the new continuous motion accessible", () => {
    expect(css).toMatch(/prefers-reduced-motion:reduce[\s\S]*\.scroll-progress/);
    expect(motion).toContain("useReducedMotion");
  });
});
