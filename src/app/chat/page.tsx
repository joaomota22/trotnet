"use client";

import React, { useState, useRef, useEffect } from "react";
import BasePage from "@/components/BasePage";

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

type Message =
  | { type: "image"; content: string }
  | { type: "code"; content: string }
  | { type: "loading"; content: string }
  | { type: "error"; content: string };

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setError(null);
    const file = event.target.files?.[0];
    if (!file) return;

    const base64 = await toBase64(file);
    setMessages((prev) => [
      ...prev,
      { type: "image", content: base64 },
      { type: "loading", content: "Gerando código..." },
    ]);
    setLoading(true);

    try {
      const res = await fetch("/api/generateCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ img: base64 }),
      });
      const data = await res.json();

      setMessages((prev) => {
        const filtered = prev.filter((msg) => msg.type !== "loading");
        if (res.ok && data.result) {
          return [...filtered, { type: "code", content: data.result }];
        } else {
          return [
            ...filtered,
            { type: "error", content: data.error || "Erro ao gerar código." },
          ];
        }
      });
    } catch (err) {
      setMessages((prev) => {
        const filtered = prev.filter((msg) => msg.type !== "loading");
        return [
          ...filtered,
          { type: "error", content: "Erro de conexão com o servidor." },
        ];
      });
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <BasePage>
      <div className="flex flex-1 items-center justify-center py-8 px-2 sm:px-4">
        <div className="w-full max-w-lg sm:max-w-3xl flex flex-col h-[80vh] bg-white/90 dark:bg-black/80 border border-black/10 dark:border-white/10 shadow-lg rounded-3xl backdrop-blur-xl animate-fade-in">
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-4 custom-scrollbar">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-base-content/60 select-none">
                <span className="text-3xl mb-2">🖼️</span>
                <span className="text-base md:text-lg">
                  Envie uma imagem para começar!
                </span>
              </div>
            )}
            {messages.map((message, index) => {
              if (message.type === "image") {
                return (
                  <div
                    key={index}
                    className="max-w-[85vw] sm:max-w-[70%] px-4 py-3 sm:px-6 sm:py-4 rounded-2xl shadow flex flex-col text-base md:text-lg font-normal transition-colors duration-200 border bg-black/10 dark:bg-white/10 text-black dark:text-white self-start rounded-bl-3xl border-black/20 dark:border-white/20"
                  >
                    <img
                      src={message.content}
                      alt="uploaded"
                      className="max-w-[60vw] sm:max-w-xs h-auto rounded-xl border border-black/10 dark:border-white/20"
                    />
                  </div>
                );
              }
              if (message.type === "loading") {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 self-end text-black dark:text-white opacity-70 text-sm"
                  >
                    <svg
                      className="animate-spin w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                    {message.content}
                  </div>
                );
              }
              if (message.type === "error") {
                return (
                  <div
                    key={index}
                    className="max-w-[85vw] sm:max-w-[70%] px-4 py-3 sm:px-6 sm:py-4 rounded-2xl shadow flex flex-col text-base md:text-lg font-normal border border-red-400 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 self-end"
                  >
                    {message.content}
                  </div>
                );
              }
              return (
                <div
                  key={index}
                  className="max-w-[85vw] sm:max-w-[70%] px-4 py-3 sm:px-6 sm:py-4 rounded-2xl shadow flex flex-col text-xs sm:text-sm font-mono transition-colors duration-200 border bg-black dark:bg-white text-white dark:text-black self-end rounded-br-3xl border-black/10 dark:border-white/10"
                >
                  <pre className="whitespace-pre-wrap break-words">
                    {message.content}
                  </pre>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex gap-2 p-3 sm:p-4 border-t border-black/10 dark:border-white/10 rounded-b-3xl bg-white/90 dark:bg-black/80 justify-center">
            <label className="flex items-center justify-center w-full max-w-xs px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-base sm:text-lg shadow-lg hover:bg-black/90 dark:hover:bg-white/90 transition border border-black/10 dark:border-white/10 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828L18 9.828M7 7h.01M21 21H3V3h18v18z"
                />
              </svg>
              {loading ? "Aguarde..." : "Enviar imagem"}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={loading}
              />
            </label>
          </div>
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
      .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: var(--tw-prose-invert) !important;
        border-radius: 8px;
      }
      @media (max-width: 640px) {
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
      }
    `}</style>
    </BasePage>
  );
}
