import { type Product, type Order, type OrderItem, type InsertProduct, type InsertOrder, type InsertOrderItem } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: string): Promise<Order | undefined>;
  
  // Order Items
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
  getOrderItems(orderId: string): Promise<OrderItem[]>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private orders: Map<string, Order>;
  private orderItems: Map<string, OrderItem>;

  constructor() {
    this.products = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    
    // Initialize with sample products
    this.initializeProducts();
  }

  private initializeProducts() {
    const sampleProducts: Product[] = [
      {
        id: "1",
        name: "Pink Peacock Rangoli",
        description: "Elegant peacock design with pink rhinestones",
        price: 89900, // ₹899 in paisa
        imageUrl: null,
        inStock: 1,
      },
      {
        id: "2", 
        name: "Green Lotus Rangoli",
        description: "Sacred lotus with emerald rhinestones",
        price: 79900, // ₹799 in paisa
        imageUrl: null,
        inStock: 1,
      },
      {
        id: "3",
        name: "Golden Mandala Rangoli", 
        description: "Intricate mandala with golden rhinestones",
        price: 99900, // ₹999 in paisa
        imageUrl: null,
        inStock: 1,
      },
      {
        id: "4",
        name: "Blue Diya Rangoli",
        description: "Traditional diya with sapphire rhinestones", 
        price: 84900, // ₹849 in paisa
        imageUrl: null,
        inStock: 1,
      },
      {
        id: "5",
        name: "Purple Flower Rangoli",
        description: "Delicate flower with amethyst rhinestones",
        price: 74900, // ₹749 in paisa
        imageUrl: null,
        inStock: 1,
      },
      {
        id: "6", 
        name: "Orange Sunrise Rangoli",
        description: "Vibrant sunrise with citrine rhinestones",
        price: 89900, // ₹899 in paisa
        imageUrl: null,
        inStock: 1,
      },
      {
        id: "7",
        name: "Red Festival Rangoli",
        description: "Festive design with ruby rhinestones", 
        price: 94900, // ₹949 in paisa
        imageUrl: null,
        inStock: 1,
      },
      {
        id: "8",
        name: "Rainbow Celebration Rangoli",
        description: "Multi-color celebration rhinestones",
        price: 109900, // ₹1099 in paisa
        imageUrl: null,
        inStock: 1,
      },
    ];

    sampleProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id,
      imageUrl: insertProduct.imageUrl ?? null,
      inStock: insertProduct.inStock ?? 1,
    };
    this.products.set(id, product);
    return product;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = { 
      ...insertOrder, 
      id,
      status: insertOrder.status ?? "pending",
      instructions: insertOrder.instructions ?? null,
      createdAt: new Date().toISOString() 
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = randomUUID();
    const orderItem: OrderItem = { ...insertOrderItem, id };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }

  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(
      item => item.orderId === orderId
    );
  }
}

export const storage = new MemStorage();
