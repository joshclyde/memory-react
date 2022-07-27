import { ListOfMemories } from "@Components/ListOfMemories";

export const App = () => {
  return (
    <div className="flex">
      <div className="basis-24 shrink-0">
        <div>Learn</div>
        <div>Memories</div>
        <div>Tags</div>
      </div>
      <div className="basis-96 shrink-0">
        <ListOfMemories />
      </div>
      <div>Hi there</div>
    </div>
  );
};
