import { Link } from "src/components/Design/Link";
import {
  useFlashcardsArray, useTagsArray
} from "src/store/selectors";
import { sortByNumericField } from "src/utils/sort";


const useLocalTags = () => {
  const tags = useTagsArray();
  const flashcards = useFlashcardsArray();

  return tags
    .map((tag) => {
      return {
        id: tag.id,
        name: tag.name,
        count: flashcards.filter((flaschard) => flaschard.tags.includes(tag.id)).length,
      };
    })
    .sort((a, b) => sortByNumericField(a.count, b.count));
};

export const Home = () => {
  const tags = useLocalTags();

  return (
    <div className="flex flex-col gap-2 bg-dark-2 w-full p-8">
      {tags.map(({ id, name, count }) => {
        return (
          <Link key={id} to={`/learn/${id}`}>
            {name} - Count: {count}
          </Link>
        );
      })}
    </div>
  );
};
