type ProjectPlaceholderProps = {
  label: string;
  number: string;
  className?: string;
};

export default function ProjectPlaceholder({
  label,
  number,
  className,
}: ProjectPlaceholderProps) {
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-background-raised ${className ?? ""}`}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.4]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={`grid-${number}`}
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="rgba(242,241,237,0.06)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${number})`} />
      </svg>
      <span
        aria-hidden="true"
        className="font-mono-label select-none text-[13vw] font-medium leading-none text-foreground/[0.06] sm:text-[7vw]"
      >
        {number}
      </span>
      <span className="sr-only">{label} — placeholder visual</span>
    </div>
  );
}
