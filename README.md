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

[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel)](https://bloodsync-every-drop-counts.vercel.app/)

Deployed with automatic CI/CD from the `main` branch.

```bash
npm run build    # production build
npm run start    # start production server
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
## 💡 Idea Behind BloodSync

Every year, thousands of people in Bangladesh die due to the unavailability of blood at the right time. The existing process of finding a donor is manual, slow, and unreliable — phone calls, Facebook posts, word of mouth.

**BloodSync was born to solve exactly this.**

The idea was simple: build a platform where:

- A person in need can **post a blood request in under 2 minutes**
- A willing donor can **find that request and respond instantly**
- An organization can **manage everything from a single dashboard**

The name _BloodSync_ reflects the core mission — **synchronizing** the right blood with the right person, at the right time.

---

## 🧩 Problems BloodSync Solves

| Problem                         | How BloodSync Solves It                                                      |
| ------------------------------- | ---------------------------------------------------------------------------- |
| 🔍 Hard to find donors fast     | Search page filters donors by blood group, district & upazila instantly      |
| 📋 No organized request system  | Structured donation requests with status tracking (pending → done)           |
| 🔒 No accountability            | Role-based system — every action is tied to a verified user                  |
| 🚫 Blocked users causing issues | Admin can block users, blocked users cannot create requests                  |
| 💸 No funding mechanism         | Stripe-powered funding page for organizational support                       |
| 📊 No visibility for admins     | Live dashboard with charts, stats, and full user/request control             |
| 📱 Poor mobile experience       | Fully responsive UI with mobile drawer sidebar                               |
| 🔁 Page reload logs user out    | Session persists on reload using Better Auth — private routes stay protected |

---

## ❓ Frequently Asked Questions

### 🔐 Authentication

**Q1. Why did you choose Better Auth over Firebase or JWT?**

> Better Auth is a modern, framework-native authentication library built specifically for Next.js. Unlike Firebase, it keeps auth logic on your own server — no vendor lock-in, no extra cost at scale. Unlike raw JWT, it handles session management, token rotation, and MongoDB adapter out of the box. It gave full control with minimal boilerplate.

---

**Q2. How does the app handle private routes on page reload?**

> Better Auth maintains a server-side session. On every page load, `authClient.useSession()` rehydrates the session from the server — so a logged-in user is never redirected to login just because they refreshed. The `AuthContext` wraps the entire app and holds the user state globally.

---

**Q3. What happens when a blocked user tries to log in or create a request?**

> Two layers of protection:
>
> 1. **Login** — The server checks `user.status` before issuing a session. Blocked users get a `403` error immediately.
> 2. **Create Request** — Even if somehow authenticated, the server re-checks `status === "blocked"` before inserting a donation request and returns a `403` with a clear message.

---

### 🩸 Donation Flow

**Q4. Walk me through the full donation request lifecycle.**

> 1. A **Donor** creates a request → status: `pending`
> 2. Any logged-in user visits the request details page and clicks **"Donate"** → a modal appears with their name & email pre-filled
> 3. On confirmation → status changes to `inprogress`, donor info is saved on the request
> 4. The **requester** sees the donor info and can mark it as `done` (blood received) or `canceled`
> 5. Once `done` or `canceled`, the action buttons disappear permanently

---

**Q5. Can a user donate blood to their own request?**

> No. The server explicitly checks `request.requesterId === userId` when the status is being changed to `inprogress`. If they match, a `403` is returned with the message _"You cannot donate to your own request."_ This is enforced at the API level, not just the UI.

---

**Q6. How does the status filter and pagination work on the My Requests page?**

> The API accepts `?status=pending&page=1&limit=10` as query parameters. MongoDB queries are built dynamically — if a status filter is provided, it's added to the query object. `skip` and `limit` handle pagination. The response includes `totalPages` and `currentPage` so the frontend can render pagination controls accurately.

---

### 📊 Dashboard & Analytics

**Q7. How are the dashboard charts populated?**

> Two dedicated API endpoints power the charts:
>
> - **Pie Chart** → `/api/donation-requests/status-breakdown` uses MongoDB `$group` aggregation to count requests per status
> - **Bar Chart** → `/api/donation-requests/weekly-stats` uses `$match` to filter the last 7 days, then `$group` by `$dayOfWeek` to count per day
>
> Both are called in parallel using `Promise.all()` so the dashboard loads in a single round trip.

---

**Q8. Why does the chart section only appear for Admin and Volunteer?**

> Donors only see their own requests — platform-wide analytics aren't relevant to them and could feel overwhelming. Admins and Volunteers have a broader responsibility (managing all requests, monitoring activity), so the charts give them the visibility they need to make decisions.

---

### 👥 Role System

**Q9. How are roles assigned and changed?**

> - Every new user gets the `donor` role by default on registration
> - Only an **Admin** can promote a user to `volunteer` or `admin` via the All Users page
> - Role changes update both the `users` collection (app data) and the `user` collection (Better Auth session data) simultaneously, so the change reflects immediately on next login
> - To make the first admin: manually update `role: "admin"` in the MongoDB Atlas dashboard

---

**Q10. What is the difference between Volunteer and Admin?**

> | Action                       | Volunteer | Admin |
> | ---------------------------- | :-------: | :---: |
> | View all requests            |    ✅     |  ✅   |
> | Update request status        |    ✅     |  ✅   |
> | View platform stats & charts |    ✅     |  ✅   |
> | Delete any request           |    ❌     |  ✅   |
> | Manage users (block/role)    |    ❌     |  ✅   |
> | View all users               |    ❌     |  ✅   |

---

### 💳 Payments

**Q11. How does the Stripe payment flow work?**

> 1. User enters an amount on the Funding page
> 2. Frontend calls `POST /api/funding/create-payment-intent` with the amount in cents
> 3. Server creates a Stripe `PaymentIntent` and returns a `clientSecret`
> 4. Frontend uses `@stripe/react-stripe-js` to collect card details and confirm the payment using the `clientSecret`
> 5. On success, frontend calls `POST /api/funding` to save the transaction (userId, amount, paymentId) to MongoDB
> 6. The Funding page table updates to show the new contribution

---

### 🎨 Frontend & UX

**Q12. Why Next.js App Router instead of Pages Router?**

> App Router enables **server components**, **nested layouts**, and **per-route loading states** natively. The dashboard layout (sidebar + header) is defined once as a layout and shared across all dashboard routes without re-rendering. It also enables future use of server-side data fetching without an extra API call.

---

**Q13. How does the collapsible sidebar work on desktop without breaking mobile?**

> The `collapsed` state lives in the sidebar component. Every conditional class uses the `md:` Tailwind prefix — so on mobile, the sidebar always renders in full expanded mode regardless of the `collapsed` state. On desktop (`md+`), the `collapsed` state toggles between `w-64` (expanded) and `w-[72px]` (icon-only). Labels, the help box, and user info are hidden with `md:hidden` when collapsed.

---

**Q14. Why Better Auth over NextAuth for this project?**

> NextAuth (Auth.js) has great community support but its MongoDB adapter required extra setup for custom user fields like `role`, `status`, `bloodGroup`, etc. Better Auth's MongoDB adapter stores exactly what you give it, making it trivial to add custom fields. It also has a cleaner client API (`authClient.useSession()`) that integrates naturally with React context.

---

**Q15. What was the most challenging part of this project?**

> **Route ordering in Express.js.**
> Express matches routes top-to-bottom. Specific routes like `/api/donation-requests/status-breakdown` must be defined _before_ the generic `/api/donation-requests/:id` — otherwise Express treats `"status-breakdown"` as an `id` parameter and the wrong handler fires. Debugging this silently broken behavior (no errors, just wrong data) was the most time-consuming challenge of the backend.

---


## 👨‍💻 Developer

<div align="center">

**Tirtho Sarkar**

[![GitHub](https://img.shields.io/badge/GitHub-your--username-181717?style=flat-square&logo=github)](https://github.com/tirthosarkar)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/tirtho-sarkar/)


</div>

---