"use client";

import { useState, useRef } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";

type UploadResult = {
  url: string;
  storagePath: string;
  fileType: "pdf" | "html";
  fileSizeBytes: number | null;
};

type Props = {
  value: string; // current file_url, "" if none
  fileType: "pdf" | "html" | "";
  onChange: (result: UploadResult | null) => void;
};

const BUCKET = "printable-files";

export default function PrintableFileUpload({ value, fileType, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);

    try {
      // Step 1 — ask our server for a signed upload URL (metadata only).
      const initRes = await fetch("/api/admin/printables/upload-file/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentType: file.type, size: file.size }),
      });
      if (!initRes.ok) {
        const data = await initRes.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Could not start upload.");
      }
      const initData = await initRes.json();
      if (!initData.success) throw new Error(initData.error ?? "Could not start upload.");

      // Step 2 — upload the file straight to Supabase Storage. Never
      // touches our server, so there's no Vercel body-size ceiling.
      // Uploading raw bytes (not the File/Blob itself) so the SDK actually
      // honors the contentType option — passing a Blob directly makes it
      // wrap the request in FormData instead, which silently drops it.
      // (Rendering no longer depends on this — /printables/files/[...path]
      // forces the right Content-Type by extension regardless — but it
      // keeps the stored file metadata accurate too.)
      const buffer = await file.arrayBuffer();
      const supabase = createBrowserSupabaseClient();
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .uploadToSignedUrl(initData.path, initData.token, buffer, { contentType: file.type });
      if (uploadError) throw new Error(uploadError.message);

      // Step 3 — ask our server to verify the uploaded file is really a
      // PDF/HTML (never trusting the browser-reported type) before we
      // treat it as usable.
      const verifyRes = await fetch("/api/admin/printables/upload-file/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: initData.path }),
      });
      if (!verifyRes.ok) {
        const data = await verifyRes.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Upload could not be verified.");
      }
      const verifyData = await verifyRes.json();
      if (!verifyData.success) throw new Error(verifyData.error ?? "Upload could not be verified.");

      onChange({
        url: verifyData.url,
        storagePath: verifyData.storage_path,
        fileType: verifyData.file_type,
        fileSizeBytes: verifyData.file_size_bytes,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="grid gap-3">
      {value && fileType && (
        <div className="flex items-center justify-between rounded-xl bg-brand-teal-light px-4 py-3">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-brand-teal">
            <span className="h-2 w-2 rounded-full bg-brand-teal" />
            Detected: {fileType === "pdf" ? "PDF" : "HTML Page"}
          </span>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-xs font-semibold text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      )}

      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand-purple-deep/20 bg-brand-lavender/20 py-6 text-center transition hover:border-brand-purple-bright hover:bg-brand-lavender/40">
        <span className="text-sm font-semibold text-brand-navy/60">
          {uploading ? "Uploading…" : value ? "Replace file" : "Upload PDF or HTML file"}
        </span>
        <span className="text-xs text-brand-navy/40">
          PDF or HTML — under 20MB. Type is detected automatically.
        </span>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.html,application/pdf,text/html"
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
