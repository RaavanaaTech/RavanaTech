import fs from 'fs';
import path from 'path';

const demos = [
  {
    slug: 'bakery',
    title: 'Crumb & Crust Bakery — Live WhatsApp Ordering Menu Demo | Ravana Tech',
    desc: 'Artisan bakery digital menu with 36-hour sourdough, fresh pastries, and instant 1-tap WhatsApp pre-ordering for Sri Lankan bakeries.',
    image: 'https://ravanatech.com/assets/social/og-demo-bakery.png',
    alt: 'Crumb & Crust Bakery — Live WhatsApp Ordering Menu Demo',
  },
  {
    slug: 'cafe',
    title: 'Ceylon Roast Specialty Cafe — Digital Menu & Location Demo | Ravana Tech',
    desc: 'Single-origin Ceylon coffee showcase, food pairings, Google Maps navigation, and WhatsApp table reservation demo for cafes in Sri Lanka.',
    image: 'https://ravanatech.com/assets/social/og-demo-cafe.png',
    alt: 'Ceylon Roast Specialty Cafe — Digital Menu & Location Demo',
  },
  {
    slug: 'salon',
    title: 'The Grooming Lounge Salon — Online Appointment Booking Demo | Ravana Tech',
    desc: 'Modern salon rate card, stylist specialties, grooming packages, and 3-step WhatsApp appointment scheduling demo.',
    image: 'https://ravanatech.com/assets/social/og-demo-salon.png',
    alt: 'The Grooming Lounge Salon — Online Appointment Booking Demo',
  },
  {
    slug: 'flora',
    title: 'Petals & Stems — Flower Shop & Same-Day Delivery Demo | Ravana Tech',
    desc: 'Bouquet catalogue with birthday, anniversary, and sympathy arrangements, same-day delivery timer, and direct WhatsApp ordering.',
    image: 'https://ravanatech.com/assets/social/og-demo-flora.png',
    alt: 'Petals & Stems — Flower Shop & Same-Day Delivery Demo',
  },
  {
    slug: 'real-estate',
    title: 'Prime Habitat Real Estate — Property Showcase Demo | Ravana Tech',
    desc: 'Credible property portfolio for Sri Lankan realtors with land specs, floor dimensions, photos, and 1-tap WhatsApp private viewing requests.',
    image: 'https://ravanatech.com/assets/social/og-demo-real-estate.png',
    alt: 'Prime Habitat Real Estate — Property Showcase Demo',
  },
  {
    slug: 'personal-trainer',
    title: 'Peak Form Fitness Coaching — Trainer Website Demo | Ravana Tech',
    desc: 'Fitness coach profile with workout packages, consultation intake form, and direct WhatsApp client onboarding for personal trainers in Sri Lanka.',
    image: 'https://ravanatech.com/assets/social/og-demo-personal-trainer.png',
    alt: 'Peak Form Fitness Coaching — Trainer Website Demo',
  },
];

for (const demo of demos) {
  const htmlContent = `<!doctype html>
<html lang="en" prefix="og: https://ogp.me/ns#">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Primary SEO Title & Meta -->
    <title>${demo.title}</title>
    <meta name="description" content="${demo.desc}" />
    <meta name="author" content="Shanthapriya Silva - Ravana Tech" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://ravanatech.com/demo/${demo.slug}" />
    
    <!-- Favicon & Icons -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/favicon.svg" />
    <meta name="theme-color" content="#1c1917" />

    <!-- Geo Targeting -->
    <meta name="geo.region" content="LK" />
    <meta name="geo.placename" content="Sri Lanka" />
    <meta name="geo.position" content="7.8731;80.7718" />

    <!-- Open Graph (WhatsApp, Facebook) -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://ravanatech.com/demo/${demo.slug}" />
    <meta property="og:site_name" content="Ravana Tech" />
    <meta property="og:title" content="${demo.title}" />
    <meta property="og:description" content="${demo.desc}" />
    <meta property="og:image" content="${demo.image}" />
    <meta property="og:image:secure_url" content="${demo.image}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${demo.alt}" />
    <meta property="og:locale" content="en_LK" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="https://ravanatech.com/demo/${demo.slug}" />
    <meta name="twitter:title" content="${demo.title}" />
    <meta name="twitter:description" content="${demo.desc}" />
    <meta name="twitter:image" content="${demo.image}" />
    <meta name="twitter:creator" content="@RavanaTech" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;1,400&display=swap"
      rel="stylesheet"
    />
  </head>
  <body class="bg-[#FAF9F6] text-neutral-900 antialiased selection:bg-stone-200 selection:text-neutral-900 min-h-screen">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

  // Create public/demo/:slug/index.html
  const demoDir = path.resolve(`public/demo/${demo.slug}`);
  if (!fs.existsSync(demoDir)) fs.mkdirSync(demoDir, { recursive: true });
  fs.writeFileSync(path.join(demoDir, 'index.html'), htmlContent, 'utf8');

  // Also create public/projects/:slug/index.html
  const projectDir = path.resolve(`public/projects/${demo.slug}`);
  if (!fs.existsSync(projectDir)) fs.mkdirSync(projectDir, { recursive: true });
  fs.writeFileSync(path.join(projectDir, 'index.html'), htmlContent.replace(/\/demo\//g, '/projects/'), 'utf8');

  console.log(`✓ Created static HTML preview entry for: ${demo.slug}`);
}
