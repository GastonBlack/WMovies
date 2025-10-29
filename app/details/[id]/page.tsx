"use client";

import { useEffect, useState } from "react";
import { Movie } from "@/components/Types/Movie";
import { getImageUrl } from "@/services/movieService";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { fetchMediaDetails } from "@/services/movieService";
import { ArrowLeft, Star } from "lucide-react";
import "../../globals.css";

export default function MediaDetails() {
  const [media, setMedia] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") as "movie" | "series";

  useEffect(() => {
    if (!type) {
      console.error("Falta el parametro 'type' en la URL");
      return;
    }

    const loadMedia = async () => {
      try {
        const data = await fetchMediaDetails(params.id as string, type);
        setMedia(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadMedia();
  }, [params?.id]);

  if (loading) return <p className="flex justify-center items-center h-16 text-white mt-10">Cargando información.</p>
  if (!media) return <p className="flex justify-center items-center h-16 text-white mt-10">No se encontró información.</p>;

  return (
    <main className="flex flex-col items-start h-screen bg-[var(--background)] text-white p-8 px-16 gap-16 custom-scrollbar overflow-y-auto custom-scrollbar">

      <section className="flex justify-center items-center text-inherit cursor-pointer hover:scale-105 " onClick={() => router.back()}>
        <ArrowLeft className="w-8 h-8 text-inherit" />
        <p className="font-bold">Volver</p>
      </section>

      {/* Fondo */}
      {media.backdrop_path && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 blur-md pointer-events-none"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${media.backdrop_path})`,
          }}
        />
      )}

      <section className="flex items-center gap-12 px-32 ">
        <img
          src={getImageUrl(media.poster_path)}
          alt={media.title || media.name}
          className="rounded-xl shadow-lg w-[18rem]"
        />
        <section className="flex flex-col justify-start items-start">
          <h1 className="flex flex-col text-4xl font-bold mb-8">{media.title || media.name}
            <p className="flex flex-row justify-start items-center text-base font-medium mt-2">{(media.vote_average ? media.vote_average.toFixed(1) : "?")}/10
              <Star className="ml-1 fill-[#ff9900ff] text-[#ff9900ff]" />
            </p>
          </h1>
          <p className="text-inherit mb-4">{media.overview}</p>

          <p className="flex flex-row">
            Géneros:&nbsp; {/* &nbsp; es un espacio en blanco. */}
            <span className="font-semibold">
              {media.genres?.map((g) => g.name).join(", ") || "Sin géneros."}
            </span>
          </p>
        </section>
      </section>

      <section className="flex flex-wrap justify-start items-start p-2 px-24 gap-8">
        {media.cast?.map((actor) => (
          <div key={actor.name} className="flex flex-col items-start w-[8rem] ">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : "/placeholder.png"
              }
              alt={actor.name}
              className="rounded-md w-full h-[12rem] object-cover "
            />
            <p className="text-sm font-bold mt-2">{actor.name}</p>
            <p className="text-gray-400 my-1">Interpreta a: </p>
            <p className="text-sm font-bold">{actor.character}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
