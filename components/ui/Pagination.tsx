import React, { useEffect, useState } from "react";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const [visiblePages, setVisiblePages] = useState<number[]>([]);

    useEffect(() => {
        const visibleCount = 9; // Numero total de botones (4 izq + actual + 4 der)
        let start = currentPage - 4;
        let end = currentPage + 4;

        // Si hay menos de 9 paginas, se muestran todas.
        if (totalPages <= visibleCount) {
            start = 1;
            end = totalPages;
        } else {
            // Si estamos cerca del principio
            if (currentPage <= 5) {
                start = 1;
                end = visibleCount;
            }
            // Si estamos cerca del final
            else if (currentPage + 4 >= totalPages) {
                end = totalPages;
                start = totalPages - visibleCount + 1;
            }
        }

        // Se forma el array de paginas
        const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
        setVisiblePages(pages);
    }, [currentPage, totalPages]);

    const goTo = (page: number) => {
        if (page < 1 || page > totalPages) return;
        onPageChange(page);
    };

    return (
        <div className="flex w-full justify-center items-center gap-2 mt-6 bg-transparent">

            {/* Boton anterior */}
            <button
                disabled={currentPage === 1}
                onClick={() => goTo(currentPage - 1)}
                className="flex justify-center items-center w-6 h-6 bg-transparent cursor-pointer p-1 text-white disabled:text-gray-600"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-full h-full text-inherit">
                    <path fill="currentColor" d="M10.634.292a1.063 1.063 0 0 0-1.464 0L.607 8.556a1.95 1.95 0 0 0 0 2.827l8.625 8.325c.4.385 1.048.39 1.454.01a.975.975 0 0 0 .01-1.425l-7.893-7.617a.975.975 0 0 1 0-1.414l7.83-7.557a.974.974 0 0 0 0-1.413" />
                </svg>
            </button>

            {/* Mostrar la primera pagina si esta no esta visible. */}
            {visiblePages[0] > 1 && (
                <>
                    <button
                        onClick={() => goTo(1)}
                        className={`flex justify-center items-center px-2 py-1 rounded-md text-sm font-medium transition-all cursor-pointer hover:scale-105
            ${currentPage === 1
                                ? "bg-white text-black"
                                : "bg-black text-white hover:bg-gray-200 hover:text-black"
                            }`}
                    >
                        1
                    </button>
                    <span className="text-white select-none">…</span>
                </>
            )}

            {/* Botones del centro. */}
            {visiblePages.map((page) => (
                <button
                    key={page}
                    onClick={() => goTo(page)}
                    className={`flex justify-center items-center px-2 py-1 rounded-md text-sm font-medium transition-all cursor-pointer hover:scale-105
          ${page === currentPage
                            ? "bg-white text-black"
                            : "bg-black text-white hover:bg-gray-200 hover:text-black"
                        }`}
                >
                    {page}
                </button>
            ))}

            {/* Mostrar la ultima pagina si esta no esta visible. */}
            {visiblePages[visiblePages.length - 1] < totalPages && (
                <>
                    <span className="text-white select-none">…</span>
                    <button
                        onClick={() => goTo(totalPages)}
                        className={`flex justify-center items-center px-2 py-1 rounded-md text-sm font-medium transition-all cursor-pointer hover:scale-105
            ${currentPage === totalPages
                                ? "bg-white text-black"
                                : "bg-black text-white hover:bg-gray-200 hover:text-black"
                            }`}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            {/* Boton siguiente */}
            <button
                disabled={currentPage === totalPages}
                onClick={() => goTo(currentPage + 1)}
                className="flex justify-center items-center w-6 h-6 bg-transparent cursor-pointer p-1 text-white disabled:text-gray-600"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-full h-full text-inherit">
                    <path fill="currentColor" d="M.366 19.708c.405.39 1.06.39 1.464 0l8.563-8.264a1.95 1.95 0 0 0 0-2.827L1.768.292A1.063 1.063 0 0 0 .314.282a.976.976 0 0 0-.011 1.425l7.894 7.617a.975.975 0 0 1 0 1.414L.366 18.295a.974.974 0 0 0 0 1.413" />
                </svg>
            </button>

        </div>
    );

}
