import AudioPlayer from "@/components/shared/AudioPlayer";

const AboutPage = () => {
  return (
    <div className='w-full max-w-385 mx-auto bg-white font-sans px-6 py-8 md:py-10'>
      {/* Alignment container matching Header Nav items */}
      <div className='md:ml-62.5'>
        {/* ── About Us Heading ── */}
        <div className='mb-1'>
          <h1 className='text-4xl font-extrabold pb-2 text-secondary tracking-tight'>
            About Us
          </h1>
          {/* Orange full-width underline */}
          <div className='mt-2 h-0.75 w-full bg-primary' />
        </div>

        {/* ── Body Paragraphs ── */}
        <div className='mt-6 space-y-4 pt-3 text-[15px] font-normal text-foreground leading-relaxed'>
          <p>
            Welcome to <span className='font-bold'>ErrandHubb</span> — your go-to
            platform for connecting people who need errands done with reliable,
            local errand runners in their community.
          </p>
          <p>
            We understand that life gets busy. Whether it is picking up groceries,
            dropping off a package, waiting in line, or handling any number of
            everyday tasks, there are times when you simply can not do it all
            yourself. That is where ErrandHubb comes in.
          </p>
          <p>
            Our platform allows you to quickly find a trusted local ErrandR — our
            term for our errand professionals — who can take care of your tasks
            promptly and efficiently. At the same time, we provide ErrandR is with
            a platform to market their services and grow their client base.
          </p>
          <p>
            At ErrandHubb, we believe in community. We are not just a task
            marketplace — we are a movement toward helping neighbors help
            neighbors. Our mission is to make everyday life a little easier for
            everyone by creating meaningful local connections.
          </p>
          <p>
            Whether you are a busy professional, a parent managing a household, a
            senior who needs a helping hand, or simply someone who values
            their time — ErrandHubb was built for you.
          </p>
          <p>
            Our platform is simple, safe, and straightforward. Post an errand,
            find an ErrandR, get it done. It really is that easy.
          </p>
          <p>
            Thank you for being a part of the ErrandHubb community. We look
            forward to helping you — and your neighbors — every single day.
          </p>
        </div>

        {/* ── ErrandR Definition Box & Audio Overview ── */}
        <div className='mt-10 flex flex-col md:flex-row items-start md:items-center gap-6'>
          <div className='bg-surface-dim border-l-4 border-primary px-5 py-4 w-full max-w-sm rounded-r-xl'>
            <p className='text-base font-extrabold text-secondary leading-tight'>
              ErrandR
            </p>
            <p className='text-xs text-text-secondary italic mt-0.5'>noun</p>
            <p className='text-sm text-foreground mt-2'>
              Find local errand runners fast.
            </p>
          </div>
          <div className='flex items-center gap-4 mt-4 md:mt-0'>
            <img 
              src='/ABOUT LADY.png' 
              alt='About ErrandR' 
              className='h-32 object-contain shadow-md rounded-lg'
            />
            <AudioPlayer src='/ABOUT FILE.mp3' label='Audio Overview' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
