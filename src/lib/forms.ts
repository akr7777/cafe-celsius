/**
 * Single entry point every form on the site goes through (§9 of the spec).
 * For now this is a pure stand-in: it sends nothing anywhere, stores
 * nothing, and always succeeds after a short delay so the loading state on
 * a submit button is visible.
 */
export type FormKind = "newsletter" | "academie" | "contact" | "clickAndCollect";

export async function submitForm(_kind: FormKind, _data: Record<string, string>): Promise<{ ok: boolean }> {
  // TODO(backend): remplacer par un POST /api/forms/:kind
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { ok: true };
}
