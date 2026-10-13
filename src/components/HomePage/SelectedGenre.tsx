import { unselectedGenre } from "../../constants/movies";
import type { Genre } from "../../types/movies";

interface SelectedGenreProps {
  selectedGenre: Genre;
  onGenreChange: (genre: Genre) => void;
}

function SelectedGenre({ selectedGenre, onGenreChange }: SelectedGenreProps) {
  return (
    <>
      {selectedGenre.id !== 0 && (
        <div className="-mt-1 flex items-center">
          <p className="text-primary-hover text-xl">
            Genre: {selectedGenre.name}
          </p>
          <button
            tabIndex={-1}
            onClick={() => onGenreChange(unselectedGenre)}
            className="text-primary-hover hover hover:text-primary-active ml-1 size-8 text-2xl"
          >
            &times;
          </button>
          <button
            onClick={() => onGenreChange(unselectedGenre)}
            className="text-foreground hover:text-muted outline-primary ml-3 rounded-md px-2 py-1 underline underline-offset-2 focus-visible:outline-2"
          >
            Clear filter
          </button>
        </div>
      )}
    </>
  );
}

export default SelectedGenre;
