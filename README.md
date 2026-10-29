# Node Shop

Express + MongoDB (Mongoose) + EJS shop with Stripe checkout, Cloudinary image uploads and SendGrid emails.

## Setup

```
npm install
npm run start:dev
```

## Environment variables

Set these in `.env.local` (gitignored) or in your hosting provider's settings.

| Variable | Description |
| --- | --- |
| `NODE_ENV` | `development` or `production` |
| `PORT` | Optional, defaults to `3000` |
| `MONGO_USER`, `MONGO_PASSWORD`, `MONGO_DEFAULT_DATABASE` | MongoDB Atlas credentials and database name |
| `SESSION_SECRET` | Long random string used to sign session cookies |
| `STRIPE_KEY` | Stripe secret key |
| `CLOUDINARY_URL` | `cloudinary://<api_key>:<api_secret>@<cloud_name>` (read automatically by the Cloudinary SDK) |
| `SENDGRID_API_KEY` | SendGrid API key |
| `SENDGRID_FROM_EMAIL` | Verified SendGrid sender address |
