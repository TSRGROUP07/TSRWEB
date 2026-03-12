import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadEnv = () => {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (fs.existsSync(envPath)) {
            const envConfig = fs.readFileSync(envPath, 'utf8');
            envConfig.split('\n').forEach(line => {
                const match = line.match(/^([^=]+)=(.*)$/);
                if (match) {
                    const key = match[1].trim();
                    let value = match[2].trim();
                    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                        value = value.slice(1, -1);
                    }
                    process.env[key] = value;
                }
            });
        }
    } catch (e) {
        console.error("Error loading env:", e);
    }
};

loadEnv();

async function inspectAllVideos() {
    try {
        const { getSupabaseCollection } = await import("@/lib/supabase-db");
        console.log("Fetching site_videos...");
        const videos = await getSupabaseCollection("site_videos");

        console.log("\n--- FULL VIDEO REPORT ---");
        if (Array.isArray(videos)) {
            videos.forEach((v: any, i: number) => {
                console.log(`Video #${i + 1}:`);
                console.log(`  ID: ${v.id}`);
                console.log(`  Type: ${v.type}`);
                console.log(`  URL: ${v.url}`);
                console.log(`  -------------------`);
            });
        }
        console.log("--- END REPORT ---\n");

    } catch (err) {
        console.error("Error:", err);
    }
}

inspectAllVideos();
