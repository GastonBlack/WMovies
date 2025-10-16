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
        <section className="flex w-5/10 min-h-12 bg-transparent text-black justify-center items-center gap-4 rounded-xl">
            <input
                className="
                    flex w-8/10 h-full bg-black justify-center items-center text-white px-4 rounded-xl outline-none
                    focus:scale-101 transition-all duration-100 focus:shadow-xl
                "
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Buscar pelicula..."
                onKeyDown={(e) => {
                    if (e.key === "Enter") onSearch(); // Para que pueda buscar al presionar enter.
                }}
            />
            <button
                onClick={onSearch}
                className="
                    flex h-full w-2/10 bg-black justify-center align-center items-center text-white cursor-pointer 
                    rounded-xl font-bold hover:bg-white hover:text-black hover:scale-105 transition-all duration-050 gap-2
                    border-1 border-red-400
                "
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-full text-inherit">
                    <path d="m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z" fill="currentColor"></path>
                </svg><p>Buscar</p></button>
        </section>
    );
}