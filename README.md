# Dr. Marcell Parente — Site Institucional

Site institucional do Dr. Marcell Parente, especialista em Endodontia e Implantodontia em Copacabana, Rio de Janeiro.

**Produção:** [marcell-site.vercel.app](https://marcell-site.vercel.app/)

## Stack

- **Frontend:** Vite, React 18, TypeScript, Tailwind CSS, shadcn/ui
- **i18n:** Português, Inglês e Espanhol
- **Deploy:** Vercel (ou Docker + nginx)

## Desenvolvimento local

### Requisitos

- Node.js 18+
- npm

### Instalação e execução

```sh
git clone https://github.com/fabianosf/marcell-site.git
cd marcell-site
npm install
npm run dev
```

O site sobe em `http://localhost:8080`.

### Build de produção

```sh
npm run build
npm run preview
```

## Docker

```sh
docker compose up --build
```

O site fica disponível em `http://localhost:8080`.

## Estrutura principal

```
src/
├── components/   # Hero, About, Services, Gallery, Contact, Footer...
├── i18n/         # Traduções PT / EN / ES
├── pages/        # Index, NotFound
└── assets/       # Imagens e logo
```
