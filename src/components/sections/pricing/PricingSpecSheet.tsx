import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import CornerTicks from "@/components/kit/CornerTicks";
import ScrambleLabel from "@/components/kit/ScrambleLabel";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Spec = { label: string; value: string };

type Plan = {
  title: string;
  price: string;
  period?: string;
  description?: string;
  features?: Spec[];
  button?: { text: string; href: string };
};

type PricingSpecSheetProps = {
  label?: string;
  title?: string;
  items?: Plan[];
  className?: string;
};

const DEFAULT_ITEMS: Plan[] = [
  {
    title: "Pilot",
    price: "$18,000",
    period: "per study",
    description: "One question, one dataset, a clear answer in six weeks.",
    features: [
      { label: "Duration", value: "6 weeks" },
      { label: "Researchers", value: "2" },
      { label: "Datasets", value: "1" },
      { label: "Report", value: "Written" },
    ],
    button: { text: "Start a pilot", href: "#contact" },
  },
  {
    title: "Programme",
    price: "$42,000",
    period: "per quarter",
    description: "A standing team on your models, with monthly readouts.",
    features: [
      { label: "Duration", value: "Rolling" },
      { label: "Researchers", value: "4" },
      { label: "Datasets", value: "Up to 6" },
      { label: "Report", value: "Monthly" },
    ],
    button: { text: "Plan a programme", href: "#contact" },
  },
  {
    title: "Partner lab",
    price: "Custom",
    period: "per year",
    description: "Joint research with shared compute and co-authored papers.",
    features: [
      { label: "Duration", value: "12 months" },
      { label: "Researchers", value: "Dedicated" },
      { label: "Datasets", value: "Unlimited" },
      { label: "Report", value: "Published" },
    ],
    button: { text: "Talk to us", href: "#contact" },
  },
];

const columns = (count: number) => {
  if (count <= 1) return "grid-cols-1 lg:mx-auto lg:max-w-[28rem]";
  if (count === 2) return "grid-cols-1 lg:grid-cols-2";
  if (count === 4) return "grid-cols-1 lg:grid-cols-2 xl:grid-cols-4";
  return "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3";
};

const SpecRow = ({ spec, index, progress, reduce }: { spec: Spec; index: number; progress: MotionValue<number>; reduce: boolean }) => {
  const scaleX = useTransform(progress, (p) => Math.min(1, Math.max(0, (p - 0.08 - index * 0.04) / 0.3)));

  return (
    <li className="relative flex items-baseline justify-between gap-4 py-3">
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { scaleX }}
        className="absolute inset-x-0 top-0 h-px origin-left bg-[color-mix(in_srgb,var(--foreground)_15%,transparent)]"
      />
      <p className="text-[length:var(--text-label)] uppercase leading-[1.35] text-muted-foreground">{spec.label}</p>
      <p className="text-right font-mono text-[length:var(--text-small)] leading-[1.35] [overflow-wrap:anywhere]">{spec.value}</p>
    </li>
  );
};

const PlanSheet = ({ plan, index, reduce }: { plan: Plan; index: number; reduce: boolean }) => {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <li ref={ref} className="kit-card flex flex-col gap-6 p-[clamp(1.25rem,2.4vw,2rem)]">
      <CornerTicks delay={index * 0.08} />
      <div className="flex flex-col gap-4">
        <div className="flex gap-[0.25em] text-[length:var(--text-label)] uppercase leading-none text-muted-foreground">
          <p aria-hidden="true">+</p>
          <p>{plan.title}</p>
        </div>
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <p className="whitespace-nowrap font-mono text-[length:var(--text-h2)] leading-none tracking-[-0.04em]">{plan.price}</p>
          {plan.period && <p className="whitespace-nowrap text-[length:var(--text-small)] text-muted-foreground">{plan.period}</p>}
        </div>
        {plan.description && <p className="text-balance text-[length:var(--text-body)] leading-[1.45] text-muted-foreground">{plan.description}</p>}
      </div>
      {plan.features && plan.features.length > 0 && (
        <ul className="flex flex-col">
          {plan.features.map((spec, specIndex) => (
            <SpecRow key={specIndex} spec={spec} index={specIndex} progress={scrollYProgress} reduce={reduce} />
          ))}
        </ul>
      )}
      {plan.button && (
        <a href={plan.button.href} className="btn-secondary mt-auto w-full">
          <p className="btn-label">{plan.button.text}</p>
        </a>
      )}
    </li>
  );
};

const PricingSpecSheet = ({ label = "Engagements", title = "Three ways to run research with us", items = DEFAULT_ITEMS, className }: PricingSpecSheetProps) => {
  const reduce = Boolean(useReducedMotion());
  const kit = useKitMotion();

  return (
    <section aria-label={title ?? label ?? "Pricing"} className={cn("relative z-10 py-[var(--section-space)] text-foreground", className)}>
      <div className="kit-glass mx-auto w-[var(--container)] p-[1.375rem] lg:p-[clamp(2rem,3.5vw,3.5rem)]">
        <div className="mb-[clamp(1.5rem,3vw,3rem)] flex max-w-[44rem] flex-col gap-[clamp(0.75rem,1.4vw,1.25rem)]">
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
        <ul className={cn("grid items-stretch gap-[var(--gap)]", columns(items.length))}>
          {items.map((plan, index) => (
            <PlanSheet key={index} plan={plan} index={index} reduce={reduce} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PricingSpecSheet;
