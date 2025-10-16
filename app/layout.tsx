import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WMovies",
  description: "App para buscar peliculas. Hecha con React, Typescript y Tailwind.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
