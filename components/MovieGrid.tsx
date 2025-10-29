import { Movie } from "./Types/Movie";
import { MovieItem } from "./MovieItem";
import { useRouter } from "next/navigation";

type MovieGridProps = {
    movies: Movie[];
    loading: boolean;
    error: string | null;
    type?: "movie" | "series";
}

export function MovieGrid({ movies, loading, error, type }: MovieGridProps) {
    if (loading) return <p className="text-center mt-8 text-white">Cargando...</p>;
    if (error) return <p className="text-center mt-8 text-red-500">Error al cargar las peliculas: {error}</p>
    if (movies.length === 0) return <p className="text-center mt-8 text-white">No hay resultados.</p>

    const filteredMedia = type
        ? movies.filter((m: any) => m.type === type)
        : movies;

    const router = useRouter();
    const handleClick = (media: Movie) => {
        sessionStorage.setItem("selectedMedia", JSON.stringify(media)); // Guardamos los datos de la pelicula/serie.
        router.push(`/details/${media.id}?type=${media.type}`);
    }

    return (
        <section className="
            grid gap-4 mt-6 
            grid-cols-[repeat(auto-fill,minmax(10rem,1fr))]
            sm:grid-cols-[repeat(auto-fill,minmax(12rem,1fr))]
            md:grid-cols-[repeat(auto-fill,minmax(12rem,1fr))]
            lg:grid-cols-[repeat(auto-fill,minmax(12rem,1fr))]
        "
        >
            {filteredMedia.map((movie) => (
                <MovieItem key={`${movie.id}`} movie={movie} onClick={() => handleClick(movie)} />
            ))}
        </section>
    );
}