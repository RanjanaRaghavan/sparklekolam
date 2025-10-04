import { Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

const productColors = [
  'from-pink-100 to-pink-50 text-pink-400',
  'from-green-100 to-green-50 text-green-400', 
  'from-yellow-100 to-yellow-50 text-yellow-400',
  'from-blue-100 to-blue-50 text-blue-400',
  'from-purple-100 to-purple-50 text-purple-400',
  'from-orange-100 to-orange-50 text-orange-400',
  'from-red-100 to-red-50 text-red-400',
  'from-indigo-100 via-purple-100 to-pink-100 text-indigo-400',
];

const productIcons = [
  // Peacock
  <svg className="w-32 h-32 opacity-40" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
  </svg>,
  // Lotus
  <svg className="w-32 h-32 opacity-40" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zM5.6 10.25c0 1.38 1.12 2.5 2.5 2.5.53 0 1.01-.16 1.42-.44l-.02.19c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5l-.02-.19c.4.28.89.44 1.42.44 1.38 0 2.5-1.12 2.5-2.5 0-1-.59-1.85-1.43-2.25.84-.4 1.43-1.25 1.43-2.25 0-1.38-1.12-2.5-2.5-2.5-.53 0-1.01.16-1.42.44l.02-.19C14.5 2.12 13.38 1 12 1S9.5 2.12 9.5 3.5l.02.19c-.4-.28-.89-.44-1.42-.44-1.38 0-2.5 1.12-2.5 2.5 0 1 .59 1.85 1.43 2.25-.84.4-1.43 1.25-1.43 2.25zM12 5.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8s1.12-2.5 2.5-2.5zM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9z"/>
  </svg>,
  // Mandala
  <svg className="w-32 h-32 opacity-40" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"/>
  </svg>,
  // Diya
  <svg className="w-32 h-32 opacity-40" fill="currentColor" viewBox="0 0 24 24">
    <path d="M11 21h2v-2h-2v2zm6.5-6H18c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-1V4c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v1H8c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h.5l1.5 3h4l1.5-3z"/>
  </svg>,
  // Flower
  <svg className="w-32 h-32 opacity-40" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zM5.6 10.25c0 1.38 1.12 2.5 2.5 2.5.53 0 1.01-.16 1.42-.44l-.02.19c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5l-.02-.19c.4.28.89.44 1.42.44 1.38 0 2.5-1.12 2.5-2.5 0-1-.59-1.85-1.43-2.25.84-.4 1.43-1.25 1.43-2.25 0-1.38-1.12-2.5-2.5-2.5-.53 0-1.01.16-1.42.44l.02-.19C14.5 2.12 13.38 1 12 1S9.5 2.12 9.5 3.5l.02.19c-.4-.28-.89-.44-1.42-.44-1.38 0-2.5 1.12-2.5 2.5 0 1 .59 1.85 1.43 2.25-.84.4-1.43 1.25-1.43 2.25zM12 5.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8s1.12-2.5 2.5-2.5zM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9z"/>
  </svg>,
  // Sunrise
  <svg className="w-32 h-32 opacity-40" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/>
  </svg>,
  // Heart/Festival
  <svg className="w-32 h-32 opacity-40" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>,
  // Star/Rainbow
  <svg className="w-32 h-32 opacity-40" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
  </svg>,
];

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const productIndex = parseInt(product.id) - 1;
  const colorClass = productColors[productIndex] || productColors[0];
  const icon = productIcons[productIndex] || productIcons[0];
  
  const formatPrice = (priceInPaisa: number) => {
    return `₹${(priceInPaisa / 100).toLocaleString('en-IN')}`;
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    
    // Show success toast
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <div 
      className="product-card group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-border"
      data-testid={`card-product-${product.id}`}
    >
      <div className="relative aspect-square bg-muted overflow-hidden">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${colorClass}`}>
            {icon}
          </div>
        )}
        
        {/* Add to Cart Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart();
          }}
          className="absolute bottom-3 right-3 w-12 h-12 bg-primary rounded-full flex items-center justify-center transform hover:scale-125 transition-all duration-300 shadow-lg hover:shadow-2xl z-10 cursor-pointer"
          data-testid={`button-add-to-cart-${product.id}`}
          aria-label={`Add ${product.name} to cart`}
          type="button"
        >
          <Plus className="w-6 h-6 text-primary-foreground" strokeWidth={3} />
        </button>
      </div>
      
      <div className="p-4">
        <h4 className="font-semibold text-lg text-foreground mb-2" data-testid={`text-product-name-${product.id}`}>
          {product.name}
        </h4>
        <p className="text-muted-foreground text-sm mb-3" data-testid={`text-product-description-${product.id}`}>
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary" data-testid={`text-product-price-${product.id}`}>
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-muted-foreground bg-accent/20 px-2 py-1 rounded">
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  );
}
