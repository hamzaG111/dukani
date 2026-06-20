"use client";

import { useState, useEffect, useCallback } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount: number;
  category: string;
  description: string;
  available: boolean;
  stockCount?: number;
  icon: string;
  imageUrl?: string;
  requests: number;
  createdAt: string;
}

const STORAGE_KEY = "dukani_products";

const DEFAULT_PRODUCTS: Product[] = [
  { id: "1", name: "جبادور جلدي بني داكن", price: 350, discount: 15, category: "أحذية", description: "جبادور جلد طبيعي 100%، متوفر بأحجام 38-45", available: true, stockCount: 12, icon: "👞", requests: 18, createdAt: new Date().toISOString() },
  { id: "2", name: "بيتزا عائلية كبيرة",   price: 89,  discount: 0,  category: "أطعمة",        description: "بيتزا بـ 4 نكهات مختلفة، حجم عائلي 40cm",          available: true, stockCount: 999, icon: "🍕", requests: 14, createdAt: new Date().toISOString() },
  { id: "3", name: "شاحن آيفون أصلي",       price: 120, discount: 10, category: "إلكترونيات",  description: "شاحن Apple أصلي 20W USB-C",                        available: true, stockCount: 5,  icon: "🔌", requests: 11, createdAt: new Date().toISOString() },
  { id: "4", name: "كريم الوجه الذهبي",    price: 200, discount: 20, category: "تجميل",       description: "كريم مرطب طبيعي بزيت الأركان المغربي",              available: true, stockCount: 8,  icon: "✨", requests: 9,  createdAt: new Date().toISOString() },
];

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      setProducts(saved ? JSON.parse(saved) : DEFAULT_PRODUCTS);
    } catch {
      setProducts(DEFAULT_PRODUCTS);
    }
    setLoading(false);
  }, []);

  // Persist to localStorage on change
  const persist = useCallback((updated: Product[]) => {
    setProducts(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
    // TODO: sync to Supabase
    // supabase.from("products").upsert(updated.map(p => ({ ...p, user_id: session.userId })));
  }, []);

  const addProduct = useCallback((p: Omit<Product, "id" | "requests" | "createdAt">) => {
    const newProduct: Product = {
      ...p,
      id: Date.now().toString(),
      requests: 0,
      createdAt: new Date().toISOString(),
    };
    persist([...products, newProduct]);
    return newProduct;
  }, [products, persist]);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    persist(products.map(p => p.id === id ? { ...p, ...updates } : p));
  }, [products, persist]);

  const deleteProduct = useCallback((id: string) => {
    persist(products.filter(p => p.id !== id));
  }, [products, persist]);

  const toggleAvailable = useCallback((id: string) => {
    persist(products.map(p => p.id === id ? { ...p, available: !p.available } : p));
  }, [products, persist]);

  return { products, loading, addProduct, updateProduct, deleteProduct, toggleAvailable };
}
