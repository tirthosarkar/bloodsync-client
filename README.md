\# 🩸 BloodSync — Every Drop Counts

<div align="center">

![BloodSync Banner](https://raw.githubusercontent.com/shahadat-hossain99/bloodsync-client/main/public/assets/nav-logo.png)

**A modern blood donation platform connecting donors with those in need.**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-dc2626?style=for-the-badge)](https://bloodsync-every-drop-counts.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

</div>

---

## 📌 Project Overview

**BloodSync** is a full-stack blood donation management platform built to bridge the gap between blood donors and recipients. The platform enables users to register as donors, create blood donation requests, search for compatible donors, and fund the organization — all in one seamless experience.

> _"Because every drop of blood is a chance to save a life."_

---

## 📌 Project Overview

**BloodSync** is a full-stack blood donation management platform built to bridge the gap between blood donors and recipients. The platform enables users to register as donors, create blood donation requests, search for compatible donors, and fund the organization — all in one seamless experience.

> _"Because every drop of blood is a chance to save a life."_

---

## 🔗 Important Links

| Resource             | Link                                                                                      |
| -------------------- | ----------------------------------------------------------------------------------------- |
| 🌐 Live Site         | [bloodsync-every-drop-counts.vercel.app](https://bloodsync-every-drop-counts.vercel.app/) |
| 💻 Client Repository | [GitHub — bloodsync-client](https://github.com/tirthosarkar/bloodsync-client)       |
| 🖥️ Server Repository | [GitHub — bloodsync-server](https://github.com/tirthosarkar/bloodsync-server)       |

---

## 🔐 Test Credentials

<!-- | Role         | Email                     | Password         |
| ------------ | ------------------------- | ---------------- |
| 👑 Admin     | `admin@bloodsync.com`     | `Admin@1234`     |
| 🤝 Volunteer | `volunteer@bloodsync.com` | `Volunteer@1234` |
| 🩸 Donor     | `donor@bloodsync.com`     | `Donor@1234`     | -->

---

## ✨ Key Features

### 🔐 Authentication & Authorization

- Secure authentication powered by **Better Auth**
- Role-based access control — **Admin**, **Volunteer**, and **Donor**
- Protected private routes with automatic redirect on reload
- Account status management — active / blocked

### 🏠 Public Pages

- **Home Page** — Hero banner, featured sections, contact form, and footer
- **Donation Requests** — Browse all pending blood donation requests
- **Search Donors** — Filter donors by blood group, district, and upazila
- **Funding Page** — View all community contributions

### 📊 Role-Based Dashboards

- **Donor Dashboard** — View recent requests, manage personal donation requests
- **Admin Dashboard** — Full platform control with live statistics, charts, and user management
- **Volunteer Dashboard** — Manage and update donation request statuses

### 🩸 Donation Request Management

- Create, edit, and delete donation requests
- Status flow: `pending → inprogress → done / canceled`
- Pagination and status-based filtering
- Donor confirmation modal with donor info display

### 👥 Admin Controls

- View and manage all users with pagination
- Block / unblock users
- Promote users to Volunteer or Admin role
- View all donation requests across the platform

### 💳 Stripe Payment Integration

- Secure online funding via **Stripe**
- Real-time payment processing
- Funding history with donor name, amount, and date

### 📈 Analytics & Charts

- **Pie Chart** — Donation request status distribution
- **Bar Chart** — Weekly donation activity (last 7 days)
- Live stat cards — Total donors, total funding, total requests

### 🎨 UI & UX

- Fully responsive — mobile, tablet, and desktop
- Collapsible sidebar (icon-only mode on desktop)
- Smooth animations with **Framer Motion**
- Toast notifications for all actions
- Professional dark sidebar with role badges

---

## 🛠️ Tech Stack

### Frontend

| Technology                                                  | Version | Purpose                         |
| ----------------------------------------------------------- | ------- | ------------------------------- |
| [Next.js](https://nextjs.org/)                              | 16.2.9  | React framework with App Router |
| [React](https://react.dev/)                                 | 19.2.4  | UI library                      |
| [Tailwind CSS](https://tailwindcss.com/)                    | v4      | Utility-first styling           |
| [Better Auth](https://better-auth.com/)                     | 1.6.20  | Authentication                  |
| [HeroUI](https://heroui.com/)                               | 3.2.1   | Component library               |
| [Recharts](https://recharts.org/)                           | 3.9.0   | Charts & data visualization     |
| [Framer Motion](https://www.framer.com/motion/)             | 12.40.0 | Animations                      |
| [Stripe](https://stripe.com/)                               | 9.8.0   | Payment integration             |
| [React Icons](https://react-icons.github.io/)               | 5.6.0   | Icon library                    |
| [React Toastify](https://fkhadra.github.io/react-toastify/) | 11.1.0  | Toast notifications             |
| [Swiper](https://swiperjs.com/)                             | 14.0.0  | Carousel/slider                 |
| [React Fast Marquee](https://www.react-fast-marquee.com/)   | 1.6.5   | Marquee animation               |
| [date-fns](https://date-fns.org/)                           | 4.4.0   | Date formatting                 |
| [MongoDB](https://www.mongodb.com/)                         | 7.3.0   | Database client                 |

### Backend

| Technology           | Purpose                       |
| -------------------- | ----------------------------- |
| Node.js + Express.js | REST API server               |
| MongoDB + Atlas      | Database                      |
| Better Auth          | Session & auth management     |
| Stripe               | Payment processing            |
| CORS                 | Cross-origin resource sharing |

---

## 📁 Project Structure

```
bloodsync-client/
├── public/
│   ├── assets/               # Logo, images
│   └── geoInfo/              # Bangladesh district & upazila data
├── src/
│   ├── app/
│   │   ├── api/              # Next.js API routes (Better Auth)
│   │   ├── auth/             # Sign in & Register pages
│   │   ├── dashboard/        # Role-based dashboard pages
│   │   ├── donation-requests/# Public donation request pages
│   │   ├── funding/          # Funding page
│   │   ├── search/           # Donor search page
│   │   ├── forbidden/        # 403 page
│   │   ├── unauthorized/     # 401 page
│   │   ├── ClientLayout.jsx  # Client-side layout wrapper
│   │   ├── layout.js         # Root layout
│   │   ├── page.js           # Home page
│   │   └── not-found.jsx     # 404 page
│   ├── components/
│   │   ├── dashboard/        # Dashboard-specific components
│   │   ├── home/             # Home page sections
│   │   ├── shared/           # Navbar, Footer, Breadcrumb
│   │   └── seo/              # SEO components
│   ├── context/              # AuthContext (global state)
│   ├── hooks/                # Custom React hooks
│   └── lib/                  # Auth client, server fetch utility
└── .env
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- MongoDB Atlas account
- Stripe account
- ImageBB account (for avatar uploads)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/bloodsync-client.git
cd bloodsync-client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root:

```env
# App
NEXT_PUBLIC_API_URL=http://localhost:5000

# Better Auth
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bloodsync

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key

# ImageBB
NEXT_PUBLIC_IMAGEBB_KEY=your_imagebb_api_key
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔄 User Roles & Permissions

| Feature                   | Donor 🩸 | Volunteer 🤝 | Admin 👑 |
| ------------------------- | :------: | :----------: | :------: |
| View pending requests     |    ✅    |      ✅      |    ✅    |
| Create donation request   |    ✅    |      ✅      |    ✅    |
| Manage own requests       |    ✅    |      ✅      |    ✅    |
| Confirm donation          |    ✅    |      ✅      |    ✅    |
| Update any request status |    ❌    |      ✅      |    ✅    |
| Delete any request        |    ❌    |      ❌      |    ✅    |
| View all users            |    ❌    |      ❌      |    ✅    |
| Block / Unblock users     |    ❌    |      ❌      |    ✅    |
| Change user roles         |    ❌    |      ❌      |    ✅    |
| View platform statistics  |    ❌    |      ✅      |    ✅    |

---

## 🌐 Deployment

### Frontend — Vercel

The client is deployed on **Vercel** with automatic CI/CD from the main branch.

```bash
npm run build   # Build for production
npm run start   # Start production server
```

### Backend — Render / Railway / Vercel

The Express server is deployed separately. Ensure the following:

- ✅ CORS configured for the frontend domain
- ✅ MongoDB Atlas IP whitelist set to `0.0.0.0/0`
- ✅ All environment variables configured in the hosting dashboard
- ✅ No 404 / 504 / CORS errors on production

---

## 📦 NPM Packages Summary

```json
{
  "authentication": "better-auth",
  "ui_components": "@heroui/react",
  "styling": "tailwindcss v4",
  "charts": "recharts",
  "animations": "framer-motion",
  "payments": "@stripe/react-stripe-js, @stripe/stripe-js",
  "icons": "react-icons",
  "notifications": "react-toastify",
  "carousel": "swiper",
  "marquee": "react-fast-marquee",
  "dates": "date-fns",
  "database_client": "mongodb"
}
```

---

## 👨‍💻 Developer

<div align="center">

**Tirtho Sarkar**

[![GitHub](https://img.shields.io/badge/GitHub-your--username-181717?style=flat-square&logo=github)](https://github.com/tirthosarkar)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/tirtho-sarkar/)


</div>

---