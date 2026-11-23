import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * Preenche %SITE_URL% no index.html (canonical, og:url, og:image) com a
 * variável VITE_SITE_URL. Se ela não existir, usa o domínio canônico
 * (https://cerocopa.com.br).
 */
const siteUrlPlugin = (mode: string): Plugin => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const url = (env.VITE_SITE_URL || "https://cerocopa.com.br").replace(/\/$/, "");
  return {
    name: "site-url-html",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        if (url) return html.replace(/%SITE_URL%/g, url);
        return html
          .split("\n")
          .filter((line) => !line.includes("%SITE_URL%"))
          .join("\n");
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
