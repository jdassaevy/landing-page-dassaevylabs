import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() { return new ImageResponse(<div style={{ width: "100%", height: "100%", background: "#070b10", color: "white", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, fontFamily: "sans-serif" }}><div style={{ fontSize: 24, color: "#7dd3fc", marginBottom: 30 }}>DASSAEVY LABS</div><div style={{ fontSize: 72, fontWeight: 800, maxWidth: 900, lineHeight: 1.05 }}>Tecnologia que transforma ideias em soluções reais.</div><div style={{ fontSize: 26, color: "#a5b4c2", marginTop: 35 }}>Sites • Sistemas • Automações</div></div>, size); }
