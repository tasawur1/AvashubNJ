"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/admin/RichTextEditor"), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse rounded-2xl bg-brand-lavender/30" />,
});

const ImageCropUpload = dynamic(() => import("@/components/admin/ImageCropUpload"), {
  ssr: false,
  loading: () => <div className="h-32 animate-pulse rounded-xl bg-brand-lavender/20" />,
});

type Blog = {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  summary: string;
  content: string;
  image_desktop: string;
  image_mobile: string;
  tone: "teal" | "purple" | "gold";
  hidden: boolean;
  created_at: string;
};

type Props = { initialBlogs: Record<string, unknown>[] };

const TONE_OPTIONS: { value: Blog["tone"]; label: string; color: string }[] = [
  { value: "teal", label: "Teal", color: "bg-brand-teal-light text-brand-teal" },
  { value: "purple", label: "Purple", color: "bg-brand-lavender text-brand-purple-deep" },
  { value: "gold", label: "Gold", color: "bg-brand-gold/20 text-yellow-700" },
];

function emptyForm(): Omit<Blog, "id" | "slug" | "created_at" | "hidden"> {
  return {
    title: "",
    date: "",
    author: "Ava's Hub Team",
    summary: "",
    content: "",
    image_desktop: "",
    image_mobile: "",
    tone: "teal",
  };
}

