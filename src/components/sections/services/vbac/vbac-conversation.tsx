import { vbacConversation, vbacInformed } from "@/content/vbac-landing-content";
import { VbacImage } from "./vbac-image";
import { VbacReveal } from "./vbac-reveal";
import { Button } from "@/components/ui/button";
import { cx } from "@/lib/cx";

/**
 * Section 3 — What a VBAC Conversation May Cover. Two substantial
 * image-and-text compositions covering the brief's four topics (two per
 * composition) — matching the "avoid one photograph per short sentence"
 * instruction and the same alternating-story layout the other landing
 * pages already establish. Every topic is phrased as something to discuss,
 * never something BirthWave automatically offers or approves.
 */
export function VbacConversation() {
  return (
    <section id="vbac-conversation" aria-labelledby="vbac-conversation-heading" className="relative isolate scroll-mt-[var(--header-height)] bg-paper section-pad">
      <VbacReveal className="container-birthwave">
        <p className="eyebrow">{vbacConversation.eyebrow}</p>
        <h2 id="vbac-conversation-heading" className="mt-4 max-w-2xl text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {vbacConversation.heading}
        </h2>

        <div className="mt-10 flex flex-col gap-6">
          {vbacConversation.compositions.map((composition, index) => {
            const imageOnRight = index % 2 === 1;
            return (
              <div
                key={composition.tag}
                className={cx(
                  "grid grid-cols-1 overflow-hidden rounded-xs lg:grid-cols-2 lg:items-stretch",
                  index === 0 ? "bg-[var(--color-paper-dim)]" : "bg-[var(--vbac-sky-wash)]",
                )}
              >
                <div className={cx("relative", imageOnRight && "lg:order-2")}>
                  <VbacImage
                    imageKey={composition.imageKey}
                    aspect="aspect-[4/3] lg:h-full"
                    corner={index === 0 ? "tl" : "tr"}
                    className="h-full min-h-[220px] rounded-none sm:min-h-[280px]"
                  />
                </div>

                <div className={cx("flex min-w-0 flex-col justify-center p-8 sm:p-10", imageOnRight && "lg:order-1")}>
                  <p className="font-body text-[0.6875rem] font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">{composition.tag}</p>

                  <div className="mt-4 flex flex-col">
                    {composition.blocks.map((block) => (
                      <div key={block.title} className="border-t border-[var(--color-border)] py-6 first:border-t-0 first:pt-2">
                        <h3 className="text-lg font-semibold text-ink">{block.title}</h3>
                        <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{block.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </VbacReveal>
    </section>
  );
}

/**
 * Section 4 — Informed Choices. A calm, text-led continuation of the same
 * conversation, deliberately kept plain — no image slot was reserved for
 * this section (see `vbac-landing-imagery.ts`'s own five-slot allocation),
 * matching the "no image, text-led" precedent
 * `normal-birth-delivery-comfort.tsx` already establishes for a comparable
 * need. The statement below is the page's clearest, most direct routing of
 * the actual decision back to the reader's own obstetrician.
 */
export function VbacInformed() {
  return (
    <section id="vbac-informed" aria-labelledby="vbac-informed-heading" className="relative isolate bg-[var(--vbac-coral-wash)] section-pad">
      <VbacReveal className="container-birthwave max-w-2xl">
        <p className="eyebrow">{vbacInformed.eyebrow}</p>
        <h2 id="vbac-informed-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {vbacInformed.heading}
        </h2>

        <p className="mt-6 border-l-2 border-terracotta pl-4 text-lg leading-[var(--leading-relaxed)] font-medium text-ink">{vbacInformed.statement}</p>
        <p className="mt-4 text-base leading-[var(--leading-relaxed)] text-ink-soft">{vbacInformed.body}</p>

        <div className="mt-8 flex flex-col">
          {vbacInformed.questions.map((question) => (
            <p key={question} className="border-t border-[var(--color-border)] py-3 font-body text-sm font-medium text-ink first:pt-0">
              {question}
            </p>
          ))}
        </div>

        <div className="mt-8">
          <Button href={vbacInformed.cta.href} variant="primary">
            {vbacInformed.cta.label}
          </Button>
        </div>
      </VbacReveal>
    </section>
  );
}
