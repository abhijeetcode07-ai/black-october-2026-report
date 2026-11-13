'use client';

import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Menu, Play, X } from 'lucide-react';

export interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface Partner {
  /** Text wordmark, used when no logo image is supplied. */
  label?: string;
  logoUrl?: string;
  href: string;
}

export interface ResponsiveHeroBannerProps {
  className?: string;
  logoUrl?: string;
  logoText?: string;
  backgroundImageUrl?: string;
  navLinks?: NavLink[];
  ctaButtonText?: string;
  ctaButtonHref?: string;
  badgeText?: string;
  badgeLabel?: string;
  title?: string;
  titleLine2?: string;
  description?: string;
  metaText?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  partnersTitle?: string;
  partners?: Partner[];
}

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c9dff]';

const ResponsiveHeroBanner: React.FC<ResponsiveHeroBannerProps> = ({
  className = '',
  logoUrl,
  logoText = 'Black October 2026',
  backgroundImageUrl = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=70',
  navLinks = [
    { label: 'Home', href: '/', isActive: true },
    { label: 'Timeline', href: '/#timeline' },
    { label: 'Incidents', href: '/#timeline' },
    { label: 'About', href: '/about' },
    { label: 'Sources', href: '/sources' },
  ],
  ctaButtonText = 'Explore timeline',
  ctaButtonHref = '#timeline',
  badgeLabel = 'Live atlas',
  badgeText = 'Seven incidents · 14—22 October 2026',
  title = 'Black October',
  titleLine2 = '2026',
  description = 'Seven cyber incidents, one connected timeline. Trace the attack chain, understand the mechanics, and check every source.',
  metaText = 'Updated 10 November 2026 · plain-English reporting with traceable sources',
  primaryButtonText = 'Explore the timeline',
  primaryButtonHref = '#timeline',
  secondaryButtonText = 'How this was researched',
  secondaryButtonHref = '/about',
  partnersTitle = 'Verified against primary advisories and reporting from',
  partners = [
    { label: 'CrowdStrike', href: '/sources' },
    { label: 'Microsoft Security', href: '/sources' },
    { label: 'CISA', href: '/sources' },
    { label: 'Google Chrome Security', href: '/sources' },
    { label: 'Drupal.org', href: '/sources' },
  ],
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section
      className={`isolate relative flex min-h-[100svh] w-full items-center overflow-hidden border-b border-white/10 bg-[#1e1e1c] ${className}`}
      aria-labelledby="responsive-hero-title"
    >
      <img
        src={backgroundImageUrl}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_95%_at_50%_6%,rgba(47,107,255,0.24),transparent_58%),linear-gradient(180deg,rgba(16,16,15,0.74)_0%,rgba(20,20,19,0.62)_40%,rgba(30,30,28,0.94)_100%)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.32)]"
      />

      <div className="relative z-10 w-full">
        <header className="mx-auto max-w-7xl px-6 pt-4">
          <div className="flex items-center justify-between">
            {logoUrl ? (
              <a
                href="/"
                aria-label={logoText}
                className={`inline-flex h-10 w-[100px] items-center justify-center rounded bg-cover bg-center ${focusRing}`}
                style={{ backgroundImage: `url(${logoUrl})` }}
              />
            ) : (
              <a
                href="/"
                className={`font-sans text-sm font-bold tracking-tight text-white sm:text-base ${focusRing}`}
              >
                {logoText}
              </a>
            )}

            <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
              <div className="flex items-center gap-1 rounded-full bg-white/5 px-1 py-1 ring-1 ring-white/10 backdrop-blur-sm">
                {navLinks.map((link) => (
                  <a
                    key={`${link.href}-${link.label}`}
                    href={link.href}
                    aria-current={link.isActive ? 'page' : undefined}
                    className={`rounded-full px-3 py-2 font-sans text-sm font-medium transition-colors hover:bg-white/10 hover:text-white ${focusRing} ${
                      link.isActive ? 'text-white/90' : 'text-white/75'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={ctaButtonHref}
                  className={`ml-1 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 font-sans text-sm font-medium text-neutral-900 transition-colors hover:bg-white/90 ${focusRing}`}
                >
                  {ctaButtonText}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </nav>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/[0.15] backdrop-blur-sm md:hidden ${focusRing}`}
              aria-expanded={mobileMenuOpen}
              aria-controls="responsive-hero-mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-white/90" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5 text-white/90" aria-hidden="true" />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <nav
              id="responsive-hero-mobile-menu"
              aria-label="Mobile"
              className="mt-3 grid gap-1 rounded-2xl bg-black/50 p-2 ring-1 ring-white/[0.15] backdrop-blur-sm md:hidden"
            >
              {navLinks.map((link) => (
                <a
                  key={`${link.href}-${link.label}`}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-3 py-2 font-sans text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white ${focusRing}`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={ctaButtonHref}
                onClick={() => setMobileMenuOpen(false)}
                className={`mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-2 font-sans text-sm font-medium text-neutral-900 ${focusRing}`}
              >
                {ctaButtonText}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </nav>
          )}
        </header>

        <div className="mx-auto max-w-7xl px-6 pt-20 pb-14 sm:pt-24 md:pt-28 lg:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-2.5 py-2 ring-1 ring-white/[0.15] backdrop-blur-sm">
              <span className="inline-flex items-center rounded-full bg-white/90 px-2 py-0.5 font-sans text-xs font-medium text-neutral-900">
                {badgeLabel}
              </span>
              <span className="font-sans text-sm font-medium text-white/90">{badgeText}</span>
            </div>

            <h1
              id="responsive-hero-title"
              className="font-serif text-4xl leading-[0.98] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {title}
              <br className="hidden sm:block" />{' '}
              <span className="italic text-[#7c9dff]">{titleLine2}</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl font-sans text-base text-white/80 sm:text-lg">
              {description}
            </p>

            {metaText && <p className="mt-4 font-mono text-xs text-white/55">{metaText}</p>}

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href={primaryButtonHref}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f8f6f1] px-5 py-3 font-sans text-sm font-semibold text-neutral-900 transition-colors hover:bg-white sm:w-auto ${focusRing}`}
              >
                {primaryButtonText}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={secondaryButtonHref}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.15] bg-white/5 px-5 py-3 font-sans text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white sm:w-auto ${focusRing}`}
              >
                <Play className="h-4 w-4" aria-hidden="true" />
                {secondaryButtonText}
              </a>
            </div>
          </div>

          <div className="mx-auto mt-20 max-w-5xl">
            <p className="text-center font-sans text-sm text-white/70">{partnersTitle}</p>
            <ul className="mt-6 grid grid-cols-2 items-center gap-3 sm:grid-cols-3 md:grid-cols-5">
              {partners.map((partner, index) => (
                <li key={`${partner.href}-${partner.label ?? index}`} className="flex">
                  <a
                    href={partner.href}
                    className={`flex min-h-[46px] w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-center font-sans text-xs font-semibold text-white/70 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white ${focusRing}`}
                  >
                    {partner.logoUrl ? (
                      <span
                        role="img"
                        aria-label={partner.label ?? 'Partner logo'}
                        className="inline-block h-9 w-[120px] rounded-full bg-contain bg-center bg-no-repeat opacity-80 transition-opacity hover:opacity-100"
                        style={{ backgroundImage: `url(${partner.logoUrl})` }}
                      />
                    ) : (
                      partner.label
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResponsiveHeroBanner;
