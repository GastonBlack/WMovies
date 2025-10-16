"use client";

import { SearchBar } from "@/components/SearchBar";
import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import { Movie } from "@/components/Types/Movie";
import { fetchMovies } from "@/services/movieService";
import { MovieGrid } from "@/components/MovieGrid";


export default function Home() {

  const [searchInput, setSearchInput] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchInput.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const results = await fetchMovies(searchInput);
      setMovies(results);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex w-screen min-h-screen bg-[var(--background)] px-4 gap-4">

      <section className="flex w-1/10 h-green bg-green-500 bg-blue-500">
        <Sidebar

        />
      </section>

      <section className="flex flex-col w-9/10 h-screen items-center bg-[var(--foreground)] p-4 overflow-y-auto">

        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onSearch={handleSearch}
        />

        <div className="mt-4 w-full"><MovieGrid movies={movies} loading={loading} error={error} /></div>

      </section>

    </main>
  );
}
