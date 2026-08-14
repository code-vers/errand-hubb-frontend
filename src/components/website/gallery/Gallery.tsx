"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";

const GALLERY_ITEMS = [
  { src: "/gallary/img/COOK_AND_CARE.png", alt: "Cook and Care" },
  { src: "/gallary/img/Cleaning_assistance.png", alt: "Cleaning Assistance" },
  { src: "/gallary/img/DAILY_VISITOR.png", alt: "Daily Visitor" },
  { src: "/gallary/img/DOG_WALKING.png", alt: "Dog Walking" },
  { src: "/gallary/img/DRY_CLEANING_.png", alt: "Dry Cleaning" },
  { src: "/gallary/img/ELDER_COMPANIONSHIP.png", alt: "Elder Companionship" },
  { src: "/gallary/img/ELECTRICAL_PROS.png", alt: "Electrical Pros" },
  { src: "/gallary/img/Errand_Helper.png", alt: "Errand Helper" },
  { src: "/gallary/img/FOOD_DELIVERY.png", alt: "Food Delivery" },
  { src: "/gallary/img/Family_support_member.png", alt: "Family Support Member" },
  { src: "/gallary/img/House_Worker.png", alt: "House Worker" },
  { src: "/gallary/img/Office_Professional_help.png", alt: "Office Professional Help" },
  { src: "/gallary/img/Office_assistance.png", alt: "Office Assistance" },
  { src: "/gallary/img/PACKAGE_DELIVERY.png", alt: "Package Delivery" },
  { src: "/gallary/img/PERSONAL_DRIVER.png", alt: "Personal Driver" },
  { src: "/gallary/img/PLUMBING_PROFESSIONALS.png", alt: "Plumbing Professionals" },
  { src: "/gallary/img/Partnership_assistance.png", alt: "Partnership Assistance" },
  { src: "/gallary/img/Personal_Cook_Chef.png", alt: "Personal Cook Chef" },
  { src: "/gallary/img/Personal_Driver_for_Client.png", alt: "Personal Driver for Client" },
  { src: "/gallary/img/Personal_machanic.png", alt: "Personal Mechanic" },
  { src: "/gallary/img/Professional_Help.png", alt: "Professional Help" },
  { src: "/gallary/img/Teen_Helper_assistant.png", alt: "Teen Helper Assistant" },
  { src: "/gallary/img/Teen_homeowner_helper.png", alt: "Teen Homeowner Helper" },
  { src: "/gallary/img/Teen_yard_work.png", alt: "Teen Yard Work" },
  { src: "/gallary/img/WHITE_COLLAR_PROS.png", alt: "White Collar Pros" },
  { src: "/gallary/img/errandhubb_homework_image_2.png", alt: "Homework Assistance" },
  { src: "/gallary/img/magnific_a-black-woman-with-short-_ubosYXxQLD.png", alt: "Community Service Helper" },
  { src: "/gallary/gallary-2/BUSY PROFESSIONAL.jpg", alt: "Busy Professional Help" },
  { src: "/gallary/gallary-2/COLLEGE STUDENT JOINING.png", alt: "College Student Errandr" },
  { src: "/gallary/gallary-2/CUSTOMER PLACING ORDER 2.png", alt: "Easy Order Booking" },
  { src: "/gallary/gallary-2/ERRANDHUBB STAFF 2.png", alt: "ErrandHubb Staff" },
  { src: "/gallary/gallary-2/ERRANDHUBB STAFF 3.jpg", alt: "On-Demand Team" },
  { src: "/gallary/gallary-2/ERRANDHUBB STAFF MEMBER.png", alt: "Dedicated Errandr" },
  { src: "/gallary/gallary-2/ERRANDWORKER ACCEPTING JOB.png", alt: "Instant Job Matching" },
  { src: "/gallary/gallary-2/GETTING GASOLINE.png", alt: "Gasoline Refill Errand" },
  { src: "/gallary/gallary-2/GROCERY SHOPPING.png", alt: "Grocery Shopping & Delivery" },
  { src: "/gallary/gallary-2/HAPPY CUSTOMER.png", alt: "Satisfied Client" },
  { src: "/gallary/gallary-2/HELPER WITH SENIOR.png", alt: "Senior Care & Helper" },
  { src: "/gallary/gallary-2/LAUNDRY 3.png", alt: "Laundry Service" },
  { src: "/gallary/gallary-2/LAUNDRY WORKER 2.png", alt: "Professional Wash & Fold" },
  { src: "/gallary/gallary-2/PRESCRIPTION PICK UP.png", alt: "Prescription Pickup" },
  { src: "/gallary/gallary-2/TUTOR.png", alt: "Home Tutoring Helper" },
  { src: "/gallary/gallary-2/WALKING DOG.png", alt: "Dog Walking & Pet Care" },
];

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Prevent background body scroll when lightbox modal is open on Android / mobile
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev === 0 ? GALLERY_ITEMS.length - 1 : (prev ?? 0) - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev === GALLERY_ITEMS.length - 1 ? 0 : (prev ?? 0) + 1));
    }
  };

  const selectedItem = selectedIndex !== null ? GALLERY_ITEMS[selectedIndex] : null;

  return (
    <section className='w-full mt-6 sm:mt-10 pb-12'>
      <div className='mx-auto w-full max-w-6xl px-4 sm:px-6'>
        {/* ── Responsive Mosaic Grid ── */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[150px] sm:auto-rows-[170px] lg:auto-rows-[190px]'>
          {GALLERY_ITEMS.map((item, i) => {
            const isTall = i % 7 === 1 || i % 7 === 4;
            return (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl bg-gray-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 transform active:scale-[0.98] ${
                  isTall ? "row-span-2" : ""
                }`}
                onClick={() => setSelectedIndex(i)}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className='object-cover group-hover:scale-105 transition-transform duration-500'
                  sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
                />
                
                {/* Service title overlay gradient for Android and desktop */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity' />

                <div className='absolute bottom-0 inset-x-0 p-2.5 sm:p-3.5 flex items-end justify-between gap-1'>
                  <span className='text-white font-bold text-xs sm:text-sm drop-shadow-md line-clamp-1 leading-tight'>
                    {item.alt}
                  </span>
                  <span className='shrink-0 p-1 rounded-full bg-white/20 text-white backdrop-blur-sm group-hover:bg-primary transition-colors'>
                    <Maximize2 className='w-3 h-3 sm:w-3.5 sm:h-3.5' />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className='mt-8 flex flex-col items-start gap-4 rounded-2xl bg-white px-2 py-3 sm:mt-10 sm:px-5 lg:ml-auto lg:max-w-[52%]'>
          <p className='max-w-md text-[15px] font-medium italic leading-[1.28] text-black sm:text-[17px]'>
            This wide-ranging collection of AI-generated images is for
            illustrative purposes only and represents examples of the many
            types of errands and services that Clients may request and
            Erranders may perform through ErrandHubb.
          </p>
          <Image
            src='/gallary/ai-generated-badge.png'
            alt='AI-generated image notice'
            width={1254}
            height={1254}
            className='h-16 w-16 object-contain sm:h-18 sm:w-18'
          />
        </div>

        {/* ── See More Button ── */}
        <div className='mt-10 sm:mt-12 flex justify-center'>
          <Link
            href='/gallery/more'
            className='flex items-center justify-center h-12 min-w-[200px] rounded-xl bg-primary px-8 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg active:scale-95'>
            See More Images
          </Link>
        </div>
      </div>

      {/* ── Mobile & Touch Responsive Image Modal Lightbox ── */}
      {selectedItem && selectedIndex !== null && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200 select-none'
          onClick={() => setSelectedIndex(null)}>
          
          {/* Close button - safe for Android notches and touch target */}
          <button
            onClick={() => setSelectedIndex(null)}
            className='absolute top-4 right-4 z-50 p-3 rounded-full bg-black/60 text-white hover:bg-primary border border-white/20 shadow-2xl transition-all active:scale-90 cursor-pointer'
            aria-label='Close modal'>
            <X className='w-6 h-6' />
          </button>

          {/* Navigation Previous Button */}
          <button
            onClick={handlePrev}
            className='absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3.5 rounded-full bg-black/60 text-white hover:bg-primary border border-white/20 shadow-2xl transition-all active:scale-90 cursor-pointer'
            aria-label='Previous image'>
            <ChevronLeft className='w-6 h-6' />
          </button>

          {/* Navigation Next Button */}
          <button
            onClick={handleNext}
            className='absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3.5 rounded-full bg-black/60 text-white hover:bg-primary border border-white/20 shadow-2xl transition-all active:scale-90 cursor-pointer'
            aria-label='Next image'>
            <ChevronRight className='w-6 h-6' />
          </button>

          {/* Main Modal Image Container */}
          <div
            className='relative w-full max-w-4xl max-h-[85vh] h-[70vh] sm:h-[80vh] flex flex-col items-center justify-center'
            onClick={(e) => e.stopPropagation()}>
            <div className='relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-black/40 border border-white/10'>
              <Image
                src={selectedItem.src}
                alt={selectedItem.alt}
                fill
                className='object-contain p-2 sm:p-4'
                priority
                sizes='(max-width: 768px) 100vw, 80vw'
              />
              
              {/* Service Demonstration Caption Banner */}
              <div className='absolute bottom-3 inset-x-3 sm:bottom-5 sm:inset-x-5 bg-black/75 backdrop-blur-md px-4 py-2.5 sm:py-3 rounded-xl border border-white/15 text-center shadow-xl'>
                <p className='text-white font-extrabold text-sm sm:text-base tracking-wide'>
                  {selectedItem.alt}
                </p>
                <p className='text-white/70 text-xs mt-0.5 hidden sm:block'>
                  ErrandHubb On-Demand Service • Image {selectedIndex + 1} of {GALLERY_ITEMS.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
