import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CornerTicks from "@/components/kit/CornerTicks";
import ImageScrollParallax from "@/components/animation/ImageScrollParallax";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Field = { name: string; label: string; type?: "text" | "email" | "tel" | "textarea"; placeholder?: string; required?: boolean };

type ContactBeaconFormProps = {
  title?: string;
  fields?: Field[];
  submitText?: string;
  successText?: string;
  imageSrc?: string;
  imageAlt?: string;
  meta?: string;
  className?: string;
};

const px = (id: number, w = 1200) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const DEFAULT_FIELDS: Field[] = [
  { name: "name", label: "Name", placeholder: "Your full name", required: true },
  { name: "email", label: "Email", type: "email", placeholder: "you@company.com", required: true },
  { name: "company", label: "Organisation", placeholder: "Where you work" },
  { name: "message", label: "Message", type: "textarea", placeholder: "What should we measure together?", required: true },
];

const ContactBeaconForm = ({
  title = "Tell us what you want to measure",
  fields = DEFAULT_FIELDS,
  submitText = "Send request",
  successText = "Received, we reply within two days",
  imageSrc = px(4254168, 800),
  imageAlt = "An engineer checking equipment outdoors",
  meta = "Ch 12 / N 59.33 / E 18.06",
  className,
}: ContactBeaconFormProps) => {
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section aria-label={title} data-terrain="calm" className={cn("relative z-10 py-[var(--section-space)] text-foreground", className)}>
      <div className="kit-glass mx-auto grid w-[var(--container)] gap-[clamp(2rem,4vw,4rem)] p-[1.375rem] lg:grid-cols-2 lg:p-[clamp(2rem,3.5vw,3.5rem)]">
        <div className="flex flex-col">
          <motion.div initial="hidden" whileInView="shown" viewport={{ once: true }} className="-mb-[0.15em] overflow-hidden pb-[0.15em]">
            <motion.h2
              variants={{ hidden: { y: reduce ? 0 : "110%" }, shown: { y: 0 } }}
              transition={{ duration: kit.base, ease: kit.ease }}
              className="max-w-[16em] text-balance text-[length:var(--text-h1)]"
            >
              {title}
            </motion.h2>
          </motion.div>

          <form onSubmit={submit} className="mt-[clamp(1.5rem,3vw,3rem)] flex flex-col gap-[clamp(1.25rem,2.4vw,2rem)]">
            {fields.map((field, index) => (
              <motion.label
                key={field.name}
                initial="hidden"
                whileInView="shown"
                viewport={{ once: true }}
                className="group flex flex-col gap-2"
              >
                <p className="text-[length:var(--text-label)] uppercase leading-[1.2] text-muted-foreground">{field.label}</p>
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    required={field.required}
                    placeholder={field.placeholder}
                    rows={3}
                    className="w-full resize-none bg-transparent pb-2 text-[length:var(--text-body-lg)] leading-[1.4] text-foreground outline-none placeholder:text-muted-foreground/60"
                  />
                ) : (
                  <input
                    name={field.name}
                    type={field.type ?? "text"}
                    required={field.required}
                    placeholder={field.placeholder}
                    className="w-full bg-transparent pb-2 text-[length:var(--text-body-lg)] leading-[1.4] text-foreground outline-none placeholder:text-muted-foreground/60"
                  />
                )}
                <div aria-hidden="true" className="relative h-px">
                  <p className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 font-mono text-[length:var(--text-label)] leading-none text-muted-foreground transition-colors duration-300 group-focus-within:text-accent">
                    +
                  </p>
                  <motion.div
                    variants={{ hidden: { scaleX: reduce ? 1 : 0 }, shown: { scaleX: 1 } }}
                    transition={{ duration: kit.slow, ease: kit.ease, delay: 0.1 + index * 0.08 }}
                    className="absolute inset-0 origin-left bg-foreground/25"
                  />
                  <div className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within:scale-x-100" />
                </div>
              </motion.label>
            ))}
            <div className="flex flex-col items-start gap-3 pt-2">
              <button type="submit" disabled={sent} className="btn-primary disabled:cursor-default">
                <p className="btn-label">{sent ? successText : submitText}</p>
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-3">
          <div className="kit-card relative flex min-h-[20rem] flex-1 p-3">
            <motion.div
              initial={reduce ? false : { scale: 1.06, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: kit.slow, ease: kit.ease, delay: 0.15 }}
              className="relative flex-1 overflow-hidden"
            >
              <ImageScrollParallax imageSrc={imageSrc} imageAlt={imageAlt} strength={0.12} className="absolute inset-0 aspect-auto h-full rounded-none" />
            </motion.div>
            <CornerTicks />
          </div>
          {meta && <p className="font-mono text-[length:var(--text-label)] uppercase leading-[1.2] text-muted-foreground">{meta}</p>}
        </div>
      </div>
    </section>
  );
};

export default ContactBeaconForm;
