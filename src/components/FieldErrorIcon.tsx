"use client";

export function FieldErrorIcon({ message }: { message: string }) {
  return (
    <div className="group/err relative pointer-events-auto">
      <span
        aria-label={message}
        title={message}
        className="flex h-5 w-5 cursor-help items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white leading-none select-none"
      >
        !
      </span>
      <div
        role="tooltip"
        className="invisible group-hover/err:visible absolute bottom-full right-0 mb-2 z-50 w-60 rounded-xl bg-gray-900/95 px-3 py-2.5 text-xs leading-relaxed text-white shadow-xl pointer-events-none"
      >
        {message}
        <span className="absolute -bottom-1 right-3 h-2 w-2 rotate-45 bg-gray-900/95" />
      </div>
    </div>
  );
}
