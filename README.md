# 🌍 Regional Pricing App<br>

A full-stack web application that dynamically displays product prices based on the user’s location and local currency — ensuring a seamless localized shopping experience.<br>

---

## 🚀 Live Demo<br>

**Frontend (Next.js + Vercel):**  <br>
🔗 [https://regional-pricing-app.vercel.app](https://regional-pricing-app.vercel.app)<br><br>

**Backend (Express + Render):**  <br>
🔗 [https://regional-pricing-app-backend.onrender.com](https://regional-pricing-app-backend.onrender.com)<br>

---

## ⚙️ Setup & Environment Instructions <br><br>

### 🔧 Prerequisites<br>
- Node.js (v18+ recommended)<br>
- MongoDB Atlas account<br>
- Stripe account (for payment integration)<br>
- Git<br><br>

### 🗂 Project Structure<br>
regional-pricing-app/<br>
│<br>
├── backend/<br>
│ ├── models/<br>
│ ├── controllers/<br>
│ ├── routes/<br>
│ ├── middlewares/<br>
│ ├── server.js<br>
│ └── .env<br>
│<br>
└── frontend/<br>
├── pages/<br>
├── components/<br>
├── styles/<br>
├── public/<br>
└── .env.local<br><br>

## 🧩 Backend Setup<br>
cd backend<br>
npm install<br>
Create a .env file in the backend folder with:<br>
PORT=5000<br>
MONGO_URI=your_mongodb_atlas_connection<br>
STRIPE_SECRET_KEY=your_stripe_secret_key<br>
IPSTACK_API_URL= http://api.ipstack.com
IPSTACK_API_KEY=your_ipstack_api_key
Run the backend locally:<br>
node server.js<br>
When deployed to Render, it will automatically start using your defined start command.<br><br>

## 💻 Frontend Setup<br>
cd frontend<br>
npm install<br>
npm run dev<br>
Create a .env.local file in the frontend folder with:<br>
NEXT_PUBLIC_API_URL=https://regional-pricing-app-backend.onrender.com/api<br>
Access frontend locally at:<br>
👉 http://localhost:3000<br><br>

## ✨ Features Implemented<br>
✅ Automatic Currency Detection – detects user’s country via IP and displays localized prices<br>
✅ Localized Pricing – supports USD, INR, and GBP dynamically<br>
✅ Product Details Page – includes product info, image, and detailed specs<br>
✅ Backend Integration – with Express + MongoDB Atlas<br>
✅ Server-Side Rendering (SSR) – SEO-friendly Next.js pages<br>
✅ Stripe Setup Ready – for payments (future-ready)<br>
✅ Modern UI – built with Tailwind CSS + Shadcn UI<br>
✅ Full Deployment – Vercel (frontend) + Render (backend)<br>

## 🛠️ Technologies Used<br>

## 💻 Frontend:<br>
Next.js 16 (React 19), <br>
Tailwind CSS 4, <br>
Shadcn/UI + Radix UI,  <br>
RTK, <br>
Axios, <br>
Lucide React Icons<br><br>

## 🧩 Backend:<br>
Node.js, <br>
Express.js,<br>
MongoDB + Mongoose, <br>
Stripe SDK, <br>
CORS, Morgan, Dotenv<br><br>

## 🧩 Implementation Overview<br>
1.The backend handles location detection and currency mapping logic.<br>
2.The frontend calls the API, detects currency, and displays localized prices using Next.js.<br>
3.The details page uses SSR (Server-Side Rendering) to pre-render product data for SEO.<br><br>

## The app is deployed with:<br>
Frontend: Vercel,<br>
Backend: Render,<br>
Database: MongoDB Atlas,<br><br>

## 🧾 Example API Endpoints<br>

Fetch all products:<br>
GET https://regional-pricing-app-backend.onrender.com/api/products<br><br>

Fetch single product by ID:<br>
GET https://regional-pricing-app-backend.onrender.com/api/products/:id<br><br>

🧑‍💻 Author<br>
Kunal Kumar<br>
📧 kunalkmr71@gmail.com<br><br>


## 🧠 Notes / Highlights<br>
The project showcases full-stack integration with region-based logic.<br>

Deployed and tested with Vercel (frontend) and Render (backend) for a complete end-to-end workflow.<br>

Clean, scalable structure to easily extend with authentication or payments in the future.<br>
