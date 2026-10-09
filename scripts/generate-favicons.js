const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateFavicons() {
  const logoDir = path.join(__dirname, '..', 'public', 'images', 'logo');
  const sourceLogo = path.join(logoDir, 'arunas-logo.png');
  const publicDir = path.join(__dirname, '..', 'public');
  const appDir = path.join(__dirname, '..', 'src', 'app');

  if (!fs.existsSync(sourceLogo)) {
    console.error('Source logo not found at:', sourceLogo);
    process.exit(1);
  }

  console.log('Generating favicon assets and clean logo fallbacks from:', sourceLogo);

  // 1. Generate clean JPEGs without checkerboard (using the transparent PNG on cream background)
  await sharp(sourceLogo)
    .flatten({ background: '#fff8ea' })
    .jpeg({ quality: 95 })
    .toFile(path.join(logoDir, 'arunas-logo.jpeg'));
  await sharp(sourceLogo)
    .flatten({ background: '#fff8ea' })
    .jpeg({ quality: 95 })
    .toFile(path.join(logoDir, 'arunas-logo1.jpeg'));
  console.log('Generated clean: arunas-logo.jpeg and arunas-logo1.jpeg');

  // 2. Generate PNG sizes
  const sizes = [
    { name: 'favicon-16x16.png', size: 16, dir: publicDir },
    { name: 'favicon-32x32.png', size: 32, dir: publicDir },
    { name: 'favicon-48x48.png', size: 48, dir: publicDir },
    { name: 'apple-touch-icon.png', size: 180, dir: publicDir },
    { name: 'android-chrome-192x192.png', size: 192, dir: publicDir },
    { name: 'android-chrome-512x512.png', size: 512, dir: publicDir },
    { name: 'icon.png', size: 32, dir: appDir },
    { name: 'apple-icon.png', size: 180, dir: appDir },
  ];

  for (const item of sizes) {
    const outPath = path.join(item.dir, item.name);
    await sharp(sourceLogo)
      .resize(item.size, item.size, { fit: 'contain' })
      .png({ quality: 95 })
      .toFile(outPath);
    console.log(`Generated: ${item.name} (${item.size}x${item.size})`);
  }

  // 3. Generate multi-size favicon.ico (16, 32, 48) with PNG format
  const png16 = await sharp(sourceLogo).resize(16, 16).png().toBuffer();
  const png32 = await sharp(sourceLogo).resize(32, 32).png().toBuffer();
  const png48 = await sharp(sourceLogo).resize(48, 48).png().toBuffer();

  const icoBuffer = createIcoFromPngs([
    { size: 16, buffer: png16 },
    { size: 32, buffer: png32 },
    { size: 48, buffer: png48 },
  ]);

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
  console.log('Generated: favicon.ico (multi-size: 16, 32, 48)');

  // 4. Generate high quality Open Graph sharing image (1200x630)
  const ogOutPath = path.join(publicDir, 'images', 'og-image.jpg');
  const logoResized = await sharp(sourceLogo)
    .resize(460, 460, { fit: 'contain' })
    .png()
    .toBuffer();

  const ogCard = sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 3,
      background: '#fffdf9',
    },
  });

  const bannerSvg = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#8b1e14" />
          <stop offset="100%" stop-color="#a72317" />
        </linearGradient>
      </defs>
      <!-- Top header bar -->
      <rect x="0" y="0" width="1200" height="12" fill="url(#headerGrad)" />
      <!-- Subtle frame border -->
      <rect x="30" y="30" width="1140" height="570" rx="24" fill="#ffffff" stroke="#eadbc6" stroke-width="2" />
      <!-- Content texts -->
      <text x="560" y="195" font-family="Georgia, serif" font-size="52" font-weight="bold" fill="#4a281c">Arunass Kitchen</text>
      <text x="560" y="245" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#0d8f52" letter-spacing="3">FLAVORS OF RAYALASEEMA</text>
      <text x="560" y="325" font-family="Georgia, serif" font-size="28" fill="#2b211d">Authentic Homemade Sweets &amp; Pickles</text>
      <text x="560" y="375" font-family="Arial, sans-serif" font-size="22" fill="#76665c">Traditional Rayalaseema Delicacies • Freshly Made in Kurnool</text>
      <!-- Location pill -->
      <rect x="560" y="430" width="460" height="52" rx="12" fill="#fff8ea" stroke="#eadbc6" stroke-width="1.5" />
      <text x="590" y="463" font-family="Arial, sans-serif" font-size="19" font-weight="bold" fill="#8b1e14">📍 Kurnool, Andhra Pradesh • +91 8143645962</text>
    </svg>
  `);

  await ogCard
    .composite([
      { input: bannerSvg, top: 0, left: 0 },
      { input: logoResized, top: 85, left: 70 },
    ])
    .jpeg({ quality: 92 })
    .toFile(ogOutPath);

  console.log('Generated: og-image.jpg (1200x630)');
  console.log('All favicon, clean logo, and SEO social assets generated successfully!');
}

function createIcoFromPngs(images) {
  const count = images.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + count * dirEntrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  const dirEntries = [];
  const buffers = [];

  for (const img of images) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.size === 256 ? 0 : img.size, 0);
    entry.writeUInt8(img.size === 256 ? 0 : img.size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(img.buffer.length, 8);
    entry.writeUInt32LE(offset, 12);

    dirEntries.push(entry);
    buffers.push(img.buffer);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...buffers]);
}

generateFavicons().catch(console.error);
