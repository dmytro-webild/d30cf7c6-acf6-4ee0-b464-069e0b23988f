import { Fragment, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import HorizontalScrollSection from "@/components/animation/HorizontalScrollSection";
import ImageScrollParallax from "@/components/animation/ImageScrollParallax";
import CornerTicks from "@/components/kit/CornerTicks";
import ScrambleLabel from "@/components/kit/ScrambleLabel";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Step = { title: string; description?: string; imageSrc: string; imageAlt?: string };

type ProcessTransectRailProps = {
  label?: string;
  title?: string;
  items?: Step[];
  stepText?: string;
  className?: string;
};

const px = (id: number, w = 1200) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const DEFAULT_ITEMS: Step[] = [
  { title: "Frame the question", description: "We pin down what a model must decide and what it may never get wrong.", imageSrc: px(3184292, 800), imageAlt: "Team at a table" },
  { title: "Collect in the field", description: "Our crews place sensors and log data at the source, not from a vendor.", imageSrc: px(442589, 800), imageAlt: "Drone over a field" },
  { title: "Train and test", description: "Models train on our own sets and face held-out sites they never saw.", imageSrc: px(4508751, 800), imageAlt: "Server aisle" },
  { title: "Ship and watch", description: "We deploy with live drift checks and return to the field every quarter.", imageSrc: px(3861969, 800), imageAlt: "Charts on a laptop" },
];

const pad = (n: number) => String(n).padStart(2, "0");

const Ruler = ({ progress, index, count }: { progress: MotionValue<number>; index: number; count: number }) => {
  const fill = useTransform(progress, (v) => Math.min(1, Math.max(0, v * count - index)));
  const marker = useTransform(fill, (f) => `${f * 100}%`);
  const shown = useTransform(fill, (f) => ((f > 0 && f < 1) || (index === count - 1 && f >= 1) || (index === 0 && f <= 0) ? 1 : 0));

  return (
    <div aria-hidden="true" className="relative h-3">
      <div className="absolute inset-x-0 top-0 h-px bg-foreground/20" />
      <div className="absolute inset-x-0 top-0 h-2 bg-[repeating-linear-gradient(90deg,color-mix(in_srgb,var(--foreground)_28%,transparent)_0_1px,transparent_1px_0.75rem)]" />
      <motion.div style={{ scaleX: fill }} className="absolute inset-x-0 top-0 h-px origin-left bg-accent will-change-transform" />
      <motion.div style={{ scaleX: fill }} className="absolute inset-x-0 top-0 h-2 origin-left bg-[repeating-linear-gradient(90deg,var(--accent)_0_1px,transparent_1px_0.75rem)] will-change-transform" />
      <motion.div style={{ x: marker, opacity: shown }} className="absolute inset-x-0 top-0 will-change-transform">
        <p className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 font-mono text-[length:var(--text-body)] leading-none text-accent">+</p>
      </motion.div>
    </div>
  );
};

const Photo = ({ item }: { item: Step }) => {
  const reduce = useReducedMotion();
  const kit = useKitMotion();

  return (
    <motion.div initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.3 }} className="kit-card relative aspect-[4/3] h-[min(14rem,24svh)] p-2">
      <motion.div
        variants={{ hidden: { clipPath: reduce ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }, shown: { clipPath: "inset(0 0% 0 0)" } }}
        transition={{ duration: 0.9, ease: kit.ease }}
        className="relative h-full w-full overflow-hidden"
      >
        <motion.div variants={{ hidden: { scale: reduce ? 1 : 1.06 }, shown: { scale: 1 } }} transition={{ duration: kit.slow, ease: kit.ease }} className="h-full w-full">
          <ImageScrollParallax imageSrc={item.imageSrc} imageAlt={item.imageAlt ?? item.title} strength={0.1} className="aspect-auto h-full rounded-none" />
        </motion.div>
      </motion.div>
      <motion.div
        aria-hidden="true"
        variants={{ hidden: { x: "0%", opacity: reduce ? 0 : 1 }, shown: { x: "100%", opacity: 0 } }}
        transition={{ x: { duration: 0.9, ease: kit.ease }, opacity: { duration: 0.3, delay: 0.75 } }}
        className="pointer-events-none absolute inset-2 will-change-transform"
      >
        <div className="absolute inset-y-0 left-0 w-px bg-accent" />
      </motion.div>
      <CornerTicks />
    </motion.div>
  );
};

const Text = ({ item, index, count, stepText }: { item: Step; index: number; count: number; stepText: string }) => (
  <div className="kit-card flex max-w-[24rem] flex-col gap-2 p-4">
    <CornerTicks />
    <p aria-hidden="true" className="whitespace-nowrap font-mono text-[length:var(--text-label)] uppercase leading-[1.2] text-muted-foreground">
      {stepText} {pad(index + 1)} / {pad(count)}
    </p>
    <h3 className="text-balance text-[length:var(--text-h3)] leading-[1.05] [overflow-wrap:anywhere]">{item.title}</h3>
    {item.description && <p className="text-balance text-[length:var(--text-body)] leading-[1.45] text-muted-foreground">{item.description}</p>}
  </div>
);

const ProcessTransectRail = ({ label = "Process", title = "How a model gets made here", items = DEFAULT_ITEMS, stepText = "Step", className }: ProcessTransectRailProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useTransform(scrollYProgress, (v) => (reduce ? 1 : v));
  const count = items.length;

  const header = (
    <div className="kit-glass flex w-fit max-w-full flex-col gap-[clamp(0.75rem,1.4vw,1.25rem)] p-[1.375rem] lg:p-[clamp(1.5rem,2.5vw,2.25rem)]">
      <CornerTicks />
      <ScrambleLabel prefix="+ " text={label} duration={0.6} className="text-[length:var(--text-label)] uppercase leading-[1.2] text-muted-foreground" />
      <motion.div initial="hidden" whileInView="shown" viewport={{ once: true }} className="-mb-[0.15em] overflow-hidden pb-[0.15em]">
        <motion.h2
          variants={{ hidden: { y: reduce ? 0 : "110%" }, shown: { y: 0 } }}
          transition={{ duration: kit.base, ease: kit.ease, delay: 0.2 }}
          className="max-w-[18em] text-balance text-[length:var(--text-h1)]"
        >
          {title}
        </motion.h2>
      </motion.div>
    </div>
  );

  return (
    <section aria-label={title} data-scene data-terrain="valley" className={cn("relative z-10 text-foreground", className)}>
      <div ref={ref}>
        <HorizontalScrollSection
          compact
          progress={false}
          header={header}
          headerClassName="w-[var(--container)] max-w-none px-0"
          trackClassName="gap-0 px-[max(var(--gutter),calc((100vw-var(--max-w))/2))]"
        >
          <div className="grid grid-flow-col grid-rows-[auto_auto_auto] auto-cols-[85vw] lg:auto-cols-[min(30rem,38vw)]">
            {items.map((item, index) => {
              const up = index % 2 === 0;
              return (
                <Fragment key={index}>
                  <div className="flex items-end pb-4 pr-[clamp(1.5rem,4vw,4rem)]">{up ? <Photo item={item} /> : <Text item={item} index={index} count={count} stepText={stepText} />}</div>
                  <Ruler progress={progress} index={index} count={count} />
                  <div className="flex items-start pr-[clamp(1.5rem,4vw,4rem)] pt-4">{up ? <Text item={item} index={index} count={count} stepText={stepText} /> : <Photo item={item} />}</div>
                </Fragment>
              );
            })}
          </div>
        </HorizontalScrollSection>
      </div>
    </section>
  );
};

export default ProcessTransectRail;
