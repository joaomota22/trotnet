"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";
import Navbar from "@/components/Navbar";
import Cores from "@/components/Cores";
import BasePage from "@/components/BasePage";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Erro ao registrar");
      setSuccess("");
    } else {
      setSuccess("Cadastro realizado com sucesso! Redirecionando...");
      setError("");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  return (
    <BasePage>
      <div className="min-h-screen flex flex-1 items-center justify-center px-2 sm:px-4">
        <div className="w-full max-w-md shadow-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl animate-fade-in z-10 rounded-2xl">
          <form
            onSubmit={handleSubmit}
            className="card-body space-y-4 p-4 sm:p-8 md:p-10"
          >
            <div className="flex flex-col items-center mb-2">
              <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-black dark:text-white tracking-tight drop-shadow-lg">
                Crie sua conta
              </h2>
              <p className="text-center text-sm sm:text-base text-black/70 dark:text-white/70 mt-1">
                Preencha os campos para se registar
              </p>
            </div>

            {error && (
              <div className="alert alert-error p-2 text-sm mt-2 justify-center animate-shake bg-red-500/10 border border-red-500/40 text-red-600 dark:text-red-400">
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success p-2 text-sm mt-2 justify-center animate-fade-in bg-green-500/10 border border-green-500/40 text-green-700 dark:text-green-400">
                {success}
              </div>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2 text-black dark:text-white">
                  <svg
                    className="w-5 h-5 text-black dark:text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.121 17.804A9 9 0 1112 21a8.963 8.963 0 01-6.879-3.196z"
                    />
                  </svg>
                  Nome
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered border-black/20 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-black/60 dark:focus:ring-white/60 transition bg-black/5 dark:bg-white/10 text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Seu nome"
                autoComplete="name"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2 text-black dark:text-white">
                  <svg
                    className="w-5 h-5 text-black dark:text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 12a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0V8a4 4 0 00-8 0v4m8 0v4a4 4 0 01-8 0v-4"
                    />
                  </svg>
                  Email
                </span>
              </label>
              <input
                type="email"
                className="input input-bordered border-black/20 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-black/60 dark:focus:ring-white/60 transition bg-black/5 dark:bg-white/10 text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                autoComplete="email"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2 text-black dark:text-white">
                  <svg
                    className="w-5 h-5 text-black dark:text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m0 0a2 2 0 01-2-2v-2a2 2 0 012-2 2 2 0 012 2v2a2 2 0 01-2 2zm0 0v2m6-6V7a2 2 0 00-2-2H8a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2z"
                    />
                  </svg>
                  Senha
                </span>
              </label>
              <input
                type="password"
                className="input input-bordered border-black/20 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-black/60 dark:focus:ring-white/60 transition bg-black/5 dark:bg-white/10 text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>

            <div className="form-control mt-4">
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-lg shadow-lg hover:bg-black/90 dark:hover:bg-white/90 transition tracking-wide border border-black/10 dark:border-white/10"
              >
                Criar
              </button>
            </div>

            <a
              href="/login"
              className="text-sm text-center mt-2 text-black dark:text-white hover:underline transition block"
            >
              Já tem conta? Fazer login
            </a>
          </form>
        </div>
        <style>{`
      .animate-fade-in {
        animation: fadeIn 0.8s cubic-bezier(.4,0,.2,1);
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(30px);}
        to { opacity: 1; transform: translateY(0);}
      }
      .animate-shake {
        animation: shake 0.3s;
      }
      @keyframes shake {
        10%, 90% { transform: translateX(-2px);}
        20%, 80% { transform: translateX(4px);}
        30%, 50%, 70% { transform: translateX(-8px);}
        40%, 60% { transform: translateX(8px);}
      }
    `}</style>
      </div>
    </BasePage>
  );
}
