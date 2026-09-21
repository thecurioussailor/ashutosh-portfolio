export default function ToolkitCard({ name }: { name: string }) {
  return (
    <div className="group flex shrink-0 items-center justify-center rounded-[28px] border border-border bg-background-raised px-8 py-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-border-strong sm:px-10 sm:py-7">
      <span className="whitespace-nowrap text-[15px] font-medium tracking-[-0.01em] text-foreground/80 transition-colors duration-300 group-hover:text-foreground sm:text-[16px]">
        {name}
      </span>
    </div>
  );
}
