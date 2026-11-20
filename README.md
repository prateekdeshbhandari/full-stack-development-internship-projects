# Full-Stack Development Internship Projects

Hey there! Welcome to the repository. This contains two full-stack projects built for the internship:

1. **Project #1 (FS-01): Multi-Vendor E-Commerce Marketplace**
2. **Project #2 (FS-02): Real-Time Collaborative Workspace**

Both projects are set up with their own ports so you can run them separately or both at the exact same time without any conflict.

---

## 🔑 Login Credentials (For Testing)

You can use these accounts to log in directly, or create your own brand new account on the register page of either app.

### Project 1: Multi-Vendor Marketplace
- **Login URL:** http://localhost:3000/login
- **Email:** `vendor@market.com`
- **Password:** `password123`
- **Role:** Vendor (Seller Dashboard access)
- *(Tip: There is also a 1-click "Fill Credentials" button right on the login form!)*

### Project 2: Collaborative Workspace
- **Login URL:** http://localhost:3001/login
- **Email:** `alex@company.com`
- **Password:** `password123`
- **Role:** Team Member (Workspace & Document access)
- *(Tip: There is also a 1-click "Fill Credentials" button on this login form too!)*

---

## ⚡ How to Run (Using Command Prompt / CMD)

Open your terminal or CMD in the project root (`C:\Users\Prateek DeshBhandari\OneDrive\Desktop\Project`):

### Option 1: Run Both Projects Together (Quickest!)
Just double-click **`run-all.bat`** or run this single command in CMD:
```cmd
run-all.bat
```
This automatically pops up 4 windows for both backends and frontends!

---

### Option 2: Run Project #1 Only (Multi-Vendor E-Commerce)
You can double-click **`run-project-1.bat`** or run these commands in CMD:

**1. Start Backend (Port 4000):**
```cmd
cd FS-01-Multi-Vendor-Ecommerce\FS-01-Multi-Vendor-Ecommerce\backend
npm start
```

**2. Start Frontend (Port 3000) in a second CMD window:**
```cmd
cd FS-01-Multi-Vendor-Ecommerce\FS-01-Multi-Vendor-Ecommerce\frontend
npm run dev
```

Now open in your browser:
- Storefront & Products: **http://localhost:3000**
- Browse All Products & Cart: **http://localhost:3000/products**
- Vendor Dashboard: **http://localhost:3000/dashboard**
- Login: **http://localhost:3000/login**

---

### Option 3: Run Project #2 Only (Collaborative Workspace)
You can double-click **`run-project-2.bat`** or run these commands in CMD:

**1. Start Backend (Port 5000):**
```cmd
cd FS-02-Real-Time-Collaborative-Workspace\FS-02-Collaborative-Workspace\backend
npm start
```

**2. Start Frontend (Port 3001) in a second CMD window:**
```cmd
cd FS-02-Real-Time-Collaborative-Workspace\FS-02-Collaborative-Workspace\frontend
npm run dev
```

Now open in your browser:
- Live Document Editor: **http://localhost:3001/document**
- Team Dashboard: **http://localhost:3001/dashboard**
- Workspaces List: **http://localhost:3001/workspace**
- Login: **http://localhost:3001/login**

---

## 🛠️ Project Details & What's Working

### Project 1: Multi-Vendor E-Commerce
- **Customer & Vendor Roles:** Separate vendor and customer flows with secure tokens and session tracking.
- **Product Management:** Vendors can add new items, update prices, and edit stock directly from `/dashboard`.
- **Search & Filters:** Instant live search by name or seller, category filtering, and sorting (price low-high, high-low, top-rated).
- **Cart & Checkout:** Real-time cart counter, inventory checks, and instant order placement endpoint.

### Project 2: Real-Time Collaborative Workspace
- **Live Document Editing:** Markdown-enabled editor with heading, task list, and quote formatting tools.
- **Team Discussion:** Post real-time comments and review team threads on documents.
- **Live Presence:** Active user indicators and colored avatars of team members currently online.
- **WebSocket Rooms:** Socket.io synchronization for document rooms and presence updates.
