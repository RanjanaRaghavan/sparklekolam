# 🪔 SparkleKolam - Handcrafted Rhinestone Rangoli Art

A beautiful e-commerce website showcasing traditional Indian rangoli designs adorned with sparkling rhinestones.

## ✨ Features

- **🪔 Falling Diyas Animation** - Beautiful welcome animation on first visit
- **🛒 Shopping Cart** - Full cart functionality with localStorage persistence
- **📱 Mobile Navigation** - Responsive hamburger menu for mobile users
- **🎨 Product Gallery** - Beautiful showcase of rangoli products
- **📖 Our Story** - Learn about Revathi's passion for rangoli art
- **🎨 Modern UI** - Clean design with off-white background and pink accents

## 🚀 Live Demo

Visit the live website: [https://ranjanaraghavan.github.io/sparklekolam/](https://ranjanaraghavan.github.io/sparklekolam/)

## 🛠️ Technology Stack

- **Frontend**: React + TypeScript + Vite
- **UI Components**: Shadcn UI + Tailwind CSS
- **Routing**: Wouter (with hash routing for GitHub Pages)
- **State Management**: React Context + TanStack Query
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

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
├── server/                 # Express.js backend (not used in GitHub Pages)
├── shared/                 # Shared TypeScript schemas
└── .github/workflows/      # GitHub Actions for deployment
```

## 🚀 Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. The deployment happens on every push to the main branch.

### Manual Deployment Steps

1. **Enable GitHub Pages** in repository settings:
   - Go to Settings → Pages
   - Source: GitHub Actions

2. **Push changes** to trigger deployment:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **Monitor deployment** in the Actions tab

## 🔧 Development

### Prerequisites

- Node.js 18+
- npm

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎨 Design Features

- **Hash Routing**: Compatible with GitHub Pages static hosting
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
