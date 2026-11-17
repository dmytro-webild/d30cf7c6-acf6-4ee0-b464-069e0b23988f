import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { scrollRange, useKitMotion } from "@/components/kit/kitMotion";
import ScrambleLabel from "@/components/kit/ScrambleLabel";
import CornerTicks from "@/components/kit/CornerTicks";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Service = { title: string; description?: string; channel?: string };

type ServicesStackedChannelsProps = {
  label?: string;
  title?: string;
  items?: Service[];
  note?: string;
  linkButton?: { text: string; href: string };
  className?: string;
};

const DEFAULT_ITEMS: Service[] = [
  { title: "Model research", description: "New architectures, trained and tested in the open." },
  { title: "Data systems", description: "Pipelines that keep training data clean and traceable." },
  { title: "Evaluation", description: "Benchmarks built for the decisions you actually make." },
  { title: "Applied AI", description: "Research turned into tools your teams use daily." },
];

type ChannelLineProps = {
  item: Service;
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
};

const ChannelLine = ({ item, index, progress, reduce }: ChannelLineProps) => {
  const fast = index % 2 === 0;
  const side = fast ? -1 : 1;
  const range = fast ? scrollRange(0, 0.38) : scrollRange(0, 0.52);
  const x = useTransform(progress, (p) => {
    const t = Math.min(1, Math.max(0, (p - range[0]) / (range[1] - range[0])));
    return `${side * 12 * (1 - t)}vw`;
  });
  const rule = useTransform(progress, (p) => Math.min(1, Math.max(0, (p - 0.05 - index * 0.03) / 0.35)));
  const channel = item.channel ?? `Ch ${String(index + 1).padStart(2, "0")}`;

  return (
    <li className="relative flex flex-col items-center gap-2 py-[clamp(0.75rem,1.4vw,1.25rem)] lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-baseline lg:gap-[var(--gap)]">
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { scaleX: rule }}
        className="absolute inset-x-0 bottom-0 h-px origin-center bg-[color-mix(in_srgb,var(--foreground)_12%,transparent)]"
      />
      <p aria-hidden={item.channel ? undefined : true} className="font-mono text-[length:var(--text-label)] uppercase leading-none text-muted-foreground lg:justify-self-start">{channel}</p>
      <motion.h3
        style={reduce ? undefined : { x }}
        className="max-w-full text-balance text-center text-[length:var(--text-h3)] lg:text-[length:var(--text-h2)] uppercase leading-[1.1] will-change-transform [overflow-wrap:anywhere]"
      >
        {item.title}
      </motion.h3>
      {item.description && (
        <p className="max-w-[22rem] text-balance text-center text-[length:var(--text-small)] leading-[1.45] text-muted-foreground lg:justify-self-end lg:text-right">
          {item.description}
        </p>
      )}
    </li>
  );
};

const ServicesStackedChannels = ({
  label = "Services",
  title = "Four ways we work with research teams",
  items = DEFAULT_ITEMS,
  note = "Different problems. One standard of evidence.",
  linkButton = { text: "View services", href: "#services" },
  className,
}: ServicesStackedChannelsProps) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = Boolean(useReducedMotion());
  const kit = useKitMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} aria-label={title ?? label ?? "Services"} className={cn("relative z-10 overflow-x-clip py-[var(--section-space)] text-foreground", className)}>
      <div className="kit-glass mx-auto w-[var(--container)] overflow-x-clip p-[1.375rem] lg:p-[clamp(2rem,3.5vw,3.5rem)]">
        <CornerTicks />
        <div className="mx-auto mb-[clamp(1.5rem,3vw,3rem)] flex max-w-[44rem] flex-col items-center gap-[clamp(0.75rem,1.4vw,1.25rem)] text-center">
          {label && <ScrambleLabel prefix="+ " text={label} duration={0.6} className="text-[length:var(--text-label)] uppercase leading-none text-muted-foreground" />}
          {title && (
            <motion.div initial={reduce ? false : "off"} whileInView="on" viewport={{ once: true }} className="-mb-[0.15em] overflow-hidden pb-[0.15em]">
              <motion.h2
                variants={{ off: { y: "110%" }, on: { y: "0%" } }}
                transition={{ duration: kit.base, ease: kit.ease, delay: 0.2 }}
                className="text-balance text-[length:var(--text-h1)]"
              >
                {title}
              </motion.h2>
            </motion.div>
          )}
        </div>
        <ul className="flex flex-col">
          {items.map((item, index) => (
            <ChannelLine key={index} item={item} index={index} progress={scrollYProgress} reduce={reduce} />
          ))}
        </ul>
        {(note || linkButton) && (
          <div className="mt-[clamp(2rem,4vw,3.5rem)] flex flex-col items-center gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-end">
            <div className="hidden lg:block" />
            {note && (
              <div className="flex gap-[0.25em] text-balance text-center text-[length:var(--text-small)] uppercase leading-[1.4]">
                <p aria-hidden="true">+</p>
                <p>{note}</p>
              </div>
            )}
            {linkButton && (
              <a href={linkButton.href} className="btn-link lg:justify-self-end">
                <p>{linkButton.text}</p>
                <p aria-hidden="true">→</p>
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesStackedChannels;
