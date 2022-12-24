/* eslint react/no-danger: 0 */
import { Parser, HtmlRenderer } from "commonmark";
import { useMemo } from "react";
import { HiExclamationCircle } from "react-icons/hi";

import "./Markdown.css";

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
        <div className="flex flex-row items-center">
          <HiExclamationCircle className="mr-1" size="2em" />
          Some of your content was omitted.
        </div>
      )}
    </>
  );
};
