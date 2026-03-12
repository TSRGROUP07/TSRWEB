import fs from 'fs';
import path from 'path';

const ILANLAR_DIR = path.join(process.cwd(), 'public', 'ilanlar', '1-) TSR GROUP GAYRİMENKULLER', '1-) DAİRELER');
const OUTPUT_FILE = path.join(process.cwd(), 'data', 'properties.json');

// Alanya Neighborhood Coordinates (Approximate Centers)
const NEIGHBORHOOD_COORDS: Record<string, { lat: number; lng: number }> = {
    "Alanya Merkez": { lat: 36.5436, lng: 31.9998 },
    "Mahmutlar": { lat: 36.4883, lng: 32.0967 },
    "Oba": { lat: 36.5412, lng: 32.0360 },
    "Cikcilli": { lat: 36.5500, lng: 32.0200 },
    "Avsallar": { lat: 36.6186, lng: 31.7770 },
    "Kestel": { lat: 36.5050, lng: 32.0620 },
    "Tosmur": { lat: 36.5170, lng: 32.0500 },
    "Kargicak": { lat: 36.4670, lng: 32.1300 },
    "Konakli": { lat: 36.5860, lng: 31.8590 },
    "Payallar": { lat: 36.5900, lng: 31.8300 },
    "Turkler": { lat: 36.6000, lng: 31.8000 },
    "Okurcalar": { lat: 36.6500, lng: 31.6800 },
    "Incekum": { lat: 36.6300, lng: 31.7500 },
    "Demirtas": { lat: 36.4400, lng: 32.2200 },
    "Tepe": { lat: 36.5600, lng: 31.9900 },
    "Bektas": { lat: 36.5600, lng: 32.0000 },
    "Damlatas": { lat: 36.5490, lng: 31.9890 },
    "Kleopatra": { lat: 36.5500, lng: 31.9800 },
    "Guller Pinari": { lat: 36.5450, lng: 32.0050 },
    "Keykubat": { lat: 36.5470, lng: 32.0150 }
};

interface Property {
    id: string;
    title: string;
    location: string;
    price: number;
    currency: string;
    type: string;
    images: string[];
    features: string[];
    description: string;
    code: string;
    category: string;
    coordinates?: { lat: number; lng: number };
}

