"use client";

import React, { useState, useId, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Activity,
  ArrowRight,
  Phone,
  Home,
  Headphones,
  Stethoscope,
  ChevronRight,
  MapPin,
  X,
  Wind,
  Flower2,
} from "lucide-react";

interface SearchResultItem {
  title: string;
  category: "Pathway" | "Doctor" | "Support";
  href: string;
  hint: string;
}

const SEARCHABLE_ITEMS: SearchResultItem[] = [
  {
    title: "Obstetrics & Antenatal Care",
    category: "Pathway",
    href: "/services/pregnancy-antenatal-care",
    hint: "Comprehensive clinical monitoring through every trimester",
  },
  {
    title: "Natural Birth Care",
    category: "Pathway",
    href: "/services/natural-birth",
    hint: "Physiological birthing suites, comfort measures & gentle birth",
  },
  {
    title: "Birth Preparation & Partner Education",
    category: "Pathway",
    href: "/services/birth-preparation",
    hint: "Workshops, breathing coaching & labor advocacy",
  },
  {
    title: "Fertility & Reproductive Health",
    category: "Pathway",
    href: "/services/fertility-preconception",
    hint: "Preconception counseling, endocrine care & reproductive guidance",
  },
  {
    title: "VBAC (Vaginal Birth After Caesarean)",
    category: "Pathway",
    href: "/services/vbac",
    hint: "Clinical assessment and birth planning after a prior caesarean",
  },
  {
    title: "Vaginismus & Intimate Wellness",
    category: "Pathway",
    href: "/services/vaginismus",
    hint: "Private, supportive guidance for pelvic health and intimate wellness",
  },
  {
    title: "Specialist Directory & Midwives",
    category: "Doctor",
    href: "/doctors",
    hint: "Meet Dr. Santoshi, Dr. Bharathy & our senior midwifery team",
  },
  {
    title: "Nungambakkam Sanctuary Tour",
    category: "Support",
    href: "/the-experience",
    hint: "Explore our quiet, humane birthing suites in Chennai",
  },
  {
    title: "Care Concierge & Appointments",
    category: "Support",
    href: "/contact",
    hint: "Speak with patient navigators or schedule visits",
  },
];

