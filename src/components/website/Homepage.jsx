import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo2.svg";

const Homepage = () => {
  return (
    <section className='w-full flex flex-1 flex-col justify-center items-center bg-white font-sans antialiased py-10'>
      {/* Logo Section */}
      <div className='flex px-8 md:px-0 flex-col items-center mb-10'>
        <Image
          src={logo}
          alt='ErrandHubb Logo'
          width={610}
          height={104}
          priority
        />
      </div>

      {/* Action Buttons */}
      <div className='flex flex-col items-center gap-4 w-full max-w-md px-4'>
        {/* Top row */}
        <div className='flex flex-col sm:flex-row gap-4 w-full justify-center'>
          <Link
            href='/errand'
            className='relative z-10 bg-primary whitespace-nowrap text-white font-extrabold py-3 px-6 rounded-md uppercase tracking-widest text-sm transition-all duration-200 shadow-sm w-full sm:w-auto text-center hover:-translate-y-[3px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] active:-translate-y-[1px] active:shadow-[0_5px_10px_rgba(0,0,0,0.2)] after:content-[""] after:absolute after:inset-0 after:w-full after:h-full after:-z-10 after:bg-primary after:rounded-md after:transition-all after:duration-500 hover:after:scale-x-[1.4] hover:after:scale-y-[1.6] hover:after:opacity-0'>
            Become an Errandr
          </Link>

          <Link
            href='/search'
            className='relative z-10 bg-primary whitespace-nowrap text-white font-extrabold py-3 px-6 rounded-md uppercase tracking-widest text-sm transition-all duration-200 shadow-sm w-full sm:w-auto text-center hover:-translate-y-[3px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] active:-translate-y-[1px] active:shadow-[0_5px_10px_rgba(0,0,0,0.2)] after:content-[""] after:absolute after:inset-0 after:w-full after:h-full after:-z-10 after:bg-primary after:rounded-md after:transition-all after:duration-500 hover:after:scale-x-[1.4] hover:after:scale-y-[1.6] hover:after:opacity-0'>
            Search For
            <br className='sm:hidden' /> Errandr
          </Link>
        </div>

        {/* Bottom centered button */}
        <Link
          href='/post-errand'
          className='relative z-10 bg-primary text-white font-extrabold py-3 px-6 rounded-md uppercase tracking-widest text-sm transition-all duration-200 shadow-sm w-full sm:w-auto text-center hover:-translate-y-[3px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] active:-translate-y-[1px] active:shadow-[0_5px_10px_rgba(0,0,0,0.2)] after:content-[""] after:absolute after:inset-0 after:w-full after:h-full after:-z-10 after:bg-primary after:rounded-md after:transition-all after:duration-500 hover:after:scale-x-[1.4] hover:after:scale-y-[1.6] hover:after:opacity-0'>
          Post An Errand
        </Link>
      </div>
    </section>
  );
};

export default Homepage;
