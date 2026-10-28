// Cloudless AI Coordinated Data Model & Verified Remote Sensing Information

export const SATELLITE_ASSETS = {
  cloudy: '/images/satellite/satellite-cloudy.jpg',
  clear: '/images/satellite/satellite-clear-reference-demo.jpg',
  reconstructed: '/images/satellite/satellite-reconstructed-demo.jpg',
  sar: '/images/satellite/satellite-sar-demo.jpg',
  fcc: '/images/satellite/satellite-fcc-demo.jpg',
  temporal: '/images/satellite/satellite-temporal-demo.jpg',
  mask: '/images/satellite/cloud-shadow-mask-demo.png',
  confidence: '/images/satellite/confidence-map-demo.png',
  lulcCloudy: '/images/satellite/lulc-original-demo.png',
  lulcReconstructed: '/images/satellite/lulc-reconstructed-demo.png',
  cropAgriBefore: '/images/satellite/crop-agri-before.jpg',
  cropAgriAfter: '/images/satellite/crop-agri-after.jpg',
  cropDisasterBefore: '/images/satellite/crop-disaster-before.jpg',
  cropDisasterAfter: '/images/satellite/crop-disaster-after.jpg',
  cropEnvBefore: '/images/satellite/crop-env-before.jpg',
  cropEnvAfter: '/images/satellite/crop-env-after.jpg',
};

export const PRIMARY_SCENE_INFO = {
  id: 'LISS4_20230612_ASSAM_01',
  sensor: 'ISRO LISS-IV (Resourcesat-2A)',
  resolution: '5.0 m',
  bands: '3 (Green: B2, Red: B3, NIR: B4)',
  captureDate: '12-JUN-2023',
  referenceDate: '01-NOV-2023',
  location: 'Assam, India',
  region: 'Brahmaputra Valley',
  crs: 'EPSG:32646 (UTM Zone 46N)',
  fileSize: '~ 145 MB (GeoTIFF)',
  cloudCoverage: 80.98,
  metrics: {
    psnr: 39.67,
    ssim: 0.9834,
    sam: 1.6,
    ndviMae: 0.1142,
    lulcGain: 37.68,
    reconstructedAccuracy: 73.26,
    originalAccuracy: 3.69
  }
};

export const HISTORICAL_PROCESSING_DATA = [
  {
    id: 1,
    date: '12-JUN-2023',
    location: 'Assam, India',
    cloudCoverage: '80.98%',
    mode: 'RGB',
    psnr: '39.67',
    ssim: '0.9834',
    sam: '1.6°',
    status: 'Completed',
    model: 'Multi-Modal (SAR + Temporal)',
    time: '2m 14s'
  },
  {
    id: 2,
    date: '05-MAY-2023',
    location: 'Meghalaya, India',
    cloudCoverage: '72.41%',
    mode: 'RGB',
    psnr: '37.12',
    ssim: '0.9761',
    sam: '2.4°',
    status: 'Completed',
    model: 'Multi-Modal (SAR + Temporal)',
    time: '2m 38s'
  },
  {
    id: 3,
    date: '18-APR-2023',
    location: 'Arunachal Pradesh',
    cloudCoverage: '67.30%',
    mode: 'FCC',
    psnr: '34.21',
    ssim: '0.9652',
    sam: '3.8°',
    status: 'Completed',
    model: 'SAR-Guided Diffuser',
    time: '3m 05s'
  },
  {
    id: 4,
    date: '28-MAR-2023',
    location: 'Nagaland, India',
    cloudCoverage: '84.15%',
    mode: 'RGB',
    psnr: '38.45',
    ssim: '0.9790',
    sam: '1.9°',
    status: 'Completed',
    model: 'Multi-Modal (SAR + Temporal)',
    time: '2m 20s'
  },
  {
    id: 5,
    date: '10-FEB-2023',
    location: 'Mizoram, India',
    cloudCoverage: '59.20%',
    mode: 'RGB',
    psnr: '40.12',
    ssim: '0.9882',
    sam: '1.4°',
    status: 'Completed',
    model: 'Multi-Modal (SAR + Temporal)',
    time: '1m 55s'
  }
];

