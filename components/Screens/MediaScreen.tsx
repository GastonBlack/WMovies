"use client";

import { SearchBar } from "@/components/SearchBar";
import { Sidebar } from "@/components/Sidebar";
import { useState, useEffect } from "react";
import { Movie } from "@/components/Types/Movie";
import { fetchPopularMovies, fetchPopularSeries, fetchByGenre } from "@/services/movieService";
import { MovieGrid } from "@/components/MovieGrid";
import { useRouter } from "next/navigation";
import { ContactInfo } from "@/components/ui/ContactInfo";
import { Pagination } from "@/components/ui/Pagination";
import { fetchAllMedia } from "@/services/movieService";

type MediaScreenProps = {
    type: "home" | "movie" | "series";
}

export default function MediaScreen({ type }: MediaScreenProps) {

    const [searchInput, setSearchInput] = useState<string>("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [series, setSeries] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

    const router = useRouter();

    const handleSearch = async (query?: string, pageNum = 1) => {
        const searchTerm = query || searchInput.trim();
        if (!searchTerm) return;
        setPage(pageNum);
        setLoading(true);
        setError(null);

        try {
            const results = await fetchAllMedia(searchTerm, pageNum);
            setMovies(results);
            setSeries(results);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Cargar contenido popular.
    const loadPopularMedia = async () => {
        setLoading(true);
        setError(null);

        try {
            if (selectedGenre) {
                if (type === "movie") {
                    const moviesByGenre = await fetchByGenre("movie", selectedGenre, page);
                    setMovies(moviesByGenre);
                } else if (type === "series") {
                    const seriesByGenre = await fetchByGenre("series", selectedGenre, page);
                    setSeries(seriesByGenre);
                } else if (type === "home") {
                    const [moviesByGenre, seriesByGenre] = await Promise.all([
                        fetchByGenre("movie", selectedGenre, page),
                        fetchByGenre("series", selectedGenre, page)
                    ]);
                    setMovies(moviesByGenre);
                    setSeries(seriesByGenre);
                }
                return;
            }

            // Si no hay genero, carga el contenido popular.
            if (type === "movie") {
                const movies = await fetchPopularMovies(page);
                setMovies(movies);
            } else if (type === "series") {
                const series = await fetchPopularSeries(page);
                setSeries(series);
            } else {
                const movies = await fetchPopularMovies(page);
                const series = await fetchPopularSeries(page);
                setMovies(movies);
                setSeries(series);
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (searchInput.trim() !== "") {
            handleSearch(searchInput, page);
        } else {
            loadPopularMedia();
        }
    }, [page, selectedGenre])


    return (
        <main className="flex flex-col w-screen h-screen bg-[var(--background)] gap-2">

            <section className="flex w-screen bg-green-500 bg-blue-500">
                <Sidebar
                    onSelectGenre={setSelectedGenre}
                />
            </section>

            <section className="flex flex-col w-screen items-center bg-[var(--foreground)] px-16 mt-4 custom-scrollbar">
                <SearchBar
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    onSearch={handleSearch}
                />

                {/* Seccion de peliculas (Solo para INICIO o PELICULAS)*/}
                {(type === "home" || type === "movie") && (
                    <>
                        <section className="flex justify-center items-center w-full h-16 text-white mt-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mr-2" viewBox="0 0 32 32">
                                <path fill="currentColor" d="m 161,104 c -1.64501,0 -3,1.35499 -3,3 v 3 15 c 0,1.64501 1.35499,3 3,3 h 19 3 c 1.33657,0 2.48085,-0.89354 2.86328,-2.11133 C 185.95153,125.60764 186,125.30844 186,125 v -3 -12 -3 c 0,-1.64501 -1.35499,-3 -3,-3 z m 0,2 h 2 v 3 h -3 v -2 c 0,-0.0705 0.007,-0.13917 0.0195,-0.20508 C 160.1107,106.33357 160.50639,106 161,106 Z m 4,0 h 3 v 3 h -3 z m 5,0 h 4 v 3 h -4 z m 6,0 h 3 v 3 h -3 z m 5,0 h 2 c 0.56413,0 1,0.43587 1,1 v 2 h -3 z m -10.98828,6.00195 a 1.0001,1.0001 0 0 1 0.50195,0.14063 l 5,3 a 1.0001,1.0001 0 0 1 0,1.71484 l -5,3 A 1.0001,1.0001 0 0 1 169,119 v -6 a 1.0001,1.0001 0 0 1 0.50781,-0.86914 1.0001,1.0001 0 0 1 0.50391,-0.12891 z M 160,123 h 3 v 3 h -2 c -0.56413,0 -1,-0.43587 -1,-1 z m 5,0 h 3 v 3 h -3 z m 5,0 h 4 v 3 h -4 z m 6,0 h 3 v 3 h -3 z m 5,0 h 3 v 2 c 0,0.56413 -0.43587,1 -1,1 h -2 z" transform="translate(-156 -100)"></path>
                            </svg>
                            <div className="rounded-xl w-4 h-4 bg-red-500 shadow-[0_4px_20px_rgba(255,0,0,0.9)]"></div>
                            <p className="flex text-inherit font-bold text-3xl mx-2">Películas</p>
                        </section>

                        <div className="mt w-full">
                            <MovieGrid
                                movies={movies}
                                loading={loading}
                                error={error}
                                type="movie"
                            />
                        </div>

                        {type === "home" && (
                            <button
                                className="
                                flex justify-center items-center text-white bg-red-900 mt-8 font-semi-bold text-xl p-2 rounded-sm
                                font-bold cursor-pointer hover:scale-105 hover:bg-red-700
                                "
                                onClick={() => router.push("/movies")}
                            >
                                Ver más películas
                            </button>
                        )}
                    </>
                )}

                {/* Seccion de series (Solo para INICIO o SERIES)*/}
                {(type === "home" || type === "series") && (
                    <>
                        <section className="flex justify-center items-center w-full h-16 text-white mt-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mr-1" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M18,6H14.41l2.3-2.29a1,1,0,1,0-1.42-1.42L12,5.54l-1.17-2a1,1,0,1,0-1.74,1L10,6H6A3,3,0,0,0,3,9v8a3,3,0,0,0,3,3v1a1,1,0,0,0,2,0V20h8v1a1,1,0,0,0,2,0V20a3,3,0,0,0,3-3V9A3,3,0,0,0,18,6Zm1,11a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V9A1,1,0,0,1,6,8H18a1,1,0,0,1,1,1Z"></path>
                            </svg>
                            <div className="rounded-xl w-4 h-4 bg-red-500 shadow-[0_4px_20px_rgba(255,0,0,0.9)]"></div>
                            <p className="flex text-inherit font-bold text-3xl mx-2">Series</p>
                        </section>

                        <div className="mt w-full">
                            <MovieGrid
                                movies={series}
                                loading={loading}
                                error={error}
                                type="series"
                            />
                        </div>

                        {type === "home" && (
                            <button
                                className="
                                flex justify-center items-center text-white bg-red-900 mt-8 font-semi-bold text-xl p-2 rounded-sm
                                font-bold cursor-pointer hover:scale-105 hover:bg-red-700
                                "
                                onClick={() => router.push("/series")}
                            >
                                Ver más series
                            </button>
                        )}
                    </>
                )}

                <Pagination
                    currentPage={page}
                    totalPages={250} // Esto tendria que ser automatico.
                    onPageChange={setPage}
                />

                <ContactInfo />

            </section>
        </main>
    );
}
