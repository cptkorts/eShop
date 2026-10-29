# eShop

A full-stack e-commerce web application built with **Node.js**, **Express** and **MongoDB**. It uses server-side rendering with EJS templates. Users can browse products, manage a cart, pay with Stripe and download PDF invoices. Authenticated users can also manage products through an admin area.

## Features

- **Product catalogue**: paginated product list and product detail pages
- **Authentication**: sign up, log in and log out, with password reset by email (tokenised link)
- **Shopping cart**: add and remove items (login required)
- **Checkout and payments**: Stripe Checkout session, with success and cancel flows
- **Orders**: order history and on-demand **PDF invoice** generation and download
- **Admin area**: add, edit and delete products with image upload (login required)
- **Security**: CSRF protection, secure HTTP headers, input validation, hashed passwords
- **Flash messages** for user feedback and custom 404 and 500 error pages

## Tech Stack

| Area | Technology | Used for |
|---|---|---|
| Runtime | Node.js 22 | JavaScript server runtime |
| Framework | Express 5 | Routing, middleware, HTTP server |
| Templating | EJS | Server-rendered views (`views/`) |
| Database | MongoDB Atlas + Mongoose | Users, products and orders |
| Sessions | express-session + connect-mongodb-session | Login sessions stored in MongoDB |
| Auth and security | bcryptjs, csurf, helmet, express-validator | Password hashing, CSRF tokens, HTTP security headers and CSP, request validation |
| File uploads | Multer + Cloudinary (multer-storage-cloudinary) | Product image uploads stored in the cloud (jpg, jpeg, png) |
| Payments | Stripe | Checkout and payment processing |
| Email | SendGrid (`@sendgrid/mail`, nodemailer) | Signup confirmation and password-reset emails |
| PDF | PDFKit | Generating order invoices |
| Logging and perf | morgan, compression | Request logging (file in dev, stdout in production), gzip responses |
| Flash messages | connect-flash | One-time success and error messages |
| Config | dotenv | Environment variables from `.env.local` |
| Dev tooling | nodemon | Auto-restart during development |
| Deployment | Vercel (`vercel.json`) / Procfile (Heroku-style) | Hosting |

## Project Structure

├── app.js # App entry point: middleware, sessions, DB connection
├── controllers/ # Request handlers (admin, auth, shop, error)
├── routes/ # Route definitions (admin, auth, shop)
├── models/ # Mongoose models (User, Product, Order)
├── middleware/ # Custom middleware (is-auth route guard)
├── views/ # EJS templates (admin, auth, shop, includes)
├── public/ # Static assets (CSS, client-side JS)
├── util/ # Helper utilities
└── data/invoices/ # Generated PDF invoices


## Routes Overview

| Area | Routes |
|---|---|
| Shop | `/`, `/products`, `/products/:id`, `/cart`, `/checkout`, `/orders`, `/orders/:id` (invoice) |
| Auth | `/login`, `/signup`, `/logout`, `/reset`, `/reset/:token`, `/new-password` |
| Admin | `/admin/add-product`, `/admin/products`, `/admin/edit-product/:id` |

## Getting Started

### Prerequisites

- Node.js 22.x
- A MongoDB Atlas cluster
- Accounts and API keys for Stripe, Cloudinary and SendGrid

### Installation

bash
git clone https://github.com/cptkorts/eShop.git
cd eShop
npm install

!!USER FOR TESTING!!
Email: test@test.com
Password: test1234

To get through the Stripe checkout page and place your fake order enter this card number,
4242 4242 4242 4242
Any future expire date, any 3 digit CVC number, any name and the test email you are logged in with.
