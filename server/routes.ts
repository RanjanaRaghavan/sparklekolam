import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema, insertOrderItemSchema } from "@shared/schema";
import { z } from "zod";

const createOrderRequestSchema = z.object({
  order: insertOrderSchema,
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().min(1),
  }))
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Get single product
  app.get("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await storage.getProduct(id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Create order
  app.post("/api/orders", async (req, res) => {
    try {
      const validatedData = createOrderRequestSchema.parse(req.body);
      const { order, items } = validatedData;
      
      // Calculate total from items and verify products exist
      let calculatedTotal = 0;
      for (const item of items) {
        const product = await storage.getProduct(item.productId);
        if (!product) {
          return res.status(400).json({ 
            message: `Product not found: ${item.productId}` 
          });
        }
        calculatedTotal += product.price * item.quantity;
      }
      
      // Verify the total matches
      if (calculatedTotal !== order.total) {
        return res.status(400).json({ 
          message: "Order total mismatch" 
        });
      }
      
      // Create order
      const createdOrder = await storage.createOrder(order);
      
      // Create order items
      const orderItems = [];
      for (const item of items) {
        const product = await storage.getProduct(item.productId);
        if (!product) continue;
        
        const orderItem = await storage.createOrderItem({
          orderId: createdOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        });
        orderItems.push(orderItem);
      }
      
      res.status(201).json({ 
        order: createdOrder, 
        items: orderItems 
      });
    } catch (error) {
      console.error("Error creating order:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid order data", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  // Get order
  app.get("/api/orders/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const order = await storage.getOrder(id);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      const items = await storage.getOrderItems(id);
      res.json({ order, items });
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
