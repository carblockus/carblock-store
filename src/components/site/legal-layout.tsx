import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Props = {
  eyebrow: string;
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
};

export function LegalLayout({ eyebrow, title, effectiveDate, children }: Props) {
  return (
    <div className="bg-background">
      <div className="border-b border-[var(--border)]">
        <div className="container-x py-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--gold)] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white">{title}</span>
        </div>
      </div>

      <article className="container-x py-12 md:py-20 max-w-3xl">
        <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
          {eyebrow}
        </span>
        <h1 className="font-display text-4xl md:text-5xl uppercase font-bold mt-3 text-white leading-tight">
          {title}
        </h1>
        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[var(--muted-2)]">
          Effective {effectiveDate}
        </p>

        <div className="mt-10 prose-legal">{children}</div>
      </article>
    </div>
  );
}
