import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { ThankYou } from "@/components/registration/thank-you";
import { isCheckinApp } from "@/lib/app-mode";

export function generateMetadata(): Metadata {
  if (isCheckinApp()) {
    return {
      title: "You’re checked in | The Birthwave",
      robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false, noimageindex: true },
      },
      referrer: "no-referrer",
    };
  }

  return {
    title: "Thank you | The Birthwave",
    description: "Your enquiry has been received by The Birthwave.",
    robots: { index: false, follow: false },
  };
}

export const dynamic = "force-dynamic";

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const checkin = isCheckinApp();

  if (checkin) {
    const params = await searchParams;
    return <ThankYou checkin kiosk={params.kiosk === "1"} />;
  }

  return (
    <PageShell>
      <section className="relative flex min-h-[70svh] items-center bg-paper-dim/40 px-6 pt-[calc(var(--header-height)+var(--space-section-sm))] pb-(--space-section-sm)">
        <div className="container-birthwave w-full">
          <div className="w-full rounded-sm border border-[var(--color-border)] bg-paper p-8 sm:p-12">
            <p className="eyebrow">Enquiry received</p>
            <h1 className="mt-4 font-display text-h1 font-semibold tracking-[var(--tracking-tight)] text-ink">
              Thank you for contacting The Birthwave
            </h1>
            <p className="mt-5 max-w-xl text-base leading-[var(--leading-relaxed)] text-ink-soft sm:text-lg">
              Your enquiry has been received. Our team will contact you shortly. For an urgent concern,
              please call the clinic directly.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/" variant="primary">Return home</Button>
              <Button href="/contact" variant="ghost" withArrow={false}>Contact details</Button>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}