const InvestorRelationsPage = () => {
  return (
    <section className='min-h-[80vh] bg-[#f8f5ef] py-16 md:py-24'>
      <div className='mx-auto w-full max-w-6xl px-4 md:px-6'>
        <div className='grid gap-10 rounded-4xl bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.12)] md:p-12 lg:grid-cols-[1.1fr,0.9fr]'>
          <div className='relative flex flex-col justify-center'>
            <div className='inline-flex items-center rounded-full border border-[#D7C8B2] bg-[#FEF7EE] px-4 py-2 text-[11px] uppercase tracking-[0.45em] text-[#5B4C3C]'>
              Investor Relations
            </div>

            <div className='mt-8 space-y-6'>
              <p className='text-[11px] uppercase tracking-[0.5em] text-[#6B5C4D]'>Serious Inquiries Only</p>

              <div className='space-y-4'>
                <h1 className='text-3xl font-black uppercase leading-tight tracking-tight text-[#1F1810] sm:text-4xl'>
                  Blue Horseshoe Loves Anacott Steel S-Corp
                </h1>
                <p className='text-xl font-semibold uppercase tracking-[0.2em] text-[#322919]'>Holdings Corporation</p>
              </div>

              <div className='space-y-4 text-sm leading-relaxed text-[#4C443A] sm:text-base'>
                <p>
                  “What an exciting time and opportunity to become part of ErrandHubb.
                </p>
                <p>
                  We are currently seeking investors interested in equity ownership
                  opportunities in a rapidly growing company focused on transforming
                  the errand and task marketplace.”
                </p>
              </div>

              <div className='space-y-4'>
                <div className='rounded-3xl border border-[#E6D7C4] bg-[#FBF4EB] p-6'>
                  <p className='text-[11px] uppercase tracking-[0.45em] text-[#7A6A57]'>2030 Estimated Annual Revenue:</p>
                  <p className='mt-2 text-3xl font-black text-[#1F1810]'>$6.2M</p>
                </div>

                <div className='rounded-3xl border border-[#E6D7C4] bg-[#FBF4EB] p-6'>
                  <p className='text-[11px] uppercase tracking-[0.45em] text-[#7A6A57]'>Long-Term Revenue Projection</p>
                  <p className='mt-2 text-3xl font-black text-[#1F1810]'>2033: $60M+ Annually</p>
                </div>
              </div>

              <p className='text-sm italic leading-relaxed text-[#4C443A]'>
                Request our Private Placement Memorandum (PPM) for additional details.
              </p>

              <div className='rounded-3xl border border-[#E8D7C2] bg-[#FFF9F2] p-6 text-[#372F26]'>
                <p className='text-lg font-semibold'>Graeme X Barrington</p>
                <p className='mt-1 text-sm uppercase tracking-[0.3em] text-[#6B5C4D]'>President & Founder</p>
                <p className='mt-3 text-sm font-semibold'>ErrandHubb</p>
                <p className='mt-1 text-sm'>1-844-377-2632</p>
              </div>

              <div className='rounded-3xl border border-[#E8D7C2] bg-[#FFF9F2] p-6'>
                <p className='text-[10px] uppercase tracking-[0.4em] text-[#7A6A57]'>Contact Us</p>
                <p className='mt-3 text-xl font-black tracking-tight text-[#1F1810]'>WWW.ERRANDHUBB.COM</p>
              </div>
            </div>
          </div>

          <div className='flex items-center justify-center overflow-hidden rounded-[28px] bg-[#F0E6D9]'>
            <div className='flex h-full w-full items-center justify-center p-10 text-center'>
              <div className='max-w-sm'>
                <p className='text-sm font-semibold uppercase tracking-[0.45em] text-[#6B5C4D]'>Investor Brief</p>
                <p className='mt-6 text-base leading-relaxed text-[#4C443A]'>
                  This page is reserved for investor relations inquiries only. The content
                  and numbers shown here are intended to reflect the look and style of the
                  requested investor information page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorRelationsPage;
