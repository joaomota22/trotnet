"use client";

import { useState } from "react";

interface FAQuestionProps {
  title: string;
  answer: string;
}

export default function FAQuestion(props: FAQuestionProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`transition-all duration-300 cursor-pointer select-none w-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 rounded-2xl shadow-lg px-4 sm:px-6 py-3 sm:py-4 flex flex-col hover:shadow-xl ${
        hovered ? "ring-2 ring-black/30 dark:ring-white/40" : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
      aria-expanded={hovered}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="text-base sm:text-lg md:text-xl font-bold text-black dark:text-white flex items-center gap-2">
          {props.title}
        </div>
        <div
          className={`transition-transform duration-300 ${
            hovered ? "rotate-180" : ""
          }`}
        >
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 text-black dark:text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      <div
        className={`text-sm sm:text-base font-light text-black/80 dark:text-white/80 mt-2 transition-all duration-300 overflow-hidden ${
          hovered ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ willChange: "max-height, opacity" }}
      >
        {props.answer}
      </div>
    </div>
  );
}
