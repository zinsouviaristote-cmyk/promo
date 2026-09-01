/**
 * Charge une instance statique de Fraunces (pour ImageResponse/satori, qui
 * ne sait pas interpoler une police variable) depuis Google Fonts.
 * L'en-tête User-Agent forcé sur un vieux navigateur fait répondre Google
 * en TTF plutôt qu'en WOFF2 — satori ne sait lire que TTF/OTF.
 */

const OLD_BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2";

let cached: ArrayBuffer | null = null;

export async function loadFrauncesBold(): Promise<ArrayBuffer> {
  if (cached) return cached;

  const cssResponse = await fetch(
    "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@72,800,60,1",
    { headers: { "User-Agent": OLD_BROWSER_UA } }
  );
  const css = await cssResponse.text();
  const fontUrl = css.match(/src: url\(([^)]+)\)/)?.[1];
  if (!fontUrl) {
    throw new Error("Impossible de récupérer la police Fraunces pour générer l'icône.");
  }

  const fontResponse = await fetch(fontUrl);
  cached = await fontResponse.arrayBuffer();
  return cached;
}