function getDirectories(source: string) {
    try {
        return fs.readdirSync(source, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
    } catch (error) {
        console.warn(`Warning: Could not read directory ${source}:`, error);
        return [];
    }
}

function getImages(source: string): string[] {
    try {
        return fs.readdirSync(source)
            .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
            .map(file => path.join(source, file));
    } catch (error) {
        return [];
    }
}

function parsePrice(priceStr: string) {
    const currency = priceStr.includes("€") ? "€" : priceStr.includes("$") ? "$" : (priceStr.includes("TL") || priceStr.includes("₺")) ? "₺" : "€";
    const match = priceStr.match(/^[\d.,\s]+/);
    if (match) {
        let val = match[0].trim();
        if (val.includes(",")) {
            val = val.replace(/\./g, "").replace(",", ".");
        } else {
            val = val.replace(/\./g, "");
        }
        const priceVal = parseFloat(val);
        return { price: isNaN(priceVal) ? 0 : priceVal, currency };
    }
    return { price: 0, currency };
}

function getCoordinates(text: string): { lat: number; lng: number } {
    let bestMatchKey = "Alanya Merkez";
    let maxLen = 0;

    // Normalize text for matching
    const normalizedText = text.toLowerCase().replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c');

    for (const key of Object.keys(NEIGHBORHOOD_COORDS)) {
        const normalizedKey = key.toLowerCase().replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c');
        if (normalizedText.includes(normalizedKey)) {
            if (normalizedKey.length > maxLen) {
                maxLen = normalizedKey.length;
                bestMatchKey = key;
            }
        }
    }

    const baseCoords = NEIGHBORHOOD_COORDS[bestMatchKey];

    // Add jitter: +/- ~200-300m (approx 0.002-0.003 degrees)
    // Using random seed from text length or similar to keep somewhat consistent but random enough?
    // Actually full random is fine, as long as it doesn't change on every page reload (json is static)
    const jitterLat = (Math.random() - 0.5) * 0.006;
    const jitterLng = (Math.random() - 0.5) * 0.006;

    return {
        lat: baseCoords.lat + jitterLat,
        lng: baseCoords.lng + jitterLng
    };
}

function generateProperties() {
    const properties: Property[] = [];

    if (!fs.existsSync(ILANLAR_DIR)) {
        console.error(`Directory not found: ${ILANLAR_DIR}`);
        return;
    }

    const locations = getDirectories(ILANLAR_DIR);

    for (const locDir of locations) {
        const cleanLocation = locDir.replace(/^\d+-\)\s*/, "").split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");

        const locPath = path.join(ILANLAR_DIR, locDir);
        const typeDirs = getDirectories(locPath);

        for (const typeDir of typeDirs) {
            const typePath = path.join(locPath, typeDir);
            const apartmentDirs = getDirectories(typePath);

            for (const aptDir of apartmentDirs) {
                const aptPath = path.join(typePath, aptDir);

                let parts = aptDir.split(" - ");
                if (parts.length < 2) {
                    parts = aptDir.split("-");
                }
                parts = parts.map(p => p.trim());

                let price = 0;
                let currency = "€";
                let code = "";

                if (parts.length > 0) {
                    if (/\d/.test(parts[0])) {
                        const priceData = parsePrice(parts[0]);
                        price = priceData.price;
                        currency = priceData.currency;
                    }
                }

                if (parts.length > 0) {
                    for (let i = parts.length - 1; i >= 0; i--) {
                        const part = parts[i].trim();
                        if (/^M[\s-]*\d+$/i.test(part)) {
                            code = part.replace(/[\s-]/g, "").toUpperCase();
                            break;
                        }
                        const match = part.match(/\(?(M[\s-]*\d+)\)?/i);
                        if (match) {
                            code = match[1].replace(/[\s-]/g, "").toUpperCase();
                            break;
                        }
                    }
                    if (!code) {
                        const last = parts[parts.length - 1];
                        if (last.length <= 6 && /^[A-Z0-9]+$/i.test(last) && !last.includes("€")) {
                            code = last;
                        }
                    }
                }

                const subDirs = getDirectories(aptPath);
                const allImages: string[] = [];

                const interiorDir = subDirs.find(d => d.includes("DAİRE RESİMLERİ"));
                if (interiorDir) {
                    const images = getImages(path.join(aptPath, interiorDir));
                    allImages.push(...images.map(img => img.replace(process.cwd() + '\\public', '').replace(/\\/g, '/')));
                }

                const complexDir = subDirs.find(d => d.includes("KOMPLEKS RESİMLERİ"));
                if (complexDir) {
                    const images = getImages(path.join(aptPath, complexDir));
                    allImages.push(...images.map(img => img.replace(process.cwd() + '\\public', '').replace(/\\/g, '/')));
                }

                if (allImages.length === 0) {
                    const images = getImages(aptPath);
                    allImages.push(...images.map(img => img.replace(process.cwd() + '\\public', '').replace(/\\/g, '/')));
                }

                const title = `${typeDir} ${cleanLocation} Daire`;

                // Calculate coordinates
                // Search in: Folder Name (aptDir) + Location Name (locDir)
                const searchString = `${locDir} ${aptDir}`;
                const coords = getCoordinates(searchString);

                if (price > 0 && allImages.length > 0) {
                    properties.push({
                        id: code || `GEN-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                        title: title,
                        location: cleanLocation,
                        price: price,
                        currency: currency,
                        type: typeDir,
                        images: allImages,
                        features: [],
                        description: `${cleanLocation} bölgesinde satılık ${typeDir} daire.`,
                        code: code,
                        category: "Satılık",
                        coordinates: coords // Added Coordinates
                    });
                }
            }
        }
    }

    const dataDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(properties, null, 2), 'utf-8');
    console.log(`✅ ${properties.length} properties generated successfully!`);
    console.log(`📂 Output saved to: ${OUTPUT_FILE}`);
}

generateProperties();
