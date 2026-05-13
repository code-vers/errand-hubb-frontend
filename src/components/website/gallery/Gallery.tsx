import Image from "next/image";

const Gallery = () => {
  const GALLERY_ITEMS = [
    {
      src: "/gallary/gallary.png",
      alt: "Errand helper serving a senior",
      h: "h-[170px]",
    },
    {
      src: "/gallary/gallary2.png",
      alt: "Errand helper greeting a client",
      h: "h-[170px]",
    },
    {
      src: "/gallary/gallery3.png",
      alt: "Errand helper walking on the street",
      h: "h-[170px]",
    },
    {
      src: "/gallary/gallery4.png",
      alt: "Errand helper at customer doorway",
      h: "h-[170px]",
    },
    {
      src: "/gallary/gallery5.png",
      alt: "Errand helper handing documents",
      h: "h-[170px]",
    },
    {
      src: "/gallary/gallery6.png",
      alt: "Errand helper installing a device",
      h: "h-[170px]",
    },
    {
      src: "/gallary/gallery7.png",
      alt: "Errand helper delivering grocery bag",
      h: "h-[170px]",
    },
    {
      src: "/gallary/gallery8.png",
      alt: "Errand helper unpacking dishes",
      h: "h-[170px]",
    },
    {
      src: "/gallary/gallery9.png",
      alt: "Moving and kitchen utensils box",
      h: "h-[190px]",
    },
    {
      src: "/gallary/Container (7).png",
      alt: "Handyman repairing sink",
      h: "h-[245px]",
    },
    {
      src: "/gallary/Container (8).png",
      alt: "Errand helper reviewing paperwork",
      h: "h-[190px]",
    },
  ];
  return (
    <section className='w-full  min-h-full pt-6 my-auto pb-10'>
      <div className='mx-auto w-full max-w-295 px-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-start'>
          {GALLERY_ITEMS.map((item, idx) => (
            <article
              key={`${item.src}-${idx}`}
              className={`relative overflow-hidden rounded-xl bg-white ${item.h}`}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                className='object-cover'
              />
            </article>
          ))}
        </div>

        <div className='mt-10 flex justify-center'>
          <button
            type='button'
            className='h-11 min-w-45 rounded-md bg-primary px-6 text-xs font-extrabold uppercase tracking-wider text-white transition-colors hover:bg-primary-dark'>
            See More Images
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
