import { Markdown } from "@/Components/Markdown";

import { memoryReact } from "./exampleMarkdown";

export const Home = () => {
  return (
    <div className="bg-dark-2 w-full p-8">
      <Markdown>{memoryReact}</Markdown>
    </div>
  );
};