export function BlogManager({ initialBlogs }: Props) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs as Blog[]);
  const [view, setView] = useState<"list" | "form">("list");
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving]     = useState(false);
  const [toggling, setToggling] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function openNew() {
    setEditingBlog(null);
    setForm(emptyForm());
    setError("");
    setView("form");
  }

  function openEdit(blog: Blog) {
    setEditingBlog(blog);
    setForm({
      title: blog.title,
      date: blog.date,
      author: blog.author,
      summary: blog.summary,
      content: blog.content,
      image_desktop: blog.image_desktop,
      image_mobile: blog.image_mobile,
      tone: blog.tone,
    } satisfies Omit<Blog, "id" | "slug" | "created_at" | "hidden">);
    setError("");
    setView("form");
  }

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const handleContent = useCallback((html: string) => {
    setForm((prev) => ({ ...prev, content: html }));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;
    if (!form.title.trim()) { setError("Title is required."); return; }
    setSaving(true);
    setError("");

    try {
      const url = editingBlog
        ? `/api/admin/blogs/${editingBlog.id}`
        : "/api/admin/blogs";
      const method = editingBlog ? "PUT" : "POST";

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

      if (editingBlog) {
        setBlogs((prev) => prev.map((b) => (b.id === editingBlog.id ? data.blog : b)));
      } else {
        setBlogs((prev) => [data.blog, ...prev]);
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
      const res = await fetch(`/api/admin/blogs/${id}`, {
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
      setBlogs((prev) =>
        prev.map((b) => (b.id === id ? { ...b, hidden: !currentlyHidden } : b))
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
      const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Delete failed.");
      }
      const data = await res.json();
      if (!data.success) throw new Error(data.error ?? "Delete failed.");
      setBlogs((prev) => prev.filter((b) => b.id !== id));
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
            <h1 className="text-2xl font-extrabold text-brand-navy lg:text-3xl">Blogs</h1>
            <p className="mt-1 text-sm text-brand-navy/55">{blogs.length} post{blogs.length !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 rounded-full bg-brand-purple-bright px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-purple-deep"
          >
            <span className="text-lg leading-none">+</span> New Blog
          </button>
        </div>

        {blogs.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-base text-brand-navy/50">No blogs yet. Create your first one!</p>
            <button
              onClick={openNew}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-purple-bright px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-purple-deep"
            >
              + New Blog
            </button>
          </div>
        ) : (
          <div className="mt-6 grid gap-3">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className={"overflow-hidden rounded-xl border border-brand-purple-deep/10 bg-white shadow-sm " + (blog.hidden ? "opacity-55" : "")}
              >
                <div className="flex items-start gap-4 px-5 py-4">
                  {/* Avatar */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-purple-deep/10 text-lg font-extrabold text-brand-purple-deep">
                    {blog.title.charAt(0).toUpperCase()}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-brand-navy/70">{blog.author || "No author"}</p>
                    <p className="truncate text-base font-extrabold leading-tight text-brand-navy">{blog.title}</p>
                    <p className="mt-0.5 text-xs text-brand-navy/50">{blog.date || "No date"}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ${TONE_OPTIONS.find((t) => t.value === blog.tone)?.color ?? ""}`}>
                        {blog.tone}
                      </span>
                      {blog.hidden && (
                        <span className="rounded-full bg-brand-navy/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-navy/50">
                          Hidden
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-center">
                    <button
                      onClick={() => handleToggleHidden(blog.id, blog.hidden)}
                      disabled={toggling}
                      title={blog.hidden ? "Unhide blog" : "Hide blog"}
                      className="inline-flex items-center justify-center rounded-full border border-brand-purple-deep/20 p-1.5 text-brand-navy/50 transition hover:bg-brand-lavender hover:text-brand-navy disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {blog.hidden ? (
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
                      onClick={() => openEdit(blog)}
                      className="rounded-lg bg-brand-purple-deep/5 px-3 py-1.5 text-xs font-semibold text-brand-purple-deep hover:bg-brand-purple-deep/10"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(blog.id)}
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
              <h2 className="text-base font-extrabold text-brand-navy">Delete blog post?</h2>
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
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <button
          type="button"
          onClick={() => setView("list")}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy/55 transition hover:text-brand-purple-bright"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M12.5 15L7.5 10l5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to blogs
        </button>
        <h1 className="text-2xl font-extrabold text-brand-navy">
          {editingBlog ? "Edit Blog" : "New Blog"}
        </h1>
      </div>

      <form onSubmit={handleSave} className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Left — main content */}
        <div className="grid gap-5">
          {/* Title */}
          <div className="grid gap-1.5">
            <label className="text-sm font-extrabold text-brand-navy">Blog Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Enter blog title…"
              className="w-full rounded-xl border border-brand-purple-deep/15 bg-white px-4 py-3 text-base font-semibold text-brand-navy outline-none transition placeholder:text-brand-navy/35 focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/15"
            />
          </div>

          {/* Summary */}
          {(() => {
            const SUMMARY_LIMIT = 300;
            const remaining = SUMMARY_LIMIT - form.summary.length;
            return (
              <div className="grid gap-1.5">
                <div className="flex items-baseline justify-between gap-2">
                  <label className="text-sm font-extrabold text-brand-navy">
                    Summary <span className="font-normal text-brand-navy/45">(shown on blog card)</span>
                  </label>
                  <span className={`text-xs font-semibold tabular-nums ${remaining < 20 ? "text-red-500" : "text-brand-navy/40"}`}>
                    {remaining} left
                  </span>
                </div>
                <textarea
                  rows={3}
                  maxLength={SUMMARY_LIMIT}
                  value={form.summary}
                  onChange={(e) => set("summary", e.target.value)}
                  placeholder="A short summary of this blog post…"
                  className="w-full resize-none rounded-xl border border-brand-purple-deep/15 bg-white px-4 py-3 text-sm leading-relaxed text-brand-navy outline-none transition placeholder:text-brand-navy/35 focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/15"
                />
              </div>
            );
          })()}


          {/* Blog content */}
          <div className="grid gap-1.5">
            <label className="text-sm font-extrabold text-brand-navy">Blog Content</label>
            <RichTextEditor value={form.content} onChange={handleContent} />
          </div>

          {/* Images */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <label className="text-sm font-extrabold text-brand-navy">Desktop Image</label>
              <ImageCropUpload
                label="desktop"
                value={form.image_desktop}
                onChange={(url) => set("image_desktop", url)}
              />
            </div>
            <div className="grid gap-1.5">
              <label className="text-sm font-extrabold text-brand-navy">Mobile Image</label>
              <ImageCropUpload
                label="mobile"
                value={form.image_mobile}
                onChange={(url) => set("image_mobile", url)}
              />
            </div>
          </div>
        </div>

        {/* Right — metadata sidebar */}
        <div className="grid auto-rows-min gap-5">
          <div className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-brand-purple-deep/10">
            <p className="mb-4 text-sm font-extrabold text-brand-navy">Post Details</p>

            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-brand-navy/60">Date</label>
                <input
                  type="text"
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                  placeholder="e.g. Thursday, June 19, 2026"
                  className="w-full rounded-xl border border-brand-purple-deep/15 bg-[#fffaf4] px-3 py-2.5 text-sm text-brand-navy outline-none transition placeholder:text-brand-navy/35 focus:border-brand-purple-bright focus:ring-1 focus:ring-brand-purple-bright/15"
                />
              </div>

              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-brand-navy/60">Author</label>
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) => set("author", e.target.value)}
                  placeholder="Ava's Hub Team"
                  className="w-full rounded-xl border border-brand-purple-deep/15 bg-[#fffaf4] px-3 py-2.5 text-sm text-brand-navy outline-none transition placeholder:text-brand-navy/35 focus:border-brand-purple-bright focus:ring-1 focus:ring-brand-purple-bright/15"
                />
              </div>

              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-brand-navy/60">Card Colour</label>
                <div className="flex gap-2">
                  {TONE_OPTIONS.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => set("tone", t.value)}
                      className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${t.color} ${
                        form.tone === t.value ? "ring-2 ring-brand-purple-bright ring-offset-1" : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Save */}
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
            {saving ? "Saving…" : editingBlog ? "Save Changes" : "Publish Blog"}
          </button>

          {editingBlog && (
            <a
              href={`/blogs/${editingBlog.slug}`}
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
