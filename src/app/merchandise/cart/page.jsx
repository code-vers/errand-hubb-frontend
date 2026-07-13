'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Trash2, ShoppingBag } from 'lucide-react';
import { merchandiseOrdersService } from '@/services/merchandiseOrdersService';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', address: '', city: '', state: '', zipCode: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('merch_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
    setIsLoaded(true);
  }, []);

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem('merch_cart', JSON.stringify(updatedCart));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const orderPayload = {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        items: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: parseFloat(cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)),
      };

      await merchandiseOrdersService.createOrder(orderPayload);
      
      localStorage.removeItem('merch_cart');
      setCartItems([]);
      setOrderPlaced(true);
    } catch (err) {
      console.error(err);
      setError('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20">
      {/* Header */}
      <header className="border-b border-gray-200 py-4 px-6 md:px-12 flex items-center justify-between bg-white sticky top-0 z-50">
        <Link href="/merchandise" className="flex items-center gap-2 text-[#063b5c] hover:text-[#f47a22] transition font-semibold">
          <ArrowLeft size={20} />
          Back to Store
        </Link>

        <div className="font-extrabold text-2xl tracking-tight text-secondary">
          ERRAND<span className="text-primary">HUBB</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 mt-12">
        <h1 className="text-3xl font-extrabold text-[#063b5c] mb-8 uppercase tracking-wide">Your Shopping Cart</h1>

        {orderPlaced ? (
          <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-8">
              We have received your order and will begin processing it right away.
            </p>
            <Link 
              href="/merchandise"
              className="bg-[#063b5c] text-white px-8 py-3 rounded-md font-bold hover:bg-[#042840] transition inline-block uppercase"
            >
              Continue Shopping
            </Link>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-200 text-center">
            <p className="text-gray-500 mb-6 text-lg">Your cart is currently empty.</p>
            <Link 
              href="/merchandise"
              className="bg-[#f47a22] text-white px-8 py-3 rounded-md font-bold hover:bg-[#d66519] transition inline-block uppercase"
            >
              Shop Merchandise
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${index}`} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex gap-4 items-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-md relative flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                    <p className="font-extrabold text-[#063b5c] mt-2">${item.price}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Shipping Details Form */}
            <div className="md:col-span-2 mt-8 bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="font-extrabold text-xl mb-6 text-[#063b5c] border-b border-gray-100 pb-4">Shipping Details</h2>
              
              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-5">
                {error && <div className="bg-red-50 text-red-500 p-3 rounded text-sm font-semibold border border-red-100">{error}</div>}
                
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <input required type="text" placeholder="John Doe" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#f47a22] focus:border-transparent outline-none transition" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <input required type="email" placeholder="john@example.com" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#f47a22] focus:border-transparent outline-none transition" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Street Address</label>
                  <input required type="text" placeholder="123 Main St, Apt 4B" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#f47a22] focus:border-transparent outline-none transition" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">City</label>
                    <input required type="text" placeholder="New York" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#f47a22] focus:border-transparent outline-none transition" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">State / Province</label>
                    <input required type="text" placeholder="NY" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#f47a22] focus:border-transparent outline-none transition" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Zip Code</label>
                    <input required type="text" placeholder="10001" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#f47a22] focus:border-transparent outline-none transition" value={formData.zipCode} onChange={e => setFormData({...formData, zipCode: e.target.value})} />
                  </div>
                </div>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit">
              <h2 className="font-bold text-xl mb-6 text-[#063b5c]">Order Summary</h2>
              
              <div className="space-y-3 text-gray-600 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-gray-900">Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between items-center">
                  <span className="font-bold text-gray-900">Estimated Total</span>
                  <span className="font-extrabold text-2xl text-[#f47a22]">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <button 
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full bg-[#f47a22] text-white py-4 rounded-md font-extrabold hover:bg-[#d66519] transition uppercase tracking-wider shadow-md disabled:opacity-70 mt-6"
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
