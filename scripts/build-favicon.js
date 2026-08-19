const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { execSync } = require('child_process');

const ePath = 'M3.38654 11.7171H11.6133V14.5927H0V0H11.3859V2.85976H3.38654V5.82279H10.9555V8.57929H3.38654V11.725V11.7171Z';

const hPaths = [
  'M98.1122 5.64803H98.0959V0H94.5957V7.83257C95.351 6.98258 96.4717 6.18026 98.1041 5.65597L98.1122 5.64803Z',
  'M107.898 0H104.422V4.72655L107.898 6.72044V0Z',
  'M94.5957 14.6007H98.0959V9.36572C97.0158 9.72319 95.8139 10.3666 94.5957 11.4867V14.6086V14.6086Z',
  'M104.422 9.46104V14.6007H107.898V6.8952L104.422 9.46104Z',
  'M93.6533 11.4947C93.6533 11.4947 93.7264 5.79896 102.278 5.67186V4.23404L106.858 6.86343L102.278 10.2475V8.55546C102.278 8.55546 97.9251 7.11763 93.6533 11.5026V11.4947Z'
];

// Build official SVG brand emblem
const svgContent = `<svg width='512' height='512' viewBox='0 0 512 512' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <defs>
    <linearGradient id='bgGrad' x1='0' y1='0' x2='512' y2='512' gradientUnits='userSpaceOnUse'>
      <stop offset='0%' stop-color='#0B3047'/>
      <stop offset='50%' stop-color='#063B5C'/>
      <stop offset='100%' stop-color='#032033'/>
    </linearGradient>
    <linearGradient id='orangeGrad' x1='0' y1='0' x2='100' y2='100' gradientUnits='userSpaceOnUse'>
      <stop offset='0%' stop-color='#FFA04D'/>
      <stop offset='100%' stop-color='#F47A22'/>
    </linearGradient>
    <filter id='dropShadow' x='-20%' y='-20%' width='140%' height='140%'>
      <feDropShadow dx='0' dy='6' stdDeviation='8' flood-color='#000000' flood-opacity='0.3'/>
    </filter>
  </defs>

  <!-- Deep Navy Squircle Background -->
  <rect width='512' height='512' rx='120' fill='url(#bgGrad)'/>
  <rect x='6' y='6' width='500' height='500' rx='114' fill='none' stroke='#FFFFFF' stroke-opacity='0.15' stroke-width='4'/>

  <!-- Scaled Logo Marks -->
  <!-- Center of canvas: 256, 256. Target width ~340, height ~170. Scale factor ~11.5 -->
  <g transform='translate(88, 170) scale(11.5)' filter='url(#dropShadow)'>
    <!-- White 'E' -->
    <path d='${ePath}' fill='#FFFFFF'/>

    <!-- Orange 'H' with Arrow (translated -77.5) -->
    <g transform='translate(-77.5, 0)'>
      ${hPaths.map(p => `<path d='${p}' fill='url(#orangeGrad)'/>`).join('\n      ')}
    </g>
  </g>
</svg>`;

async function generateFavicons() {
  const publicDir = path.join(__dirname, '../public');
  const appDir = path.join(__dirname, '../src/app');

  // Save SVG
  const svgPath = path.join(publicDir, 'brand-favicon.svg');
  fs.writeFileSync(svgPath, svgContent);

  // Generate PNG sizes
  const sizes = [16, 32, 48, 64, 180, 192, 512];
  const pngBuffers = {};

  for (const size of sizes) {
    const pngBuf = await sharp(Buffer.from(svgContent))
      .resize(size, size)
      .png()
      .toBuffer();
    pngBuffers[size] = pngBuf;
  }

  // Write apple-touch-icon.png (180x180)
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), pngBuffers[180]);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), pngBuffers[180]);
  fs.writeFileSync(path.join(appDir, 'icon.png'), pngBuffers[32]);

  // Write PNG 512x512
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), pngBuffers[512]);

  // Save temporary PNG files for Python PIL ICO generation
  const temp32Path = path.join(__dirname, 'temp_32.png');
  const temp16Path = path.join(__dirname, 'temp_16.png');
  const temp48Path = path.join(__dirname, 'temp_48.png');
  const temp64Path = path.join(__dirname, 'temp_64.png');

  fs.writeFileSync(temp16Path, pngBuffers[16]);
  fs.writeFileSync(temp32Path, pngBuffers[32]);
  fs.writeFileSync(temp48Path, pngBuffers[48]);
  fs.writeFileSync(temp64Path, pngBuffers[64]);

  // Convert to ICO using Python Pillow
  const pythonCmd = `python3 -c "
from PIL import Image

img16 = Image.open('${temp16Path}')
img32 = Image.open('${temp32Path}')
img48 = Image.open('${temp48Path}')
img64 = Image.open('${temp64Path}')

img32.save('${path.join(appDir, 'favicon.ico')}', format='ICO', sizes=[(16,16), (32,32), (48,48), (64,64)])
img32.save('${path.join(publicDir, 'favicon.ico')}', format='ICO', sizes=[(16,16), (32,32), (48,48), (64,64)])
print('ICO generation successful!')
"`;

  execSync(pythonCmd);

  // Clean temp files
  fs.unlinkSync(temp16Path);
  fs.unlinkSync(temp32Path);
  fs.unlinkSync(temp48Path);
  fs.unlinkSync(temp64Path);

  console.log('All favicons generated successfully!');
}

generateFavicons().catch(err => console.error(err));
