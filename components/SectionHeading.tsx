import TextReveal from "./TextReveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  align?: "left" | "right";
};

export default function SectionHeading({
  eyebrow,
  title,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "right" ? "text-right" : ""}>
      <p className="font-mono-label mb-4 text-[11px] tracking-[0.14em] uppercase text-accent sm:mb-5">
        {eyebrow}
      </p>
      <h2 className="max-w-2xl text-[9vw] sm:text-[5vw] lg:text-[3.4vw] font-medium leading-[0.98] tracking-[-0.02em] text-foreground">
        <TextReveal text={title} />
      </h2>
    </div>
  );
}
