import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

function escapeXml(unsafe) {
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

const cards = [
  {
    fileName: 'og-ravana-tech',
    badge: 'SRI LANKA WEB DESIGN • PACKAGES FROM RS. 18,000',
    title: 'Simple, Fast Websites for Small Businesses',
    subtitle: 'Bakeries • Cafes • Salons • Florists • Real Estate • Local Shops',
    highlights: ['✓ Direct WhatsApp Orders', '✓ 100% Mobile-Friendly', '✓ Google Maps & Local SEO'],
    accentColor: '#38bdf8', // Cyan
    cta: 'Explore 6 Live Demos & Packages at ravanatech.com',
  },
  {
    fileName: 'og-demo-bakery',
    badge: 'LIVE CONCEPT DEMO • FOOD & BAKERY',
    title: 'Crumb & Crust Artisan Bakery',
    subtitle: 'Artisan Bakery Menu & Instant WhatsApp Pre-Ordering',
    highlights: ['✓ 36-Hr Sourdough & Pastries', '✓ 1-Tap WhatsApp Ordering', '✓ Daily Freshness Indicators'],
    accentColor: '#f59e0b', // Amber
    cta: 'Tap to test the live ordering demo • ravanatech.com/demo/bakery',
  },
  {
    fileName: 'og-demo-cafe',
    badge: 'LIVE CONCEPT DEMO • CAFE & ROASTERY',
    title: 'Ceylon Roast Specialty Cafe',
    subtitle: 'Artisanal Cafe Story, Specialty Drinks Menu & Location Guide',
    highlights: ['✓ Single-Origin Ceylon Brews', '✓ 1-Tap Google Maps Directions', '✓ Instant Table Reservations'],
    accentColor: '#fb923c', // Warm Orange
    cta: 'Tap to test the live cafe demo • ravanatech.com/demo/cafe',
  },
  {
    fileName: 'og-demo-salon',
    badge: 'LIVE CONCEPT DEMO • SALON & BEAUTY',
    title: 'The Grooming Lounge Salon & Spa',
    subtitle: 'Service Menu, Stylist Profiles & Direct WhatsApp Appointment Requests',
    highlights: ['✓ Transparent Rate Card', '✓ 3-Step WhatsApp Booking Flow', '✓ Grooming & Bridal Packages'],
    accentColor: '#a855f7', // Purple/Violet
    cta: 'Tap to test the live salon booking demo • ravanatech.com/demo/salon',
  },
  {
    fileName: 'og-demo-flora',
    badge: 'LIVE CONCEPT DEMO • FLORIST & GIFTS',
    title: 'Petals & Stems Flower Boutique',
    subtitle: 'Curated Floral Arrangements Catalogue & Same-Day Delivery Inquiries',
    highlights: ['✓ High-Res Bouquet Gallery', '✓ Same-Day Delivery Timer', '✓ WhatsApp Card Note Builder'],
    accentColor: '#f43f5e', // Rose
    cta: 'Tap to test the live flower shop demo • ravanatech.com/demo/flora',
  },
  {
    fileName: 'og-demo-real-estate',
    badge: 'LIVE CONCEPT DEMO • REAL ESTATE & PROPERTY',
    title: 'Prime Habitat Real Estate Showcase',
    subtitle: 'Modern Property Portfolio, Land Specs & Direct Agent Viewing Requests',
    highlights: ['✓ High-Res Property Galleries', '✓ Land & Floor Dimension Specs', '✓ 1-Tap Private Viewing Request'],
    accentColor: '#38bdf8', // Sky Blue
    cta: 'Tap to test the live property demo • ravanatech.com/demo/real-estate',
  },
  {
    fileName: 'og-demo-personal-trainer',
    badge: 'LIVE CONCEPT DEMO • FITNESS & COACHING',
    title: 'Peak Form Fitness Coaching',
    subtitle: 'Coach Profile, Workout Programs & Free WhatsApp Consultation Booking',
    highlights: ['✓ 1-on-1 & Online Coaching', '✓ Free 15-Min Assessment Call', '✓ Direct WhatsApp Onboarding'],
    accentColor: '#10b981', // Emerald
    cta: 'Tap to test the live coach demo • ravanatech.com/demo/personal-trainer',
  },
];

const outDir = path.resolve('public/assets/social');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  for (const card of cards) {
    const safeBadge = escapeXml(card.badge);
    const safeTitle = escapeXml(card.title);
    const safeSubtitle = escapeXml(card.subtitle);
    const safeCta = escapeXml(card.cta);

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141416"/>
      <stop offset="50%" stop-color="#1c1917"/>
      <stop offset="100%" stop-color="#0a0a0c"/>
    </linearGradient>

    <radialGradient id="cardGlow" cx="85%" cy="20%" r="65%">
      <stop offset="0%" stop-color="${card.accentColor}" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>

    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#292524" stroke-width="0.75" stroke-opacity="0.4"/>
    </pattern>

    <linearGradient id="pillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#262626"/>
      <stop offset="100%" stop-color="#171717"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  <rect width="1200" height="630" fill="url(#cardGlow)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>

  <rect width="1200" height="6" fill="${card.accentColor}"/>

  <g transform="translate(80, 60)">
    <rect width="64" height="64" rx="16" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
    
    <g transform="translate(10, 11)">
      <path d="M 22 4 L 42 4 L 38 12 L 22 12 Z" fill="#38bdf8"/>
      <path d="M 25 12 L 33 12 L 33 34 L 25 28 Z" fill="#0284c7"/>
      <path d="M 4 4 L 14 4 L 10 34 L 4 34 Z" fill="#ffffff"/>
      <path d="M 10 4 L 24 4 C 28 4 30 7 29 12 C 28 17 24 20 19 20 L 12 20 L 13 12 L 18 12 C 20 12 21 11 21.5 9 C 22 7 20.5 6 18 6 L 9.5 6 Z" fill="#ffffff"/>
      <path d="M 15 18 L 23 18 L 28 34 L 19 34 L 15 22 Z" fill="#ffffff"/>
    </g>

    <text x="82" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="28" font-weight="900" fill="#ffffff" letter-spacing="0.5">RAVANA TECH</text>
    <text x="82" y="54" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="#a1a1aa" letter-spacing="1.5">SRI LANKA &#8226; WEB DESIGN &amp; DEVELOPMENT</text>

    <g transform="translate(760, 4)">
      <rect width="280" height="48" rx="24" fill="#064e3b" stroke="#059669" stroke-width="1.5"/>
      <circle cx="28" cy="24" r="7" fill="#10b981"/>
      <text x="46" y="30" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#ecfdf5">+94 78 847 0610 (WhatsApp)</text>
    </g>
  </g>

  <g transform="translate(80, 165)">
    <rect width="470" height="38" rx="10" fill="#27272a" stroke="${card.accentColor}" stroke-opacity="0.5" stroke-width="1.5"/>
    <circle cx="22" cy="19" r="5" fill="${card.accentColor}"/>
    <text x="36" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#f4f4f5" letter-spacing="1">${safeBadge}</text>
  </g>

  <text x="80" y="260" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="46" font-weight="900" fill="#ffffff" letter-spacing="-1">
    ${safeTitle}
  </text>

  <text x="80" y="315" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="500" fill="#d4d4d8">
    ${safeSubtitle}
  </text>

  <g transform="translate(80, 370)">
    ${card.highlights
      .map((hl, i) => {
        const x = i * 350;
        const safeHl = escapeXml(hl);
        return `<g transform="translate(${x}, 0)">
          <rect width="330" height="52" rx="12" fill="url(#pillGrad)" stroke="#3f3f46" stroke-width="1.5"/>
          <text x="20" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#f4f4f5">${safeHl}</text>
        </g>`;
      })
      .join('\n    ')}
  </g>

  <g transform="translate(80, 480)">
    <rect width="1040" height="76" rx="18" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
    
    <rect x="18" y="14" width="220" height="48" rx="12" fill="${card.accentColor}"/>
    <text x="128" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800" fill="#09090b" text-anchor="middle">LIVE PREVIEW &#8594;</text>

    <text x="260" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" fill="#e4e4e7">${safeCta}</text>
    
    <text x="1010" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#71717a" text-anchor="end">LK &#8226; 2026</text>
  </g>
</svg>`;

    const svgPath = path.join(outDir, `${card.fileName}.svg`);
    const pngPath = path.join(outDir, `${card.fileName}.png`);
    fs.writeFileSync(svgPath, svg, 'utf8');

    // Convert to PNG with sharp
    try {
      await sharp(Buffer.from(svg))
        .png({ quality: 90 })
        .resize(1200, 630)
        .toFile(pngPath);
      console.log(`✓ Rendered ${card.fileName}.png (1200x630)`);
    } catch (err) {
      console.error(`Error rendering ${card.fileName}:`, err);
    }
  }

  // Copy og-ravana-tech.png to public/og-image.png and public/og-image.svg
  fs.copyFileSync(path.join(outDir, 'og-ravana-tech.png'), path.resolve('public/og-image.png'));
  fs.copyFileSync(path.join(outDir, 'og-ravana-tech.svg'), path.resolve('public/og-image.svg'));
  console.log('✓ Successfully updated public/og-image.png and public/og-image.svg');
}

run();
