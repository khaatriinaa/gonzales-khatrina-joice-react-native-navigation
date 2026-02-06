import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PRODUCTS, Product } from '../data/products';

interface ProductsContextType {
  products: Product[];
  updateStock: (id: number, quantityToDeduct: number) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  const updateStock = (id: number, quantityToDeduct: number) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, stock: Math.max(0, p.stock - quantityToDeduct) }
          : p
      )
    );
  };

  return (
    <ProductsContext.Provider value={{ products, updateStock }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) throw new Error('useProducts must be used inside ProductsProvider');
  return context;
};