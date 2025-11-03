# 🌍 Regional Pricing App

A full-stack web application that dynamically displays product prices based on the user’s location and local currency — ensuring a seamless localized shopping experience.

---

## 🚀 Live Demo

**Frontend (Next.js + Vercel):**  
🔗 [https://regional-pricing-app.vercel.app](https://regional-pricing-app.vercel.app)

**Backend (Express + Render):**  
🔗 [https://regional-pricing-app-backend.onrender.com](https://regional-pricing-app-backend.onrender.com)

---

## ⚙️ Setup & Environment Instructions

### 🔧 Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas account
- Stripe account (for payment integration)
- Git

### 🗂 Project Structure
regional-pricing-app/
│
├── backend/
│ ├── models/
│ ├── controllers/
│ ├── routes/
│ ├── middlewares/
│ ├── server.js
│ └── .env
│
└── frontend/
├── pages/
├── components/
├── styles/
├── public/
└── .env.local

## 🧩 Backend Setup
cd backend
npm install
Create a .env file in the backend folder with:
PORT=5000
MONGO_URI=your_mongodb_atlas_connection
STRIPE_SECRET_KEY=your_stripe_secret_key
Run the backend locally:
node server.js
When deployed to Render, it will automatically start using your defined start command.

## 💻 Frontend Setup
cd frontend
npm install
npm run dev
Create a .env.local file in the frontend folder with:
NEXT_PUBLIC_API_URL=https://regional-pricing-app-backend.onrender.com/api
Access frontend locally at:
👉 http://localhost:3000

## ✨ Features Implemented
✅ Automatic Currency Detection – detects user’s country via IP and displays localized prices
✅ Localized Pricing – supports USD, INR, and GBP dynamically
✅ Product Details Page – includes product info, image, and detailed specs
✅ Backend Integration – with Express + MongoDB Atlas
✅ Server-Side Rendering (SSR) – SEO-friendly Next.js pages
✅ Stripe Setup Ready – for payments (future-ready)
✅ Modern UI – built with Tailwind CSS + Shadcn UI
✅ Full Deployment – Vercel (frontend) + Render (backend)

## 🛠️ Technologies Used

## 💻 Frontend:
Next.js 16 (React 19), 
Tailwind CSS 4, 
Shadcn/UI + Radix UI,  
RTK, 
Axios, 
Lucide React Icons

## 🧩 Backend:
Node.js, 
Express.js,
MongoDB + Mongoose, 
Stripe SDK, 
CORS, Morgan, Dotenv

## 🧩 Implementation Overview
1.The backend handles location detection and currency mapping logic.
2.The frontend calls the API, detects currency, and displays localized prices using Next.js.
3.The details page uses SSR (Server-Side Rendering) to pre-render product data for SEO.

## The app is deployed with:
Frontend: Vercel,
Backend: Render,
Database: MongoDB Atlas,

## 🧾 Example API Endpoints

Fetch all products:
GET https://regional-pricing-app-backend.onrender.com/api/products

Fetch single product by ID:
GET https://regional-pricing-app-backend.onrender.com/api/products/:id

🧑‍💻 Author
Kunal Kumar
📧 kunalkmr71@gmail.com


## 🧠 Notes / Highlights
The project showcases full-stack integration with region-based logic.

Deployed and tested with Vercel (frontend) and Render (backend) for a complete end-to-end workflow.

Clean, scalable structure to easily extend with authentication or payments in the future.
