import { SITE_NAME } from "@/lib/seo";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = `${SITE_NAME} — Free ATS-Friendly Resume Builder`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(135deg, #4338ca 0%, #6366f1 45%, #7c3aed 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            f
          </div>
          <span style={{ fontSize: "36px", fontWeight: 700 }}>{SITE_NAME}</span>
        </div>
        <div style={{ fontSize: "56px", fontWeight: 700, lineHeight: 1.15, maxWidth: "900px" }}>
          Free ATS-Friendly Resume Builder
        </div>
        <div
          style={{
            marginTop: "24px",
            fontSize: "28px",
            opacity: 0.92,
            maxWidth: "820px",
            lineHeight: 1.4,
          }}
        >
          Live preview · PDF export · Real-time ATS checker · No sign-up
        </div>
      </div>
    ),
    { ...size }
  );
}
