"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex justify-center pt-8">
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-30 flex items-center justify-between w-[95vw] max-w-3xl rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-xl border border-black/10 dark:border-white/10 px-4 md:px-8 py-2 transition-colors animate-navbar-fade-in">
        <Link href="/" className="flex items-center gap-2 group transition">
          <span className="text-xl font-extrabold tracking-tight text-black dark:text-white transition-colors group-hover:text-orange-500 duration-200 animate-navbar-logo-pop drop-shadow">
            Trotnet
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/faq"
            className="text-black/80 dark:text-white/80 font-medium px-3 py-1 rounded-full transition duration-200 hover:bg-black/10 dark:hover:bg-white/10 hover:scale-105 hover:shadow-md animate-navbar-link"
          >
            Perguntas frequentes
          </Link>
          <Link
            href="/about"
            className="text-black/80 dark:text-white/80 font-medium px-3 py-1 rounded-full transition duration-200 hover:bg-black/10 dark:hover:bg-white/10 hover:scale-105 hover:shadow-md animate-navbar-link"
          >
            Sobre
          </Link>
          {session ? (
            <Link href="/chat">
              <button className="ml-2 px-5 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold shadow hover:shadow-xl transition focus:outline-none border border-black/10 dark:border-white/10 hover:scale-105 active:scale-95 duration-150 animate-navbar-btn">
                Chat
              </button>
            </Link>
          ) : (
            <Link href="/login">
              <button className="ml-2 px-5 py-2 rounded-full bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/30 text-black dark:text-white font-semibold shadow hover:bg-black/20 dark:hover:bg-white/20 hover:scale-105 hover:shadow-md transition focus:outline-none active:scale-95 duration-150 animate-navbar-btn">
                Inicie Sessão
              </button>
            </Link>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button
            className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menu"
          >
            <svg
              className={`w-7 h-7 text-black dark:text-white transition-transform duration-200 ${
                open ? "rotate-90 scale-110" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={open ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"}
              />
            </svg>
          </button>
          {open && (
            <div className="absolute top-14 right-4 w-56 bg-white/95 dark:bg-black/95 rounded-2xl shadow-xl border border-black/10 dark:border-white/10 flex flex-col items-stretch animate-navbar-dropdown z-40">
              <Link
                href="/faq"
                className="px-6 py-3 font-medium text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition hover:bg-black/10 dark:hover:bg-white/10 hover:scale-105 hover:shadow-md rounded-full m-2"
                onClick={() => setOpen(false)}
              >
                Perguntas frequentes
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 font-medium text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition hover:bg-black/10 dark:hover:bg-white/10 hover:scale-105 hover:shadow-md rounded-full m-2"
                onClick={() => setOpen(false)}
              >
                Sobre
              </Link>
              {session ? (
                <Link
                  href="/chat"
                  className="px-6 py-3"
                  onClick={() => setOpen(false)}
                >
                  <button className="w-full px-5 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold shadow hover:shadow-xl transition border border-black/10 dark:border-white/10 hover:scale-105 active:scale-95 duration-150">
                    Chat
                  </button>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="px-6 py-3"
                  onClick={() => setOpen(false)}
                >
                  <button className="w-full px-5 py-2 rounded-full bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/30 text-black dark:text-white font-semibold shadow hover:bg-black/20 dark:hover:bg-white/20 hover:scale-105 hover:shadow-md transition active:scale-95 duration-150">
                    Inicie Sessão
                  </button>
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>
      <style>{`
        .animate-navbar-fade-in {
          animation: fadeInNavbar 0.7s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadeInNavbar {
          from { opacity: 0; transform: translateY(-30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-navbar-dropdown {
          animation: dropdownIn 0.25s cubic-bezier(.4,0,.2,1);
        }
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-10px) scale(0.98);}
          to { opacity: 1; transform: translateY(0) scale(1);}
        }
        .animate-navbar-link {
          transition: color 0.2s, background 0.2s, transform 0.15s;
        }
        .animate-navbar-btn {
          transition: background 0.2s, color 0.2s, transform 0.15s;
        }
        .animate-navbar-logo-pop {
          animation: logoPop 0.7s cubic-bezier(.4,0,.2,1);
        }
        @keyframes logoPop {
          0% { transform: scale(0.8); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
