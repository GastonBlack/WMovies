import React from "react";

type SearchBarProps = {
    searchInput: string;
    setSearchInput: (value: string) => void;
    onSearch: () => void;
}

export function SearchBar({
  searchInput,
  setSearchInput,
  onSearch,
}: SearchBarProps) {
    return (
        <section className="flex w-5/10 h-12 bg-transparent text-black justify-center items-center gap-4 rounded-xl">
            <input
                className="
                    flex w-8/10 h-full bg-black justify-center items-center text-white px-4 rounded-xl outline-none
                    focus:scale-101 transition-all duration-100 focus:shadow-xl
                "
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Buscar pelicula..."
            />
            <button
                onClick={onSearch}
                className="
                    flex h-full w-2/10 bg-black justify-center align-center items-center text-white cursor-pointer 
                    rounded-xl font-bold hover:bg-white hover:text-black hover:scale-105 transition-all duration-050
                " 
            >Buscar</button>
        </section>
    );
}