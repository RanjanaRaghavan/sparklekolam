import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCart } from "@/contexts/CartContext";
import { ShippingDetails } from "@/lib/types";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const checkoutFormSchema = z.object({
  customerName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(10, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().regex(/^[0-9]{6}$/, "Pincode must be 6 digits"),
  instructions: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

export default function Checkout() {
  const { cart, clearCart, getTotalPrice } = useCart();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      customerName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      instructions: "",
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (data: CheckoutFormData) => {
      const orderData = {
        order: {
          ...data,
          total: getTotalPrice(),
          status: "pending" as const,
        },
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      return apiRequest("POST", "/api/orders", orderData);
    },
    onSuccess: async (response) => {
      const result = await response.json();
      
      toast({
        title: "Order placed successfully!",
        description: `Your order #${result.order.id.slice(-8)} has been confirmed.`,
      });
      
      // Clear cart and form
      clearCart();
      form.reset();
      
      // Navigate to home
      setLocation("/");
    },
    onError: (error: any) => {
      console.error("Order creation failed:", error);
      toast({
        title: "Order failed",
        description: error.message || "Failed to place order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const total = getTotalPrice();
  
  const formatPrice = (priceInPaisa: number) => {
    return `₹${(priceInPaisa / 100).toLocaleString('en-IN')}`;
  };

  const onSubmit = (data: CheckoutFormData) => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive",
      });
      return;
    }

    createOrderMutation.mutate(data);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Checkout</h2>
        <p className="text-lg text-muted-foreground">Complete your order details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Details Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Shipping Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="checkout-form">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="customerName">Full Name *</Label>
                  <Input
                    id="customerName"
                    {...form.register("customerName")}
                    placeholder="Enter your full name"
                    data-testid="input-customer-name"
                  />
                  {form.formState.errors.customerName && (
                    <p className="text-sm text-destructive">{form.formState.errors.customerName.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder="your.email@example.com"
                    data-testid="input-email"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...form.register("phone")}
                    placeholder="+91 XXXXX XXXXX"
                    data-testid="input-phone"
                  />
                  {form.formState.errors.phone && (
                    <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>
                  )}
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <Textarea
                    id="address"
                    {...form.register("address")}
                    rows={3}
                    placeholder="House/Flat No., Street, Area"
                    data-testid="input-address"
                  />
                  {form.formState.errors.address && (
                    <p className="text-sm text-destructive">{form.formState.errors.address.message}</p>
                  )}
                </div>

                {/* City & State */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      {...form.register("city")}
                      placeholder="City"
                      data-testid="input-city"
                    />
                    {form.formState.errors.city && (
                      <p className="text-sm text-destructive">{form.formState.errors.city.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      {...form.register("state")}
                      placeholder="State"
                      data-testid="input-state"
                    />
                    {form.formState.errors.state && (
                      <p className="text-sm text-destructive">{form.formState.errors.state.message}</p>
                    )}
                  </div>
                </div>

                {/* Pincode */}
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    {...form.register("pincode")}
                    placeholder="000000"
                    data-testid="input-pincode"
                  />
                  {form.formState.errors.pincode && (
                    <p className="text-sm text-destructive">{form.formState.errors.pincode.message}</p>
                  )}
                </div>

                {/* Special Instructions */}
                <div className="space-y-2">
                  <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                  <Textarea
                    id="instructions"
                    {...form.register("instructions")}
                    rows={3}
                    placeholder="Any special delivery instructions..."
                    data-testid="input-instructions"
                  />
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Order Items */}
              <div className="space-y-4 max-h-64 overflow-y-auto" data-testid="checkout-items">
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No items in cart</p>
                ) : (
                  cart.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center justify-between py-3 border-b border-border last:border-0"
                      data-testid={`checkout-item-${item.id}`}
                    >
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-foreground">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Pricing Details */}
              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex items-center justify-between text-foreground">
                  <span>Subtotal:</span>
                  <span data-testid="checkout-subtotal">{formatPrice(total)}</span>
                </div>
                <div className="flex items-center justify-between text-foreground">
                  <span>Shipping:</span>
                  <span className="text-secondary font-medium">FREE</span>
                </div>
                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-foreground">Total:</span>
                  <span className="text-2xl font-bold text-primary" data-testid="checkout-total">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <Button 
                onClick={form.handleSubmit(onSubmit)}
                className="w-full py-4 text-lg font-semibold"
                disabled={cart.length === 0 || createOrderMutation.isPending}
                data-testid="button-place-order"
              >
                {createOrderMutation.isPending ? "Placing Order..." : "Place Order"}
              </Button>

              {/* Payment Methods */}
              <div className="pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground text-center mb-3">We accept</p>
                <div className="flex items-center justify-center space-x-3">
                  <div className="px-3 py-2 bg-muted rounded text-xs font-medium">Cash on Delivery</div>
                  <div className="px-3 py-2 bg-muted rounded text-xs font-medium">UPI</div>
                  <div className="px-3 py-2 bg-muted rounded text-xs font-medium">Cards</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
