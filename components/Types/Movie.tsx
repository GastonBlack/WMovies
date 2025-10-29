export interface Movie {
    id: number;
    title?: string; // Peliculas
    name?: string;  // Series
    poster_path: string | null;
    backdrop_path?: string | null; // Imagen de fondo grande
    overview?: string;
    release_date?: string;
    first_air_date?: string;
    vote_average?: number;
    runtime?: number; // Duracion (peliculas)
    episode_run_time?: number[]; // Duracion promedio (series)
    genres?: { id: number; name: string }[]; // Lista de generos
    cast?: { name: string; character: string; profile_path: string | null }[]; // Actores principales
    seasons?: {
        season_number: number;
        name: string;
        episode_count: number;
        air_date?: string;
        poster_path?: string | null;
    }[]; // Temporadas (solo para series)
    type?: "movie" | "series";
}
