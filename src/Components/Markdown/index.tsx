/* eslint react/no-danger: 0 */
import { Parser, HtmlRenderer } from "commonmark";
import { useMemo } from "react";

import "./Markdown.css";

export const Markdown = ({ children }: { children: string }) => {
  const innerHtml = useMemo(() => {
    const reader = new Parser();
    const writer = new HtmlRenderer();
    const node = reader.parse(children);
    return { __html: writer.render(node) };
  }, [children]);

  return (
    <div className="flex space-x-12">
      <div className="border-green-1 border-2 p-2 w-96 whitespace-pre-line">
        {children}
      </div>
      <div
        className="border-blue-1 border-2 p-2 w-96 Markdown"
        dangerouslySetInnerHTML={innerHtml}
      />
    </div>
  );
};
