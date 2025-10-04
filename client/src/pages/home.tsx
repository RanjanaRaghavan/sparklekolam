import { useQuery } from "@tanstack/react-query";
import { CheckCircle, Truck, Heart } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { FallingDiyas } from "@/components/FallingDiyas";
import { Product } from "@shared/schema";

// Sample products for GitHub Pages deployment when API is not available
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Butterfly Rangoli",
    description: "Elegant butterfly design with multicolor rhinestones",
    price: 89900,
    imageUrl: "/images/Butterfly_Kolam.png",
    inStock: 1,
  },
  {
    id: "2",
    name: "Pink Diya Rangoli",
    description: "Traditional Diya with Pink rhinestones",
    price: 79900,
    imageUrl: "/images/Diya_Kolam.png",
    inStock: 1,
  },
  {
    id: "3",
    name: "Golden Spade Rangoli",
    description: "Intricate Spade design with golden rhinestones",
    price: 99900,
    imageUrl: "/images/Spade_Kolam.png",
    inStock: 1,
  },
  {
    id: "4",
    name: "Ruby Heart Rangoli",
    description: "Vibrant heart with ruby rhinestones",
    price: 84900,
    imageUrl: "/images/Heart_Kolam.png",
    inStock: 1,
  },
];

export default function Home() {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <FallingDiyas />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">
            Handcrafted Rhinestone Rangoli Art
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Traditional Indian designs adorned with sparkling rhinestones. Each piece is lovingly crafted to bring joy and elegance to your celebrations.
          </p>
          <button 
            onClick={scrollToProducts}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg"
            data-testid="button-shop-collection"
          >
            Shop Collection
          </button>
        </div>
      </div>

      {/* Products Section */}
      <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Our Collection</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our beautiful range of rhinestone rangoli designs, perfect for festivals, weddings, and special occasions.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-card rounded-xl overflow-hidden shadow-md border border-border animate-pulse">
                <div className="aspect-square bg-muted"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                  <div className="flex items-center justify-between">
                    <div className="h-8 bg-muted rounded w-20"></div>
                    <div className="h-6 bg-muted rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="products-grid">
            {(products || sampleProducts)?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-secondary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center" data-testid="feature-quality">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Handcrafted Quality</h4>
              <p className="text-muted-foreground">Each rangoli is lovingly handcrafted with premium rhinestones</p>
            </div>
            <div className="text-center" data-testid="feature-delivery">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-secondary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Fast Delivery</h4>
              <p className="text-muted-foreground">Quick and secure shipping across India</p>
            </div>
            <div className="text-center" data-testid="feature-love">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Made with Love</h4>
              <p className="text-muted-foreground">Traditional designs crafted with passion and care</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
