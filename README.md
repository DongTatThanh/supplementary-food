# 🏋️ GymShop - Supplementary Food E-commerce Platform

Modern e-commerce platform specialized in gym supplements, fitness nutrition products, and health foods.

![React](https://img.shields.io/badge/React-18.x-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.x-purple?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3.x-cyan?logo=tailwindcss)

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5.x
- **UI Framework**: Tailwind CSS + Shadcn/ui + Radix UI
- **Form Handling**: React Hook Form + Zod Validation
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router v6
- **Icons**: Lucide React

### Backend Integration
- **Authentication**: JWT Token + OTP Verification
- **API Client**: Axios with interceptors
- **Data Fetching**: Custom hooks with error handling

## ✨ Features

### 🔐 Authentication System
- [x] User Registration with email verification
- [x] Login/Logout functionality
- [x] Forgot Password with OTP verification (6-digit code)
- [x] JWT token management
- [x] Auto-redirect after authentication

### 🛒 E-commerce Core
- [x] Product catalog with advanced filtering
- [x] Category-based product browsing
- [x] Brand filtering and search
- [x] Price range filtering
- [x] Shopping cart management
- [x] Responsive product cards with ratings

### 🎨 UI/UX
- [x] Modern, clean design with Shadcn/ui
- [x] Fully responsive layout (mobile-first)
- [x] Dark/Light theme support
- [x] Loading states and error handling
- [x] Toast notifications
- [x] Smooth animations and transitions

### 🔧 Technical Features
- [x] TypeScript for type safety
- [x] Form validation with Zod schemas
- [x] Custom hooks for reusable logic
- [x] Error boundaries
- [x] Performance optimization

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Local Development

```bash
# Clone the repository
git clone https://github.com/DongTatThanh/supplementary-food.git
cd supplementary-food

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3201

# App Configuration
VITE_APP_NAME=GymShop
VITE_APP_VERSION=1.0.0
```

## 📱 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build for development
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm start           # Start development server (alias for dev)
```

## 🗂️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui base components
│   ├── AuthForm.tsx    # Authentication forms
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   └── ProductCard.tsx # Product display card
├── pages/              # Page components
│   ├── Index.tsx       # Home page
│   └── AuthTest.tsx    # Authentication testing
├── lib/                # Utility functions
│   ├── api-client.ts   # API client configuration
│   └── utils.ts        # General utilities
├── services/           # API services
│   ├── auth.service.ts # Authentication API
│   ├── product.service.ts # Product API
│   └── cart.service.ts # Shopping cart API
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── integrations/       # Third-party integrations
    └── supabase/       # Supabase client (updated for custom API)
```

## 🔌 API Integration

The application integrates with a custom backend API with the following endpoints:

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/forgot-password` - Send reset OTP
- `POST /auth/verify-otp` - Verify OTP code
- `POST /auth/reset-password` - Reset password

### Products
- `GET /api/products` - Get products with filtering
- `GET /api/products/:id` - Get product details
- `GET /api/brands` - Get all brands
- `GET /api/categories` - Get all categories

### Shopping Cart
- `GET /cart` - Get user cart
- `POST /cart/items` - Add item to cart
- `PUT /cart/items/:id` - Update cart item
- `DELETE /cart/items/:id` - Remove cart item

## 🎯 Key Components

### AuthForm Component
- Multi-tab interface (Login/Register/Forgot Password)
- OTP verification with 6-digit input
- Form validation with Zod schemas
- Auto-redirect after successful authentication

### Product Filtering
- Category-based filtering
- Brand selection
- Price range filtering
- Search functionality
- Sort by popularity, price, rating

### Shopping Cart
- Add/remove items
- Quantity management
- Price calculations
- Persistent cart state

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify
```bash
# Build the project
npm run build

# Deploy dist folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Dong Tat Thanh**
- GitHub: [@DongTatThanh](https://github.com/DongTatThanh)
- Email: [your-email@example.com]

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for the amazing UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React Hook Form](https://react-hook-form.com/) for form handling
- [Zod](https://zod.dev/) for schema validation
- [Lucide React](https://lucide.dev/) for beautiful icons

---

⭐ Don't forget to star this repository if it helped you!