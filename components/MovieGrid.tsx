import { Movie } from "./Types/Movie";
import { MovieItem } from "./MovieItem";

type MovieGridProps = {
    movies: Movie[];
    loading: boolean;
    error: string | null;
}

export function MovieGrid({ movies, loading, error }: MovieGridProps) {
    if (loading) return <p className="text-center mt-8 text-white">Cargando...</p>;
    if (error) return <p className="text-center mt-8 text-red-500">Error al cargar las peliculas: {error}</p>
    if (movies.length === 0) return <p className="text-center mt-8 text-white">No hay resultados.</p>
    console.log(movies);

    return (
        <section className="
            grid gap-6 mt-6 
            grid-cols-[repeat(auto-fill,minmax(10rem,1fr))]
            sm:grid-cols-[repeat(auto-fill,minmax(12rem,1fr))]
            md:grid-cols-[repeat(auto-fill,minmax(12rem,1fr))]
            lg:grid-cols-[repeat(auto-fill,minmax(12rem,1fr))]
        "
        >
            {movies.map((movie) => (
                <MovieItem key={movie.id} movie={movie} />
            ))}
        </section>
    );
}