import kitCatalog from '@/data/kit-catalog.json';
import kitImageMap from '@/data/kit-image-map.json';
import catalogImageMap from '@/data/catalog-image-map.json';

export type KitCatalogData = {
  prices: {
    clasicos: number;
    arabes: number;
    coleccion: number;
  };
  clasicosHombre: string[];
  clasicosMujer: string[];
  arabes: string[];
  coleccionEspecial: string[];
};

const kitCatalogData = kitCatalog as KitCatalogData;
const imageManifest = kitImageMap as Record<string, string>;
const catalogManifest = catalogImageMap as Record<string, string>;

const collapsedManifest = Object.entries(imageManifest).reduce<Record<string, string>>((acc, [key, value]) => {
  const collapsed = key.replace(/-/g, '');
  if (!acc[collapsed]) {
    acc[collapsed] = value;
  }
  return acc;
}, {});

const normalizeBase = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const removePrefixAndDelimiters = (value: string) =>
  value
    .replace(/^[\s-]*inspirad[oa]\s+en\s+/i, '')
    .replace(/\s*-\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const extractPerfumeAndBrand = (reference: string) => {
  const brandMatch = reference.match(/\(([^)]+)\)/);
  if (brandMatch) {
    const perfume = reference
      .replace(/^[\s-]*inspirad[oa]\s+en\s+/i, '')
      .replace(/\([^)]*\)/g, '')
      .replace(/\s*-\s*/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return {
      perfume,
      brand: brandMatch[1].trim(),
    };
  }

  const [first, ...rest] = reference.split(/\s*-\s*/);
  if (rest.length) {
    return {
      perfume: first.replace(/^[\s-]*inspirad[oa]\s+en\s+/i, '').trim(),
      brand: rest.join(' ').trim(),
    };
  }

  const cleaned = reference.replace(/^[\s-]*inspirad[oa]\s+en\s+/i, '').trim();
  return {
    perfume: cleaned,
    brand: '',
  };
};

const buildCanonicalKey = (reference: string) => {
  if (!reference) return '';
  const cleaned = reference.replace(/\(([^)]+)\)/g, ' $1 ');
  const stripped = removePrefixAndDelimiters(cleaned);
  const { perfume, brand } = extractPerfumeAndBrand(reference);
  const combined = perfume && brand ? `${perfume} ${brand}` : stripped;
  return normalizeBase(combined);
};

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

const createPlaceholder = (reference: string) => {
  const key = buildCanonicalKey(reference) || 'kit-emprendedor';
  const hash = hashString(key);
  const hue = hash % 360;
  const secondaryHue = (hue + 40) % 360;
  const title = reference.replace(/^\s*inspirad[oa]\s+en\s+/i, '').trim();
  const displayTitle = title.length > 32 ? `${title.slice(0, 29)}…` : title;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="grad" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="hsl(${hue}, 62%, 22%)" />
        <stop offset="50%" stop-color="hsl(${secondaryHue}, 65%, 35%)" />
        <stop offset="100%" stop-color="hsl(${hue}, 58%, 20%)" />
      </linearGradient>
    </defs>
    <rect width="600" height="800" fill="url(#grad)" />
    <rect x="90" y="160" width="420" height="520" rx="40" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" stroke-width="4" />
    <text x="300" y="340" font-family="'Playfair Display', 'Times New Roman', serif" font-size="42" fill="rgba(255,255,255,0.92)" text-anchor="middle" letter-spacing="2">SEVÁN</text>
    <text x="300" y="388" font-family="'Playfair Display', 'Times New Roman', serif" font-size="28" fill="rgba(255,255,255,0.8)" text-anchor="middle">PERFUM</text>
    <text x="300" y="460" font-family="'Montserrat', 'Helvetica', sans-serif" font-size="22" fill="rgba(255,255,255,0.75)" text-anchor="middle" letter-spacing="1.8">Colección Especial</text>
    <text x="300" y="520" font-family="'Montserrat', 'Helvetica', sans-serif" font-size="20" fill="rgba(255,255,255,0.88)" text-anchor="middle" letter-spacing="1.2">${displayTitle.replace(/&/g, '&amp;')}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const priceMap = (() => {
  const map = new Map<string, number>();
  const register = (items: string[], price: number) => {
    items.forEach((item) => {
      const key = buildCanonicalKey(item);
      if (key) {
        map.set(key, price);
      }
    });
  };

  register(kitCatalogData.clasicosHombre, kitCatalogData.prices.clasicos);
  register(kitCatalogData.clasicosMujer, kitCatalogData.prices.clasicos);
  register(kitCatalogData.arabes, kitCatalogData.prices.arabes);
  register(kitCatalogData.coleccionEspecial, kitCatalogData.prices.coleccion);

  return map;
})();

const normalizeReference = (reference: string) =>
  reference
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const getKitImagePath = (reference: string) => {
  if (!reference) return null;

  const base = normalizeReference(reference);
  const noPrefix = base.replace(/^inspirado-en-/, '');
  const { brand, perfume } = extractPerfumeAndBrand(reference);

  const candidates = new Set<string>([
    base,
    noPrefix,
    base.replace(/-/g, ''),
    noPrefix.replace(/-/g, ''),
  ]);

  const canonical = buildCanonicalKey(reference);
  if (canonical) {
    candidates.add(canonical);
    candidates.add(canonical.replace(/-/g, ''));
  }

  const normalizedBrand = brand ? normalizeReference(brand) : '';
  const normalizedPerfume = perfume ? normalizeReference(perfume) : '';

  if (normalizedBrand) {
    candidates.add(normalizedBrand);
    candidates.add(normalizedBrand.replace(/-/g, ''));
  }

  if (normalizedPerfume) {
    candidates.add(normalizedPerfume);
    candidates.add(normalizedPerfume.replace(/-/g, ''));
  }

  if (normalizedBrand && normalizedPerfume) {
    const joined = `${normalizedBrand}-${normalizedPerfume}`;
    const joinedReverse = `${normalizedPerfume}-${normalizedBrand}`;
    candidates.add(joined);
    candidates.add(joined.replace(/-/g, ''));
    candidates.add(joinedReverse);
    candidates.add(joinedReverse.replace(/-/g, ''));
    candidates.add(`${normalizedBrand}${normalizedPerfume}`);
    candidates.add(`${normalizedPerfume}${normalizedBrand}`);
  }

  for (const candidate of Array.from(candidates)) {
    if (!candidate) continue;
    if (imageManifest[candidate]) {
      return imageManifest[candidate];
    }
    const collapsed = candidate.replace(/-/g, '');
    if (collapsedManifest[collapsed]) {
      return collapsedManifest[collapsed];
    }
    if (catalogManifest[candidate]) {
      return catalogManifest[candidate];
    }
    if (catalogManifest[collapsed]) {
      return catalogManifest[collapsed];
    }
  }

  return createPlaceholder(reference);
};

const resolvePrice = (value?: string | null) => {
  if (!value) return null;
  const key = buildCanonicalKey(value);
  if (!key) return null;
  return priceMap.get(key) ?? null;
};

export const getKitPriceForReference = (...values: Array<string | undefined | null>) => {
  for (const value of values) {
    const price = resolvePrice(value);
    if (typeof price === 'number') {
      return price;
    }
  }
  return null;
};

export const isKitReference = (value?: string | null) => {
  if (!value) return false;
  const key = buildCanonicalKey(value);
  return key ? priceMap.has(key) : false;
};

export { kitCatalogData, createPlaceholder as getKitPlaceholderImage };
