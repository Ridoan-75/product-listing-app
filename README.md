# Marketify - Product Listing E-Commerce App

A modern, fully-featured e-commerce product listing application built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**. This app provides a complete shopping experience with authentication, cart management, and checkout functionality.

## 🚀 Features

✨ **Core Features:**
- 🛍️ Browse and search products
- 🎯 Filter by category and price
- 🛒 Add/remove items from cart
- 💳 Secure checkout process
- 👤 User authentication with Clerk
- 📱 Fully responsive design (mobile, tablet, desktop)
- ✅ Order confirmation & success page
- 🔔 Toast notifications (purple theme)
- 📊 Product ratings and reviews

## 🛠️ Tech Stack

**Frontend:**
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality UI components
- **Lucide React** - Beautiful icons

**State Management & Data Fetching:**
- **Zustand** - Cart state management
- **TanStack React Query** - Server state management
- **Next.js App Router** - File-based routing

**Authentication:**
- **Clerk** - Modern authentication & user management

**API:**
- **FakeStore API** - Mock e-commerce API (https://fakestoreapi.com)

## 📁 Project Structure

```
product-listing-app/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── layout.tsx               # Root layout with providers
│   │   ├── page.tsx                 # Home page
│   │   ├── cart/page.tsx            # Shopping cart page
│   │   ├── checkout/page.tsx        # Checkout page
│   │   ├── products/page.tsx        # Products listing page
│   │   ├── products/[id]/page.tsx   # Product details page
│   │   ├── order-success/page.tsx   # Order confirmation
│   │   └── ...other pages
│   │
│   ├── components/
│   │   ├── ui/                      # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── toast.tsx            # Custom toast notifications
│   │   │   └── toast-provider.tsx   # Toast context provider
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx           # Navigation header
│   │   │   ├── Footer.tsx           # Footer section
│   │   │   └── ResponsiveMenu.tsx   # Mobile menu
│   │   │
│   │   ├── products/
│   │   │   ├── Banner.tsx           # Hero carousel
│   │   │   ├── ProductCard.tsx      # Product card component
│   │   │   ├── ProductDetails.tsx   # Product details section
│   │   │   ├── CategoriesSection.tsx
│   │   │   └── ...other product components
│   │   │
│   │   ├── cart/
│   │   │   ├── CartItem.tsx         # Cart item row
│   │   │   └── CartSummary.tsx      # Order summary (purple buttons)
│   │   │
│   │   ├── checkout/
│   │   │   ├── CheckoutForm.tsx     # Checkout form
│   │   │   └── OrderSuccess.tsx     # Success component
│   │   │
│   │   └── shared/
│   │       ├── EmptyState.tsx
│   │       ├── Pagination.tsx
│   │       └── ...shared components
│   │
│   ├── store/
│   │   └── cartStore.ts             # Zustand cart store
│   │
│   ├── hooks/
│   │   ├── useProducts.ts           # Products fetching hook
│   │   └── useDebounce.ts           # Debounce utility
│   │
│   ├── lib/
│   │   ├── api.ts                   # API calls & error handling
│   │   └── utils.ts                 # Utility functions
│   │
│   ├── providers/
│   │   └── QueryProvider.tsx        # React Query provider
│   │
│   ├── constants/
│   │   ├── api.ts
│   │   ├── pagination.ts
│   │   ├── products.ts
│   │   ├── routes.ts
│   │   └── ui.ts
│   │
│   ├── types/
│   │   └── product.ts               # TypeScript interfaces
│   │
│   ├── middleware.ts                # Next.js middleware
│   └── config.ts                    # App configuration
│
├── public/                          # Static assets
├── .env.example                     # Environment variables template
├── .env.local                       # Local environment variables (gitignored)
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.ts
```

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd product-listing-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your credentials in `.env.local`:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
CLERK_SECRET_KEY=your_clerk_secret_here
NEXT_PUBLIC_API_URL=https://fakestoreapi.com
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Environment Variables

| Variable | Type | Description |
|----------|------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Public | Clerk authentication public key |
| `CLERK_SECRET_KEY` | Secret | Clerk authentication secret key |
| `NEXT_PUBLIC_API_URL` | Public | API endpoint (FakeStore API) |

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never commit `.env` files with secrets to git.

## 🎨 Key Design Features

### Purple Theme
- **Buttons**: Purple (`bg-purple-600 hover:bg-purple-700`)
- **Toasts**: Purple notifications for all actions
- **Accents**: Purple highlights throughout the app

### Responsive Design
- **Mobile**: Single column layout
- **Tablet**: 2-3 column grids
- **Desktop**: Full 4-column product grid with sidebar

### Toast Notifications
- ✅ Success: "Added to cart!", "Order confirmed!"
- ❌ Error: Failed operations
- ℹ️ Info: General notifications

## 🛒 Key Features Explained

### 1. Shopping Cart
- Add/remove items
- Update quantities
- Real-time cart summary
- Tax calculation (10%)
- Free shipping over $100

### 2. Checkout Process
1. Sign in with Clerk
2. Fill delivery information
3. Select payment method (COD)
4. Agree to terms
5. Place order
6. See confirmation

### 3. Product Discovery
- Browse all products
- Filter by category
- Filter by price range
- Search products
- View product details
- See ratings and reviews

### 4. Authentication
- Sign up / Sign in with Clerk
- User profile management
- Protected checkout page

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Final commit"
git push
```

2. **Go to [vercel.com](https://vercel.com)**
   - Sign in with GitHub
   - Click "New Project"
   - Select your repository
   - Click "Import"

3. **Add Environment Variables**
   - Go to Settings → Environment Variables
   - Add:
     - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
     - `CLERK_SECRET_KEY`
     - `NEXT_PUBLIC_API_URL=https://fakestoreapi.com`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app is live! 🎉

## 📝 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# TypeScript check
npm run type-check
```

## 🎯 Usage Guide

### Adding Products to Cart
1. Browse products on home or products page
2. Click "Add to Cart" button
3. See purple toast notification
4. Product appears in cart

### Checkout Flow
1. Go to cart page
2. Click "Proceed to Checkout" (purple button)
3. Sign in if not already
4. Fill delivery form
5. Review order summary
6. Click "Place Order" (purple button)
7. See success page

### Filtering Products
1. Go to products page
2. Use category filter
3. Use price range slider
4. Use search bar
5. Results update in real-time

## 🐛 Troubleshooting

### "Module not found" errors
```bash
# Clear .next folder and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

### Clerk authentication not working
- Verify `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` are correct
- Check Clerk dashboard for API key issues

### API calls failing
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check if FakeStore API is online
- Check network tab in browser DevTools

### Toast notifications not showing
- Ensure `ToastProvider` is in layout.tsx
- Check browser console for errors
- Verify `'use client'` directive in toast files

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [FakeStore API](https://fakestoreapi.com)

## 💡 Future Enhancements

- [ ] Add real payment gateway (Stripe, PayPal)
- [ ] User order history
- [ ] Product reviews & ratings (user submissions)
- [ ] Wishlist feature
- [ ] Product recommendations
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Dark mode

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using Next.js**

Last Updated: June 2026
