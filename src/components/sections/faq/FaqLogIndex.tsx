import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import ScrambleLabel from "@/components/kit/ScrambleLabel";
import CornerTicks from "@/components/kit/CornerTicks";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Question = { title: string; description: string };

type FaqLogIndexProps = {
  label?: string;
  title?: string;
  button?: { text: string; href: string };
  items?: Question[];
  ariaLabel?: string;
  className?: string;
};

const defaultItems: Question[] = [
  { title: "What kind of projects do you take on?", description: "Applied research with a clear question: forecasting, language models on private data, and measurement systems that need to hold up in production." },
  { title: "How long does a first study take?", description: "Most first studies run six to ten weeks, from data audit to a working model and a written report your team can act on." },
];

const FaqLogIndex = ({ label, title = "FAQ", button, items = defaultItems, ariaLabel, className }: FaqLogIndexProps) => {
  const reduce = useReducedMotion() ?? false;
  const kit = useKitMotion();
  const [open, setOpen] = useState(0);
  const words = title ? title.split(/\s+/) : [];

  if (!items.length) return null;

  return (
    <section aria-label={ariaLabel ?? title ?? label ?? "FAQ"} className={cn("relative z-10 overflow-x-clip py-[var(--section-space)] text-foreground", className)}>
      <div className="kit-glass mx-auto grid w-[var(--container)] grid-cols-1 gap-[clamp(1.5rem,3vw,3rem)] p-[1.375rem] lg:grid-cols-12 lg:gap-[var(--gap)] lg:p-[clamp(2rem,3.5vw,3.5rem)]">
        <CornerTicks />
        <div className="lg:col-span-4">
          <div className="flex flex-col gap-[clamp(1.25rem,2vw,1.75rem)] lg:sticky lg:top-[clamp(5rem,12svh,8rem)]">
            {label ? <ScrambleLabel prefix="+ " text={label} duration={0.6} className="text-[length:var(--text-label)] uppercase leading-none text-muted-foreground" /> : null}
            {title && (
              <h2 className="text-balance text-[length:var(--text-h1)] leading-[var(--heading-leading)] tracking-[var(--heading-tracking)] [overflow-wrap:anywhere]">
                <div className="sr-only">{title}</div>
                <div aria-hidden="true" className="contents">
                  {words.map((word, i) => (
                    <div key={i} className={cn("-mb-[0.15em] inline-block overflow-hidden pb-[0.15em] align-bottom", i < words.length - 1 && "mr-[0.25em]")}>
                      <motion.div
                        initial={reduce ? false : { y: "110%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                        transition={{ duration: kit.base, ease: kit.ease, delay: 0.3 + i * 0.06 }}
                        className="inline-block"
                      >
                        {word}
                      </motion.div>
                    </div>
                  ))}
                </div>
              </h2>
            )}
            {button && (
              <a href={button.href} className="btn-link self-start">
                {button.text}
                <svg aria-hidden="true" viewBox="0 0 16 16" className="size-[0.875rem]" fill="none" stroke="currentColor" strokeWidth="1.25">
                  <path d="M2 8h12M9 3l5 5-5 5" />
                </svg>
              </a>
            )}
          </div>
        </div>

        <ul className="flex flex-col lg:col-span-8">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <li key={index} className="relative">
                <motion.div
                  aria-hidden="true"
                  initial={reduce ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "0px 0px -5% 0px" }}
                  transition={{ duration: kit.slow, ease: kit.ease, delay: Math.min(index, 6) * 0.06 }}
                  className="absolute inset-x-0 top-0 h-px origin-left bg-[color-mix(in_srgb,var(--foreground)_18%,transparent)]"
                />
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="grid w-full grid-cols-[auto_1fr_auto] items-start gap-x-[clamp(1rem,2.5vw,2.5rem)] py-[clamp(1.25rem,2vw,1.75rem)] text-left"
                >
                  <p aria-hidden="true" className={cn("whitespace-nowrap pt-[0.35em] font-mono text-[length:var(--text-label)] uppercase leading-none transition-colors duration-300", isOpen ? "text-accent" : "text-muted-foreground")}>
                    {`Q ${String(index + 1).padStart(2, "0")}`}
                  </p>
                  <h3 className="text-balance text-[length:var(--text-h3)] leading-[1.2] tracking-[-0.02em] [overflow-wrap:anywhere]">{item.title}</h3>
                  <motion.svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: kit.base, ease: kit.ease }}
                    className="mt-[0.2em] size-[1.125rem]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                  >
                    <path d="M8 1v14M1 8h14" />
                  </motion.svg>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduce ? false : { height: 0 }}
                      animate={{ height: "auto" }}
                      exit={reduce ? undefined : { height: 0, transition: { duration: kit.fast, ease: kit.easeInOut } }}
                      transition={{ duration: kit.base, ease: kit.ease }}
                      className="overflow-hidden"
                    >
                      <div className="relative grid grid-cols-[auto_1fr_auto] gap-x-[clamp(1rem,2.5vw,2.5rem)] pb-[clamp(1.25rem,2vw,1.75rem)]">
                        <p aria-hidden="true" className="invisible whitespace-nowrap font-mono text-[length:var(--text-label)] uppercase leading-none">Q 00</p>
                        <div className="relative">
                          <motion.p
                            initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
                            animate={{ clipPath: "inset(0 0% 0 0)" }}
                            transition={{ duration: 0.9, ease: kit.ease }}
                            className="max-w-[40em] text-balance text-[length:var(--text-body)] leading-[1.55] text-muted-foreground"
                          >
                            {item.description}
                          </motion.p>
                          {!reduce && (
                            <motion.div
                              aria-hidden="true"
                              initial={{ left: "0%", opacity: 1 }}
                              animate={{ left: "100%", opacity: [1, 1, 0] }}
                              transition={{ duration: 0.9, ease: kit.ease }}
                              className="pointer-events-none absolute inset-y-0 w-px bg-accent"
                            />
                          )}
                        </div>
                        <div aria-hidden="true" className="size-[1.125rem]" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FaqLogIndex;
