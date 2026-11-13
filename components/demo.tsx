import ResponsiveHeroBanner from './ui/responsive-hero-banner';

const HeroDemo = () => {
  return (
    <ResponsiveHeroBanner
      badgeLabel="Live atlas"
      badgeText="Seven incidents · 14—22 October 2026"
      title="Black October"
      titleLine2="2026"
      description="Seven cyber incidents, one connected timeline. Trace the attack chain, understand the mechanics, and check every source."
      metaText="Updated 10 November 2026 · plain-English reporting with traceable sources"
      primaryButtonText="Explore the timeline"
      primaryButtonHref="#timeline"
      secondaryButtonText="How this was researched"
      secondaryButtonHref="/about"
      ctaButtonText="Explore timeline"
      partnersTitle="Verified against primary advisories and reporting from"
      partners={[
        { label: 'CrowdStrike', href: '/sources' },
        { label: 'Microsoft Security', href: '/sources' },
        { label: 'CISA', href: '/sources' },
        { label: 'Google Chrome Security', href: '/sources' },
        { label: 'Drupal.org', href: '/sources' },
      ]}
    />
  );
};

export default HeroDemo;
