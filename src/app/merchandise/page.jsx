'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingCart,
  Truck,
  Shirt,
  Palette,
  Handshake,
  UserCheck,
  Megaphone,
  Users,
  Star,
  Quote,
} from 'lucide-react';

export default function MerchandisePage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('merch_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
        3;
      }
    }
  }, []);

  const productDetails = {
    'Classic Logo T-Shirt': { price: 24.99, image: '/merch/merch_tshirt_logo.png' },
    'Elite Driver T-Shirt': { price: 29.99, image: '/merch/merch_tshirt_back_1783925353598.png' },
    'Professional Polo Shirt': { price: 39.99, image: '/merch/merch_polo_logo.png' },
    'Premium Executive Polo': { price: 44.99, image: '/merch/merch_polo_logo.png' },
    'Driver Bundle': { price: 79.99, image: '/merch/merch_bundle_logo.png' },
  };

  const handleAddToCart = (productName) => {
    const product = productDetails[productName];
    if (!product) return;

    // Check if item already in cart to increment quantity, or add new
    const existingIndex = cartItems.findIndex((item) => item.name === productName);
    let updatedCart;

    if (existingIndex >= 0) {
      updatedCart = [...cartItems];
      updatedCart[existingIndex].quantity += 1;
    } else {
      const newItem = {
        id: Date.now().toString(),
        name: productName,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      updatedCart = [...cartItems, newItem];
    }

    setCartItems(updatedCart);
    localStorage.setItem('merch_cart', JSON.stringify(updatedCart));
    console.log(`Added to cart: ${productName}`);
  };

  const handleAction = (actionName) => {
    console.log(`Action triggered: ${actionName}`);
  };

  return (
    <div className='min-h-screen bg-white text-gray-900 font-sans'>
      {/* Header */}
      <header className='border-b border-gray-200 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 bg-white z-50'>
        <Link href='/' className='flex items-center gap-2'>
          {/* Logo mock based on description */}
          <div className='font-extrabold text-2xl tracking-tight text-secondary flex items-center'>
            ERRAND<span className='text-primary'>HUBB</span>
          </div>
        </Link>

        <nav className='hidden md:flex gap-8 font-semibold text-primary'>
          <Link href='/merchandise' className='border-b-2 border-primary pb-1'>
            Merchandise
          </Link>
        </nav>

        <Link
          href='/merchandise/cart'
          className='flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 transition text-gray-900'
        >
          <ShoppingCart size={20} />
          <span className='font-medium'>
            Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
          </span>
        </Link>
      </header>

      {/* Hero Section */}
      <section className='bg-[#f4f7f9] relative overflow-hidden'>
        <div className='max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center'>
          <div className='space-y-6 z-10'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight uppercase'>
              <span className='text-[#063b5c] block'>Wear the Brand.</span>
              <span className='text-[#f47a22] block'>Represent the Hustle.</span>
            </h1>

            <p className='text-xl md:text-2xl font-bold text-[#063b5c]'>
              Official ErrandHubb Apparel for Drivers, Partners & Fans
            </p>

            <p className='text-gray-600 text-lg max-w-lg'>
              Premium branded clothing designed for the people who keep the world moving.
            </p>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 py-4'>
              <div className='flex items-center gap-3'>
                <Truck className='text-[#063b5c]' size={28} />
                <span className='text-sm font-semibold text-gray-800 leading-tight'>
                  Free Shipping
                  <br />
                  on Orders Over $75
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <Shirt className='text-[#063b5c]' size={28} />
                <span className='text-sm font-semibold text-gray-800 leading-tight'>
                  Premium Cotton &<br />
                  Moisture-Wicking Fabrics
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <Palette className='text-[#063b5c]' size={28} />
                <span className='text-sm font-semibold text-gray-800 leading-tight'>
                  Available in Multiple
                  <br />
                  Colors & Sizes
                </span>
              </div>
            </div>

            <div className='flex flex-wrap gap-4 pt-2'>
              <button
                onClick={() => handleAction('Shop T-Shirts')}
                className='bg-[#063b5c] text-white px-8 py-3 rounded-md font-bold hover:bg-[#042840] transition uppercase'
              >
                Shop T-Shirts
              </button>
              <button
                onClick={() => handleAction('Shop Polo Shirts')}
                className='bg-[#f47a22] text-white px-8 py-3 rounded-md font-bold hover:bg-[#d66519] transition uppercase'
              >
                Shop Polo Shirts
              </button>
            </div>
          </div>

          <div className='relative h-[400px] md:h-[600px] w-full rounded-xl overflow-hidden shadow-xl'>
            <Image
              src='/merch/merch_hero_exact.png'
              alt='ErrandHubb Apparel'
              fill
              className='object-cover object-center'
              priority
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className='py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12'>
        <div className='flex items-center justify-center gap-4 mb-12'>
          <div className='h-px bg-gray-300 w-16 md:w-32'></div>
          <h2 className='text-2xl md:text-3xl font-bold text-[#063b5c] uppercase tracking-wide'>
            Featured Products
          </h2>
          <div className='h-px bg-gray-300 w-16 md:w-32'></div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6'>
          {/* Product 1 */}
          <div className='bg-white border border-gray-200 rounded-lg p-5 flex flex-col hover:shadow-lg transition'>
            <div className='relative h-48 w-full mb-4 bg-white rounded-md flex items-center justify-center p-2'>
              <Image
                src='/merch/merch_tshirt_logo.png'
                alt='Classic T-Shirt'
                width={180}
                height={180}
                className='object-contain'
              />
            </div>
            <h3 className='text-center font-bold text-gray-900 mb-2'>
              ErrandHubb
              <br />
              Classic Logo T-Shirt
            </h3>
            <p className='text-xs text-center text-gray-600 mb-4 h-14 flex items-center justify-center'>
              Large ERRANDHUBB logo on front with small logo on sleeve.
            </p>
            <div className='text-center font-extrabold text-xl mb-3'>$24.99</div>
            <div className='flex justify-center items-center gap-1 mb-4 text-[#f47a22]'>
              <Star size={14} fill='currentColor' />
              <Star size={14} fill='currentColor' />
              <Star size={14} fill='currentColor' />
              <Star size={14} fill='currentColor' />
              <Star size={14} fill='currentColor' />
              <span className='text-xs text-gray-500 ml-1'>(4.9/5)</span>
            </div>
            <button
              onClick={() => handleAddToCart('Classic Logo T-Shirt')}
              className='mt-auto w-full bg-[#063b5c] text-white py-2 rounded font-bold flex items-center justify-center gap-2 hover:bg-[#042840] transition'
            >
              <ShoppingCart size={16} /> ADD TO CART
            </button>
          </div>

          {/* Product 2 */}
          <div className='bg-white border border-gray-200 rounded-lg p-5 flex flex-col hover:shadow-lg transition'>
            <div className='relative h-48 w-full mb-4 bg-white rounded-md flex items-center justify-center p-2'>
              <Image
                src='/merch/merch_tshirt_back_1783925353598.png'
                alt='Elite Driver T-Shirt'
                width={180}
                height={180}
                className='object-contain'
              />
            </div>
            <h3 className='text-center font-bold text-gray-900 mb-2'>
              ErrandHubb
              <br />
              Elite Driver T-Shirt
            </h3>
            <div className='text-xs text-center text-gray-600 mb-4 h-14 flex flex-col justify-center items-center gap-1'>
              <p>
                <span className='font-semibold'>Front:</span> ERRANDHUBB Elite Driver
              </p>
              <p>
                <span className='font-semibold'>Back:</span> WE RUN. YOU REST.
              </p>
            </div>
            <div className='text-center font-extrabold text-xl mb-3'>$29.99</div>
            <div className='flex justify-center items-center gap-1 mb-4 text-[#f47a22]'>
              <Star size={14} fill='currentColor' />
              <Star size={14} fill='currentColor' />
              <Star size={14} fill='currentColor' />
              <Star size={14} fill='currentColor' />
              <Star size={14} fill='currentColor' />
              <span className='text-xs text-gray-500 ml-1'>(4.9/5)</span>
            </div>
            <button
              onClick={() => handleAddToCart('Elite Driver T-Shirt')}
              className='mt-auto w-full bg-[#063b5c] text-white py-2 rounded font-bold flex items-center justify-center gap-2 hover:bg-[#042840] transition'
            >
              <ShoppingCart size={16} /> ADD TO CART
            </button>
          </div>

          {/* Product 3 */}
          <div className='bg-white border border-gray-200 rounded-lg p-5 flex flex-col hover:shadow-lg transition'>
            <div className='relative h-48 w-full mb-4 bg-white rounded-md flex items-center justify-center p-2'>
              <Image
                src='/merch/merch_polo_logo.png'
                alt='Professional Polo Shirt'
                width={180}
                height={180}
                className='object-contain'
              />
            </div>
            <h3 className='text-center font-bold text-gray-900 mb-2'>
              ErrandHubb
              <br />
              Professional Polo Shirt
            </h3>
            <ul className='text-xs text-left text-gray-600 mb-4 h-14 flex flex-col justify-center list-disc pl-4 space-y-1 ml-2'>
              <li>Embroidered logo</li>
              <li>Moisture-wicking fabric</li>
              <li>Wrinkle resistant</li>
            </ul>
            <div className='text-center font-extrabold text-xl mb-3'>$39.99</div>
            <div className='flex justify-center items-center gap-1 mb-4 text-[#f47a22]'>
              <Star size={14} fill='currentColor' />
              <Star size={14} fill='currentColor' />
              <Star size={14} fill='currentColor' />
              <Star size={14} fill='currentColor' />
              <Star size={14} fill='currentColor' />
              <span className='text-xs text-gray-500 ml-1'>(4.9/5)</span>
            </div>
            <button
              onClick={() => handleAddToCart('Professional Polo Shirt')}
              className='mt-auto w-full bg-[#063b5c] text-white py-2 rounded font-bold flex items-center justify-center gap-2 hover:bg-[#042840] transition'
            >
              <ShoppingCart size={16} /> ADD TO CART
            </button>
          </div>

          {/* Product 4 */}
          <div className='bg-white border border-gray-200 rounded-lg p-5 flex flex-col hover:shadow-lg transition'>
            <div className='relative h-48 w-full mb-4 bg-white rounded-md flex items-center justify-center p-2'>
              <Image
                src='/merch/merch_polo_logo.png'
                alt='Premium Executive Polo'
                width={180}
                height={180}
                className='object-contain'
              />
            </div>
            <h3 className='text-center font-bold text-gray-900 mb-2'>
              ErrandHubb
              <br />
              Premium Executive Polo
            </h3>
            <div className='text-xs text-left text-gray-600 mb-4 h-14 flex flex-col justify-center gap-1 pl-2'>
              <p>
                <span className='font-semibold'>Front:</span> Embroidered ERRANDHUBB logo
              </p>
              <p>
                <span className='font-semibold'>Sleeve:</span> Official Partner
              </p>
              <p>
                <span className='font-semibold'>Back:</span> Small logo under collar
              </p>
            </div>
            <div className='text-center font-extrabold text-xl mb-3'>$44.99</div>
            <div className='flex justify-center items-center gap-1 mb-4 text-[#f47a22]'>
              <Star size={14} fill='currentColor' />
              <Star size={14} fill='currentColor' />
              <Star size={14} fill='currentColor' />
              <Star size={14} fill='currentColor' />
              <Star size={14} fill='currentColor' />
              <span className='text-xs text-gray-500 ml-1'>(4.9/5)</span>
            </div>
            <button
              onClick={() => handleAddToCart('Premium Executive Polo')}
              className='mt-auto w-full bg-[#063b5c] text-white py-2 rounded font-bold flex items-center justify-center gap-2 hover:bg-[#042840] transition'
            >
              <ShoppingCart size={16} /> ADD TO CART
            </button>
          </div>

          {/* Bundle */}
          <div className='bg-white border-2 border-[#f47a22] rounded-lg p-5 flex flex-col relative shadow-md hover:shadow-xl transition'>
            <div className='absolute top-0 right-0 bg-[#f47a22] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-sm z-10'>
              SAVE 20%
            </div>
            <h3 className='bg-[#f47a22] text-white text-center font-bold py-2 -mt-5 -mx-5 mb-4 rounded-t-sm uppercase tracking-wider'>
              Driver Bundle
            </h3>

            <div className='relative h-40 w-full mb-4 bg-white rounded-md flex items-center justify-center p-2 mix-blend-multiply'>
              <Image
                src='/merch/merch_bundle_logo.png'
                alt='Driver Bundle'
                width={200}
                height={160}
                className='object-contain'
              />
            </div>

            <ul className='text-sm font-semibold text-gray-800 mb-6 space-y-2 flex-grow pl-2'>
              <li className='flex items-center gap-2'>
                <span className='text-[#f47a22]'>✓</span> 2 T-Shirts
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-[#f47a22]'>✓</span> 1 Polo Shirt
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-[#f47a22]'>✓</span> ErrandHubb Hat
              </li>
            </ul>

            <div className='text-center mb-4'>
              <p className='text-gray-600 text-sm font-semibold mb-1'>Bundle Price:</p>
              <p className='text-3xl font-extrabold text-[#f47a22]'>$79.99</p>
            </div>

            <button
              onClick={() => handleAddToCart('Driver Bundle')}
              className='mt-auto w-full bg-[#f47a22] text-white py-3 rounded font-bold uppercase tracking-wider hover:bg-[#d66519] transition'
            >
              GET BUNDLE
            </button>
          </div>
        </div>
      </section>

      {/* Why Wear */}
      <section className='bg-gray-50 py-16 md:py-24 border-y border-gray-200'>
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <h2 className='text-2xl md:text-3xl font-bold text-center text-[#063b5c] uppercase tracking-wide mb-12'>
            Why Wear ErrandHubb Apparel?
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center'>
            <div className='flex flex-col items-center'>
              <div className='mb-4 text-[#063b5c]'>
                <Handshake size={64} strokeWidth={1.5} />
              </div>
              <h3 className='text-lg font-bold text-gray-900 mb-2'>Build Customer Trust</h3>
              <p className='text-sm text-gray-600'>
                Look professional and build instant credibility.
              </p>
            </div>

            <div className='flex flex-col items-center'>
              <div className='mb-4 text-[#063b5c]'>
                <UserCheck size={64} strokeWidth={1.5} />
              </div>
              <h3 className='text-lg font-bold text-gray-900 mb-2'>Look Professional</h3>
              <p className='text-sm text-gray-600'>
                Stand out and represent the ErrandHubb brand with pride.
              </p>
            </div>

            <div className='flex flex-col items-center'>
              <div className='mb-4 text-[#063b5c]'>
                <Megaphone size={64} strokeWidth={1.5} />
              </div>
              <h3 className='text-lg font-bold text-gray-900 mb-2'>Promote Your Business</h3>
              <p className='text-sm text-gray-600'>
                Turn every errand into a marketing opportunity.
              </p>
            </div>

            <div className='flex flex-col items-center'>
              <div className='mb-4 text-[#063b5c]'>
                <Users size={64} strokeWidth={1.5} />
              </div>
              <h3 className='text-lg font-bold text-gray-900 mb-2'>Join the Community</h3>
              <p className='text-sm text-gray-600'>
                Be part of a growing network of drivers and partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className='py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12'>
        <h2 className='text-2xl md:text-3xl font-bold text-center text-[#063b5c] uppercase tracking-wide mb-12'>
          What Our Community Says
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Review 1 */}
          <div className='bg-white border border-gray-200 rounded-lg p-8 relative flex flex-col items-center text-center shadow-sm'>
            <Quote className='absolute top-4 left-4 text-[#f47a22] opacity-20' size={48} />
            <div className='flex justify-center items-center gap-1 mb-4 text-[#f47a22]'>
              <Star size={18} fill='currentColor' />
              <Star size={18} fill='currentColor' />
              <Star size={18} fill='currentColor' />
              <Star size={18} fill='currentColor' />
              <Star size={18} fill='currentColor' />
            </div>
            <p className='text-gray-800 font-medium italic mb-6'>
              "Customers recognize me instantly. The polo looks extremely professional."
            </p>
            <div className='mt-auto'>
              <p className='font-bold text-gray-900'>- Marcus D.</p>
              <p className='text-sm text-gray-500 italic'>Errander</p>
            </div>
            <Quote
              className='absolute bottom-4 right-4 text-[#f47a22] opacity-20 rotate-180'
              size={48}
            />
          </div>

          {/* Review 2 */}
          <div className='bg-white border border-gray-200 rounded-lg p-8 relative flex flex-col items-center text-center shadow-sm'>
            <Quote className='absolute top-4 left-4 text-[#f47a22] opacity-20' size={48} />
            <div className='flex justify-center items-center gap-1 mb-4 text-[#f47a22]'>
              <Star size={18} fill='currentColor' />
              <Star size={18} fill='currentColor' />
              <Star size={18} fill='currentColor' />
              <Star size={18} fill='currentColor' />
              <Star size={18} fill='currentColor' />
            </div>
            <p className='text-gray-800 font-medium italic mb-6'>
              "Comfortable shirts and great quality. Highly recommend!"
            </p>
            <div className='mt-auto'>
              <p className='font-bold text-gray-900'>- Tasha K.</p>
              <p className='text-sm text-gray-500 italic'>Errander</p>
            </div>
            <Quote
              className='absolute bottom-4 right-4 text-[#f47a22] opacity-20 rotate-180'
              size={48}
            />
          </div>

          {/* Review 3 */}
          <div className='bg-white border border-gray-200 rounded-lg p-8 relative flex flex-col items-center text-center shadow-sm'>
            <Quote className='absolute top-4 left-4 text-[#f47a22] opacity-20' size={48} />
            <div className='flex justify-center items-center gap-1 mb-4 text-[#f47a22]'>
              <Star size={18} fill='currentColor' />
              <Star size={18} fill='currentColor' />
              <Star size={18} fill='currentColor' />
              <Star size={18} fill='currentColor' />
              <Star size={18} fill='currentColor' />
            </div>
            <p className='text-gray-800 font-medium italic mb-6'>
              "The branding helped me get repeat customers. It works!"
            </p>
            <div className='mt-auto'>
              <p className='font-bold text-gray-900'>- James R.</p>
              <p className='text-sm text-gray-500 italic'>Errander</p>
            </div>
            <Quote
              className='absolute bottom-4 right-4 text-[#f47a22] opacity-20 rotate-180'
              size={48}
            />
          </div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className='bg-[#063b5c] text-white py-8 text-center'>
        <p className='text-sm opacity-80'>
          © {new Date().getFullYear()} ErrandHubb Merchandise. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
