import { useEffect } from "react";

interface PageMetaProps {
  title: string;
  description?: string;
}

/**
 * Sets document title and meta description for each page.
 * Lightweight — no react-helmet needed.
 */
const PageMeta = ({ title, description }: PageMetaProps) => {
  useEffect(() => {
    document.title = `${title} | AccessCopilot`;

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", description);
    }
  }, [title, description]);

  return null;
};

export default PageMeta;
