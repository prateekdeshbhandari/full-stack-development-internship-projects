# Full-Stack Development Internship Projects

This repository hosts two full-stack projects built as part of the Full-Stack Development Internship Track:

1. **FS-01: Multi-Vendor E-Commerce Marketplace**
2. **FS-02: Real-Time Collaborative Workspace**

Both projects are structured and configured to run independently or side-by-side simultaneously without any port collisions.

---

## Port Allocation Matrix

| Service | Technology | Port | URL |
| :--- | :--- | :--- | :--- |
| **FS-01 Marketplace Backend** | Node.js / HTTP REST | `4000` | `http://localhost:4000` |
| **FS-01 Marketplace Frontend** | Next.js 16 / React 19 / TS | `3000` | `http://localhost:3000` |
| **FS-02 Workspace Backend** | Express / Socket.io / Prisma | `5000` | `http://localhost:5000` |
| **FS-02 Workspace Frontend** | Next.js 16 / React 19 / TS | `3001` | `http://localhost:3001` |

---

## Quick Start (Run Both Projects Together)

You can launch all 4 services at once using the provided root runner scripts:

- **Windows Batch**: Double-click `run-all.bat` (or execute `.\run-all.bat` in Command Prompt)
- **PowerShell**: Execute `.\run-all.ps1` in PowerShell

---

## Project 1: FS-01 Multi-Vendor E-Commerce Marketplace

### Overview
An Amazon-style e-commerce platform where multiple independent vendors register, list and manage inventory, and customers browse, filter, add to cart, and place orders.

### Features
- **User Roles & Authentication**: Vendor and Customer accounts with secure password hashing and session tokens.
- **Product Catalog**: Live search, category filtering, and sorting (price low-high, high-low, top-rated).
- **Cart & Order Lifecycle**: Real-time cart state, inventory checking, and order placement endpoint (`/api/orders`).
- **Vendor Dashboard**: Live seller dashboard (`/dashboard`) to add new products, edit pricing, manage stock, and view active listings.

### Manual Run Instructions
```bash
# Terminal 1 - Backend (Port 4000)
cd FS-01-Multi-Vendor-Ecommerce/FS-01-Multi-Vendor-Ecommerce/backend
npm start

# Terminal 2 - Frontend (Port 3000)
cd FS-01-Multi-Vendor-Ecommerce/FS-01-Multi-Vendor-Ecommerce/frontend
npm run dev
```

### Key API Endpoints
- `GET /api/health`: Health status
- `POST /api/auth/register`: Create customer or vendor account
- `POST /api/auth/login`: Authenticate and receive auth token
- `GET /api/products`: Search, filter, and sort products
- `POST /api/products`: Add vendor product
- `GET /api/products/:id`: Fetch single product details
- `PATCH /api/products/:id`: Update product inventory or details
- `DELETE /api/products/:id`: Delete listing
- `GET /api/orders`: List placed orders
- `POST /api/orders`: Place customer order with multi-vendor items

---

## Project 2: FS-02 Real-Time Collaborative Workspace

### Overview
A collaborative workspace (Notion / Figma style) allowing multi-user real-time interaction, live document editing, presence tracking (online users and colored avatars), comments, and workspace dashboards.

### Features
- **Authentication**: JWT token authentication with bcrypt password hashing and user profiles.
- **Real-Time WebSockets**: Socket.io integration for instant room-based updates and presence broadcasting.
- **Interactive Document Editor**: Real-time collaborative editor (`/document`) with live status badge and revision state.
- **Team Presence & Comments**: Live member avatars and interactive comment threads.
- **Workspace Hub**: Team overview dashboard (`/dashboard`) and workspace navigation (`/workspace`).

### Manual Run Instructions
```bash
# Terminal 1 - Backend (Port 5000)
cd FS-02-Real-Time-Collaborative-Workspace/FS-02-Collaborative-Workspace/backend
npm start

# Terminal 2 - Frontend (Port 3001)
cd FS-02-Real-Time-Collaborative-Workspace/FS-02-Collaborative-Workspace/frontend
npm run dev
```

### Key API Endpoints
- `GET /health`: Health status
- `POST /api/auth/register`: User registration
- `POST /api/auth/login`: User login
- `GET /api/auth/me`: Authenticated profile check (requires Bearer token)
- `WebSocket (Socket.io)`: `join-room`, `presence-update` events
