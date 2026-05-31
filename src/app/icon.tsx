import { SITE_NAME } from "@/lib/seo";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          background: "linear-gradient(135deg, #818cf8 0%, #6366f1 50%, #4338ca 100%)",
          color: "white",
          fontSize: "20px",
          fontWeight: 700,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        f
      </div>
    ),
    { ...size }
  );
}
