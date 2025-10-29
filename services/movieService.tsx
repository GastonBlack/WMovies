const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY!;
const BASE_URL = "https://api.themoviedb.org/3";
import { Movie } from "@/components/Types/Movie";

// URL de imagen
export function getImageUrl(path: string | null, size: string = "w500") {
    return path
        ? `https://image.tmdb.org/t/p/${size}${path}`
        : "?"; // Imagen por defecto
}

// Buscar peliculas
export async function fetchMovies(query: string, page: number = 1): Promise<Movie[]> {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${encodeURIComponent(
        query
    )}&page=${page}&include_adult=false`;

    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok || !data.results) throw new Error("Error al obtener películas.");

    return data.results.map((m: any) => ({ ...m, type: "movie" }));
}

// Buscar series
export async function fetchSeries(query: string, page: number = 1): Promise<Movie[]> {
    const url = `${BASE_URL}/search/tv?api_key=${API_KEY}&language=es-ES&query=${encodeURIComponent(
        query
    )}&page=${page}&include_adult=false`;

    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok || !data.results) throw new Error("Error al obtener series.");

    return data.results.map((s: any) => ({ ...s, type: "series" }));
}

// Buscar ambos tipos al mismo tiempo
export async function fetchAllMedia(query: string, page: number = 1): Promise<Movie[]> {
    const [movies, series] = await Promise.all([fetchMovies(query, page), fetchSeries(query, page)]);
    return [...movies, ...series];
}


// Peliculas populares
export async function fetchPopularMovies(page: number = 1): Promise<Movie[]> {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`;
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.status_message || "Error al cargar películas populares.");

    return data.results.map((m: any) => ({ ...m, type: "movie" }));
}

// Series populares
export async function fetchPopularSeries(page: number = 1): Promise<Movie[]> {
    const url = `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=es-ES&page=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(data.status_message || "Error al cargar series populares.");

    return data.results.map((s: any) => ({ ...s, type: "series" }));
}

// Obtener generos disponibles.
export async function fetchGenres(type: "movie" | "series" | "all" = "movie") {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY!;
    const BASE_URL = "https://api.themoviedb.org/3";

    if (type === "all") {
        // Se cargan los generos de las peliculas y series al mismo tiempo.
        const [movieRes, seriesRes] = await Promise.all([
            fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`),
            fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=es-ES`)
        ]);

        const movieData = await movieRes.json();
        const seriesData = await seriesRes.json();

        // Se unifican los arrays y se eliminan duplicados.
        const allGenres = [...(movieData.genres || []), ...(seriesData.genres || [])];
        const uniqueGenres = allGenres.filter(
            (g, i, arr) => arr.findIndex(x => x.name === g.name) === i
        );

        return uniqueGenres;
    }

    // Generos por separado: "Movie" | "Serie(tv)";
    const endpoint = type === "movie" ? "movie" : "tv";
    const url = `${BASE_URL}/genre/${endpoint}/list?api_key=${API_KEY}&language=es-ES`;

    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok || !data.genres) throw new Error("Error al cargar géneros.");

    return data.genres;
}

// Obtener contenido por genero.
export async function fetchByGenre(type: "movie" | "series", genreId: number, page: number = 1) {
    const endpoint = type === "movie" ? "movie" : "tv";
    const url = `${BASE_URL}/discover/${endpoint}?api_key=${API_KEY}&language=es-ES&page=${page}&with_genres=${genreId}`;

    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error("Error al cargar contenido por género.");

    return data.results.map((m: any) => ({ ...m, type }));
}

export async function fetchMediaDetails(id: string, type: "movie" | "series") {
    try {
        const endpoint = type === "movie" ? "movie" : "tv";
        const res = await fetch(`${BASE_URL}/${endpoint}/${id}?api_key=${API_KEY}&language=es-ES`);

        if (!res.ok) throw new Error("No se encontró el contenido");
        const media = await res.json();

        // Obtener el reparto
        const creditsRes = await fetch(
            `${BASE_URL}/${endpoint}/${id}/credits?api_key=${API_KEY}&language=es-ES`
        );
        const creditsData = await creditsRes.json();

        media.cast = creditsData.cast?.slice(0, 10) || [];
        media.type = type;

        return media;
    } catch (err) {
        console.error("Error al cargar detalles:", err);
        throw err;
    }
}
