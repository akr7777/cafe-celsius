import type { ReactNode } from "react";

/**
 * Stage-1 stand-in for a page's content. Every route in the sitemap needs to
 * resolve to something real so navigation and prerendering can be verified
 * end-to-end; the actual content per §6 of the spec is built in stage 2, at
 * which point each page using this gets its own +Page.tsx body.
 */
export function PagePlaceholder({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-heading text-3xl font-bold sm:text-4xl">{title}</h1>
      {children && <div className="text-muted-foreground mt-4">{children}</div>}
    </section>
  );
}
