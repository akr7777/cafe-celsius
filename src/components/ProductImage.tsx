import {
  Coffee,
  CupSoda,
  Croissant,
  Sandwich,
  GraduationCap,
  ShoppingBag,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { menu as existingMenuImages, pages as existingPageImages } from "virtual:public-images";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { MenuCategoryId } from "@/content/types";
import { cn } from "@/lib/utils";

export type ImageSlot = MenuCategoryId | "academie" | "boutique" | "origin";

const slotIcon: Record<ImageSlot, LucideIcon> = {
  espresso: Coffee,
  degustation: Coffee,
  signatures: Coffee,
  "sans-cafe": Coffee,
  froid: CupSoda,
  fraicheur: CupSoda,
  douceurs: Croissant,
  formules: Croissant,
  sale: Sandwich,
  academie: GraduationCap,
  boutique: ShoppingBag,
  origin: Globe,
};

/**
 * Renders a menu/academie/boutique item's photo, or — since none have been
 * generated yet (§8 of the spec) — a branded placeholder: no image request
 * is ever issued for an id that doesn't have a file in public/images/.
 * `bucket` picks the folder (public/images/menu vs public/images/pages);
 * pass it explicitly for a page hero/section image, it defaults to "menu".
 */
export function ProductImage({
  id,
  alt,
  slot,
  bucket = "menu",
  label,
  className,
}: {
  id: string;
  alt: string;
  slot: ImageSlot;
  bucket?: "menu" | "pages";
  /** Short caption shown under the icon on a placeholder (e.g. the item's name). */
  label?: string;
  className?: string;
}) {
  const exists = bucket === "menu" ? existingMenuImages.has(id) : existingPageImages.has(id);
  const Icon = slotIcon[slot];

  return (
    <AspectRatio ratio={4 / 3} className={cn("bg-muted overflow-hidden rounded-lg", className)}>
      {exists ? (
        <img
          src={`/images/${bucket}/${id}.webp`}
          alt={alt}
          width={800}
          height={600}
          loading="lazy"
          className="size-full object-cover"
        />
      ) : (
        <div className="text-muted-foreground flex size-full flex-col items-center justify-center gap-2 p-4 text-center">
          <Icon className="size-8" aria-hidden="true" />
          {label && <span className="text-xs font-medium">{label}</span>}
        </div>
      )}
    </AspectRatio>
  );
}
