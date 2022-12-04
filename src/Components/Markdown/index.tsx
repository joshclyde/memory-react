/* eslint react/no-danger: 0 */
import { Parser, HtmlRenderer } from "commonmark";
import { useMemo } from "react";

import "./Markdown.css";

export const Markdown = ({ children }: { children: string }) => {
  const innerHtml = useMemo(() => {
    const reader = new Parser();
    const writer = new HtmlRenderer({ safe: true });
    const node = reader.parse(children);
    return { __html: writer.render(node) };
  }, [children]);

  return <div className="p-2 Markdown" dangerouslySetInnerHTML={innerHtml} />;
};
