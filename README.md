# 🪔 SparkleKolam - Handcrafted Rhinestone Rangoli Art

A beautiful e-commerce website showcasing traditional Indian rangoli designs adorned with sparkling rhinestones.

## ✨ Features

- **🪔 Falling Diyas Animation** - Beautiful welcome animation on first visit
- **🛒 Shopping Cart** - Full cart functionality with localStorage persistence
- **📱 Mobile Navigation** - Responsive hamburger menu for mobile users
- **🎨 Product Gallery** - Beautiful showcase of rangoli products
- **📖 Our Story** - Learn about Revathi's passion for rangoli art
- **🎨 Modern UI** - Clean design with off-white background and pink accents

## 🛠️ Technology Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js + Node.js
- **UI Components**: Shadcn UI + Tailwind CSS
- **Routing**: Wouter
- **State Management**: React Context + TanStack Query
- **Database**: PostgreSQL with Drizzle ORM
- **Icons**: Lucide React

## 📁 Project Structure

```
sparklekolam/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React Context providers
│   │   └── lib/            # Utilities and configurations
│   └── public/             # Static assets
├── server/                 # Express.js backend
├── shared/                 # Shared TypeScript schemas
└── package.json            # Project dependencies and scripts
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

This app is optimized for Vercel deployment:

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel
   ```

3. **Or connect your GitHub repository** to Vercel dashboard for automatic deployments.

### Local Development

To run it locally:

## 🔧 Development

### Prerequisites

- Node.js 18+
- npm

### Local Development

```bash
# Install dependencies
npm install

# Start development server (runs both frontend and backend)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Design Features

- **Browser Routing**: Clean URLs with proper navigation
- **Responsive Design**: Works perfectly on desktop and mobile
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance**: Optimized with lazy loading and efficient bundling

## 📱 Mobile Experience

- Hamburger menu with smooth slide-in animation
- Touch-friendly interface
- Optimized images and layouts
- Offline-capable cart functionality

## 🌟 Key Components

- **FallingDiyas**: Animated diya emojis falling on page load
- **ProductCard**: Interactive product display with add-to-cart
- **CartSidebar**: Slide-out shopping cart
- **Header**: Responsive navigation with mobile menu
- **CartContext**: Global cart state management

## 🎯 Future Enhancements

- [ ] Add more product categories
- [ ] Implement search functionality
- [ ] Add product reviews and ratings
- [ ] Integrate payment gateway
- [ ] Add user authentication
- [ ] Implement wishlist feature

## 📄 License

MIT License - feel free to use this project as inspiration for your own rangoli or e-commerce websites!

---

Made with ❤️ by Revathi's Rangolis
