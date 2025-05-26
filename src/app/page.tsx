"use client";

import Cores from "@/components/Cores";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col relative overflow-hidden transition-colors">
      <Cores />
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center px-2 sm:px-4 pt-16 sm:pt-24 z-10 w-full">
        <section className="w-full max-w-lg sm:max-w-3xl flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-black dark:text-white text-center mb-4 sm:mb-6 tracking-tight drop-shadow-lg">
            Trotnet
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-black/80 dark:text-white/80 text-center mb-6 sm:mb-8 font-light">
            Transforme imagens em código
            <span className="inline-block align-middle bg-black/10 dark:bg-white/10 text-black dark:text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-sm sm:text-base md:text-lg font-semibold ml-1 sm:ml-2">
              com internet
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-16 w-full justify-center items-center">
            <a
              href={session ? "/chat" : "/login"}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-base sm:text-lg shadow-lg hover:bg-black/90 dark:hover:bg-white/90 transition text-center border border-black/10 dark:border-white/10"
            >
              {session ? "Ir para o Chat" : "Comece agora"}
            </a>
            <a
              href="/faq"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20 text-black dark:text-white font-semibold text-base sm:text-lg shadow hover:bg-black/20 dark:hover:bg-white/20 transition text-center"
            >
              Saiba mais
            </a>
          </div>
        </section>
      </main>
      <footer className="w-full flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-4 bg-black/10 dark:bg-black/80 border-t border-black/10 dark:border-white/10 z-20 text-xs sm:text-base text-black dark:text-white transition-colors"></footer>
    </div>
  );
}
