# Deployment Guide

This guide covers deploying the YogA website to various platforms and configuring production settings.

## 🚀 Vercel Deployment (Recommended)

### Automatic Deployment
1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Settings**
   - Framework Preset: Next.js
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

3. **Environment Variables**
   \`\`\`env
   NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
   STRIPE_SECRET_KEY=sk_live_...
   RAZORPAY_KEY_ID=rzp_live_...
   RAZORPAY_KEY_SECRET=...
   \`\`\`

4. **Deploy**
   - Click "Deploy"
   - Automatic deployments on every push to main branch

### Custom Domain
1. **Add Domain** in Vercel dashboard
2. **Configure DNS** with your domain provider:
   \`\`\`
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   \`\`\`
3. **SSL Certificate** automatically provisioned

## 🌐 Alternative Deployment Options

### Netlify
\`\`\`bash
# Build command
npm run build

# Publish directory
out

# Environment variables
NEXT_PUBLIC_BASE_URL=https://your-site.netlify.app
\`\`\`

### Railway
\`\`\`bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
\`\`\`

### DigitalOcean App Platform
\`\`\`yaml
# .do/app.yaml
name: yoga-website
services:
- name: web
  source_dir: /
  github:
    repo: your-username/yoga-school-website
    branch: main
  run_command: npm start
  build_command: npm run build
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NEXT_PUBLIC_BASE_URL
    value: ${APP_URL}
\`\`\`

## 🔧 Production Configuration

### Environment Variables
\`\`\`env
# Required
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# Payment Providers (choose one or more)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_KEY_SECRET=...
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...

# Email Service (choose one)
RESEND_API_KEY=re_...
SENDGRID_API_KEY=SG....
MAILGUN_API_KEY=...

# Analytics (optional)
GOOGLE_ANALYTICS_ID=G-...
HOTJAR_ID=...

# Database (if using)
DATABASE_URL=postgresql://...
\`\`\`

### Performance Optimization
\`\`\`javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blob.v0.dev',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
  compress: true,
  poweredByHeader: false,
}

export default nextConfig
\`\`\`

## 📊 Monitoring & Analytics

### Core Web Vitals
\`\`\`typescript
// lib/analytics.ts
export function reportWebVitals(metric: any) {
  if (metric.label === 'web-vital') {
    // Send to analytics service
    gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_label: metric.id,
    })
  }
}
\`\`\`

### Error Tracking
\`\`\`bash
# Install Sentry
npm install @sentry/nextjs

# Configure sentry.client.config.js
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
})
\`\`\`

## 🔒 Security Considerations

### Content Security Policy
\`\`\`javascript
// next.config.mjs
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel-analytics.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data: https:;
      font-src 'self';
    `.replace(/\s{2,}/g, ' ').trim()
  }
]

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
\`\`\`

### Rate Limiting
\`\`\`typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
})

export default ratelimit
\`\`\`

## 🗄️ Database Setup

### Supabase
\`\`\`sql
-- Create tables
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES courses(id),
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Prisma Setup
\`\`\`bash
# Install Prisma
npm install prisma @prisma/client

# Initialize
npx prisma init

# Generate client
npx prisma generate

# Deploy schema
npx prisma db push
\`\`\`

## 📧 Email Configuration

### Resend Setup
\`\`\`typescript
// lib/email.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendBookingConfirmation(booking: any) {
  await resend.emails.send({
    from: 'YogA School <hello@yourdomain.com>',
    to: booking.email,
    subject: 'Booking Confirmation',
    html: `<h1>Welcome to YogA!</h1>...`,
  })
}
\`\`\`

## 🔄 CI/CD Pipeline

### GitHub Actions
\`\`\`yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
\`\`\`

## 🚨 Troubleshooting

### Common Issues

**Build Failures**
\`\`\`bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
\`\`\`

**Environment Variables Not Loading**
- Check variable names (case-sensitive)
- Restart development server
- Verify deployment platform settings

**Performance Issues**
- Enable image optimization
- Check bundle analyzer: `npm run analyze`
- Monitor Core Web Vitals

**Payment Integration Issues**
- Verify API keys in production
- Check webhook endpoints
- Test in sandbox mode first

### Support Resources
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Support](https://vercel.com/support)
- [Project Issues](https://github.com/yourusername/yoga-school-website/issues)

---

Need help with deployment? Contact us at hello@yoga.example 🚀
