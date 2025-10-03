import { User } from "lucide-react";

export default function OurStory() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Our Story</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
      </div>

      {/* Story Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        {/* Content Section */}
        <div className="space-y-6" data-testid="story-content">
          <p className="text-lg text-foreground leading-relaxed">
            Welcome to Revathy's Rangolis, where tradition meets sparkle! My journey began with a deep love for the ancient Indian art of rangoli - those beautiful patterns that have adorned doorsteps and courtyards for centuries.
          </p>
          <p className="text-lg text-foreground leading-relaxed">
            Growing up, I watched my grandmother create intricate rangoli designs during festivals, using colored powders and flower petals. Her dedication and artistry inspired me to preserve this beautiful tradition in a new, modern way.
          </p>
          <p className="text-lg text-foreground leading-relaxed">
            Each rhinestone rangoli I create is a labor of love, combining traditional patterns with the sparkle of carefully placed rhinestones. Every piece tells a story - of celebrations, of blessings, of the joy that comes from creating something beautiful with your own hands.
          </p>
          <p className="text-lg text-foreground leading-relaxed">
            What started as a hobby has blossomed into a passion for sharing these handcrafted treasures with families across India. Whether it's for Diwali, weddings, or any special occasion, I pour my heart into every design.
          </p>
          <p className="text-lg text-primary font-semibold">
            Thank you for being part of our story and keeping this beautiful tradition alive!
          </p>
        </div>

        {/* Photo Placeholder */}
        <div className="relative">
          <div 
            className="aspect-square bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 rounded-2xl overflow-hidden shadow-2xl"
            data-testid="revathi-photo-placeholder"
          >
            <div className="w-full h-full flex flex-col items-center justify-center p-8">
              <User className="w-24 h-24 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center font-medium">Revathi's Photo</p>
              <p className="text-sm text-muted-foreground text-center mt-2">(Upload photo here)</p>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12">
        <h3 className="text-3xl font-serif font-bold text-foreground mb-8 text-center">Our Values</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-card rounded-xl shadow-sm" data-testid="value-authenticity">
            <div className="text-4xl mb-3">🎨</div>
            <h4 className="font-semibold text-foreground mb-2">Authenticity</h4>
            <p className="text-sm text-muted-foreground">Traditional designs with genuine craftsmanship</p>
          </div>
          <div className="text-center p-6 bg-card rounded-xl shadow-sm" data-testid="value-quality">
            <div className="text-4xl mb-3">✨</div>
            <h4 className="font-semibold text-foreground mb-2">Quality</h4>
            <p className="text-sm text-muted-foreground">Premium rhinestones and materials</p>
          </div>
          <div className="text-center p-6 bg-card rounded-xl shadow-sm" data-testid="value-love">
            <div className="text-4xl mb-3">💝</div>
            <h4 className="font-semibold text-foreground mb-2">Love</h4>
            <p className="text-sm text-muted-foreground">Each piece made with care and devotion</p>
          </div>
          <div className="text-center p-6 bg-card rounded-xl shadow-sm" data-testid="value-tradition">
            <div className="text-4xl mb-3">🌟</div>
            <h4 className="font-semibold text-foreground mb-2">Tradition</h4>
            <p className="text-sm text-muted-foreground">Preserving cultural heritage</p>
          </div>
        </div>
      </div>
    </div>
  );
}
