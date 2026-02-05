import React, { createContext, useContext, useMemo, useState } from "react";

/** Product / Cart Item model */
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

/** Context contract */
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  total: number;
  count: number; // total quantity (for badge)
}

/** Context */
const CartContext = createContext<CartContextType>({} as CartContextType);

/** Provider */
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  /** Add item (or increase if exists) */
  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === item.id);
      if (existing) {
        return prev.map(p =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  /** Increase quantity */
  const increase = (id: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  /** Decrease quantity (auto-remove at 0) */
  const decrease = (id: number) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  /** Remove item completely */
  const removeItem = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  /** Clear cart (used after checkout) */
  const clearCart = () => setCart([]);

  /** Total price */
  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  /** Total quantity (for badge count) */
  const count = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increase,
        decrease,
        removeItem,
        clearCart,
        total,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/** Hook */
export const useCart = () => useContext(CartContext);
