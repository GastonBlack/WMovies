"use client";

import React from "react";
import { GenericButton } from "./ui/GenericButton";
import { useRouter } from "next/navigation";
import { fetchGenres } from "@/services/movieService";
import { useEffect, useState } from "react";

type SidebarProps = {
    onSelectGenre: (id: number | null) => void;
}

export function Sidebar({ onSelectGenre }: SidebarProps) {

    const router = useRouter();
    const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
        if (genres.length === 0) {
            fetchGenres("movie")
                .then(setGenres)
                .catch(console.error);
        }
    }, []);

    return (
        <section className="flex flex-row justify-center items-center w-screen bg-[var(--foreground)] p-4 gap-12">

            <GenericButton
                title="Inicio"
                onClick={() => {
                    if (window.location.pathname === "/") {
                        window.location.reload();
                    } else {
                        router.push("/")
                    }
                }}
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                        <path fill="currentColor" d="M218.76367,103.7002,138.75684,30.96436a15.93657,15.93657,0,0,0-21.52637.00146L37.2373,103.69971A16.03108,16.03108,0,0,0,32,115.53857l0,92.09522a16.47275,16.47275,0,0,0,4.01066,10.96174A15.91729,15.91729,0,0,0,48.002,223.999H95.96484a8,8,0,0,0,8-8V167.9917a8,8,0,0,1,8-8h32a8,8,0,0,1,8,8V215.999a8,8,0,0,0,8,8h48.05731a15.40625,15.40625,0,0,0,7.53406-1.85584A16.08415,16.08415,0,0,0,224,207.999v-92.46A16.03567,16.03567,0,0,0,218.76367,103.7002Z"></path>
                    </svg>
                }
            />

            <GenericButton
                title="Películas"
                onClick={() => router.push("/movies")}
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                        <path fill="currentColor" d="m 161,104 c -1.64501,0 -3,1.35499 -3,3 v 3 15 c 0,1.64501 1.35499,3 3,3 h 19 3 c 1.33657,0 2.48085,-0.89354 2.86328,-2.11133 C 185.95153,125.60764 186,125.30844 186,125 v -3 -12 -3 c 0,-1.64501 -1.35499,-3 -3,-3 z m 0,2 h 2 v 3 h -3 v -2 c 0,-0.0705 0.007,-0.13917 0.0195,-0.20508 C 160.1107,106.33357 160.50639,106 161,106 Z m 4,0 h 3 v 3 h -3 z m 5,0 h 4 v 3 h -4 z m 6,0 h 3 v 3 h -3 z m 5,0 h 2 c 0.56413,0 1,0.43587 1,1 v 2 h -3 z m -10.98828,6.00195 a 1.0001,1.0001 0 0 1 0.50195,0.14063 l 5,3 a 1.0001,1.0001 0 0 1 0,1.71484 l -5,3 A 1.0001,1.0001 0 0 1 169,119 v -6 a 1.0001,1.0001 0 0 1 0.50781,-0.86914 1.0001,1.0001 0 0 1 0.50391,-0.12891 z M 160,123 h 3 v 3 h -2 c -0.56413,0 -1,-0.43587 -1,-1 z m 5,0 h 3 v 3 h -3 z m 5,0 h 4 v 3 h -4 z m 6,0 h 3 v 3 h -3 z m 5,0 h 3 v 2 c 0,0.56413 -0.43587,1 -1,1 h -2 z" transform="translate(-156 -100)"></path>
                    </svg>
                }
            />

            <GenericButton
                title="Series"
                onClick={() => router.push("/series")}
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M18,6H14.41l2.3-2.29a1,1,0,1,0-1.42-1.42L12,5.54l-1.17-2a1,1,0,1,0-1.74,1L10,6H6A3,3,0,0,0,3,9v8a3,3,0,0,0,3,3v1a1,1,0,0,0,2,0V20h8v1a1,1,0,0,0,2,0V20a3,3,0,0,0,3-3V9A3,3,0,0,0,18,6Zm1,11a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V9A1,1,0,0,1,6,8H18a1,1,0,0,1,1,1Z"></path>
                    </svg>
                }
            />

            <div className="relative group">
                <div>
                    <GenericButton
                        title="Géneros"
                        onClick={() => { }}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                <path fill="currentColor" d="M2 7h.142a3.981 3.981 0 0 0 7.716 0H30a1 1 0 0 0 0-2H9.858a3.981 3.981 0 0 0-7.716 0H2a1 1 0 0 0 0 2zm4-3a2 2 0 1 1-2 2 2 2 0 0 1 2-2zm24 11h-.142a3.981 3.981 0 0 0-7.716 0H2a1 1 0 0 0 0 2h20.142a3.981 3.981 0 0 0 7.716 0H30a1 1 0 0 0 0-2zm-4 3a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm4 7H19.858a3.981 3.981 0 0 0-7.716 0H2a1 1 0 0 0 0 2h10.142a3.981 3.981 0 0 0 7.716 0H30a1 1 0 0 0 0-2zm-14 3a2 2 0 1 1 2-2 2 2 0 0 1-2 2z" />
                            </svg>
                        }
                    />
                </div>
                <div
                    className="
                        absolute top-full left-0 z-50 bg-black text-white rounded-lg p-6
                        w-[24rem] grid grid-cols-3 gap-x-10 gap-y-4 opacity-0 scale-95 
                        pointer-events-none 
                        group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
                        transition-all duration-200 ease-out
                    "
                >
                    {genres.map((genre) => (
                        <button
                            key={genre.id}
                            onClick={() => onSelectGenre?.(genre.id)}
                            className="text-sm text-left hover:text-red-500 transition-colors cursor-pointer"
                        >
                            {genre.name}
                        </button>
                    ))}
                </div>
            </div>


        </section>
    )
}