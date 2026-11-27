import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * Preenche %SITE_URL% no index.html (canonical, og:url, og:image) com a
 * variável VITE_SITE_URL. Se ela não existir, usa o domínio canônico
 * (https://www.cerocopacabana.com.br).
 */
const siteUrlPlugin = (mode: string): Plugin => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const url = (env.VITE_SITE_URL || "https://www.cerocopacabana.com.br").replace(/\/$/, "");
  const verification = (env.VITE_GOOGLE_SITE_VERIFICATION || "").trim();
  return {
    name: "site-url-html",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        let out = html;
        if (url) out = out.replace(/%SITE_URL%/g, url);
        else out = out.split("\n").filter((line) => !line.includes("%SITE_URL%")).join("\n");
        if (verification) {
          out = out.replace(
            "<!-- GOOGLE_SITE_VERIFICATION -->",
            `<meta name="google-site-verification" content="${verification}" />`,
          );
        } else {
          out = out.replace(/\s*<!-- GOOGLE_SITE_VERIFICATION -->\n?/g, "");
        }
        return out;
      },
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), siteUrlPlugin(mode)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