export function NotFoundView() {
  const router = useRouter();
  const searchInputId = useId();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isBreathingModalOpen, setIsBreathingModalOpen] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"Inhale" | "Hold" | "Exhale">("Inhale");
  const [breathCount, setBreathCount] = useState(4);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Filter search results
  const filteredResults = searchQuery.trim()
    ? SEARCHABLE_ITEMS.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.hint.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()),
      ).slice(0, 5)
    : [];

  // Close search suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Guided breathing cycle logic
  useEffect(() => {
    if (!isBreathingModalOpen) return;

    const interval = setInterval(() => {
      setBreathCount((prev) => {
        if (prev > 1) return prev - 1;

        // Transition phases
        if (breathPhase === "Inhale") {
          setBreathPhase("Hold");
          return 4;
        } else if (breathPhase === "Hold") {
          setBreathPhase("Exhale");
          return 6;
        } else {
          setBreathPhase("Inhale");
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreathingModalOpen, breathPhase]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredResults.length > 0) {
      router.push(filteredResults[0].href);
    } else if (searchQuery.trim()) {
      router.push(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/services");
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf8f5] text-[#241a17] selection:bg-[#ca9585] selection:text-[#241a17] font-body relative flex flex-col justify-between overflow-x-hidden">
      {/* Top ambient warm lighting bloom */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#f3e1d7]/40 via-[#f8ede7]/20 to-transparent blur-3xl rounded-full -z-10"
        aria-hidden="true"
      />

      {/* Main Content Area */}
      <main id="main-content" className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 pt-8 sm:pt-12 pb-16 sm:pb-24">
        {/* Top Eyebrow Pill */}
        <div className="flex items-center justify-start mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4e8e1] border border-[#eedfd6] text-[11px] sm:text-xs font-semibold tracking-[0.16em] text-[#8c5a4a] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8c5a4a] animate-pulse" />
            <span>A Gentle Detour</span>
            <span className="opacity-40">•</span>
            <span>The Birthwave Care Portal</span>
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading, Search & Emergency Banner */}
          <div className="lg:col-span-7 relative z-10">
            {/* Watermark 404 behind title */}
            <div
              className="absolute -top-10 sm:-top-14 lg:-top-16 -left-1 sm:-left-3 select-none pointer-events-none -z-10 font-serif font-light text-[#f0e1d7]/70 text-[7.5rem] sm:text-[10rem] md:text-[11.5rem] lg:text-[12.5rem] leading-none tracking-tighter"
              aria-hidden="true"
            >
              404
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-[2.25rem] sm:text-[2.85rem] lg:text-[3.35rem] font-medium leading-[1.16] tracking-[-0.015em] text-[#241a17]">
              We couldn’t find the page <br className="hidden sm:inline" />
              you were looking for, but <br className="hidden sm:inline" />
              your care is never lost.
            </h1>

            {/* Subtext Paragraph */}
            <p className="mt-5 sm:mt-6 text-[#5b4a43] text-sm sm:text-base leading-[1.65] max-w-[54ch]">
              Much like an unexpected pause in birth or care planning, some paths
              take an unhurried turn. The clinical page or document you requested
              might have been moved, updated, or temporarily rested.
            </p>

            {/* Interactive Search Bar */}
            <div ref={searchContainerRef} className="mt-7 sm:mt-8 relative max-w-[520px]">
              <form
                onSubmit={handleSearchSubmit}
                role="search"
                className="relative flex items-center bg-white rounded-full border border-[#e4d3c9] shadow-[0_2px_12px_rgba(36,26,23,0.04)] hover:border-[#ca9585] focus-within:border-[#8c5a4a] focus-within:ring-2 focus-within:ring-[#ca9585]/30 transition-all p-1.5 pl-4 sm:pl-5"
              >
                <label htmlFor={searchInputId} className="sr-only">
                  Search clinical pathways, specialists, or patient guides
                </label>
                <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#8c5a4a] shrink-0 mr-3" />
                <input
                  id={searchInputId}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search clinical pathways, specialists, or patient guides..."
                  className="w-full bg-transparent text-xs sm:text-sm text-[#241a17] placeholder:text-[#5b4a43]/50 focus:outline-none pr-3"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="p-1 mr-1 text-[#5b4a43]/60 hover:text-[#241a17]"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="submit"
                  className="shrink-0 bg-[#8c4d38] hover:bg-[#783e2c] active:bg-[#663222] text-white text-xs sm:text-sm font-medium px-5 sm:px-6 py-2 sm:py-2.5 rounded-full transition-colors duration-200 shadow-sm"
                >
                  Search
                </button>
              </form>

              {/* Live Autocomplete Suggestions */}
              {isSearchFocused && filteredResults.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-[#eedfd6] shadow-xl py-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#8c5a4a]">
                    Suggested Pathways
                  </div>
                  <ul>
                    {filteredResults.map((item) => (
                      <li key={item.title}>
                        <Link
                          href={item.href}
                          onClick={() => setIsSearchFocused(false)}
                          className="flex items-center justify-between px-4 py-2.5 hover:bg-[#faf2ee] transition-colors group"
                        >
                          <div>
                            <div className="text-xs sm:text-sm font-medium text-[#241a17] group-hover:text-[#8c4d38] transition-colors">
                              {item.title}
                            </div>
                            <div className="text-[11px] sm:text-xs text-[#5b4a43]/80">
                              {item.hint}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#8c5a4a] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Emergency Support Banner */}
            <div className="mt-5 sm:mt-6 max-w-[520px] rounded-2xl bg-[#faeee8] border border-[#f0dad0] p-4 flex items-start sm:items-center gap-3.5 shadow-xs">
              <div className="w-8 h-8 rounded-full bg-[#f4dfd6] text-[#8c4d38] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                <Activity className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-[0.84rem] leading-snug text-[#5b4a43]">
                <strong className="font-semibold text-[#241a17]">
                  Require immediate clinical support?
                </strong>{" "}
                Contact our round-the-clock Triage &amp; Labour Ward at{" "}
                <a
                  href="tel:+919363031925"
                  className="font-semibold text-[#8c4d38] hover:text-[#733624] underline underline-offset-4 decoration-[#8c4d38]/50 hover:decoration-[#8c4d38] transition-all"
                >
                  +91 93630 31925
                </a>
                .
              </p>
            </div>
          </div>

          {/* Right Column: Sculptural Organic Pebble Sanctuary Portal */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0 relative">
            <div className="relative w-full max-w-[390px] sm:max-w-[425px]">
              {/* Soft ambient backdrop glow */}
              <div
                className="absolute inset-0 bg-[#e8d5cb]/40 blur-3xl rounded-full -z-10"
                aria-hidden="true"
              />

              {/* Sculptural Organic Pebble Matte Outer Frame */}
              <div
                className="p-2 sm:p-2.5 bg-[#f6eee9] border border-[#ebdcd3] shadow-[0_22px_55px_rgba(36,26,23,0.08)] transition-transform duration-500 hover:scale-[1.01]"
                style={{
                  borderRadius: "45% 55% 48% 52% / 39% 35% 65% 61%",
                }}
              >
                {/* Inner Organic Clipped Sanctuary Picture */}
                <div
                  className="relative aspect-[3.6/4.65] w-full overflow-hidden bg-[#f0e3db] group"
                  style={{
                    borderRadius: "44% 56% 48% 52% / 38% 34% 66% 62%",
                  }}
                >
                  <Image
                    src="/images/sanctuary-404.jpg"
                    alt="Nungambakkam Sanctuary at The Birthwave, peaceful consultation lounge with terracotta arches"
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 425px, 425px"
                    className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Dark gradient overlay at bottom for sanctuary caption */}
                  <div className="absolute inset-x-0 bottom-0 pt-28 pb-5 px-6 bg-gradient-to-t from-[#241a17]/85 via-[#241a17]/40 to-transparent flex flex-col justify-end text-white">
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold tracking-[0.16em] uppercase text-white/90">
                      <MapPin className="w-3.5 h-3.5 text-[#ca9585]" />
                      <span>NUNGAMBAKKAM SANCTUARY</span>
                    </div>
                    <blockquote className="font-serif italic text-xs sm:text-sm text-white/95 mt-1 leading-snug">
                      “Every journey deserves its own quiet tempo.”
                    </blockquote>
                  </div>
                </div>
              </div>

              {/* Floating "Breathe & Reset" Badge overlapping the lower-left organic curve */}
              <button
                type="button"
                onClick={() => setIsBreathingModalOpen(true)}
                className="absolute bottom-7 sm:bottom-9 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md rounded-2xl py-3 px-4 shadow-[0_10px_28px_rgba(36,26,23,0.12)] border border-[#eedfd6] flex items-center gap-3.5 z-20 hover:-translate-y-1 active:translate-y-0 transition-transform duration-200 cursor-pointer group text-left"
                aria-label="Open guided breathing exercise"
              >
                <div className="w-9 h-9 rounded-full bg-[#f8ede8] text-[#8c4d38] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Flower2 className="w-5 h-5 text-[#8c4d38]" />
                </div>
                <div>
                  <div className="font-semibold text-xs sm:text-[0.84rem] text-[#241a17] leading-tight flex items-center gap-1">
                    Breathe &amp; Reset
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ca9585] animate-ping" />
                  </div>
                  <div className="text-[11px] text-[#5b4a43] leading-tight mt-0.5">
                    Our midwives are here for you
                  </div>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* SECTION: CARE CONTINUITY */}
        <section className="mt-20 sm:mt-26 pt-10 border-t border-[#ebd9cf]/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8c5a4a]">
                CARE CONTINUITY
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#241a17] mt-1.5">
                Where would you like to be gently guided?
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5b4a43] max-w-sm sm:max-w-md leading-relaxed">
              Choose from our primary maternal gateways, or communicate directly
              with our patient navigation coordinators.
            </p>
          </div>

          {/* Three Direct Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {/* CARD 1: Central Portal */}
            <div className="bg-white/85 backdrop-blur-sm rounded-3xl p-6 sm:p-7 border border-[#eedfd6] shadow-[0_2px_14px_rgba(36,26,23,0.03)] hover:shadow-lg hover:border-[#ca9585]/60 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#f8ede8] text-[#8c4d38] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Home className="w-5 h-5" />
                </div>
                <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8c5a4a] mt-5">
                  CENTRAL PORTAL
                </p>
                <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#241a17] mt-1">
                  Return to Sanctuary Home
                </h3>
                <p className="text-xs sm:text-sm text-[#5b4a43] leading-relaxed mt-2.5 mb-6">
                  Step back into our main clinical overview, explore our philosophy
                  of natural maternity, and review hospital credentials.
                </p>
              </div>

              <div>
                <Link
                  href="/"
                  className="w-full bg-[#8c4d38] hover:bg-[#783e2c] active:bg-[#663222] text-white text-xs sm:text-sm font-medium py-3 px-5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow"
                >
                  <span>Go to Front Desk</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* CARD 2: Care Desk */}
            <div className="bg-white/85 backdrop-blur-sm rounded-3xl p-6 sm:p-7 border border-[#eedfd6] shadow-[0_2px_14px_rgba(36,26,23,0.03)] hover:shadow-lg hover:border-[#ca9585]/60 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#f8ede8] text-[#8c4d38] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Headphones className="w-5 h-5" />
                </div>
                <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8c5a4a] mt-5">
                  CONCIERGE &amp; APPOINTMENTS
                </p>
                <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#241a17] mt-1">
                  Speak to Our Care Desk
                </h3>
                <p className="text-xs sm:text-sm text-[#5b4a43] leading-relaxed mt-2.5 mb-6">
                  Our care coordinators in Chennai are available to locate files,
                  answer questions, or schedule immediate bedside visits.
                </p>
              </div>

              <div>
                <a
                  href="tel:+919363031925"
                  className="w-full bg-white hover:bg-[#faf3ee] border border-[#eedfd6] text-[#241a17] text-xs sm:text-sm font-semibold py-3 px-5 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-xs"
                >
                  <Phone className="w-4 h-4 text-[#8c4d38]" />
                  <span>+91 93630 31925</span>
                </a>
                <p className="text-[11px] text-center text-[#5b4a43]/70 mt-2.5">
                  Nungambakkam Desk • 24/7 Available
                </p>
              </div>
            </div>

            {/* CARD 3: Primary Pathways */}
            <div className="bg-white/85 backdrop-blur-sm rounded-3xl p-6 sm:p-7 border border-[#eedfd6] shadow-[0_2px_14px_rgba(36,26,23,0.03)] hover:shadow-lg hover:border-[#ca9585]/60 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#f8ede8] text-[#8c4d38] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8c5a4a] mt-5">
                  PRIMARY PATHWAYS
                </p>
                <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#241a17] mt-1">
                  Explore Care Disciplines
                </h3>

                {/* Sub-links with chevrons */}
                <div className="mt-3.5 space-y-2">
                  {[
                    {
                      name: "Obstetrics & Antenatal",
                      href: "/services/pregnancy-antenatal-care",
                    },
                    {
                      name: "Fertility & Reproductive Health",
                      href: "/services/fertility-preconception",
                    },
                    {
                      name: "Gynaecological Surgery",
                      href: "/services/gynaecology",
                    },
                    {
                      name: "Specialist Directory",
                      href: "/doctors",
                    },
                  ].map((pathway) => (
                    <Link
                      key={pathway.name}
                      href={pathway.href}
                      className="flex items-center justify-between text-xs sm:text-sm text-[#241a17] hover:text-[#8c4d38] py-1 transition-colors group/item"
                    >
                      <span>{pathway.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#8c5a4a]/70 group-hover/item:translate-x-1 group-hover/item:text-[#8c4d38] transition-all" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#eedfd6]/70">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8c4d38] hover:text-[#733624] transition-colors"
                >
                  <span>View All 14 Specialities</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER: Dedicated warm tone matching the design */}
      <footer className="w-full bg-[#ebdcd4] text-[#241a17] pt-12 sm:pt-14 pb-8 border-t border-[#e2d0c5]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Top Row: Brand & Accreditation */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-[#ded0c6]">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#8c4d38] tracking-tight">
                The Birthwave
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#5b4a43] max-w-md leading-relaxed">
                Compassionate, clinical excellence in perinatal and women’s health.
                Dedicated to humane, scientifically anchored birthing sanctuaries.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#5b4a43]/90 md:pt-2">
              <span>Accredited by NABH Perinatal Standards</span>
              <span className="text-[#8c4d38]">•</span>
              <span>Chennai, India</span>
            </div>
          </div>

          {/* Middle Row: Links 4-column grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 py-8 border-b border-[#ded0c6] text-xs sm:text-[0.875rem] text-[#5b4a43]">
            <div className="space-y-3">
              <div>
                <Link
                  href="/services/pregnancy-antenatal-care"
                  className="hover:text-[#8c4d38] transition-colors"
                >
                  Obstetrics &amp; Antenatal
                </Link>
              </div>
              <div>
                <Link
                  href="/services/nutrition-emotional-wellbeing"
                  className="hover:text-[#8c4d38] transition-colors"
                >
                  Perinatal Mental Health
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Link
                  href="/services/fertility-preconception"
                  className="hover:text-[#8c4d38] transition-colors"
                >
                  Fertility &amp; IVF
                </Link>
              </div>
              <div>
                <a
                  href="tel:+919363031925"
                  className="hover:text-[#8c4d38] transition-colors"
                >
                  Emergency OPD
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Link
                  href="/services/gynaecology"
                  className="hover:text-[#8c4d38] transition-colors"
                >
                  Gynaecological Surgery
                </Link>
              </div>
              <div>
                <Link
                  href="/contact"
                  className="hover:text-[#8c4d38] transition-colors"
                >
                  Patient Portal
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Link
                  href="/services"
                  className="hover:text-[#8c4d38] transition-colors"
                >
                  Fetal Medicine
                </Link>
              </div>
              <div>
                <Link
                  href="/privacy"
                  className="hover:text-[#8c4d38] transition-colors"
                >
                  Privacy &amp; Ethics
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Row: Legal & Quality Portal */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs text-[#5b4a43]/80">
            <p>
              © 2025 The Birthwave Clinic Chennai. All rights reserved.
              Compassionate, clinical excellence in perinatal and women’s health.
            </p>
            <div className="flex items-center gap-4 shrink-0">
              <Link
                href="/about"
                className="hover:text-[#8c4d38] transition-colors"
              >
                Clinical Quality Portal
              </Link>
              <Link
                href="/privacy"
                className="hover:text-[#8c4d38] transition-colors"
              >
                Patient Charter
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Guided Breathing Modal */}
      {isBreathingModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Calm breathing guide"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#241a17]/50 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-md bg-white rounded-3xl p-7 sm:p-8 shadow-2xl border border-[#eedfd6] text-center overflow-hidden">
            <button
              type="button"
              onClick={() => setIsBreathingModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-[#5b4a43] hover:text-[#241a17] hover:bg-[#faeee8] transition-colors"
              aria-label="Close breathing modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-full bg-[#faeee8] text-[#8c4d38] flex items-center justify-center mx-auto mb-4">
              <Wind className="w-6 h-6 animate-pulse" />
            </div>

            <h3 className="font-serif text-2xl font-semibold text-[#241a17]">
              Take a Gentle Breath
            </h3>
            <p className="text-xs sm:text-sm text-[#5b4a43] mt-1.5 mb-8">
              Pause for a moment. Our midwives are right beside you.
            </p>

            {/* Pulsing Breathing Circle */}
            <div className="relative w-44 h-44 mx-auto flex items-center justify-center my-4">
              <div
                className={`absolute inset-0 rounded-full bg-[#f8ede8] border-2 border-[#ca9585] transition-all duration-1000 ${
                  breathPhase === "Inhale"
                    ? "scale-100 opacity-90"
                    : breathPhase === "Hold"
                    ? "scale-105 opacity-100 border-[#8c4d38]"
                    : "scale-75 opacity-60"
                }`}
              />
              <div className="relative z-10 flex flex-col items-center">
                <span className="font-serif text-lg font-medium text-[#8c4d38]">
                  {breathPhase}
                </span>
                <span className="text-3xl font-bold text-[#241a17] mt-1">
                  {breathCount}
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => setIsBreathingModalOpen(false)}
                className="w-full bg-[#8c4d38] hover:bg-[#783e2c] text-white text-sm font-medium py-3 rounded-xl transition-colors shadow-sm"
              >
                I Feel Grounded Now
              </button>
              <a
                href="tel:+919363031925"
                className="text-xs font-semibold text-[#8c4d38] hover:underline py-1"
              >
                Or Call Our 24/7 Midwives at +91 93630 31925
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