export const SPECTRAL_ANALYSIS_DATA = {
  bands: [
    { name: 'Green (B3)', wavelength: '0.52 - 0.59 µm', original: 0.12, reconstructed: 0.11, reference: 0.10 },
    { name: 'Red (B2)', wavelength: '0.62 - 0.68 µm', original: 0.18, reconstructed: 0.17, reference: 0.16 },
    { name: 'NIR (B4)', wavelength: '0.77 - 0.86 µm', original: 0.62, reconstructed: 0.59, reference: 0.58 }
  ],
  curvePoints: [
    { wl: 0.50, orig: 0.11, recon: 0.10, ref: 0.09 },
    { wl: 0.55, orig: 0.13, recon: 0.12, ref: 0.11 },
    { wl: 0.60, orig: 0.15, recon: 0.14, ref: 0.13 },
    { wl: 0.65, orig: 0.20, recon: 0.19, ref: 0.18 },
    { wl: 0.70, orig: 0.38, recon: 0.35, ref: 0.34 },
    { wl: 0.75, orig: 0.58, recon: 0.54, ref: 0.53 },
    { wl: 0.80, orig: 0.68, recon: 0.63, ref: 0.62 },
    { wl: 0.85, orig: 0.74, recon: 0.67, ref: 0.66 },
    { wl: 0.90, orig: 0.76, recon: 0.69, ref: 0.67 }
  ]
};

export const LULC_CLASSES = [
  { id: 'water', name: 'Water Bodies', color: '#2563eb', areaKm2: 38.2, percent: 7.9, cloudyArea: 8.2 },
  { id: 'forest', name: 'Dense Forest', color: '#166534', areaKm2: 68.1, percent: 14.1, cloudyArea: 12.4 },
  { id: 'vegetation', name: 'Sparse Vegetation', color: '#86efac', areaKm2: 98.0, percent: 20.3, cloudyArea: 18.6 },
  { id: 'agriculture', name: 'Agriculture / Cropland', color: '#eab308', areaKm2: 152.8, percent: 31.7, cloudyArea: 28.1 },
  { id: 'builtup', name: 'Built-up / Urban', color: '#ef4444', areaKm2: 34.2, percent: 7.1, cloudyArea: 6.3 },
  { id: 'barren', name: 'Barren Land', color: '#d97706', areaKm2: 32.8, percent: 6.8, cloudyArea: 9.4 },
  { id: 'wetlands', name: 'Wetlands', color: '#c084fc', areaKm2: 14.5, percent: 3.0, cloudyArea: 3.1 },
  { id: 'others', name: 'Others', color: '#94a3b8', areaKm2: 43.7, percent: 9.1, cloudyArea: 13.9 }
];

export const CONFUSION_MATRIX_DATA = {
  labels: ['Water', 'Forest', 'Veg', 'Agri', 'Built', 'Barren', 'Wet', 'Others'],
  matrix: [
    [0.91, 0.02, 0.01, 0.01, 0.00, 0.01, 0.03, 0.01],
    [0.01, 0.86, 0.06, 0.02, 0.01, 0.01, 0.01, 0.02],
    [0.01, 0.07, 0.80, 0.08, 0.01, 0.01, 0.01, 0.01],
    [0.00, 0.03, 0.06, 0.86, 0.02, 0.01, 0.01, 0.01],
    [0.00, 0.01, 0.02, 0.03, 0.87, 0.04, 0.01, 0.02],
    [0.01, 0.01, 0.02, 0.04, 0.06, 0.83, 0.01, 0.02],
    [0.02, 0.01, 0.02, 0.02, 0.01, 0.01, 0.87, 0.04],
    [0.01, 0.02, 0.02, 0.02, 0.01, 0.03, 0.04, 0.85]
  ]
};

export const BATCH_JOBS_DATA = [
  {
    id: 'SCENE_2023_0612_01',
    location: 'Assam Valley, IN',
    date: '12-JUN-2023',
    cloudCoverage: 80.98,
    mode: 'RGB',
    status: 'Completed',
    progress: 100,
    psnr: '39.67 dB',
    ssim: '0.9834',
    sam: '1.6°',
    lulcGain: '+37.68%'
  },
  {
    id: 'SCENE_2023_0614_02',
    location: 'Shillong Plateau, IN',
    date: '14-JUN-2023',
    cloudCoverage: 74.32,
    mode: 'RGB',
    status: 'Completed',
    progress: 100,
    psnr: '38.15 dB',
    ssim: '0.9782',
    sam: '2.1°',
    lulcGain: '+34.12%'
  },
  {
    id: 'SCENE_2023_0618_03',
    location: 'Dibrugarh Basin, IN',
    date: '18-JUN-2023',
    cloudCoverage: 89.45,
    mode: 'FCC',
    status: 'Processing',
    progress: 68,
    psnr: '--',
    ssim: '--',
    sam: '--',
    lulcGain: '--'
  },
  {
    id: 'SCENE_2023_0620_04',
    location: 'Tezpur Sector, IN',
    date: '20-JUN-2023',
    cloudCoverage: 62.10,
    mode: 'RGB',
    status: 'Queued',
    progress: 0,
    psnr: '--',
    ssim: '--',
    sam: '--',
    lulcGain: '--'
  },
  {
    id: 'SCENE_2023_0622_05',
    location: 'Guwahati East, IN',
    date: '22-JUN-2023',
    cloudCoverage: 91.20,
    mode: 'RGB',
    status: 'Queued',
    progress: 0,
    psnr: '--',
    ssim: '--',
    sam: '--',
    lulcGain: '--'
  }
];

