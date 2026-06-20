"use client";

import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { useRef } from "react";

type Align = "left" | "center" | "right";

function imgStyle(
  width: number | null,
  height: number | null
): React.CSSProperties {
  return {
    display: "block",
    width: width ? `${width}px` : "100%",
    height: height ? `${height}px` : "auto",
    maxWidth: "100%",
    borderRadius: "0.5rem",
    userSelect: "none",
  };
}

const wrapperAlign: Record<Align, React.CSSProperties> = {
  left:   { textAlign: "left" },
  center: { textAlign: "center" },
  right:  { textAlign: "right" },
};

export function ResizableImageView({ node, updateAttributes, selected }: NodeViewProps) {
  const { src, alt, align, width, height } = node.attrs as {
    src: string;
    alt: string | null;
    align: Align;
    width: number | null;
    height: number | null;
  };

  const imgRef = useRef<HTMLImageElement>(null);

  function makeResizeHandler(xDir: 1 | -1, yDir: 1 | -1) {
    return function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
      e.preventDefault();
      e.stopPropagation();

      const img = imgRef.current;
      if (!img) return;

      const startX = e.clientX;
      const startY = e.clientY;
      const startW = img.offsetWidth;
      const startH = img.offsetHeight;

      // Capture pointer so we get events even when cursor leaves the handle
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

      function onMove(mv: PointerEvent) {
        const newW = Math.max(40, Math.round(startW + (mv.clientX - startX) * xDir));
        if (mv.shiftKey) {
          // Shift → free stretch: set height explicitly
          const newH = Math.max(20, Math.round(startH + (mv.clientY - startY) * yDir));
          updateAttributes({ width: newW, height: newH });
        } else {
          // Default → proportional: only width, height stays auto
          updateAttributes({ width: newW, height: null });
        }
      }

      function onUp() {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      }

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    };
  }

  return (
    <NodeViewWrapper style={{ ...wrapperAlign[align] ?? wrapperAlign.center, display: "block", lineHeight: 0, margin: "0.5rem 0" }}>
      <div style={{ display: "inline-block", position: "relative", lineHeight: "normal", maxWidth: "100%" }}>
        <img
          ref={imgRef}
          src={src}
          alt={alt ?? ""}
          draggable={false}
          style={imgStyle(width, height)}
        />

        {selected && (
          <>
            {/* Selection ring */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "0.5rem",
                outline: "2px solid #bd7abb",
                outlineOffset: "2px",
                pointerEvents: "none",
              }}
            />

            {/* Bottom-right handle */}
            <div
              title="Drag to resize · Shift+drag to stretch freely"
              onPointerDown={makeResizeHandler(1, 1)}
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 14,
                height: 14,
                transform: "translate(50%, 50%)",
                background: "#bd7abb",
                border: "2px solid white",
                borderRadius: 3,
                cursor: "se-resize",
                zIndex: 10,
              }}
            />

            {/* Bottom-left handle */}
            <div
              title="Drag to resize · Shift+drag to stretch freely"
              onPointerDown={makeResizeHandler(-1, 1)}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: 14,
                height: 14,
                transform: "translate(-50%, 50%)",
                background: "#bd7abb",
                border: "2px solid white",
                borderRadius: 3,
                cursor: "sw-resize",
                zIndex: 10,
              }}
            />

            {/* Top-right handle */}
            <div
              title="Drag to resize · Shift+drag to stretch freely"
              onPointerDown={makeResizeHandler(1, -1)}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 14,
                height: 14,
                transform: "translate(50%, -50%)",
                background: "#bd7abb",
                border: "2px solid white",
                borderRadius: 3,
                cursor: "ne-resize",
                zIndex: 10,
              }}
            />

            {/* Top-left handle */}
            <div
              title="Drag to resize · Shift+drag to stretch freely"
              onPointerDown={makeResizeHandler(-1, -1)}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 14,
                height: 14,
                transform: "translate(-50%, -50%)",
                background: "#bd7abb",
                border: "2px solid white",
                borderRadius: 3,
                cursor: "nw-resize",
                zIndex: 10,
              }}
            />
          </>
        )}
      </div>
    </NodeViewWrapper>
  );
}
