"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const SquareImageUpload = dynamic(() => import("@/components/admin/SquareImageUpload"), {
  ssr: false,
  loading: () => <div className="h-32 animate-pulse rounded-xl bg-brand-lavender/20" />,
});

const ContentFileUpload = dynamic(() => import("@/components/admin/ContentFileUpload"), {
  ssr: false,
  loading: () => <div className="h-32 animate-pulse rounded-xl bg-brand-lavender/20" />,
});

type Guide = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  card_image_url: string;
  card_image_storage_path: string;
  file_url: string;
  file_type: "pdf" | "html" | "";
  file_size_bytes: number | null;
  storage_path: string;
  hidden: boolean;
  created_at: string;
};

type Props = { initialGuides: Record<string, unknown>[] };

function emptyForm(): Omit<Guide, "id" | "slug" | "created_at" | "hidden"> {
  return {
    title: "",
    description: "",
    category: "",
    card_image_url: "",
    card_image_storage_path: "",
    file_url: "",
    file_type: "",
    file_size_bytes: null,
    storage_path: "",
  };
}

export function GuidesManager({ initialGuides }: Props) {
  const [guides, setGuides] = useState<Guide[]>(initialGuides as Guide[]);
  const [view, setView] = useState<"list" | "form">("list");
  const [editingGuide, setEditingGuide] = useState<Guide | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function openNew() {
    setEditingGuide(null);
    setForm(emptyForm());
    setError("");
    setView("form");
  }

  function openEdit(guide: Guide) {
    setEditingGuide(guide);
    setForm({
      title: guide.title,
      description: guide.description,
      category: guide.category,
      card_image_url: guide.card_image_url,
      card_image_storage_path: guide.card_image_storage_path,
      file_url: guide.file_url,
      file_type: guide.file_type,
      file_size_bytes: guide.file_size_bytes,
      storage_path: guide.storage_path,
    });
    setError("");
    setView("form");
  }

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;
    if (!form.title.trim()) { setError("Title is required."); return; }
    if (!form.description.trim()) { setError("Description is required."); return; }
    if (!form.card_image_url) { setError("Please upload a card image."); return; }
    if (!form.file_url || !form.file_type) { setError("Please upload a PDF or HTML file."); return; }

    setSaving(true);
    setError("");

    try {
      const url = editingGuide
        ? `/api/admin/guides/${editingGuide.id}`
        : "/api/admin/guides";
      const method = editingGuide ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Save failed.");
      }
      const data = await res.json();
      if (!data.success) throw new Error(data.error ?? "Save failed.");

      if (editingGuide) {
        setGuides((prev) => prev.map((g) => (g.id === editingGuide.id ? data.guide : g)));
      } else {
        setGuides((prev) => [data.guide, ...prev]);
      }

      setView("list");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleHidden(id: string, currentlyHidden: boolean) {
    if (toggling) return;
    setToggling(true);
    try {
      const res = await fetch(`/api/admin/guides/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hidden: !currentlyHidden }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Failed to update visibility.");
      }
      const data = await res.json();
      if (!data.success) throw new Error(data.error ?? "Failed to update visibility.");
      setGuides((prev) =>
        prev.map((g) => (g.id === id ? { ...g, hidden: !currentlyHidden } : g)),
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update visibility.");
    } finally {
      setToggling(false);
    }
  }

  async function handleDelete(id: string) {
    if (deleting) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/guides/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Delete failed.");
      }
      const data = await res.json();
      if (!data.success) throw new Error(data.error ?? "Delete failed.");
      setGuides((prev) => prev.filter((g) => g.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed.");
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  }

  // ── LIST VIEW ──────────────────────────────────────────────────────────────
  if (view === "list") {
    return (
      <div className="min-h-full p-6 lg:p-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-brand-navy lg:text-3xl">Guides</h1>
            <p className="mt-1 text-sm text-brand-navy/55">
              {guides.length} guide{guides.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 rounded-full bg-brand-purple-bright px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-purple-deep"
          >
            <span className="text-lg leading-none">+</span> New Guide
          </button>
        </div>

        {guides.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-base text-brand-navy/50">No guides yet. Create your first one!</p>
            <button
              onClick={openNew}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-purple-bright px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-purple-deep"
            >
              + New Guide
            </button>
          </div>
        ) : (
          <div className="mt-6 grid gap-3">
            {guides.map((guide) => (
              <div
                key={guide.id}
                className={"overflow-hidden rounded-xl border border-brand-purple-deep/10 bg-white shadow-sm " + (guide.hidden ? "opacity-55" : "")}
              >
                <div className="flex items-start gap-4 px-5 py-4">
                  {/* Avatar / thumbnail */}
                  {guide.card_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={guide.card_image_url}
                      alt=""
                      className="h-11 w-11 shrink-0 rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-purple-deep/10 text-lg font-extrabold text-brand-purple-deep">
                      {guide.title.charAt(0).toUpperCase()}
                    </div>
                  )}

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-brand-navy/70">{guide.category || "Uncategorized"}</p>
                    <p className="truncate text-base font-extrabold leading-tight text-brand-navy">{guide.title}</p>
                    <p className="mt-0.5 truncate text-xs text-brand-navy/50">{guide.description}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <span className="inline-flex items-center rounded-full bg-brand-teal-light px-2 py-0.5 text-xs font-semibold text-brand-teal ring-1">
                        {guide.file_type === "pdf" ? "PDF" : guide.file_type === "html" ? "HTML" : "No file"}
                      </span>
                      {guide.hidden && (
                        <span className="rounded-full bg-brand-navy/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-navy/50">
                          Hidden
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-center">
                    <button
                      onClick={() => handleToggleHidden(guide.id, guide.hidden)}
                      disabled={toggling}
                      title={guide.hidden ? "Unhide guide" : "Hide guide"}
                      className="inline-flex items-center justify-center rounded-full border border-brand-purple-deep/20 p-1.5 text-brand-navy/50 transition hover:bg-brand-lavender hover:text-brand-navy disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {guide.hidden ? (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      ) : (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={() => openEdit(guide)}
                      className="rounded-lg bg-brand-purple-deep/5 px-3 py-1.5 text-xs font-semibold text-brand-purple-deep hover:bg-brand-purple-deep/10"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(guide.id)}
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete confirm modal */}
        {deleteId && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/40 p-4 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) setDeleteId(null); }}
          >
            <div className="w-full max-w-xs rounded-2xl bg-white p-5 shadow-2xl">
              <h2 className="text-base font-extrabold text-brand-navy">Delete guide?</h2>
              <p className="mt-1.5 text-sm text-brand-navy/55">This cannot be reversed.</p>
              <div className="mt-5 flex justify-end gap-2">
                <button onClick={() => setDeleteId(null)} className="rounded-xl px-4 py-2 text-sm font-semibold text-brand-navy/60 hover:text-brand-navy">Cancel</button>
                <button onClick={() => handleDelete(deleteId)} disabled={deleting} className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60">{deleting ? "Deleting…" : "Delete"}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── FORM VIEW ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-full p-6 lg:p-10">
      <div className="mb-6 flex items-center gap-4">
        <button
          type="button"
          onClick={() => setView("list")}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy/55 transition hover:text-brand-purple-bright"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M12.5 15L7.5 10l5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to guides
        </button>
        <h1 className="text-2xl font-extrabold text-brand-navy">
          {editingGuide ? "Edit Guide" : "New Guide"}
        </h1>
      </div>

      <form onSubmit={handleSave} className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Left — main content */}
        <div className="grid gap-5">
          <div className="grid gap-1.5">
            <label className="text-sm font-extrabold text-brand-navy">Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Enter guide title…"
              className="w-full rounded-xl border border-brand-purple-deep/15 bg-white px-4 py-3 text-base font-semibold text-brand-navy outline-none transition placeholder:text-brand-navy/35 focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/15"
            />
          </div>

          <div className="grid gap-1.5">
            <label className="text-sm font-extrabold text-brand-navy">Description *</label>
            <textarea
              rows={3}
              required
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="A short description shown on the card…"
              className="w-full resize-none rounded-xl border border-brand-purple-deep/15 bg-white px-4 py-3 text-sm leading-relaxed text-brand-navy outline-none transition placeholder:text-brand-navy/35 focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/15"
            />
          </div>

          <div className="grid gap-1.5">
            <label className="text-sm font-extrabold text-brand-navy">Card Image *</label>
            <SquareImageUpload
              value={form.card_image_url}
              endpoint="/api/admin/guides/upload-image"
              onChange={(url, storagePath) => {
                set("card_image_url", url);
                set("card_image_storage_path", storagePath);
              }}
            />
          </div>

          <div className="grid gap-1.5">
            <label className="text-sm font-extrabold text-brand-navy">File (PDF or HTML) *</label>
            <ContentFileUpload
              value={form.file_url}
              fileType={form.file_type}
              bucket="guide-files"
              initEndpoint="/api/admin/guides/upload-file/init"
              verifyEndpoint="/api/admin/guides/upload-file/verify"
              onChange={(result) => {
                if (result) {
                  set("file_url", result.url);
                  set("storage_path", result.storagePath);
                  set("file_type", result.fileType);
                  set("file_size_bytes", result.fileSizeBytes);
                } else {
                  set("file_url", "");
                  set("storage_path", "");
                  set("file_type", "");
                  set("file_size_bytes", null);
                }
              }}
            />
          </div>
        </div>

        {/* Right — metadata sidebar */}
        <div className="grid auto-rows-min gap-5">
          <div className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-brand-purple-deep/10">
            <p className="mb-4 text-sm font-extrabold text-brand-navy">Details</p>
            <div className="grid gap-1.5">
              <label className="text-xs font-bold text-brand-navy/60">Category</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                placeholder="e.g. Emotional Regulation, Fine Motor Skills"
                className="w-full rounded-xl border border-brand-purple-deep/15 bg-[#fffaf4] px-3 py-2.5 text-sm text-brand-navy outline-none transition placeholder:text-brand-navy/35 focus:border-brand-purple-bright focus:ring-1 focus:ring-brand-purple-bright/15"
              />
              <p className="text-[11px] text-brand-navy/45">
                Separate multiple categories with commas — each one shows as its own pill on the card.
              </p>
            </div>
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-full bg-brand-purple-bright py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-purple-deep disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving…" : editingGuide ? "Save Changes" : "Publish Guide"}
          </button>

          {editingGuide && (
            <a
              href={
                editingGuide.file_type === "html"
                  ? `/guides/view/${editingGuide.slug}`
                  : "/guides"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-full border border-brand-purple-deep/20 py-3 text-center text-sm font-bold text-brand-navy/60 transition hover:bg-brand-lavender"
            >
              View live →
            </a>
          )}
        </div>
      </form>
    </div>
  );
}
