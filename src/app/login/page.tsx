"use client";

import BasePage from "@/components/BasePage";
import Cores from "@/components/Cores";
import Navbar from "@/components/Navbar";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      remember: remember.toString(),
    });

    if (res?.error) {
      setError("Email ou senha incorretos.");
    } else {
      router.push("/chat");
    }
  };

  return (
    <BasePage>
      <div className="min-h-screen flex flex-1 items-center justify-center px-2 sm:px-4">
        <div className="w-full max-w-md shadow-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl animate-fade-in z-10 rounded-2xl">
          <form
            onSubmit={handleLogin}
            className="card-body space-y-4 p-4 sm:p-8 md:p-10"
          >
            <div className="flex flex-col items-center mb-2">
              <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-black dark:text-white tracking-tight drop-shadow-lg">
                Bem-vindo de volta!
              </h2>
              <p className="text-center text-sm sm:text-base text-black/70 dark:text-white/70 mt-1">
                Faça login para acessar o painel
              </p>
            </div>

            {error && (
              <div className="alert alert-error p-2 text-sm mt-2 justify-center animate-shake bg-red-500/10 border border-red-500/40 text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2 text-black dark:text-white">
                  <svg
                    className="w-5 h-5 "
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
                className="input input-bordered border-black/20 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400/60 transition bg-black/5 dark:bg-white/10 text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40"
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
                    className="w-5 h-5 "
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
                className="input input-bordered border-black/20 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400/60 transition bg-black/5 dark:bg-white/10 text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <div className="flex items-center justify-between mt-2">
              <label className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-orange-400"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span className="label-text text-black dark:text-white">
                  Lembrar de mim
                </span>
              </label>
              <a
                href="/register"
                className="text-xs  hover:underline transition"
              >
                Crie uma conta!
              </a>
            </div>

            <div className="form-control mt-4">
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-lg shadow-lg hover:bg-black/90 dark:hover:bg-white/90 transition tracking-wide border border-black/10 dark:border-white/10"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
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
    </BasePage>
  );
}
