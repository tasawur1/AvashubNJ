"use client";

import { useState, useRef, useCallback } from "react";
import ReactCrop, { centerCrop, makeAspectCrop, type Crop, type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

type Props = {
  label: "desktop" | "mobile";
  value: string;
  onChange: (url: string) => void;
};

const SPECS = {
  desktop: { aspect: 16 / 9, hint: "Ideal: 1200 × 675 px (16:9)" },
  mobile: { aspect: 3 / 4, hint: "Ideal: 600 × 800 px (3:4)" },
};

function getCroppedBlob(
  image: HTMLImageElement,
  pixelCrop: PixelCrop
): Promise<Blob> {
  // pixelCrop is in display pixels; scale to the image's natural resolution
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(pixelCrop.width * scaleX);
  canvas.height = Math.round(pixelCrop.height * scaleY);
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(
    image,
    pixelCrop.x * scaleX,
    pixelCrop.y * scaleY,
    pixelCrop.width * scaleX,
    pixelCrop.height * scaleY,
    0,
    0,
    canvas.width,
    canvas.height
  );
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Canvas is empty"))),
      "image/jpeg",
      0.92
    );
  });
}

export default function ImageCropUpload({ label, value, onChange }: Props) {
  const { aspect, hint } = SPECS[label];
  const [srcUrl, setSrcUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const imgRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    const reader = new FileReader();
    reader.onload = () => setSrcUrl(reader.result as string);
    reader.readAsDataURL(file);
  }

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
      const initial = centerCrop(
        makeAspectCrop({ unit: "%", width: 90 }, aspect, width, height),
        width,
        height
      );
      setCrop(initial);
    },
    [aspect]
  );

  async function applyCrop() {
    if (!completedCrop || !imgRef.current) return;
    setUploading(true);
    setError("");
    try {
      const blob = await getCroppedBlob(imgRef.current, completedCrop);
      const formData = new FormData();
      formData.append("file", blob, `${label}.jpg`);
      formData.append("label", label);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error ?? "Upload failed.");

      onChange(data.url);
      setSrcUrl(null);
      setCrop(undefined);
      setCompletedCrop(undefined);
      if (inputRef.current) inputRef.current.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  function cancel() {
    setSrcUrl(null);
    setCrop(undefined);
    setCompletedCrop(undefined);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-brand-navy/55">{hint}</p>
        {value && !srcUrl && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs font-semibold text-red-500 hover:underline"
          >
            Remove
          </button>
        )}
      </div>

      {/* Current image preview */}
      {value && !srcUrl && (
        <div className="relative overflow-hidden rounded-xl bg-brand-teal-light">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt={`${label} image`}
            className={label === "desktop" ? "h-36 w-full object-cover" : "mx-auto h-44 w-32 object-cover"}
          />
        </div>
      )}

      {/* Crop UI */}
      {srcUrl && (
        <div className="grid gap-3">
          <div className="overflow-hidden rounded-xl border border-brand-purple-deep/10">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              minWidth={50}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={srcUrl}
                alt="Crop preview"
                onLoad={onImageLoad}
                className="max-h-72 w-full object-contain"
              />
            </ReactCrop>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={applyCrop}
              disabled={uploading || !completedCrop}
              className="flex-1 rounded-full bg-brand-purple-bright py-2 text-sm font-bold text-white transition hover:bg-brand-purple-deep disabled:opacity-50"
            >
              {uploading ? "Uploading…" : "Apply & Upload"}
            </button>
            <button
              type="button"
              onClick={cancel}
              className="rounded-full border border-brand-purple-deep/20 px-4 py-2 text-sm font-bold text-brand-navy/70 transition hover:bg-brand-lavender"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {!srcUrl && (
        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand-purple-deep/20 bg-brand-lavender/20 py-6 text-center transition hover:border-brand-purple-bright hover:bg-brand-lavender/40">
          <span className="text-sm font-semibold text-brand-navy/60">
            {value ? "Replace image" : `Upload ${label} image`}
          </span>
          <span className="text-xs text-brand-navy/40">JPG or PNG</span>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={onFileChange}
          />
        </label>
      )}

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