export const DATASET_CATALOG = [
  {
    id: 'DS_LISS4_ASSAM_2023',
    name: 'ISRO Resourcesat-2A LISS-IV Northeast Archive',
    sensor: 'LISS-IV (MX)',
    resolution: '5.0 m',
    scenesCount: 142,
    dateRange: 'Jan 2023 - Oct 2023',
    avgCloudCover: '68.4%',
    format: 'GeoTIFF (COG)',
    size: '18.4 GB',
    tag: 'Primary Optical'
  },
  {
    id: 'DS_S1_GRD_IW_2023',
    name: 'Sentinel-1 C-Band SAR Dual-Pol (VV+VH) IW',
    sensor: 'Sentinel-1A / 1B',
    resolution: '10.0 m',
    scenesCount: 96,
    dateRange: 'Jan 2023 - Dec 2023',
    avgCloudCover: '0.0% (Radar)',
    format: 'GeoTIFF / SAFE',
    size: '42.1 GB',
    tag: 'SAR Guidance'
  },
  {
    id: 'DS_LISS4_TEMPORAL_REF',
    name: 'LISS-IV Post-Monsoon Cloud-Free Reference Mosaic',
    sensor: 'LISS-IV (MX)',
    resolution: '5.0 m',
    scenesCount: 38,
    dateRange: 'Nov 2023 - Dec 2023',
    avgCloudCover: '< 5%',
    format: 'GeoTIFF Mosaic',
    size: '9.2 GB',
    tag: 'Temporal Prior'
  }
];


export const LANDMARK_CATEGORIES = {
  river: {
    id: 'river',
    label: 'River & Water Bodies',
    color: '#2563eb',
    bg: 'rgba(37, 99, 235, 0.15)',
    border: '#3b82f6',
    iconName: 'Waves'
  },
  settlement: {
    id: 'settlement',
    label: 'Settlement & Urban',
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.15)',
    border: '#f87171',
    iconName: 'Building2'
  },
  forest: {
    id: 'forest',
    label: 'Dense Forest',
    color: '#166534',
    bg: 'rgba(22, 101, 52, 0.15)',
    border: '#22c55e',
    iconName: 'Trees'
  },
  mountain: {
    id: 'mountain',
    label: 'Mountain & Foothills',
    color: '#b45309',
    bg: 'rgba(180, 83, 9, 0.15)',
    border: '#f59e0b',
    iconName: 'Mountain'
  },
  agriculture: {
    id: 'agriculture',
    label: 'Cropland & Agriculture',
    color: '#eab308',
    bg: 'rgba(234, 179, 8, 0.15)',
    border: '#facc15',
    iconName: 'Wheat'
  },
  wetland: {
    id: 'wetland',
    label: 'Riparian Wetlands',
    color: '#a855f7',
    bg: 'rgba(168, 85, 247, 0.15)',
    border: '#c084fc',
    iconName: 'Droplets'
  }
};

