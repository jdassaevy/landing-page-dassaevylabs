import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        background: "linear-gradient(135deg, #07111f 0%, #0b1f3a 60%, #0f5cff 100%)",
        color: "white",
        fontSize: 27,
        fontWeight: 800,
        letterSpacing: -1,
        fontFamily: "sans-serif",
      }}
    >
      DL
    </div>,
    size,
  );
}
