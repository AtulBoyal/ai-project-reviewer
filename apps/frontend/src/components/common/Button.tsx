import type { ButtonHTMLAttributes } from "react";

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function Button({
  loading = false,
  children,
  className = "",
  ...props
}: Props) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}