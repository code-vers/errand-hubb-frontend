"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ArrowLeft } from "lucide-react";
import Link from "next/link";

const MORE_GALLERY_ITEMS = [
  { src: "/gallary/gallary.png", alt: "Errand helper serving a senior" },
  { src: "/gallary/gallary2.png", alt: "Errand helper greeting a client" },
  { src: "/gallary/gallery3.png", alt: "Errand helper walking on the street" },
  { src: "/gallary/gallery4.png", alt: "Errand helper at customer doorway" },
  { src: "/gallary/gallery5.png", alt: "Errand helper handing documents" },
  { src: "/gallary/gallery6.png", alt: "Errand helper installing a device" },
  { src: "/gallary/gallery7.png", alt: "Errand helper delivering grocery bag" },
  { src: "/gallary/gallery8.png", alt: "Errand helper unpacking dishes" },
  { src: "/gallary/gallery9.png", alt: "Moving and kitchen utensils box" },
  { src: "/gallary/Container (7).png", alt: "Handyman repairing sink" },
  { src: "/gallary/Container (8).png", alt: "Errand helper reviewing paperwork" },
  { src: "/gallary/gallary.png", alt: "Errand helper serving a senior" },
  { src: "/gallary/gallary2.png", alt: "Errand helper greeting a client" },
  { src: "/gallary/gallery3.png", alt: "Errand helper walking on the street" },
  { src: "/gallary/gallery4.png", alt: "Errand helper at customer doorway" },
  { src: "/gallary/gallery5.png", alt: "Errand helper handing documents" },
  { src: "/gallary/gallery6.png", alt: "Errand helper installing a device" },
];

const MoreGallery = () => {
  const [selectedImage, setSelectedImage] = useState<null | {
    src: string;
    alt: string;
  }>(null);

  return (
    <section className='w-full py-12'>
      <div className='mx-auto w-full max-w-6xl px-6'>
        <div className="mb-8">
            <Link href="/gallery" className="inline-flex items-center text-primary hover:underline font-medium">
                <ArrowLeft size={20} className="mr-2" />
                Back to Gallery
            </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">More Errand Memories</h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {MORE_GALLERY_ITEMS.map((item, index) => (
            <div
              key={index}
              className='relative aspect-square overflow-hidden rounded-xl bg-gray-100 cursor-pointer transition-transform hover:scale-[1.03]'
              onClick={() => setSelectedImage(item)}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className='object-cover'
                sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
              />
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 transition-opacity'
          onClick={() => setSelectedImage(null)}>
          <div
            className='relative max-w-5xl w-full h-[80vh]'
            onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className='absolute -top-12 right-0 text-white hover:text-primary transition-colors'>
              <X size={32} />
            </button>
            <div className='relative w-full h-full overflow-hidden rounded-lg'>
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className='object-contain'
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MoreGallery;
