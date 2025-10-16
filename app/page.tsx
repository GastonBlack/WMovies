"use client";

import { SearchBar } from "@/components/SearchBar";
import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import { Movie } from "@/components/Types/Movie";

export default function Home() {

  const [searchInput, setSearchInput] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);

  const onSearchTest = () => {}

  return (
    <main className="flex w-screen h-screen bg-[var(--background)] px-4 gap-4">

      <section className="flex w-1/10 bg-blue-500">
        <Sidebar
          
        />
      </section>

      <section className="flex flex-col w-9/10 h-screen items-center bg-[var(--foreground)] p-4 ">
        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onSearch={onSearchTest}
        />
      </section>

    </main>
  );
}
