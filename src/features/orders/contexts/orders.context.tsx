"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getUserOrders } from "../server/orders.actions";
import { Order } from "../types/orders.types";

type OrdersContextType = {
  orders: Order[] | null;
  isLoading: boolean;
  error: string | null;
};

const OrdersContext = createContext<OrdersContextType | null>(null);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await getUserOrders();
        setOrders(response);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unexpected error!");
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrders();
  }, []);

  return (
    <OrdersContext.Provider value={{ orders, isLoading, error }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) throw new Error("useOrders must be used inside OrdersProvider");
  return context;
}
