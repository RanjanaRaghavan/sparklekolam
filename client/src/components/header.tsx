import { Link, useLocation } from "wouter";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { CartSidebar } from "./cart-sidebar";
import { useState } from "react";

export function Header() {
  const [location] = useLocation();
  const { getTotalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  
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
                Revathy's Rangolis
              </h1>
            </Link>
            
            {/* Navigation & Cart */}
            <div className="flex items-center space-x-6">
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
              
              {/* Cart Icon */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-muted rounded-lg transition-colors"
                data-testid="button-cart"
              >
                <ShoppingCart className="w-6 h-6 text-foreground" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center cart-badge" data-testid="cart-count">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
