# YogA — Residential Yoga School Website

![Hero Image](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aiifwczLS6sDelYRsTvVGXbM23rl29.png)

A modern, responsive website for YogA's residential immersive yoga programs built with Next.js, TypeScript, and cutting-edge UI animations. This platform serves as the primary hub for program discovery, bookings, and student engagement.

## ✨ Features

### 🎯 Core Functionality
- **Program Discovery**: Browse courses with detailed descriptions, schedules, and pricing
- **Online Booking**: Multi-step booking flow with payment integration
- **Student Testimonials**: Authentic reviews and success stories
- **Instructor Profiles**: Meet our certified teaching team
- **Interactive Schedule**: Calendar view of upcoming programs

### 🎨 Visual Experience
- **3D Interactive Cards**: Mouse-responsive course and testimonial cards
- **Particle System**: Dynamic floating particles that respond to mouse movement
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Responsive Design**: Mobile-first approach with Tailwind CSS

![Tree Pose](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zAQYYcBhTSexA8eroSIsztt6AHkFKn.png) ![Warrior Pose](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-uYWjLIFoLAnTEnJikp5PHo1AifrKhg.png)

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom 3D utilities
- **Animations**: Framer Motion for smooth interactions
- **Forms**: React Hook Form + Zod validation
- **Data Fetching**: SWR for efficient caching
- **Deployment**: Vercel with SSL and CDN

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/yoga-school-website.git
   cd yoga-school-website
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Add your environment variables:
   \`\`\`env
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   # Add payment provider keys when ready
   STRIPE_SECRET_KEY=your_stripe_key
   RAZORPAY_KEY_ID=your_razorpay_key
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

![Downward Dog](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TUlYk1dgBSd1xbY96tvp95F8vjDRcV.png) ![Meditation](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IxEGPwwgTynh4nR3gT6CXMz0PRuYxD.png)

## 📁 Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── courses/           # Course listing and details
│   ├── book/              # Booking flow
│   ├── contact/           # Contact page
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/                # shadcn/ui components
│   ├── course-card.tsx    # 3D interactive course cards
│   ├── particle-system.tsx # Mouse-responsive particles
│   ├── enhanced-button.tsx # 3D buttons with depth
│   └── ...
├── lib/                   # Utilities and data
│   ├── data.ts           # Mock data (replace with CMS)
│   └── utils.ts          # Helper functions
└── public/               # Static assets
    └── images/           # Yoga photography
\`\`\`

## 🎨 Design System

### Color Palette
Our earthy, grounded color scheme reflects the calm and natural essence of yoga:

- `#582f0e` - Deep Brown
- `#7f4f24` - Warm Brown  
- `#936639` - Medium Brown
- `#a68a64` - Light Brown
- `#b6ad90` - Sage
- `#c2c5aa` - Light Sage
- `#a4ac86` - Olive Green
- `#656d4a` - Forest Green
- `#414833` - Dark Green
- `#333d29` - Deep Forest

### Typography
- **Primary Font**: Geist Sans for clean, modern readability
- **Monospace**: Geist Mono for code and references

## 🎭 Interactive Features

### 3D Card System
- **Mouse Tracking**: Cards tilt and rotate based on cursor position
- **Layered Depth**: Elements positioned at different Z-levels
- **Enhanced Shadows**: Multi-layered shadows for realistic depth
- **Smooth Transitions**: GPU-accelerated animations

### Particle Effects
- **Mouse Repulsion**: Particles flee from cursor with realistic physics
- **Connection Lines**: Dynamic lines between nearby particles
- **Life Cycles**: Particles fade in/out and respawn naturally
- **Performance Optimized**: 60fps animations with requestAnimationFrame

### Booking Flow
- **Progress Indicator**: Visual step-by-step progress
- **Form Validation**: Real-time validation with Zod schemas
- **Payment Integration**: Ready for Stripe, Razorpay, or PayPal
- **Confirmation System**: Email notifications and booking references

## 📱 Pages Overview

### Homepage (`/`)
- Hero section with particle effects
- Featured programs grid
- Testimonial carousel
- Impact statistics

### About (`/about`)
- School story and mission
- Instructor profiles with credentials
- Campus information

### Courses (`/courses`)
- Filterable program grid
- Dynamic loading with SWR
- Interactive course cards

### Course Detail (`/courses/[slug]`)
- Comprehensive program information
- Upcoming session dates
- Direct booking CTAs

### Booking (`/book`)
- Multi-step form with progress indicator
- Course and session selection
- Guest details and preferences
- Payment processing

### Schedule (`/schedule`)
- Calendar view of all programs
- Availability status
- Quick course access

### Testimonials (`/testimonials`)
- Student success stories
- Star ratings and quotes
- Video testimonials (optional)

### Contact (`/contact`)
- Contact form with validation
- Interactive map
- School location and hours

## 🔧 Customization

### Adding New Courses
Update `lib/data.ts` with new course objects:

\`\`\`typescript
{
  id: "new-course",
  slug: "new-course-slug",
  title: "Course Title",
  summary: "Brief description",
  description: "Detailed description",
  price: 1500,
  duration: "21 days",
  level: "Intermediate",
  coverImage: "/images/course-image.jpg"
}
\`\`\`

### Modifying Particle Effects
Adjust particle behavior in `components/particle-system.tsx`:

\`\`\`typescript
<ParticleSystem 
  particleCount={50}        // Number of particles
  colors={["#a4ac86"]}      // Particle colors
  interactive={true}        // Mouse interaction
/>
\`\`\`

### Customizing 3D Effects
Modify depth and rotation in `components/course-card.tsx`:

\`\`\`typescript
const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"])
const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"])
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Manual Deployment
\`\`\`bash
npm run build
npm run start
\`\`\`

## 🔌 Integrations

### Payment Providers
- **Stripe**: Global payment processing
- **Razorpay**: India-focused payments
- **PayPal**: Alternative payment method

### Email Services
- **Resend**: Transactional emails
- **SendGrid**: Email delivery
- **Mailgun**: Email automation

### CMS Integration
Replace mock data in `lib/data.ts` with:
- **Sanity**: Structured content
- **Contentful**: Headless CMS
- **Strapi**: Self-hosted CMS

## 📊 Performance

- **Core Web Vitals**: Optimized for excellent scores
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic route-based splitting
- **Caching**: SWR for efficient data fetching
- **SEO**: Metadata API for search optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Photography**: Beautiful yoga imagery from professional photographers
- **Design Inspiration**: Modern wellness and mindfulness websites
- **Community**: Open source contributors and yoga practitioners

## 📞 Support

For questions or support:
- **Email**: hello@yoga.example
- **Documentation**: [Project Wiki](https://github.com/yourusername/yoga-school-website/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/yoga-school-website/issues)

---

Built with ❤️ for the yoga community. Namaste 🙏
