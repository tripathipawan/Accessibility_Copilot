import { useEffect } from "react";

interface PageMetaProps {
  title: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  /** GEO: AI search engine ke liye structured page context */
  schema?: object;
}

const PageMeta = ({ title, description, canonical, ogImage, schema }: PageMetaProps) => {
  const fullTitle = `${title} | AccessCopilot`;
  const siteUrl = "https://accesscopilot.vercel.app";
  const defaultImage = `${siteUrl}/og-image.png`;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Description
    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
      setMeta("name", "twitter:description", description);
    }

    // Canonical
    const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;
    let linkEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!linkEl) {
      linkEl = document.createElement("link");
      linkEl.setAttribute("rel", "canonical");
      document.head.appendChild(linkEl);
    }
    linkEl.setAttribute("href", canonicalUrl);

    // OG Title & URL
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("name", "twitter:title", fullTitle);

    // OG Image
    const image = ogImage || defaultImage;
    setMeta("property", "og:image", image);
    setMeta("name", "twitter:image", image);

    // Per-page JSON-LD schema (GEO)
    const existingScript = document.getElementById("page-schema-ld");
    if (existingScript) existingScript.remove();

    if (schema) {
      const script = document.createElement("script");
      script.id = "page-schema-ld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    // Cleanup on unmount
    return () => {
      const s = document.getElementById("page-schema-ld");
      if (s) s.remove();
    };
  }, [fullTitle, description, canonical, ogImage, schema]);

  return null;
};

/** Helper: set or create a meta tag */
function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

export default PageMeta;