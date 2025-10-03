# Overview

This is a full-stack e-commerce application for selling handcrafted rhinestone rangoli art called "Revathy's Rangolis". The application features a product catalog, shopping cart functionality, and a checkout process. Built with React on the frontend and Express on the backend, it uses TypeScript throughout for type safety.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool and development server.

**Routing**: Client-side routing implemented using Wouter, a minimal routing solution that provides page navigation without full page reloads.

**State Management**: 
- TanStack Query (React Query) for server state management and data fetching
- Local component state using React hooks
- LocalStorage for cart persistence across sessions

**UI Component Library**: Shadcn UI components built on Radix UI primitives, providing accessible and customizable components styled with Tailwind CSS. The design uses a "new-york" style variant with custom rangoli-inspired color palette.

**Styling**: Tailwind CSS with custom CSS variables for theming, featuring a warm color scheme inspired by traditional rangoli art (pinks, teals, yellows, oranges).

**Key Features**:
- Shopping cart with sidebar interface
- Product catalog display with cards
- Checkout form with validation
- Responsive design for mobile and desktop

## Backend Architecture

**Framework**: Express.js server running on Node.js with TypeScript.

**Server Setup**: 
- Development mode uses Vite middleware for hot module replacement
- Production mode serves static built files
- Custom logging middleware for API request tracking

**Data Layer**: 
- In-memory storage implementation (`MemStorage` class) with interface-based design (`IStorage`)
- Supports products, orders, and order items
- Sample data initialization for products
- Database-ready architecture - configured for PostgreSQL with Drizzle ORM but currently using in-memory storage

**API Structure**:
- RESTful API endpoints under `/api` prefix
- Product retrieval endpoints (list all, get single)
- Order creation endpoint with validation
- JSON request/response format

**Validation**: Zod schemas for request validation, derived from database schema definitions using `drizzle-zod`.

## Data Storage

**Current Implementation**: In-memory storage using JavaScript Maps for rapid development and testing.

**Database Configuration**: 
- Configured for PostgreSQL via Drizzle ORM
- Connection via Neon serverless database adapter
- Schema defined in `shared/schema.ts` with three main tables:
  - `products`: Product catalog with name, description, price (in paisa/cents), image URL, and stock status
  - `orders`: Customer orders with shipping details and status tracking
  - `order_items`: Junction table linking orders to products with quantity and price

**Schema Design**: 
- Uses UUID primary keys with PostgreSQL's `gen_random_uuid()` function
- Prices stored as integers in smallest currency unit (paisa) to avoid floating-point issues
- Foreign key relationships between orders and order items
- Timestamps for order tracking

## External Dependencies

**Frontend Libraries**:
- Radix UI components for accessible UI primitives
- TanStack Query for data fetching and caching
- React Hook Form with Zod resolver for form validation
- Wouter for lightweight routing
- Embla Carousel for image carousels
- date-fns for date formatting

**Backend Libraries**:
- Express for HTTP server
- Drizzle ORM for database operations
- @neondatabase/serverless for PostgreSQL connection
- Zod for schema validation

**Development Tools**:
- Vite for frontend bundling and development server
- Replit-specific plugins for development experience (runtime error overlay, cartographer, dev banner)
- TSX for TypeScript execution in development
- esbuild for production server bundling

**Build & Deployment**:
- Separate client and server build processes
- Client builds to `dist/public`
- Server bundles to `dist` with esbuild
- Environment-based configuration for development vs production

**Session Management**: Configured for connect-pg-simple (PostgreSQL session store) though not currently active in the codebase.