const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY!;
const BASE_URL = "https://api.themoviedb.org/3";

// Funcion para armar la URL de las imagenes.
export function getImageUrl(path: string | null, size: string = "w500") {
    return path
        ? `https://image.tmdb.org/t/p/${size}${path}`
        : "/placeholder.png"; // Imagen por defecto si no hay poster
}

// Buscar películas
export async function fetchMovies(query: string) {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${encodeURIComponent(
        query
    )}&page=1&include_adult=false`;

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok || !data.results) {
        throw new Error("Error al obtener películas.");
    }

    return data.results;
}

// Obtener detalles de una película por ID
export async function fetchMovieDetails(id: number) {
    const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES`;
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
        throw new Error("Error al obtener detalles de la película.");
    }

    return data;
}