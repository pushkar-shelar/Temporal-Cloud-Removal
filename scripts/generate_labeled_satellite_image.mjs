import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GEOGRAPHIC_FEATURES_DATA, LANDMARK_CATEGORIES } from '../src/data/mockData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseImagePath = path.resolve(__dirname, '../public/images/satellite/satellite-reconstructed-demo.jpg');
const baseImageBuffer = fs.readFileSync(baseImagePath);
const base64Image = `data:image/jpeg;base64,${baseImageBuffer.toString('base64')}`;

const W = 1200;
const H = 1200;

// Category colors and icons
const CAT_STYLES = {
  river: { stroke: '#38bdf8', fill: '#0284c7', labelBg: '#082f49', icon: '🌊', label: 'River / Channel' },
  settlement: { stroke: '#f87171', fill: '#dc2626', labelBg: '#450a0a', icon: '🏢', label: 'Settlement / Urban' },
  forest: { stroke: '#4ade80', fill: '#16a34a', labelBg: '#052e16', icon: '🌲', label: 'Forest Canopy' },
  mountain: { stroke: '#fbbf24', fill: '#d97706', labelBg: '#451a03', icon: '⛰️', label: 'Mountain / Relief' },
  agriculture: { stroke: '#facc15', fill: '#ca8a04', labelBg: '#422006', icon: '🌾', label: 'Cropland / Agriculture' },
  wetland: { stroke: '#2dd4bf', fill: '#0d9488', labelBg: '#042f2e', icon: '💧', label: 'Wetland / Floodplain' }
};

let svgPolygons = '';
let svgPins = '';

GEOGRAPHIC_FEATURES_DATA.forEach((feat) => {
  const style = CAT_STYLES[feat.category] || { stroke: '#ffffff', fill: '#334155', labelBg: '#0f172a', icon: '📍', label: feat.category };

  // 1. Polygon geometry
  if (feat.polygon && feat.polygon.length > 0) {
    const pointsStr = feat.polygon.map(pt => `${(pt[0] * W / 100).toFixed(1)},${(pt[1] * H / 100).toFixed(1)}`).join(' ');
    svgPolygons += `
    <polygon points="${pointsStr}" 
      fill="${style.fill}" 
      fill-opacity="0.28" 
      stroke="${style.stroke}" 
      stroke-width="3" 
      stroke-linejoin="round"
      stroke-dasharray="${feat.observationStatus.includes('Reconstructed') ? '8 4' : 'none'}"
      filter="url(#glow)"
    />`;
  }

  // 2. Centroid Pin and Label
  const cx = (feat.centroid.x * W / 100);
  const cy = (feat.centroid.y * H / 100);

  // Badge layout adjustments based on position
  const badgeWidth = Math.max(feat.name.length * 8.2 + 65, 230);
  const badgeHeight = 44;
  let bx = cx - badgeWidth / 2;
  let by = cy - 58;

  // Keep badge within frame bounds
  if (bx < 15) bx = 15;
  if (bx + badgeWidth > W - 15) bx = W - badgeWidth - 15;
  if (by < 85) by = cy + 18; // flip below pin if near top

  svgPins += `
    <!-- Pin for ${feat.name} -->
    <g class="feature-marker" id="${feat.id}">
      <!-- Outer ripple / radar ring -->
      <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="10" fill="none" stroke="${style.stroke}" stroke-width="2.5" opacity="0.8" />
      <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="4.5" fill="${style.stroke}" />

      <!-- Leader line from pin to badge -->
      <line x1="${cx.toFixed(1)}" y1="${cy.toFixed(1)}" x2="${(bx + badgeWidth / 2).toFixed(1)}" y2="${(by + (by < cy ? badgeHeight : 0)).toFixed(1)}" stroke="${style.stroke}" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.75" />

      <!-- Label Card Badge -->
      <rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${badgeWidth}" height="${badgeHeight}" rx="7" fill="${style.labelBg}" fill-opacity="0.92" stroke="${style.stroke}" stroke-width="2" filter="url(#drop-shadow)" />
      
      <!-- Icon & Feature Name -->
      <text x="${(bx + 10).toFixed(1)}" y="${(by + 20).toFixed(1)}" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" fill="#ffffff">
        ${style.icon} ${feat.name}
      </text>

      <!-- Category & Metrics Subtitle -->
      <text x="${(bx + 12).toFixed(1)}" y="${(by + 36).toFixed(1)}" font-family="Inter, system-ui, sans-serif" font-size="10.5" font-weight="500" fill="#cbd5e1">
        ${feat.categoryLabel.split(' ')[0]} • ${feat.areaKm2} km² • <tspan fill="${feat.confidencePct >= 94 ? '#4ade80' : '#38bdf8'}">${feat.confidencePct}% Conf</tspan>
      </text>
    </g>
  `;
});

