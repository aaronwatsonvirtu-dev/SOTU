'use client';

import React, { useState } from 'react';
import { ShoppingCart, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  cartId: number;
}

const products: Product[] = [
  { id: 1, name: 'BASSLINE TEE', price: 45, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', category: 'tees' },
  { id: 2, name: 'NIGHTSHIFT HOODIE', price: 85, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80', category: 'hoodies' },
  { id: 3, name: '4AM CARGO PANTS', price: 95, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80', category: 'bottoms' },
  { id: 4, name: 'RAVE TAPE LONGSLEEVE', price: 55, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', category: 'tees' },
  { id: 5, name: 'SUBWOOFER CREWNECK', price: 75, image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80', category: 'hoodies' },
  { id: 6, name: 'WAREHOUSE JACKET', price: 120, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80', category: 'outerwear' },
];

export default function SOTUShopfront() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  const heroImages = [
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&q=80',
    'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1600&q=80',
    'https://images.unsplash.com/photo-1571266028243-d220c6ce8ddd?w=1600&q=80',
  ];

  const addToCart = (product: Product) => {
    setCart([...cart, { ...product, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId: number) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <h1 className="text-3xl font-bold tracking-wider">SOTU</h1>
          
          <nav className="hidden lg:flex gap-8 text-sm">
            <a href="#shop" className="hover:text-purple-400 transition">SHOP</a>
            <a href="#about" className="hover:text-purple-400 transition">ABOUT</a>
            <a href="#lookbook" className="hover:text-purple-400 transition">LOOKBOOK</a>
            <a href="#contact" className="hover:text-purple-400 transition">CONTACT</a>
          </nav>
          
          <button 
            onClick={() => setCartOpen(!cartOpen)}
            className="relative hover:text-purple-400 transition"
          >
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="lg:hidden bg-black border-t border-zinc-800 py-4 px-4 flex flex-col gap-4 text-sm">
            <a href="#shop" className="hover:text-purple-400 transition">SHOP</a>
            <a href="#about" className="hover:text-purple-400 transition">ABOUT</a>
            <a href="#lookbook" className="hover:text-purple-400 transition">LOOKBOOK</a>
            <a href="#contact" className="hover:text-purple-400 transition">CONTACT</a>
          </nav>
        )}
      </header>

      {/* Cart Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-80 bg-zinc-900 z-50 transform transition-transform ${cartOpen ? 'translate-x-0' : 'translate-x-full'} border-l border-zinc-800`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">CART</h2>
            <button onClick={() => setCartOpen(false)}>
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {cart.length === 0 ? (
              <p className="text-zinc-500 text-sm">Your cart is empty</p>
            ) : (
              cart.map(item => (
                <div key={item.cartId} className="mb-4 pb-4 border-b border-zinc-800 flex gap-3">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-bold">{item.name}</p>
                    <p className="text-sm text-zinc-400">${item.price}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.cartId)} className="text-zinc-500 hover:text-red-500">
                    <X size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
          
          {cart.length > 0 && (
            <div className="border-t border-zinc-800 pt-4 mt-4">
              <div className="flex justify-between mb-4 text-lg font-bold">
                <span>TOTAL</span>
                <span>${cartTotal}</span>
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 py-3 font-bold transition">
                CHECKOUT
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen pt-16">
        <div className="absolute inset-0">
          <img 
            src={heroImages[heroIndex]} 
            alt="Hero" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black"></div>
        </div>
        
        <button 
          onClick={() => setHeroIndex((heroIndex - 1 + heroImages.length) % heroImages.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 hover:bg-black/70 transition"
        >
          <ChevronLeft size={32} />
        </button>
        
        <button 
          onClick={() => setHeroIndex((heroIndex + 1) % heroImages.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 hover:bg-black/70 transition"
        >
          <ChevronRight size={32} />
        </button>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-6xl md:text-8xl font-bold mb-4 tracking-wider">STATE OF THE UNDERGROUND</h2>
          <p className="text-xl md:text-2xl mb-8 text-zinc-300">WHERE THE NIGHT NEVER ENDS</p>
          <a href="#shop" className="bg-purple-600 hover:bg-purple-700 px-8 py-4 text-lg font-bold transition">
            EXPLORE COLLECTION
          </a>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">LATEST DROPS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative overflow-hidden mb-4 bg-zinc-900 aspect-square">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-white text-black px-6 py-3 font-bold hover:bg-purple-500 hover:text-white transition"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
                <h3 className="font-bold mb-2">{product.name}</h3>
                <p className="text-zinc-400">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">ABOUT SOTU</h2>
          <p className="text-lg text-zinc-300 mb-6">
            Born from the underground. Inspired by the pulse of house music and the energy of the dancefloor.
          </p>
          <p className="text-lg text-zinc-300">
            SOTU represents a state of mind—where fashion meets rhythm, where night culture becomes wearable art. 
            Every piece is designed for those who live between the beats.
          </p>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">STAY IN THE LOOP</h2>
          <p className="text-zinc-400 mb-8">Get early access to new drops and exclusive events</p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="your@email.com"
              className="flex-1 bg-zinc-900 border border-zinc-800 px-4 py-3 focus:outline-none focus:border-purple-500"
            />
            <button className="bg-purple-600 hover:bg-purple-700 px-8 py-3 font-bold transition">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-zinc-950 py-12 px-4 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-bold mb-4 text-lg">SOTU</h3>
            <p className="text-zinc-400">State of the Underground</p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">QUICK LINKS</h3>
            <div className="flex flex-col gap-2 text-zinc-400">
              <a href="#shop" className="hover:text-white transition">Shop</a>
              <a href="#about" className="hover:text-white transition">About</a>
              <a href="#" className="hover:text-white transition">Shipping</a>
              <a href="#" className="hover:text-white transition">Returns</a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">CONNECT</h3>
            <div className="flex flex-col gap-2 text-zinc-400">
              <a href="#" className="hover:text-white transition">Instagram</a>
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">SoundCloud</a>
              <a href="mailto:info@sotu.com" className="hover:text-white transition">info@sotu.com</a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-800 text-center text-zinc-500 text-xs">
          © 2024 SOTU. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}