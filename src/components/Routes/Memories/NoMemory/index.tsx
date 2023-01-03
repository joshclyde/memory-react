import { useFlashcardsArray } from "src/store/selectors";

export const NoMemory = () => {
  const flashcards = useFlashcardsArray();
  return (
    <p className="text-light-2">
      You have <span className="text-green-1">{flashcards.length}</span> memories
    </p>
  );
};
