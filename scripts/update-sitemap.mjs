import fs from "node:fs";
import path from "node:path";

const siteUrl = (process.env.VITE_SITE_URL || "https://www.cerocopacabana.com.br").replace(/\/$/, "");
const lastmod = new Date().toISOString().slice(0, 10);
const file = path.join(process.cwd(), "public", "sitemap.xml");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

fs.writeFileSync(file, xml, "utf8");
console.log(`sitemap.xml atualizado (${lastmod})`);