

## Online scheduling overview

The site now includes an online agenda tailored for the Clínica Dr. Marcell Ferreira:

- Patient onboarding with email + password flow (temporary password is delivered via e-mail/console).
- Password-protected dashboard to request, track or cancel appointments.
- Staff view (requires `is_staff` user) with real-time stats, status management and ability to remove records.
- REST API powered by Django & Django REST Framework.

The front-end is still Vite + React + TypeScript + Tailwind + shadcn UI. The new page lives at `/agenda`.

## Stack

- **Frontend:** Vite, React 18, TypeScript, React Query, shadcn UI.
- **Backend:** Django 5, Django REST Framework, Simple JWT, SQLite (dev).
- **Tooling:** ESLint, Tailwind CSS.

## Getting started locally

### Requirements

- Node.js 18+ and npm
- Python 3.12+

### Clone the project

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

### Backend (Django API)

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
cd backend
python manage.py migrate
python manage.py createsuperuser  # opcional, para acessar o admin
python manage.py runserver
```

Notes:

- O servidor sobe em `http://127.0.0.1:8000/`.
- E-mails são enviados no console (`EMAIL_BACKEND=console`). A senha temporária também é retornada na resposta da API para facilitar testes.
- O admin Django está disponível em `http://127.0.0.1:8000/admin/`.

### Frontend (React SPA)

Em outro terminal:

```sh
npm install
npm run dev -- --host
```

Por padrão o front consome a API em `http://localhost:8000/api`. Caso queira apontar para outro domínio, adicione um arquivo `.env` com:

```
VITE_API_URL=https://seu-dominio/api
```

### Fluxo sugerido

1. Abra `http://localhost:5173/agenda`.
2. Cadastre-se informando nome, e-mail e telefone. A senha temporária aparecerá na tela e no console do backend.
3. Entre com e-mail + senha temporária.
4. Solicite novos horários, acompanhe o status ou cancele consultas.
5. Caso seu usuário tenha `is_staff=true`, você verá o painel administrativo e poderá confirmar/cancelar/remoção de consultas.

## Deploy

- Front-end: mantenha o fluxo padrão do Vite (Lovable, Vercel, Netlify, etc.).
- Backend: configurar um ambiente Django (Railway, Fly.io, Render, etc.) com Postgres/SQLite, definir `SECRET_KEY`, `ALLOWED_HOSTS`, SMTP real e expor `/api`.

## Original Lovable project