const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.8"/>
    </filter>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <linearGradient id="headerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#020617" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#020617" stop-opacity="0.65" />
    </linearGradient>
    <linearGradient id="footerGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#020617" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#020617" stop-opacity="0.65" />
    </linearGradient>
  </defs>

  <!-- 1. High Resolution Reconstructed Satellite Imagery Base -->
  <image href="${base64Image}" width="${W}" height="${H}" preserveAspectRatio="none"/>

  <!-- 2. Translucent Vector Boundary Overlays -->
  <g id="vector-polygons">
    ${svgPolygons}
  </g>

  <!-- 3. Top Banner: Title & Metadata -->
  <rect x="0" y="0" width="${W}" height="76" fill="url(#headerGrad)" />
  <line x1="0" y1="76" x2="${W}" y2="76" stroke="#334155" stroke-width="1.5" />
  
  <text x="24" y="32" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="800" fill="#38bdf8" letter-spacing="0.5">
    🏷️ POST-REMOVAL SEMANTIC FEATURE LABELING &amp; VECTORIZATION STUDIO
  </text>
  <text x="24" y="58" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="500" fill="#94a3b8">
    Brahmaputra River Valley, Assam • ISRO Resourcesat-2A LISS-IV (5.0m) + Sentinel-1 C-Band SAR • 11 Extracted Ground Entities
  </text>
  <rect x="${W - 200}" y="18" width="176" height="38" rx="6" fill="#0f172a" stroke="#22c55e" stroke-width="1.5" />
  <text x="${W - 188}" y="42" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="700" fill="#4ade80">
    ✓ Model D Confidence 91.4%
  </text>

  <!-- 4. Feature Centroid Pins & Callout Badges -->
  <g id="feature-pins">
    ${svgPins}
  </g>

  <!-- 5. Bottom Legend Bar -->
  <rect x="0" y="${H - 68}" width="${W}" height="68" fill="url(#footerGrad)" />
  <line x1="0" y1="${H - 68}" x2="${W}" y2="${H - 68}" stroke="#334155" stroke-width="1.5" />

  <!-- Legend Items -->
  <g transform="translate(24, ${H - 42})">
    <!-- River -->
    <rect x="0" y="-12" width="16" height="16" rx="3" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />
    <text x="24" y="1" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#e2e8f0">🌊 Rivers (2)</text>

    <!-- Settlement -->
    <rect x="135" y="-12" width="16" height="16" rx="3" fill="#dc2626" stroke="#f87171" stroke-width="2" />
    <text x="159" y="1" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#e2e8f0">🏢 Settlements (2)</text>

    <!-- Forest -->
    <rect x="300" y="-12" width="16" height="16" rx="3" fill="#16a34a" stroke="#4ade80" stroke-width="2" />
    <text x="324" y="1" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#e2e8f0">🌲 Forests (2)</text>

    <!-- Mountain -->
    <rect x="440" y="-12" width="16" height="16" rx="3" fill="#d97706" stroke="#fbbf24" stroke-width="2" />
    <text x="464" y="1" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#e2e8f0">⛰️ Mountains/Relief (2)</text>

    <!-- Agriculture -->
    <rect x="635" y="-12" width="16" height="16" rx="3" fill="#ca8a04" stroke="#facc15" stroke-width="2" />
    <text x="659" y="1" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#e2e8f0">🌾 Croplands (2)</text>

    <!-- Wetland -->
    <rect x="795" y="-12" width="16" height="16" rx="3" fill="#0d9488" stroke="#2dd4bf" stroke-width="2" />
    <text x="819" y="1" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#e2e8f0">💧 Wetlands (1)</text>

    <!-- Total Area -->
    <text x="965" y="1" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#38bdf8">Total Area: 414.9 km²</text>
  </g>
</svg>`;

// Write to public, dist, and artifact directories
const destPublic = path.resolve(__dirname, '../public/images/satellite/satellite-labeled-features.svg');
const destDist = path.resolve(__dirname, '../dist/images/satellite/satellite-labeled-features.svg');
const destArtifact = 'C:/Users/24102A0044/.gemini/antigravity/brain/9d6b7337-7b5e-4c58-b5ca-e125bee5e1ef/satellite-labeled-features.svg';

fs.writeFileSync(destPublic, svgContent, 'utf8');
console.log('Saved SVG to:', destPublic);

if (fs.existsSync(path.dirname(destDist))) {
  fs.writeFileSync(destDist, svgContent, 'utf8');
  console.log('Saved SVG to:', destDist);
}

if (fs.existsSync(path.dirname(destArtifact))) {
  fs.writeFileSync(destArtifact, svgContent, 'utf8');
  console.log('Saved SVG to:', destArtifact);
}

console.log('Successfully generated labeled satellite image!');

