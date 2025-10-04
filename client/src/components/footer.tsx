import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Revathi's Rangolis</h3>
            <p className="text-background/80">
              Handcrafted rhinestone rangoli art for your special celebrations
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <button className="text-background/80 hover:text-background transition-colors" data-testid="footer-link-home">
                    Home
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/our-story">
                  <button className="text-background/80 hover:text-background transition-colors" data-testid="footer-link-our-story">
                    Our Story
                  </button>
                </Link>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors" data-testid="footer-link-contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-background/10 hover:bg-background/20 rounded-full flex items-center justify-center transition-colors"
                data-testid="footer-social-phone"
              >
                <span className="text-xl">📱</span>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-background/10 hover:bg-background/20 rounded-full flex items-center justify-center transition-colors"
                data-testid="footer-social-email"
              >
                <span className="text-xl">📧</span>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-background/10 hover:bg-background/20 rounded-full flex items-center justify-center transition-colors"
                data-testid="footer-social-instagram"
              >
                <span className="text-xl">📷</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-background/20 text-center text-background/60">
          <p>&copy; 2024 Revathi's Rangolis. All rights reserved. Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
}
