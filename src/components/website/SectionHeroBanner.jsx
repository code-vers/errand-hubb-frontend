const SectionHeroBanner = ({ title, subtitle, className = "" }) => {
  return (
    <section className={`w-full bg-slate-50/90 border-b border-slate-200/80 py-8 ${className}`}>
      <div className='mx-auto max-w-385 px-4 text-center'>
        <h1 className='text-slate-900 font-extrabold text-3xl md:text-4xl leading-tight tracking-tight'>
          {title}
        </h1>
        {subtitle && (
          <p className='text-slate-600 text-sm md:text-base mt-2 max-w-3xl mx-auto font-medium leading-relaxed'>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default SectionHeroBanner;

