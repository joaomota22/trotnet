"use client";

import Cores from "./Cores";
import Navbar from "./Navbar";
import { ReactNode } from "react";

interface BasePageProps {
  children: ReactNode | ReactNode[];
}

export default function BasePage({ children }: BasePageProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col relative overflow-hidden transition-colors">
      <Cores />
      <Navbar />
      <div>{children}</div>
    </div>
  );
}
