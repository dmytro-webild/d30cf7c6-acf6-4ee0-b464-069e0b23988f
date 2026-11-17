import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionStyle } from "motion/react";
import CornerTicks from "@/components/kit/CornerTicks";
import ScrambleLabel from "@/components/kit/ScrambleLabel";
import { useKitMotion } from "@/components/kit/kitMotion";

type Button = { text: string; href: string };

type HeroSplitHorizonProps = {
  titleTop?: string;
  titleBottom?: string;
  description?: string;
  readout?: { value: string; label: string };
  beacon?: { label: string; coordinates: string; elevation: number };
  primaryButton?: Button;
  secondaryButton?: Button;
  scrollLabel?: string;
  introDelay?: number;
  ariaLabel?: string;
  className?: string;
};

const TICKS = 31;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const HeroSplitHorizon = ({
  titleTop = "Applied research",
  titleBottom = "for living data",
  description = "Northfield Labs builds forecasting and language models for teams whose data changes every hour.",
  readout = { value: "Est. 2014", label: "212 field sites, one standard of evidence" },
  beacon = { label: "Field site 212", coordinates: "N 59.33 / E 18.06", elevation: 41.2 },
  primaryButton = { text: "Start a study", href: "#contact" },
  secondaryButton = { text: "See the work", href: "#gallery" },
  scrollLabel = "Scroll to survey",
  introDelay = 0,
  ariaLabel,
  className,
}: HeroSplitHorizonProps) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { ease } = useKitMotion();
  const [go, setGo] = useState(introDelay <= 0);
  const elevRef = useRef<HTMLParagraphElement>(null);
  const elevation = beacon?.elevation;

  useEffect(() => {
    const el = elevRef.current;
    if (!el || elevation === undefined) return;
    const write = () => {
      const t = performance.now() / 1000;
      el.textContent = `Elev ${(elevation + Math.sin(t * 0.7) * 0.18 + Math.sin(t * 2.3) * 0.04).toFixed(2)} m`;
    };
    write();
    if (reduce) return;
    const id = window.setInterval(write, 1100);
    return () => window.clearInterval(id);
  }, [elevation, reduce]);

  useEffect(() => {
    if (go) return;
    const start = () => setGo(true);
    const fallback = window.setTimeout(start, (introDelay + 1.5) * 1000);
    window.addEventListener("kit:intro", start);
    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("kit:intro", start);
    };
  }, [go, introDelay]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const topX = useTransform(scrollYProgress, (v) => `${-14 * clamp01(v)}vw`);
  const bottomX = useTransform(scrollYProgress, (v) => `${14 * clamp01(v)}vw`);
  const linesOpacity = useTransform(scrollYProgress, (v) => 1 - clamp01((v - 0.35) / 0.6));
  const fallOpacity = useTransform(scrollYProgress, (v) => 1 - clamp01(v / 0.7));
  const fallY = useTransform(scrollYProgress, (v) => `${3 * clamp01(v / 0.7)}rem`);
  const rulerClip = useTransform(scrollYProgress, (v) => `inset(0 ${100 - 100 * clamp01(v)}% 0 0)`);

  const still = Boolean(reduce);
  const rise = (delay: number) => ({
    initial: still ? false : { y: "110%" },
    animate: go || still ? { y: "0%" } : { y: "110%" },
    transition: { duration: 1.1, delay, ease },
  });
  const fade = (delay: number) => ({
    initial: still ? false : { opacity: 0, y: 16 },
    animate: go || still ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    transition: { duration: 0.8, delay, ease },
  });

  const ruler = (bright: boolean) => (
    <div className="flex h-[0.75rem] items-end justify-between">
      {Array.from({ length: TICKS }, (_, i) => (
        <div key={i} className={`w-px ${bright ? "bg-accent" : "bg-foreground/35"} ${i % 5 === 0 ? "h-full" : "h-1/2"}`} />
      ))}
    </div>
  );

  const lines = [
    { text: titleTop, x: topX, delay: 0.15 },
    { text: titleBottom, x: bottomX, delay: 0.25 },
  ].filter((line) => line.text);

  return (
    <section ref={ref} aria-label={ariaLabel ?? "Intro"} data-scene className={`relative h-[160svh] overflow-x-clip text-foreground ${className ?? ""}`}>
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        {beacon && (
          <motion.div style={{ opacity: fallOpacity }} aria-hidden="true" className="pointer-events-none absolute inset-0">
            <motion.div
              initial={still ? false : { opacity: 0 }}
              animate={go || still ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.9, ease }}
              className="absolute inset-0"
            >
              <div data-terrain-beacon className="absolute left-0 top-0 opacity-0 will-change-transform">
                <div className="absolute left-0 top-0 size-[2.75rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/50 animate-[ping_3.2s_cubic-bezier(0,0,0.2,1)_infinite] motion-reduce:animate-none" />
                <div className="absolute left-0 top-0 size-[2.75rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/30 animate-[ping_3.2s_cubic-bezier(0,0,0.2,1)_1.6s_infinite] motion-reduce:animate-none" />
                <div className="absolute left-0 top-0 size-[1.25rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/50" />
                <div className="absolute left-0 top-0 size-[0.375rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
                <div className="absolute bottom-[0.625rem] left-0 h-[3rem] w-px bg-gradient-to-t from-foreground/0 to-foreground/45 lg:h-[4.5rem]" />
                <div className="absolute bottom-[3.625rem] left-0 flex w-[9.5rem] flex-col gap-[0.5rem] border border-foreground/15 bg-background/60 px-[0.75rem] py-[0.625rem] lg:bottom-[5.125rem] lg:w-[11.5rem]">
                  <CornerTicks show={go} delay={1.1} size="0.5rem" />
                  <p className="text-[length:0.6875rem] uppercase leading-none text-muted-foreground">+ {beacon.label}</p>
                  <p className="whitespace-nowrap font-mono text-[length:0.6875rem] uppercase leading-none">{beacon.coordinates}</p>
                  <div className="flex items-center gap-[0.5rem]">
                    <div className="size-[0.3125rem] rounded-full bg-accent" />
                    <p ref={elevRef} className="whitespace-nowrap font-mono text-[length:0.6875rem] uppercase leading-none" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        <div className="relative mx-auto h-full w-[var(--container)]">
          <h1 className="absolute left-0 top-[clamp(5rem,4.3rem+2.6vw,6.75rem)] max-w-full text-[length:clamp(2.75rem,1.83rem+4.22vw,5.75rem)] font-normal leading-[0.93] tracking-[-0.035em]">
            {lines.map((line, index) => (
              <motion.div key={index} style={{ x: line.x, opacity: linesOpacity } as unknown as MotionStyle} className="will-change-transform">
                <div className="-mb-[0.15em] overflow-hidden pb-[0.15em]">
                  <motion.div {...rise(line.delay)} className="text-balance">
                    {line.text}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </h1>

          <motion.div
            style={{ opacity: fallOpacity, y: fallY } as unknown as MotionStyle}
            className="absolute inset-x-0 bottom-[clamp(1.5rem,5svh,3rem)] flex flex-col-reverse gap-[1.5rem] lg:flex-row lg:items-end lg:justify-between"
          >
            {(primaryButton || secondaryButton) && (
              <motion.div {...fade(0.55)} className="grid grid-cols-2 gap-[0.5rem] lg:flex lg:flex-wrap">
                {primaryButton && (
                  <a href={primaryButton.href} className="btn-primary min-w-0">
                    <p className="btn-label">{primaryButton.text}</p>
                  </a>
                )}
                {secondaryButton && (
                  <a href={secondaryButton.href} className="btn-secondary min-w-0">
                    <p className="btn-label">{secondaryButton.text}</p>
                  </a>
                )}
              </motion.div>
            )}

            <motion.div {...fade(0.65)} className="absolute bottom-0 left-1/2 hidden w-[clamp(9rem,14vw,12rem)] -translate-x-1/2 flex-col items-center gap-[0.625rem] lg:flex">
              <div className="relative w-full">
                {ruler(false)}
                <motion.div style={{ clipPath: rulerClip }} className="absolute inset-0">
                  {ruler(true)}
                </motion.div>
              </div>
              {scrollLabel && <p className="whitespace-nowrap text-[length:var(--text-label)] uppercase leading-none text-muted-foreground">{scrollLabel}</p>}
            </motion.div>

            <div className="flex w-[min(100%,13.5rem)] flex-col gap-[1rem] lg:ml-auto lg:w-[clamp(14.5rem,16.5vw,17rem)]">
              {readout && (
                <motion.div {...fade(0.4)} className="relative grid grid-cols-[auto_minmax(0,1fr)] border border-foreground/15 bg-background/60">
                  <CornerTicks show={go} delay={0.2} size="0.5rem" />
                  <div className="flex flex-col items-center justify-center gap-[0.5rem] border-r border-foreground/15 px-[0.875rem] py-[0.75rem]">
                    <div aria-hidden="true" className="relative size-[1.375rem] rounded-full border border-foreground/60">
                      <div className="absolute inset-x-[-0.25rem] top-1/2 h-px -translate-y-1/2 bg-foreground/60" />
                      <div className="absolute inset-y-[-0.25rem] left-1/2 w-px -translate-x-1/2 bg-foreground/60" />
                    </div>
                    <p className="whitespace-nowrap font-mono text-[length:0.6875rem] uppercase leading-none">{readout.value}</p>
                  </div>
                  <div className="flex items-center px-[0.875rem] py-[0.75rem]">
                    <ScrambleLabel text={readout.label} start={go} duration={0.6} className="text-[length:0.6875rem] uppercase leading-[1.25] [overflow-wrap:anywhere]" />
                  </div>
                </motion.div>
              )}
              {description && (
                <motion.p {...fade(0.5)} className="text-justify text-[length:clamp(0.9375rem,0.9rem+0.12vw,1.0625rem)] leading-[1.2] text-foreground/85">
                  {description}
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSplitHorizon;
