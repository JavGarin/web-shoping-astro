
import type { Product } from '../types';

export interface CartItem {
  product: Product;
  quantity: number;
}

export function getCart(): CartItem[] {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

export function addToCart(product: Product, quantity: number = 1) {
  const cart = getCart();
  const existingItem = cart.find(item => item.product.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

export function removeFromCart(productId: number) {
  let cart = getCart();
  cart = cart.filter(item => item.product.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

export function updateCartCount() {
  const cart = getCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  const headerCartCount = document.getElementById('header-cart-count');
  if (headerCartCount) {
    headerCartCount.textContent = `Cart (${cartCount})`;
  }

  const mobileCartCount = document.getElementById('mobile-cart-count');
  if (mobileCartCount) {
    mobileCartCount.textContent = `Cart (${cartCount})`;
  }
}

// Update cart count on page load
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
  });
}
