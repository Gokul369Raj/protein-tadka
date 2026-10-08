import { createContext, useContext, useEffect, useMemo, useReducer, useCallback, useState } from 'react';
import { MENU_BY_ID } from '../data/menu.js';
import { SITE } from '../data/site.js';

const CartCtx = createContext(null);
const KEY = 'pt_cart_v2';

function load() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = JSON.parse(localStorage.getItem(KEY)) || [];
    // prune any items no longer on the menu
    return raw.filter((i) => MENU_BY_ID[i.id] && i.qty > 0);
  } catch {
    return [];
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const found = state.find((i) => i.id === action.id);
      if (found) return state.map((i) => (i.id === action.id ? { ...i, qty: i.qty + (action.qty || 1) } : i));
      return [...state, { id: action.id, qty: action.qty || 1 }];
    }
    case 'setQty':
      if (action.qty <= 0) return state.filter((i) => i.id !== action.id);
      return state.map((i) => (i.id === action.id ? { ...i, qty: action.qty } : i));
    case 'remove':
      return state.filter((i) => i.id !== action.id);
    case 'clear':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, load);
  const [isOpen, setOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* ignore quota */ }
  }, [items]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  const add = useCallback((id, qty = 1) => {
    dispatch({ type: 'add', id, qty });
    setOpen(true);
    const m = MENU_BY_ID[id];
    setToast(m ? `${m.name} added to cart` : 'Added to cart');
  }, []);

  const setQty = useCallback((id, qty) => dispatch({ type: 'setQty', id, qty }), []);
  const remove = useCallback((id) => dispatch({ type: 'remove', id }), []);
  const clear = useCallback(() => dispatch({ type: 'clear' }), []);

  const { lines, count, subtotal, delivery, total, freeDelivery } = useMemo(() => {
    const lines = items.map((i) => ({ ...i, item: MENU_BY_ID[i.id] })).filter((l) => l.item);
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = lines.reduce((s, l) => s + l.item.price * l.qty, 0);
    const freeDelivery = subtotal >= SITE.freeDeliveryAbove;
    const delivery = subtotal === 0 ? 0 : freeDelivery ? 0 : SITE.deliveryFee;
    return { lines, count, subtotal, delivery, total: subtotal + delivery, freeDelivery };
  }, [items]);

  const value = { items, lines, count, subtotal, delivery, total, freeDelivery, add, setQty, remove, clear, isOpen, setOpen, toast };
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export { KEY as CART_KEY };
