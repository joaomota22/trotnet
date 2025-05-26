"use client";

export default function Cores() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute left-1/4 top-10 w-24 h-24 sm:w-32 sm:h-32 rounded-lg blur-2xl rotate-12 bg-neutral-300/60 dark:bg-white/10" />
      <div className="absolute right-1/4 top-24 w-20 h-20 sm:w-28 sm:h-28 rounded-lg blur-2xl -rotate-12 bg-orange-200/60 dark:bg-orange-400/10" />
      <div className="absolute left-4 bottom-24 w-16 h-16 sm:left-10 sm:w-24 sm:h-24 rounded-lg blur-2xl rotate-6 bg-blue-200/60 dark:bg-blue-400/10" />
      <div className="absolute right-4 bottom-4 w-24 h-24 sm:right-10 sm:bottom-10 sm:w-36 sm:h-36 rounded-lg blur-2xl -rotate-6 bg-neutral-300/60 dark:bg-white/10" />
    </div>
  );
}
