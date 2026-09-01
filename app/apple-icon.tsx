import { ImageResponse } from "next/og";
import { colors } from "@/lib/theme";
import { loadFrauncesBold } from "@/lib/logo-font";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const fontData = await loadFrauncesBold();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: colors.creme,
        }}
      >
        <span
          style={{
            fontFamily: "Fraunces",
            fontWeight: 800,
            fontSize: 120,
            lineHeight: 1,
            color: colors.mandarine,
          }}
        >
          T
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Fraunces", data: fontData, weight: 800, style: "normal" }],
    }
  );
}
