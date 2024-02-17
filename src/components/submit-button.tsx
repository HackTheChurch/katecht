"use client";

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, className }: { children: ReactNode; className?: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`rounded bg-zinc-900 px-4 py-2 font-bold text-white disabled:bg-zinc-500 ${className}`}
      disabled={pending}
    >
      {children}
    </button>
  );
}
