import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  
  const total = getTotalPrice();

  const formatPrice = (priceInPaisa: number) => {
    return `₹${(priceInPaisa / 100).toLocaleString('en-IN')}`;
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        data-testid="cart-overlay"
      />

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 right-0 w-full sm:w-96 bg-card shadow-2xl transform transition-transform duration-300 z-50 flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        data-testid="cart-sidebar"
      >
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold text-foreground">Shopping Cart</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              data-testid="button-close-cart"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <p className="text-muted-foreground text-center py-12" data-testid="text-empty-cart">
              Your cart is empty
            </p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                  data-testid={`cart-item-${item.id}`}
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground" data-testid={`text-item-name-${item.id}`}>
                      {item.name}
                    </h4>
                    <p className="text-sm text-muted-foreground" data-testid={`text-item-price-${item.id}`}>
                      {formatPrice(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 bg-background rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                      data-testid={`button-decrease-${item.id}`}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold text-foreground w-6 text-center" data-testid={`text-quantity-${item.id}`}>
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 bg-background rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                      data-testid={`button-increase-${item.id}`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="ml-2 text-destructive hover:text-destructive/80 transition-colors"
                      data-testid={`button-remove-${item.id}`}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="border-t border-border p-6 bg-muted/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-foreground">Total:</span>
            <span className="text-2xl font-bold text-primary" data-testid="text-cart-total">
              {formatPrice(total)}
            </span>
          </div>
          <Link href="/checkout" onClick={onClose}>
            <button 
              className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={cart.length === 0}
              data-testid="button-checkout"
            >
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
