import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#0b2148",
          color: "#fbf5ea",
        }}
      >
        <div style={{ display: "flex", fontSize: 120, fontWeight: 700, letterSpacing: -2 }}>
          MY<span style={{ color: "#e8b02a" }}>3</span>
        </div>
        <div style={{ fontSize: 30, marginTop: 24, letterSpacing: 6, textTransform: "uppercase", opacity: 0.85 }}>
          Family Restaurant · Gajwel
        </div>
        <div style={{ fontSize: 24, marginTop: 34, opacity: 0.7 }}>
          Sealed-Pot Biryani · Live Grill · Slow Curries
        </div>
      </div>
    ),
    { ...size }
  );
}
