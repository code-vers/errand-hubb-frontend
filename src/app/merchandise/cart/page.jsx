'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';
import { merchandiseOrdersService } from '@/services/merchandiseOrdersService';

export default function CartPage() {
  const [orderPlaced, setOrderPlaced] = useState(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      return searchParams.get('success') === 'true';
    }
    return false;
  });

  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('success') === 'true') {
        localStorage.removeItem('merch_cart');
        return [];
      }
      const savedCart = localStorage.getItem('merch_cart');
      if (savedCart) {
        try {
          return JSON.parse(savedCart);
        } catch (e) {
          console.error('Failed to parse cart', e);
        }
      }
    }
    return [];
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', address: '', city: '', state: '', zipCode: '' });
  const [fieldErrors, setFieldErrors] = useState({ name: '', email: '', address: '', city: '', state: '', zipCode: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('canceled') === 'true') {
        return 'Payment was canceled. You can try checking out again.';
      }
    }
    return null;
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('success') === 'true' || searchParams.get('canceled') === 'true') {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    const timer = setTimeout(() => setIsLoaded(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem('merch_cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (index, delta) => {
    const updatedCart = [...cartItems];
    const newQuantity = updatedCart[index].quantity + delta;
    if (newQuantity > 0) {
      updatedCart[index].quantity = newQuantity;
      setCartItems(updatedCart);
      localStorage.setItem('merch_cart', JSON.stringify(updatedCart));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const errors = { name: '', email: '', address: '', city: '', state: '', zipCode: '' };

    // Full Name validation
    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      errors.name = 'Please enter your full name.';
    } else if (trimmedName.length < 2) {
      errors.name = 'Full name must be at least 2 characters.';
    }

    // Email Address validation
    const trimmedEmail = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      errors.email = 'Please enter a valid email address.';
    }

    // Street Address validation
    const trimmedAddress = formData.address.trim();
    if (!trimmedAddress || trimmedAddress.length < 3 || !/[a-zA-Z0-9]/.test(trimmedAddress)) {
      errors.address = 'Please enter a valid address.';
    }

    // City validation
    const trimmedCity = formData.city.trim();
    if (!trimmedCity || trimmedCity.length < 2) {
      errors.city = 'Please enter a valid city.';
    }

    // State validation
    const trimmedState = formData.state.trim();
    if (!trimmedState || trimmedState.length < 2) {
      errors.state = 'Please enter a valid state.';
    }

    // ZIP Code validation (US/International ZIP format)
    const trimmedZip = formData.zipCode.trim();
    const zipRegex = /^[a-zA-Z0-9\s\-]{3,10}$/;
    const hasChar = /[a-zA-Z0-9]/.test(trimmedZip);
    if (!trimmedZip || !zipRegex.test(trimmedZip) || !hasChar || trimmedZip.length < 3) {
      errors.zipCode = 'Please enter a valid ZIP code.';
    }

    setFieldErrors(errors);
    return !Object.values(errors).some(err => Boolean(err));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      toast.error('Please fix the errors in your shipping details.');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderPayload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        zipCode: formData.zipCode.trim(),
        items: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          color: item.color || 'Black',
          size: item.size || 'L'
        })),
        totalAmount: parseFloat(cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)),
      };

      const response = await merchandiseOrdersService.createOrder(orderPayload);
      
      if (response.checkoutUrl) {
        window.location.href = response.checkoutUrl;
      } else {
        setError('Failed to initiate payment. Please try again.');
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to place order. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-20">
      {/* Header */}
      <header className="border-b border-slate-200 py-4 px-6 md:px-12 flex items-center justify-between bg-white sticky top-0 z-50 shadow-sm">
        <Link href="/merchandise" className="flex items-center gap-2 text-slate-600 hover:text-[#f47a22] transition-colors font-medium text-sm">
          <ArrowLeft size={18} />
          Continue Shopping
        </Link>
        <div className="font-extrabold text-xl md:text-2xl tracking-tight text-slate-800">
          ERRAND<span className="text-[#f47a22]">HUBB</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-12">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="text-[#063b5c]" size={28} />
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#063b5c] tracking-tight">Checkout</h1>
        </div>

        {orderPlaced ? (
          <div className="bg-white p-10 md:p-16 rounded-2xl shadow-sm border border-slate-200 text-center max-w-2xl mx-auto mt-12">
            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
              <ShoppingBag size={48} strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800 mb-4">Order Confirmed!</h2>
            <p className="text-slate-500 mb-10 text-lg">
              Thank you for representing ErrandHubb. We&apos;re getting your gear ready.
            </p>
            <Link 
              href="/merchandise"
              className="bg-[#063b5c] text-white px-8 py-3.5 rounded-lg font-bold hover:bg-[#042840] transition-colors inline-block tracking-wide shadow-md hover:shadow-lg"
            >
              Return to Store
            </Link>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="bg-white p-12 md:p-20 rounded-2xl shadow-sm border border-slate-200 text-center max-w-2xl mx-auto mt-12">
            <ShoppingBag className="mx-auto text-slate-300 mb-6" size={64} strokeWidth={1} />
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Your cart is empty</h2>
            <p className="text-slate-500 mb-8 text-lg">Looks like you haven&apos;t added any gear yet.</p>
            <Link 
              href="/merchandise"
              className="bg-[#f47a22] text-white px-8 py-3.5 rounded-lg font-bold hover:bg-[#d66519] transition-colors inline-block tracking-wide shadow-md"
            >
              Explore Merchandise
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Cart Items & Shipping Form */}
            <div className="w-full lg:flex-1 space-y-8">
              
              {/* Cart Items List */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                  <h2 className="font-bold text-lg text-slate-800">Order Items ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</h2>
                </div>
                <div className="divide-y divide-slate-100">
                  {cartItems.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center hover:bg-slate-50/30 transition-colors">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 bg-slate-50 rounded-xl relative flex-shrink-0 border border-slate-100">
                        <Image src={item.image} alt={item.name} fill className="object-contain p-3" />
                      </div>
                      
                      <div className="flex-grow space-y-2">
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="font-bold text-slate-800 text-lg leading-tight">{item.name}</h3>
                          <p className="font-extrabold text-[#063b5c] text-lg">${item.price}</p>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          {item.color && (
                            <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md text-slate-600 font-medium">
                              <div className="w-3 h-3 rounded-full border border-slate-300 shadow-sm" style={{ backgroundColor: item.color === 'Black' ? '#111827' : item.color === 'White' ? '#F9FAFB' : '#1E3A8A' }}></div>
                              {item.color}
                            </div>
                          )}
                          {item.size && (
                            <div className="bg-slate-100 px-2.5 py-1 rounded-md text-slate-600 font-medium flex items-center gap-1.5">
                              <span className="text-slate-400 text-xs">Size:</span> {item.size}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100">
                          <div className="flex items-center gap-3">
                            <span className="text-slate-500 text-sm font-medium">Qty:</span>
                            <div className="flex items-center bg-slate-50 rounded-lg border border-slate-200">
                              <button 
                                type="button"
                                onClick={() => updateQuantity(index, -1)}
                                disabled={item.quantity <= 1}
                                className="p-1.5 text-slate-500 hover:text-[#063b5c] hover:bg-slate-200 rounded-l-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-8 text-center text-sm font-bold text-slate-800">{item.quantity}</span>
                              <button 
                                type="button"
                                onClick={() => updateQuantity(index, 1)}
                                className="p-1.5 text-slate-500 hover:text-[#063b5c] hover:bg-slate-200 rounded-r-lg transition-colors"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                          <button 
                            onClick={() => removeFromCart(index)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center gap-1.5 text-sm font-medium"
                          >
                            <Trash2 size={16} /> <span className="hidden sm:inline">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Details Form */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="font-bold text-xl mb-6 text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4">
                  <span className="bg-[#063b5c] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                  Shipping Information
                </h2>
                
                <form id="checkout-form" onSubmit={handleCheckout} noValidate className="space-y-6">
                  {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-start gap-2">
                      <span className="mt-0.5">⚠️</span> {error}
                    </div>
                  )}
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Full Name</label>
                      <input type="text" placeholder="e.g. Jane Doe" 
                        className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:bg-white outline-none transition-all placeholder:text-slate-400 ${
                          fieldErrors.name
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500'
                            : 'border-slate-200 focus:ring-2 focus:ring-[#f47a22]/20 focus:border-[#f47a22]'
                        }`} 
                        value={formData.name} onChange={e => handleInputChange('name', e.target.value)} 
                      />
                      {fieldErrors.name && (
                        <p className="text-xs text-red-500 font-medium mt-1">{fieldErrors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Email Address</label>
                      <input type="email" placeholder="jane@example.com" 
                        className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:bg-white outline-none transition-all placeholder:text-slate-400 ${
                          fieldErrors.email
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500'
                            : 'border-slate-200 focus:ring-2 focus:ring-[#f47a22]/20 focus:border-[#f47a22]'
                        }`} 
                        value={formData.email} onChange={e => handleInputChange('email', e.target.value)} 
                      />
                      {fieldErrors.email && (
                        <p className="text-xs text-red-500 font-medium mt-1">{fieldErrors.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Street Address</label>
                    <input type="text" placeholder="123 Main St, Apt 4B" 
                      className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:bg-white outline-none transition-all placeholder:text-slate-400 ${
                        fieldErrors.address
                          ? 'border-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500'
                          : 'border-slate-200 focus:ring-2 focus:ring-[#f47a22]/20 focus:border-[#f47a22]'
                      }`} 
                      value={formData.address} onChange={e => handleInputChange('address', e.target.value)} 
                    />
                    {fieldErrors.address && (
                      <p className="text-xs text-red-500 font-medium mt-1">{fieldErrors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">City</label>
                      <input type="text" placeholder="New York" 
                        className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:bg-white outline-none transition-all placeholder:text-slate-400 ${
                          fieldErrors.city
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500'
                            : 'border-slate-200 focus:ring-2 focus:ring-[#f47a22]/20 focus:border-[#f47a22]'
                        }`} 
                        value={formData.city} onChange={e => handleInputChange('city', e.target.value)} 
                      />
                      {fieldErrors.city && (
                        <p className="text-xs text-red-500 font-medium mt-1">{fieldErrors.city}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">State</label>
                      <input type="text" placeholder="NY" 
                        className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:bg-white outline-none transition-all placeholder:text-slate-400 ${
                          fieldErrors.state
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500'
                            : 'border-slate-200 focus:ring-2 focus:ring-[#f47a22]/20 focus:border-[#f47a22]'
                        }`} 
                        value={formData.state} onChange={e => handleInputChange('state', e.target.value)} 
                      />
                      {fieldErrors.state && (
                        <p className="text-xs text-red-500 font-medium mt-1">{fieldErrors.state}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Zip Code</label>
                      <input type="text" placeholder="10001" 
                        className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:bg-white outline-none transition-all placeholder:text-slate-400 ${
                          fieldErrors.zipCode
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500'
                            : 'border-slate-200 focus:ring-2 focus:ring-[#f47a22]/20 focus:border-[#f47a22]'
                        }`} 
                        value={formData.zipCode} onChange={e => handleInputChange('zipCode', e.target.value)} 
                      />
                      {fieldErrors.zipCode && (
                        <p className="text-xs text-red-500 font-medium mt-1">{fieldErrors.zipCode}</p>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column: Order Summary (Sticky) */}
            <div className="w-full lg:w-[380px] flex-shrink-0">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 lg:sticky lg:top-24">
                <h2 className="font-bold text-xl mb-6 text-slate-800 border-b border-slate-100 pb-4">Order Summary</h2>
                
                <div className="space-y-4 text-slate-600 mb-8">
                  <div className="flex justify-between items-center text-sm">
                    <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                    <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Shipping</span>
                    <span className="font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs">Free</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Taxes</span>
                    <span className="font-medium text-slate-400">Calculated later</span>
                  </div>
                  
                  <div className="border-t border-slate-200 pt-5 mt-5 flex justify-between items-end">
                    <div>
                      <span className="block font-bold text-slate-800 text-lg">Total</span>
                      <span className="text-xs text-slate-400 font-medium">USD</span>
                    </div>
                    <span className="font-extrabold text-3xl text-[#f47a22]">${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="w-full bg-[#f47a22] text-white py-4 rounded-xl font-extrabold hover:bg-[#d66519] transition-all uppercase tracking-wide shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    'Proceed to Payment'
                  )}
                </button>
                
                <div className="mt-6 text-center text-xs font-medium text-slate-400 flex items-center justify-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  Secure SSL Checkout via Stripe
                </div>
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
