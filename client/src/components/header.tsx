import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { CartSidebar } from "./cart-sidebar";
import { useState } from "react";

export function Header() {
  const [location] = useLocation();
  const { getTotalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const totalItems = getTotalItems();

  return (
    <>
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo/Brand */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground tracking-tight">
                Revathi's Rangolis
              </h1>
            </Link>
            
            {/* Navigation & Cart */}
            <div className="flex items-center space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/">
                  <button 
                    className={`text-foreground hover:text-primary transition-colors font-medium ${
                      location === '/' ? 'text-primary' : ''
                    }`}
                    data-testid="nav-home"
                  >
                    Home
                  </button>
                </Link>
                <Link href="/our-story">
                  <button 
                    className={`text-foreground hover:text-primary transition-colors font-medium ${
                      location === '/our-story' ? 'text-primary' : ''
                    }`}
                    data-testid="nav-our-story"
                  >
                    Our Story
                  </button>
                </Link>
              </nav>
              
              {/* Desktop Cart Icon */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="hidden md:flex relative p-2 hover:bg-muted rounded-lg transition-colors"
                data-testid="button-cart"
              >
                <ShoppingCart className="w-6 h-6 text-foreground" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center cart-badge animate-pulse" data-testid="cart-count">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
                data-testid="mobile-menu-button"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-foreground" />
                ) : (
                  <Menu className="w-6 h-6 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-card border-r border-border z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-lg">✨</span>
              </div>
              <h2 className="text-lg font-serif font-bold text-foreground">Menu</h2>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Mobile Menu Navigation */}
          <nav className="flex-1 p-6">
            <div className="space-y-4">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <button 
                  className={`w-full text-left p-4 rounded-lg transition-colors font-medium flex items-center space-x-3 ${
                    location === '/' 
                      ? 'bg-primary/10 text-primary border-l-4 border-primary' 
                      : 'text-foreground hover:bg-muted'
                  }`}
                  data-testid="mobile-nav-home"
                >
                  <span className="text-xl">🏠</span>
                  <span>Home</span>
                </button>
              </Link>

              <Link href="/our-story" onClick={() => setIsMobileMenuOpen(false)}>
                <button 
                  className={`w-full text-left p-4 rounded-lg transition-colors font-medium flex items-center space-x-3 ${
                    location === '/our-story' 
                      ? 'bg-primary/10 text-primary border-l-4 border-primary' 
                      : 'text-foreground hover:bg-muted'
                  }`}
                  data-testid="mobile-nav-our-story"
                >
                  <span className="text-xl">📖</span>
                  <span>Our Story</span>
                </button>
              </Link>

              <button 
                onClick={() => {
                  setIsCartOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left p-4 rounded-lg transition-colors font-medium flex items-center space-x-3 text-foreground hover:bg-muted relative"
                data-testid="mobile-nav-cart"
              >
                <span className="text-xl">🛒</span>
                <span>Cart</span>
                {totalItems > 0 && (
                  <span className="ml-auto bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center cart-badge animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              Revathi's Rangolis
            </p>
          </div>
        </div>
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
