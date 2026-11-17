import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CornerTicks from "@/components/kit/CornerTicks";
import ScrambleLabel from "@/components/kit/ScrambleLabel";
import ImageScrollParallax from "@/components/animation/ImageScrollParallax";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type SurveyItem = { title: string; category?: string; meta?: string; imageSrc: string; imageAlt?: string };

type GallerySurveyStackProps = {
  label?: string;
  title?: string;
  linkButton?: { text: string; href: string };
  items?: SurveyItem[];
  ariaLabel?: string;
  className?: string;
};

const px = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1400`;

const DEFAULT_ITEMS: SurveyItem[] = [
  { title: "Wind yield forecasting for a coastal grid", category: "Forecasting", meta: "N 57.10 / E 11.94", imageSrc: px(1108814) },
  { title: "Panel fault detection from drone passes", category: "Vision", meta: "N 52.37 / E 4.89", imageSrc: px(2800832) },
  { title: "Inference platform for a national lab", category: "Data platform", meta: "N 59.33 / E 18.06", imageSrc: px(325229) },
];

const SHRINK = 0.05;
const TILT = 8;
const PEEK = 14;

const pad = (n: number) => String(n).padStart(2, "0");

type CardProps = { item: SurveyItem; index: number; total: number; progress: MotionValue<number> };

const Card = ({ item, index, total, progress }: CardProps) => {
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const lastIndex = total - 1;
  const segment = 1 / Math.max(lastIndex, 1);
  const start = Math.min(index * segment, 0.999);
  const behind = lastIndex - index;
  const scale = useTransform(progress, [start, 1], [1, 1 - behind * SHRINK]);
  const rotateX = useTransform(progress, [start, Math.min(start + segment, 1)], [0, behind ? TILT : 0]);
  const dim = useTransform(progress, [start, 1], [0, Math.min(behind * 0.16, 0.5)]);
  const still = reduce || !behind;

  return (
    <li
      className="sticky [--card-h:min(72svh,34rem)] [perspective:1600px] lg:[--card-h:min(66svh,38rem)]"
      style={{ top: `calc((100svh - var(--card-h)) / 2 + ${index * PEEK}px)` }}
    >
      <motion.article
        style={still ? undefined : { scale, rotateX }}
        className="kit-card relative flex [--fill:var(--background)] h-[var(--card-h)] w-full origin-top flex-col border border-[color-mix(in_srgb,var(--foreground)_12%,transparent)] p-[0.625rem] will-change-transform lg:grid lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-[clamp(1rem,2vw,1.75rem)] lg:p-[0.875rem]"
      >
        <CornerTicks />
        <div className="relative min-h-0 flex-1 lg:h-full">
          <ImageScrollParallax imageSrc={item.imageSrc} imageAlt={item.imageAlt ?? item.title} strength={0.1 + (index % 3) * 0.03} className="aspect-auto h-full rounded-[var(--radius-image)]" />
          <CornerTicks size="0.625rem" className="m-[0.625rem]" />
        </div>
        <div className="flex min-w-0 flex-none flex-col justify-between gap-[1rem] px-[0.5rem] pb-[0.5rem] pt-[1rem] lg:px-[0.5rem] lg:py-[clamp(0.75rem,1.5vw,1.25rem)]">
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: kit.base, ease: kit.ease }}
            className="flex flex-col gap-[0.75rem]"
          >
            <div className="flex items-baseline justify-between gap-[1rem] border-b border-[color-mix(in_srgb,var(--foreground)_18%,transparent)] pb-[0.75rem] font-mono text-[length:var(--text-label)] uppercase leading-none">
              <p aria-hidden="true">{pad(index + 1)}</p>
              <p aria-hidden="true" className="text-muted-foreground">/ {pad(total)}</p>
            </div>
          </motion.div>
          <div className="flex flex-col gap-[0.625rem] lg:gap-[1rem]">
            {item.category && <p className="text-[length:var(--text-label)] uppercase leading-none text-muted-foreground">{item.category}</p>}
            <h3 className="max-w-[16em] text-balance text-[length:var(--text-h3)] leading-[1.1] [overflow-wrap:anywhere] lg:text-[length:var(--text-h2)] lg:leading-[1.05]">{item.title}</h3>
          </div>
        </div>
        {!still && <motion.div aria-hidden="true" style={{ opacity: dim }} className="pointer-events-none absolute inset-0 z-[3] bg-black" />}
      </motion.article>
    </li>
  );
};

const GallerySurveyStack = ({
  label = "Field work",
  title = "Selected surveys",
  linkButton,
  items = DEFAULT_ITEMS,
  ariaLabel,
  className,
}: GallerySurveyStackProps) => {
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const listRef = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.0005 });

  return (
    <section aria-label={ariaLabel ?? title} data-scene data-terrain="valley" className={cn("relative z-10 overflow-x-clip py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto flex w-[var(--container)] flex-col gap-[clamp(1.5rem,3vw,3rem)]">
        <div className="kit-glass flex w-full flex-col gap-[clamp(1rem,2vw,1.5rem)] p-[1.375rem] lg:flex-row lg:items-end lg:justify-between lg:p-[clamp(2rem,3.5vw,3.5rem)]">
          <CornerTicks />
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[length:var(--text-label)] uppercase text-muted-foreground">
              <p aria-hidden="true">+</p>
              <ScrambleLabel text={label} duration={0.6} />
            </div>
            <motion.div initial={reduce ? false : "off"} whileInView="on" viewport={{ once: true }} className="flex items-start gap-2">
              <div className="-mb-[0.15em] overflow-hidden pb-[0.15em]">
                <motion.h2
                  variants={{ off: { y: "110%" }, on: { y: "0%" } }}
                  transition={{ duration: kit.slow, ease: kit.ease, delay: 0.2 }}
                  className="text-balance text-[length:var(--text-h1)] [overflow-wrap:anywhere]"
                >
                  {title}
                  <sup aria-hidden="true" className="ml-2 align-top font-mono text-[length:var(--text-label)] text-muted-foreground">{pad(items.length)}</sup>
                </motion.h2>
              </div>
            </motion.div>
          </div>
          {linkButton && (
            <a href={linkButton.href} className="btn-link self-start lg:self-end">
              <p>{linkButton.text}</p>
              <p aria-hidden="true">→</p>
            </a>
          )}
        </div>
        <ul ref={listRef} className="flex flex-col gap-[12svh]">
          {items.map((item, index) => (
            <Card key={index} item={item} index={index} total={items.length} progress={progress} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default GallerySurveyStack;
