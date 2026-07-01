"use client";

import { useState, useRef } from "react";

type Props = {
  label: "desktop" | "mobile";
  value: string;
  onChange: (url: string) => void;
};

const SPECS = {
  desktop: { hint: "Ideal: 1200 × 675 px (16:9 landscape)" },
  mobile:  { hint: "Ideal: 600 × 800 px (3:4 portrait)" },
};

export default function ImageCropUpload({ label, value, onChange }: Props) {
  const { hint } = SPECS[label];
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("label", label);

      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Upload failed.");
      }
      const data = await res.json();
      if (!data.success) throw new Error(data.error ?? "Upload failed.");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-brand-navy/55">{hint}</p>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs font-semibold text-red-500 hover:underline"
          >
            Remove
          </button>
        )}
      </div>

      {value && (
        <div className="relative overflow-hidden rounded-xl bg-brand-teal-light">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt={`${label} image`}
            className={label === "desktop" ? "h-36 w-full object-cover" : "mx-auto h-44 w-32 object-cover"}
          />
        </div>
      )}

      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand-purple-deep/20 bg-brand-lavender/20 py-6 text-center transition hover:border-brand-purple-bright hover:bg-brand-lavender/40">
        <span className="text-sm font-semibold text-brand-navy/60">
          {uploading ? "Uploading…" : value ? "Replace image" : `Upload ${label} image`}
        </span>
        <span className="text-xs text-brand-navy/40">JPG or PNG</span>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={onFileChange}
          disabled={uploading}
        />
      </label>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
