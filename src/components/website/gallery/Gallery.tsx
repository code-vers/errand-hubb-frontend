"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

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
  { src: "/gallary/img/Personal_machanic.png", alt: "Personal Machanic" },
  { src: "/gallary/img/Professional_Help.png", alt: "Professional Help" },
  { src: "/gallary/img/Teen_Helper_assistant.png", alt: "Teen Helper Assistant" },
  { src: "/gallary/img/Teen_homeowner_helper.png", alt: "Teen Homeowner Helper" },
  { src: "/gallary/img/Teen_yard_work.png", alt: "Teen Yard Work" },
  { src: "/gallary/img/WHITE_COLLAR_PROS.png", alt: "White Collar Pros" },
  { src: "/gallary/img/errandhubb_homework_image_2.png", alt: "Errandhubb Homework Image 2" },
  { src: "/gallary/img/magnific_a-black-woman-with-short-_ubosYXxQLD.png", alt: "Magnific A Black Woman" },
  { src: "/gallary/gallary-2/BUSY PROFESSIONAL.jpg", alt: "Busy Professional" },
  { src: "/gallary/gallary-2/COLLEGE STUDENT JOINING.png", alt: "College Student Joining" },
  { src: "/gallary/gallary-2/CUSTOMER PLACING ORDER 2.png", alt: "Customer Placing Order 2" },
  { src: "/gallary/gallary-2/ERRANDHUBB STAFF 2.png", alt: "Errandhubb Staff 2" },
  { src: "/gallary/gallary-2/ERRANDHUBB STAFF 3.jpg", alt: "Errandhubb Staff 3" },
  { src: "/gallary/gallary-2/ERRANDHUBB STAFF MEMBER.png", alt: "Errandhubb Staff Member" },
  { src: "/gallary/gallary-2/ERRANDWORKER ACCEPTING JOB.png", alt: "Errandworker Accepting Job" },
  { src: "/gallary/gallary-2/GETTING GASOLINE.png", alt: "Getting Gasoline" },
  { src: "/gallary/gallary-2/GROCERY SHOPPING.png", alt: "Grocery Shopping" },
  { src: "/gallary/gallary-2/HAPPY CUSTOMER.png", alt: "Happy Customer" },
  { src: "/gallary/gallary-2/HELPER WITH SENIOR.png", alt: "Helper With Senior" },
  { src: "/gallary/gallary-2/LAUNDRY 3.png", alt: "Laundry 3" },
  { src: "/gallary/gallary-2/LAUNDRY WORKER 2.png", alt: "Laundry Worker 2" },
  { src: "/gallary/gallary-2/PRESCRIPTION PICK UP.png", alt: "Prescription Pick Up" },
  { src: "/gallary/gallary-2/TUTOR.png", alt: "Tutor" },
  { src: "/gallary/gallary-2/WALKING DOG.png", alt: "Walking Dog" },
];

/**
 * Mosaic layout — mirrors the image exactly:
 *
 * Row 1 (4 cols):  [1 normal] [1 tall row-span-2] [1 normal] [1 normal]
 * Row 2 (4 cols):  [1 normal] {tall continues}    [1 normal] [1 normal]   ← col-2 is rowspan-2 above
 * Row 3 (4 cols):  [1 normal] [1 normal]          [1 normal] [1 tall row-span-2]
 * Row 4 (1 col):               [1 normal]                    {tall continues}
 *
 * We use a CSS grid with auto rows and explicit span classes.
 */

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<null | {
    src: string;
    alt: string;
  }>(null);

  return (
    <section className='w-full mt-12 pb-10'>
      <div className='mx-auto w-full max-w-6xl px-6'>
        {/* ── Mosaic Grid ── */}
        <div
          className='grid gap-3'
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "160px",
          }}>
          {GALLERY_ITEMS.map((item, i) => {
            const isTall = i % 12 === 1 || i % 12 === 8 || i % 12 === 10;
            return (
              <div
                key={i}
                className='relative overflow-hidden rounded-xl bg-gray-100 cursor-pointer transition-transform hover:scale-[1.02]'
                style={isTall ? { gridRow: "span 2" } : undefined}
                onClick={() => setSelectedImage(item)}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className='object-cover'
                  sizes='25vw'
                />
              </div>
            );
          })}
        </div>

        {/* ── See More Button ── */}
        <div className='mt-10 flex justify-center'>
          <Link
            href='/gallery/more'
            className='flex items-center justify-center h-11 min-w-[180px] rounded-md bg-primary px-6 text-xs font-extrabold uppercase tracking-wider text-white transition-colors hover:bg-primary-dark'>
            See More Images
          </Link>
        </div>
      </div>

      {/* ── Image Modal ── */}
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

export default Gallery;
