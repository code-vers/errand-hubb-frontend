import Image from "next/image";

const GALLERY_ITEMS = [
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
  {
    src: "/gallary/Container (8).png",
    alt: "Errand helper reviewing paperwork",
  },
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
          {/* 1 — normal */}
          <div className='relative overflow-hidden rounded-xl bg-gray-100'>
            <Image
              src={GALLERY_ITEMS[0].src}
              alt={GALLERY_ITEMS[0].alt}
              fill
              className='object-cover'
              sizes='25vw'
            />
          </div>

          {/* 2 — tall (row-span-2), col 2 */}
          <div
            className='relative overflow-hidden rounded-xl bg-gray-100'
            style={{ gridRow: "span 2" }}>
            <Image
              src={GALLERY_ITEMS[1].src}
              alt={GALLERY_ITEMS[1].alt}
              fill
              className='object-cover'
              sizes='25vw'
            />
          </div>

          {/* 3 — normal */}
          <div className='relative overflow-hidden rounded-xl bg-gray-100'>
            <Image
              src={GALLERY_ITEMS[2].src}
              alt={GALLERY_ITEMS[2].alt}
              fill
              className='object-cover'
              sizes='25vw'
            />
          </div>

          {/* 4 — normal */}
          <div className='relative overflow-hidden rounded-xl bg-gray-100'>
            <Image
              src={GALLERY_ITEMS[3].src}
              alt={GALLERY_ITEMS[3].alt}
              fill
              className='object-cover'
              sizes='25vw'
            />
          </div>

          {/* 5 — normal (row 2, col 1) */}
          <div className='relative overflow-hidden rounded-xl bg-gray-100'>
            <Image
              src={GALLERY_ITEMS[4].src}
              alt={GALLERY_ITEMS[4].alt}
              fill
              className='object-cover'
              sizes='25vw'
            />
          </div>

          {/* col 2 is still occupied by item 2 (row-span-2) */}

          {/* 6 — normal (row 2, col 3) */}
          <div className='relative overflow-hidden rounded-xl bg-gray-100'>
            <Image
              src={GALLERY_ITEMS[5].src}
              alt={GALLERY_ITEMS[5].alt}
              fill
              className='object-cover'
              sizes='25vw'
            />
          </div>

          {/* 7 — normal (row 2, col 4) */}
          <div className='relative overflow-hidden rounded-xl bg-gray-100'>
            <Image
              src={GALLERY_ITEMS[6].src}
              alt={GALLERY_ITEMS[6].alt}
              fill
              className='object-cover'
              sizes='25vw'
            />
          </div>

          {/* 8 — normal (row 3, col 1) */}
          <div className='relative overflow-hidden rounded-xl bg-gray-100'>
            <Image
              src={GALLERY_ITEMS[7].src}
              alt={GALLERY_ITEMS[7].alt}
              fill
              className='object-cover'
              sizes='25vw'
            />
          </div>

          {/* 9 — tall (row-span-2), col 2, row 3 */}
          <div
            className='relative overflow-hidden rounded-xl bg-gray-100'
            style={{ gridRow: "span 2" }}>
            <Image
              src={GALLERY_ITEMS[8].src}
              alt={GALLERY_ITEMS[8].alt}
              fill
              className='object-cover'
              sizes='25vw'
            />
          </div>

          {/* 10 — normal (row 3, col 3) */}
          <div className='relative overflow-hidden rounded-xl bg-gray-100'>
            <Image
              src={GALLERY_ITEMS[9].src}
              alt={GALLERY_ITEMS[9].alt}
              fill
              className='object-cover'
              sizes='25vw'
            />
          </div>

          {/* 11 — tall (row-span-2), col 4, row 3 */}
          <div
            className='relative overflow-hidden rounded-xl bg-gray-100'
            style={{ gridRow: "span 2" }}>
            <Image
              src={GALLERY_ITEMS[10].src}
              alt={GALLERY_ITEMS[10].alt}
              fill
              className='object-cover'
              sizes='25vw'
            />
          </div>

          {/* 12 — filler to complete row 4, col 1 */}
          <div className='relative overflow-hidden rounded-xl bg-gray-100'>
            <Image
              src={GALLERY_ITEMS[0].src}
              alt={GALLERY_ITEMS[0].alt}
              fill
              className='object-cover'
              sizes='25vw'
            />
          </div>

          {/* col 2 occupied by item 9 */}
          {/* col 4 occupied by item 11 */}
        </div>

        {/* ── See More Button ── */}
        <div className='mt-10 flex justify-center'>
          <button
            type='button'
            className='h-11 min-w-[180px] rounded-md bg-primary px-6 text-xs font-extrabold uppercase tracking-wider text-white transition-colors hover:bg-primary-dark'>
            See More Images
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