export const GEOGRAPHIC_FEATURES_DATA = [
  {
    id: 'feat_river_01',
    name: 'Brahmaputra Main Braided Channel',
    category: 'river',
    categoryLabel: 'River & Fluvial System',
    color: '#2563eb',
    bg: 'rgba(37, 99, 235, 0.15)',
    border: '#3b82f6',
    areaKm2: 38.2,
    areaHa: 3820,
    confidencePct: 98.4,
    cloudOverlapPct: 74.2,
    observationStatus: 'Reconstructed (SAR Guided)',
    statusColor: '#38bdf8',
    centroid: { x: 52.0, y: 56.0 },
    polygon: [[20, 52], [35, 54], [52, 58], [72, 57], [85, 53], [82, 62], [65, 63], [45, 62], [28, 60], [18, 56]],
    spectralInfo: { ndvi: -0.22, ndwi: 0.74, brightness: 0.14 },
    elevation: '45m MSL',
    description: 'Primary braided fluvial corridor of the Brahmaputra River featuring dynamic alluvial sandbars.'
  },
  {
    id: 'feat_river_02',
    name: 'Jia Bhoreli Meandering Tributary',
    category: 'river',
    categoryLabel: 'River & Fluvial System',
    color: '#2563eb',
    bg: 'rgba(37, 99, 235, 0.15)',
    border: '#3b82f6',
    areaKm2: 14.8,
    areaHa: 1480,
    confidencePct: 96.1,
    cloudOverlapPct: 12.0,
    observationStatus: 'Direct Optical Observation',
    statusColor: '#4ade80',
    centroid: { x: 26.5, y: 38.0 },
    polygon: [[22, 25], [25, 33], [28, 42], [26, 48], [30, 47], [29, 36], [25, 26]],
    spectralInfo: { ndvi: -0.15, ndwi: 0.68, brightness: 0.16 },
    elevation: '52m MSL',
    description: 'Northern tributary flowing south from Himalayan foothills into the main Brahmaputra basin.'
  },
  {
    id: 'feat_settlement_01',
    name: 'Tezpur Urban Settlement Core',
    category: 'settlement',
    categoryLabel: 'Settlement & Urban Built-up',
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.15)',
    border: '#f87171',
    areaKm2: 24.6,
    areaHa: 2460,
    confidencePct: 93.5,
    cloudOverlapPct: 68.5,
    observationStatus: 'Reconstructed (SAR Guided)',
    statusColor: '#38bdf8',
    centroid: { x: 74.0, y: 41.5 },
    polygon: [[68, 36], [78, 36], [82, 44], [76, 48], [69, 45]],
    spectralInfo: { ndvi: 0.12, ndwi: -0.35, brightness: 0.58 },
    elevation: '68m MSL',
    description: 'High-density commercial, residential, and arterial transportation infrastructure.'
  },
  {
    id: 'feat_settlement_02',
    name: 'Riparian Residential Cluster',
    category: 'settlement',
    categoryLabel: 'Settlement & Urban Built-up',
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.15)',
    border: '#f87171',
    areaKm2: 9.6,
    areaHa: 960,
    confidencePct: 91.2,
    cloudOverlapPct: 84.0,
    observationStatus: 'Reconstructed (SAR + Temporal)',
    statusColor: '#38bdf8',
    centroid: { x: 38.5, y: 72.0 },
    polygon: [[34, 68], [43, 68], [44, 76], [35, 75]],
    spectralInfo: { ndvi: 0.18, ndwi: -0.28, brightness: 0.52 },
    elevation: '50m MSL',
    description: 'Semi-rural habitation cluster situated along the elevated river levee.'
  },
  {
    id: 'feat_forest_01',
    name: 'Kaziranga Dense Forest Canopy',
    category: 'forest',
    categoryLabel: 'Dense Forest Canopy',
    color: '#166534',
    bg: 'rgba(22, 101, 52, 0.15)',
    border: '#22c55e',
    areaKm2: 68.1,
    areaHa: 6810,
    confidencePct: 96.2,
    cloudOverlapPct: 82.1,
    observationStatus: 'Reconstructed (SAR Guided)',
    statusColor: '#38bdf8',
    centroid: { x: 81.0, y: 76.0 },
    polygon: [[72, 68], [88, 67], [92, 79], [86, 88], [74, 85]],
    spectralInfo: { ndvi: 0.72, ndwi: -0.18, brightness: 0.22 },
    elevation: '75m MSL',
    description: 'Multi-tiered broadleaf moist deciduous forest canopy with high biomass index.'
  },
  {
    id: 'feat_forest_02',
    name: 'Balipara Foothill Woodland Reserve',
    category: 'forest',
    categoryLabel: 'Dense Forest Canopy',
    color: '#166534',
    bg: 'rgba(22, 101, 52, 0.15)',
    border: '#22c55e',
    areaKm2: 42.3,
    areaHa: 4230,
    confidencePct: 97.8,
    cloudOverlapPct: 4.5,
    observationStatus: 'Direct Optical Observation',
    statusColor: '#4ade80',
    centroid: { x: 18.0, y: 16.0 },
    polygon: [[10, 10], [25, 9], [28, 22], [15, 24], [8, 18]],
    spectralInfo: { ndvi: 0.69, ndwi: -0.15, brightness: 0.24 },
    elevation: '110m MSL',
    description: 'Protected sub-Himalayan foothill forest belt connecting plain to northern ranges.'
  },
  {
    id: 'feat_mountain_01',
    name: 'Sub-Himalayan Foothill Ridge',
    category: 'mountain',
    categoryLabel: 'Mountain & Foothill Ridge',
    color: '#b45309',
    bg: 'rgba(180, 83, 9, 0.15)',
    border: '#f59e0b',
    areaKm2: 56.4,
    areaHa: 5640,
    confidencePct: 92.4,
    cloudOverlapPct: 88.0,
    observationStatus: 'Reconstructed (SAR Layover)',
    statusColor: '#38bdf8',
    centroid: { x: 48.0, y: 14.0 },
    polygon: [[32, 8], [65, 8], [68, 19], [46, 21], [30, 16]],
    spectralInfo: { ndvi: 0.58, ndwi: -0.22, brightness: 0.32 },
    elevation: '380m - 740m MSL',
    description: 'Steep rugged mountain ridge exhibiting strong radar layover and topographic shading.'
  },
  {
    id: 'feat_mountain_02',
    name: 'Karbi Anglong Elevated Escarpment',
    category: 'mountain',
    categoryLabel: 'Mountain & Foothill Ridge',
    color: '#b45309',
    bg: 'rgba(180, 83, 9, 0.15)',
    border: '#f59e0b',
    areaKm2: 37.8,
    areaHa: 3780,
    confidencePct: 89.6,
    cloudOverlapPct: 91.2,
    observationStatus: 'Reconstructed (SAR Layover)',
    statusColor: '#38bdf8',
    centroid: { x: 88.0, y: 32.0 },
    polygon: [[80, 24], [95, 23], [96, 38], [83, 39]],
    spectralInfo: { ndvi: 0.54, ndwi: -0.25, brightness: 0.35 },
    elevation: '420m - 680m MSL',
    description: 'Rugged crystalline plateau escarpment bordering the southern Brahmaputra valley.'
  },
  {
    id: 'feat_agriculture_01',
    name: 'Alluvial Paddy Cultivation Mosaic',
    category: 'agriculture',
    categoryLabel: 'Cropland & Agriculture',
    color: '#eab308',
    bg: 'rgba(234, 179, 8, 0.15)',
    border: '#facc15',
    areaKm2: 98.4,
    areaHa: 9840,
    confidencePct: 94.6,
    cloudOverlapPct: 81.3,
    observationStatus: 'Reconstructed (Temporal Guided)',
    statusColor: '#38bdf8',
    centroid: { x: 35.0, y: 48.0 },
    polygon: [[25, 42], [44, 41], [46, 54], [28, 55]],
    spectralInfo: { ndvi: 0.62, ndwi: 0.08, brightness: 0.38 },
    elevation: '54m MSL',
    description: 'Extensive wet-season paddy cultivation on nutrient-rich alluvial soils.'
  },
  {
    id: 'feat_agriculture_02',
    name: 'Sonitpur Intensive Crop Fields',
    category: 'agriculture',
    categoryLabel: 'Cropland & Agriculture',
    color: '#eab308',
    bg: 'rgba(234, 179, 8, 0.15)',
    border: '#facc15',
    areaKm2: 54.4,
    areaHa: 5440,
    confidencePct: 95.1,
    cloudOverlapPct: 8.2,
    observationStatus: 'Direct Optical Observation',
    statusColor: '#4ade80',
    centroid: { x: 62.0, y: 28.0 },
    polygon: [[54, 22], [70, 21], [72, 34], [55, 35]],
    spectralInfo: { ndvi: 0.65, ndwi: 0.05, brightness: 0.36 },
    elevation: '62m MSL',
    description: 'Multi-cropping agrarian plots with irrigation canals and harvest boundaries.'
  },
  {
    id: 'feat_wetland_01',
    name: 'Floodplain Riparian Marshland',
    category: 'wetland',
    categoryLabel: 'Riparian Wetlands',
    color: '#a855f7',
    bg: 'rgba(168, 85, 247, 0.15)',
    border: '#c084fc',
    areaKm2: 14.5,
    areaHa: 1450,
    confidencePct: 93.8,
    cloudOverlapPct: 76.5,
    observationStatus: 'Reconstructed (SAR Guided)',
    statusColor: '#38bdf8',
    centroid: { x: 55.0, y: 78.0 },
    polygon: [[48, 72], [63, 71], [65, 84], [50, 83]],
    spectralInfo: { ndvi: 0.38, ndwi: 0.42, brightness: 0.20 },
    elevation: '46m MSL',
    description: 'Seasonally flooded perennial marsh serving as natural flood mitigation zone.'
  }
];
