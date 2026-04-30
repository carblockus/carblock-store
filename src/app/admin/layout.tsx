import Link from "next/link";
import { LayoutDashboard, Package, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Admin — CarBlock",
  robots: { index: false, follow: false },
};

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: Package },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-7rem)] bg-background">
      <div className="container-x py-6 grid md:grid-cols-[220px_1fr] gap-8">
        <aside className="md:sticky md:top-32 self-start space-y-2">
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)] mb-3">
              Admin
            </p>
            <ul className="space-y-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white/80 hover:text-white hover:bg-[var(--surface-2)] transition-colors"
                  >
                    <n.icon className="h-4 w-4 text-[var(--gold)]" />
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-[var(--muted)] hover:text-[var(--gold)] px-4 py-2"
          >
            <ExternalLink className="h-3 w-3" />
            View store
          </Link>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
}
