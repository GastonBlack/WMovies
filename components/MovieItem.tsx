import { getImageUrl } from "@/services/movieService";
import { Movie } from "./Types/Movie";

type MovieItemProps = {
    movie: Movie;
    onClick?: () => void;
}

export function MovieItem({ movie, onClick }: MovieItemProps) {
    return (
        <article
            onClick={onClick}
            className="
            flex flex-col w-[12rem] bg-zinc-900/60 rounded-lg overflow-hidden hover:scale-105 transition-all duration-200
            cursor-pointer border-1 border-gray-800 relative
            "
        >
            <span
                className="absolute top-1 -left-1 bg-red-800/65 text-white text-xs font-semibold px-2 py-1 rounded-sm shadow-lg"
            >
                {movie.type === "movie" ? "Película" : "Serie"}
            </span>
            <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title || movie.name}
                className="w-full h-full object-cover"
            />
            <div className="flex flex-col p-2">

                <h3 className="text-sm text-white font-medium truncate">{movie.title || movie.name}</h3>

                <div className="flex flex-row gap-1 mt-1 items-center">
                    <p className="flex items-center justify-center text-centertext-xs text-zinc-400 text-center">{(movie.vote_average ? movie.vote_average.toFixed(1) : "?")}/10</p>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 p-0 m-0 flex justify-center items-center -translate-y-[1px]" viewBox="0 0 16 16" >
                        <path fill="#ff9900ff" d="M5.75766517,5.41369089 L7.55163196,1.77871714 C7.73503881,1.40709429 8.26496119,1.40709429 8.44836804,1.77871714 L10.2423348,5.41369089 L14.2537665,5.99658603 C14.6638767,6.05617853 14.8276317,6.56016466 14.5308732,6.84943272 L11.628174,9.67886518 L12.3134083,13.6740879 C12.3834635,14.082541 11.9547473,14.3940215 11.5879336,14.2011762 L8,12.3148879 L4.41206642,14.2011762 C4.04525273,14.3940215 3.61653652,14.082541 3.6865917,13.6740879 L4.37182604,9.67886518 L1.4691268,6.84943272 C1.17236829,6.56016466 1.33612331,6.05617853 1.74623349,5.99658603 L5.75766517,5.41369089 Z"></path>
                    </svg>
                </div>

            </div>
        </article>

    );
}