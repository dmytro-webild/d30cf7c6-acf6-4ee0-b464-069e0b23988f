import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CornerTicks from "@/components/kit/CornerTicks";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type FooterLink = { text: string; href: string };
type FooterColumn = { title: string; items: FooterLink[] };

type FooterHorizonMarkProps = {
  brand?: string;
  coordinates?: string;
  location?: string;
  copyright?: string;
  backToTop?: FooterLink;
  legal?: FooterLink[];
  columns?: FooterColumn[];
  positionText?: string;
  ariaLabel?: string;
  className?: string;
};

const DEFAULT_COLUMNS: FooterColumn[] = [
  { title: "Lab", items: [{ text: "Research", href: "#services" }, { text: "Method", href: "#process" }, { text: "Surveys", href: "#gallery" }] },
  { title: "Studio", items: [{ text: "Team", href: "#team" }, { text: "Pricing", href: "#pricing" }, { text: "Contact", href: "#contact" }] },
];

const splitMark = (brand: string): [string, string, boolean] => {
  const words = brand.trim().split(/\s+/);
  if (words.length > 1) {
    const cut = Math.ceil(words.length / 2);
    return [words.slice(0, cut).join(" "), words.slice(cut).join(" "), true];
  }
  const mid = Math.ceil(brand.length / 2);
  return [brand.slice(0, mid), brand.slice(mid), false];
};

const FooterHorizonMark = ({
  brand = "Northfield",
  coordinates = "N 59.33 / E 18.06",
  location = "Stockholm, Sweden",
  copyright = "© 2026 Northfield Labs",
  backToTop = { text: "Back to top", href: "#hero" },
  legal = [{ text: "Privacy", href: "#" }],
  columns = DEFAULT_COLUMNS,
  positionText = "Position",
  ariaLabel,
  className,
}: FooterHorizonMarkProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = innerRef.current;
    if (!node) return;
    const update = () => setHeight(node.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end end"] });
  const rule = useTransform(scrollYProgress, [0, 0.6], reduce ? [1, 1] : [0, 1]);
  const leftX = useTransform(scrollYProgress, [0.1, 1], reduce ? ["0cqi", "0cqi"] : ["-8cqi", "0cqi"]);
  const rightX = useTransform(scrollYProgress, [0.1, 1], reduce ? ["0cqi", "0cqi"] : ["8cqi", "0cqi"]);

  const [first, second, spaced] = splitMark(brand);
  const markSize = `${Math.min(24, 100 / Math.max(1, brand.length * 0.56)).toFixed(2)}cqi`;

  return (
    <section
      ref={sectionRef}
      aria-label={ariaLabel ?? "Site footer"}
      data-terrain="calm"
      className={cn("relative z-10 w-full", className)}
      style={{ height: height ? `${height}px` : "auto", clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      <div className="fixed inset-x-0 bottom-0">
        <footer
          ref={innerRef}
          className="bg-[linear-gradient(to_top,color-mix(in_srgb,var(--background)_94%,transparent)_78%,transparent)] pt-[clamp(4rem,10svh,7rem)] text-foreground"
        >
          <div aria-hidden="true" className="flex items-center">
            <motion.div className="h-px flex-1 origin-right bg-[color-mix(in_srgb,var(--foreground)_25%,transparent)]" style={{ scaleX: rule }} />
            <p className="px-2 text-[length:var(--text-label)] leading-none text-muted-foreground">+</p>
            <motion.div className="h-px flex-1 origin-left bg-[color-mix(in_srgb,var(--foreground)_25%,transparent)]" style={{ scaleX: rule }} />
          </div>

          <div className="relative mx-auto flex w-[var(--container)] flex-col gap-[clamp(2rem,5vw,4rem)] py-[clamp(1.5rem,3vw,2.5rem)]">
            <CornerTicks />

            <div className="flex items-start justify-between gap-4 px-[clamp(0.75rem,1.5vw,1.25rem)] pt-[clamp(0.75rem,1.5vw,1.25rem)] text-[length:var(--text-label)] uppercase text-muted-foreground">
              <p>{location}</p>
              <a href={backToTop.href} className="whitespace-nowrap text-foreground transition-opacity duration-300 hover:opacity-70">
                {backToTop.text} ↑
              </a>
            </div>

            <div className="grid grid-cols-2 gap-x-[var(--gap)] gap-y-8 px-[clamp(0.75rem,1.5vw,1.25rem)] lg:grid-cols-4">
              {columns.map((column, index) => (
                <div key={index} className="flex min-w-0 flex-col gap-3">
                  <p className="text-[length:var(--text-label)] uppercase text-muted-foreground">{column.title}</p>
                  {column.items.map((item, itemIndex) => (
                    <a
                      key={itemIndex}
                      href={item.href}
                      className="w-fit text-[length:var(--text-small)] uppercase transition-opacity duration-300 hover:opacity-70 [overflow-wrap:anywhere]"
                    >
                      {item.text}
                    </a>
                  ))}
                </div>
              ))}
              <div className="col-span-2 flex flex-col gap-3 lg:col-span-1 lg:col-start-4 lg:items-end lg:text-right">
                <p className="text-[length:var(--text-label)] uppercase text-muted-foreground">{positionText}</p>
                <p className="whitespace-nowrap font-mono text-[length:var(--text-label)] uppercase">{coordinates}</p>
              </div>
            </div>

            <div aria-hidden="true" className="flex justify-center overflow-hidden whitespace-nowrap [container-type:inline-size]">
              <h2 className="flex pb-[0.06em] leading-[0.9]" style={{ fontSize: markSize }}>
                <motion.div style={{ x: leftX }}>{first}</motion.div>
                {second && (
                  <motion.div style={{ x: rightX }} className={spaced ? "ml-[0.25em]" : undefined}>
                    {second}
                  </motion.div>
                )}
              </h2>
            </div>
            <p className="sr-only">{brand}</p>

            <div className="flex flex-col gap-2 px-[clamp(0.75rem,1.5vw,1.25rem)] pb-[clamp(0.75rem,1.5vw,1.25rem)] text-[length:var(--text-label)] uppercase text-muted-foreground sm:flex-row sm:items-end sm:justify-between">
              <p>{copyright}</p>
              <div className="flex flex-wrap gap-4">
                {legal.map((link, index) => (
                  <a key={index} href={link.href} className="transition-opacity duration-300 hover:opacity-70">
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default FooterHorizonMark;
