/* eslint react/no-danger: 0 */
import { Parser, HtmlRenderer } from "commonmark";
import { useMemo } from "react";

import { ErrorMessage } from "../Design/ErrorMessage";

import "./Markdown.css";

export const useMarkdownIsOmitted = (content: string) => {
  return useMemo(() => {
    const reader = new Parser();
    const writer = new HtmlRenderer({ safe: true });
    const node = reader.parse(content);
    return writer.render(node).includes(`omitted`);
  }, [content]);
};

export const Markdown = ({ children }: { children: string }) => {
  const innerHtml = useMemo(() => {
    const reader = new Parser();
    const writer = new HtmlRenderer({ safe: true });
    const node = reader.parse(children);
    return { __html: writer.render(node) };
  }, [children]);

  return (
    <>
      <div className="p-2 Markdown" dangerouslySetInnerHTML={innerHtml} />
      {innerHtml.__html.includes(`omitted`) && (
        <ErrorMessage>Some of your content was omitted.</ErrorMessage>
      )}
    </>
  );
};
