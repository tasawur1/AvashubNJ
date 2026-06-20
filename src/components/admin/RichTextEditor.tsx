"use client";

import { useRef } from "react";
import { useEditor, EditorContent, ReactNodeViewRenderer } from "@tiptap/react";
import { Node, Extension, mergeAttributes } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import { ResizableImageView } from "./ResizableImageView";

// ── Custom FontSize extension ──────────────────────────────────────────────
const FontSize = Extension.create({
  name: "fontSize",
  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (el) => el.style.fontSize || null,
            renderHTML: (attrs) =>
              attrs.fontSize ? { style: `font-size: ${attrs.fontSize}` } : {},
          },
        },
      },
    ];
  },
});

// ── Resizable image node with alignment + width/height ────────────────────
const ResizableImage = Node.create({
  name: "image",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      src:    { default: null },
      alt:    { default: null },
      title:  { default: null },
      align:  { default: "center", parseHTML: (el) => el.getAttribute("data-align") ?? "center" },
      width:  {
        default: null,
        parseHTML: (el) => {
          const w = el.style.width;
          return w ? parseInt(w) : null;
        },
      },
      height: {
        default: null,
        parseHTML: (el) => {
          const h = el.style.height;
          return h ? parseInt(h) : null;
        },
      },
    };
  },

  parseHTML() {
    return [{ tag: "img[src]" }];
  },

  renderHTML({ HTMLAttributes }) {
    const { align, width, height, src, alt, title } = HTMLAttributes as {
      align: string; width: number | null; height: number | null;
      src: string; alt: string | null; title: string | null;
    };

    const alignStyles: Record<string, string> = {
      left:   "display:block;margin:0.5rem auto 0.5rem 0",
      right:  "display:block;margin:0.5rem 0 0.5rem auto",
      center: "display:block;margin:1rem auto",
    };

    const styleStr =
      (alignStyles[align] ?? alignStyles.center) +
      (width  ? `;width:${width}px`  : ";max-width:100%") +
      (height ? `;height:${height}px` : ";height:auto") +
      ";border-radius:0.5rem";

    return ["img", mergeAttributes({ src, alt, title, "data-align": align, style: styleStr })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageView);
  },
});

// ── Types ─────────────────────────────────────────────────────────────────
type Props = {
  value: string;
  onChange: (html: string) => void;
};

// ── Helpers ───────────────────────────────────────────────────────────────
function Divider() {
  return <div className="mx-1 h-5 w-px bg-brand-purple-deep/15" />;
}

function ToolbarButton({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={
        "inline-flex h-8 min-w-[2rem] items-center justify-center rounded-lg px-2 text-sm font-bold transition " +
        (active
          ? "bg-brand-purple-bright text-white"
          : "text-brand-navy/70 hover:bg-brand-lavender hover:text-brand-navy")
      }
    >
      {children}
    </button>
  );
}

function fileToBase64(file: File, maxWidth = 1200): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const canvas = document.createElement("canvas");
      canvas.width  = Math.round(img.width  * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(img.src);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = () => reject(new Error("Could not load image"));
    img.src = URL.createObjectURL(file);
  });
}

const FONT_SIZES = [
  { label: "Small",  value: "0.85rem" },
  { label: "Normal", value: "" },
  { label: "Large",  value: "1.2rem" },
  { label: "XL",     value: "1.5rem" },
  { label: "2XL",    value: "2rem" },
];

// ── Editor ────────────────────────────────────────────────────────────────
export default function RichTextEditor({ value, onChange }: Props) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight.configure({ multicolor: false }),
      TextStyle,
      FontSize,
      ResizableImage,
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "min-h-[320px] p-5 text-base leading-relaxed text-brand-navy outline-none prose prose-sm max-w-none focus:outline-none",
      },
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  const headingLevels = [1, 2, 3, 4] as const;
  const isOnImage = editor.isActive("image");
  const activeFontSize = (editor.getAttributes("textStyle").fontSize as string | undefined) ?? "";

  async function handleImageInsert(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    e.target.value = "";
    try {
      const src = await fileToBase64(file);
      editor.chain().focus().insertContent({
        type: "image",
        attrs: { src, align: "center" },
      }).run();
    } catch {
      alert("Could not insert image. Please try again.");
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-purple-deep/15 bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-brand-purple-deep/10 bg-[#fffaf4] px-2 py-2">
        <ToolbarButton title="Bold"      active={editor.isActive("bold")}      onClick={() => editor.chain().focus().toggleBold().run()}>      <strong>B</strong>              </ToolbarButton>
        <ToolbarButton title="Italic"    active={editor.isActive("italic")}    onClick={() => editor.chain().focus().toggleItalic().run()}>    <em>I</em>                      </ToolbarButton>
        <ToolbarButton title="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}> <span className="underline">U</span>   </ToolbarButton>
        <ToolbarButton title="Highlight" active={editor.isActive("highlight")} onClick={() => editor.chain().focus().toggleHighlight().run()}> <span className="bg-yellow-200 px-0.5">H</span> </ToolbarButton>

        <Divider />

        {headingLevels.map((level) => (
          <ToolbarButton key={level} title={`Heading ${level}`} active={editor.isActive("heading", { level })} onClick={() => editor.chain().focus().toggleHeading({ level }).run()}>
            H{level}
          </ToolbarButton>
        ))}
        <ToolbarButton title="Paragraph" active={editor.isActive("paragraph")} onClick={() => editor.chain().focus().setParagraph().run()}>P</ToolbarButton>

        <Divider />

        {/* Font size */}
        <select
          title="Font size"
          value={activeFontSize}
          onChange={(e) => {
            const size = e.target.value;
            editor.chain().focus().setMark("textStyle", { fontSize: size || null }).run();
          }}
          className="h-8 rounded-lg border border-brand-purple-deep/15 bg-white px-1.5 text-xs font-semibold text-brand-navy/70 outline-none transition hover:border-brand-purple-bright focus:border-brand-purple-bright"
        >
          {FONT_SIZES.map((fs) => (
            <option key={fs.label} value={fs.value}>{fs.label}</option>
          ))}
        </select>

        <Divider />

        <ToolbarButton title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</ToolbarButton>

        <Divider />

        {/* Image insert */}
        <ToolbarButton title="Insert image" onClick={() => imageInputRef.current?.click()}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.75"/>
            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
            <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="ml-1 text-xs">Image</span>
        </ToolbarButton>
        <input ref={imageInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={handleImageInsert} />

        {/* Alignment buttons — only when an image is selected */}
        {isOnImage && (
          <>
            <Divider />
            <ToolbarButton title="Align left"   active={editor.getAttributes("image").align === "left"}   onClick={() => editor.chain().focus().updateAttributes("image", { align: "left"   }).run()}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M3 6h18M3 10h12M3 14h18M3 18h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </ToolbarButton>
            <ToolbarButton title="Align center" active={editor.getAttributes("image").align === "center"} onClick={() => editor.chain().focus().updateAttributes("image", { align: "center" }).run()}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M3 6h18M6 10h12M3 14h18M6 18h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </ToolbarButton>
            <ToolbarButton title="Align right"  active={editor.getAttributes("image").align === "right"}  onClick={() => editor.chain().focus().updateAttributes("image", { align: "right"  }).run()}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M3 6h18M9 10h12M3 14h18M9 18h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </ToolbarButton>
          </>
        )}

        <Divider />

        <ToolbarButton title="Clear formatting" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}>Clear</ToolbarButton>
      </div>

      <div className="max-h-[480px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
