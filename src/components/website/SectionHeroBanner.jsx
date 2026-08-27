const SectionHeroBanner = ({ title, subtitle }) => {
  return (
    <section className='w-full sticky top-12 z-40 bg-[#f47c20] py-5' style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <div className='mx-auto max-w-385 px-4 text-center'>
        <h1 className='text-white font-extrabold text-4xl leading-tight' style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          {title}
        </h1>
        <p className='text-white/95 text-sm mt-1.5'>{subtitle}</p>
      </div>
    </section>
  );
};

export default SectionHeroBanner;
