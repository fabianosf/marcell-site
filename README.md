# CERO Copacabana — Dr. Marcell Parente e Dra. Maria Eugênia

Site institucional da CERO (Clínica de Emergências e Reabilitação Oral), com os dois profissionais.
Vite + React + TypeScript + Tailwind + shadcn/ui. Português, inglês e espanhol.

## Atualizar dados

Telefone, WhatsApp, e-mail, endereço, CRO e e-mail da Dra. Maria Eugênia ficam em **`src/lib/site.ts`**.
Campos vazios (ex.: Instagram) não aparecem no site.

| O quê | Onde |
| --- | --- |
| Dados de contato, CRO | `src/lib/site.ts` |
| Textos, currículos, tratamentos, FAQ (PT / EN / ES) | `src/i18n/locales/` |
| Fotos | `src/assets/marcell/`, `src/assets/maria/` (WebP) |
| Logo | `src/assets/brand/logo-cero.webp` |
| Cores e fontes | `src/index.css` |

## Rodar

```sh
npm install
npm run dev      # http://localhost:8080
npm run build    # gera dist/
```

## Publicar

- **Vercel:** `vercel.json` já faz as rotas (/equipe, /tratamentos...) funcionarem.
- **Docker + nginx:** `docker compose up --build` (porta 8080).
- Endereço do site (canonical e prévia de compartilhamento): por padrão `https://drmarcellparente.com.br`.
  Para trocar, defina `VITE_SITE_URL` (veja `.env.example`).
