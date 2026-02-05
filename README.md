# Generic POS System for Sari-Sari Stores (Philippines)

A simple full-stack POS starter project designed for sari-sari store operations:

- Product inventory management
- Cart and checkout flow
- Sales logging
- PHP currency formatting

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose

## Project Structure

- `client/` - React + Tailwind web app
- `server/` - Express API with MongoDB models

## Setup

1. Install dependencies:

```bash
npm install
npm run install:all
```

2. Configure environment variables:

```bash
cp server/.env.example server/.env
```

3. Start MongoDB locally (default URI):

```bash
mongodb://127.0.0.1:27017/sari_sari_pos
```

4. Run the app in development mode:

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## API Endpoints

- `GET /api/health`
- `GET /api/products`
- `POST /api/products`
- `GET /api/sales`
- `POST /api/sales/checkout`

## Notes

- Checkout reduces product stock in MongoDB transaction session.
- Payment method options in this starter are `Cash`, `GCash`, and `Maya`.
