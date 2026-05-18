import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.svg";

const Homepage = () => {
  return (
    <section className='w-full flex flex-1 flex-col justify-center items-center bg-white font-sans antialiased py-10'>
      {/* Logo Section */}
      <div className='flex flex-col items-center mb-10'>
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
            href='/errand-registration'
            className='bg-primary  active:scale-95 whitespace-nowrap text-white font-extrabold py-3 px-6 rounded-md uppercase tracking-widest text-sm transition-all duration-200 shadow-sm w-full sm:w-auto'>
            Become an Errandr
          </Link>

          <Link
            href='/search'
            className='bg-primary  active:scale-95 whitespace-nowrap text-white font-extrabold py-3 px-6 rounded-md uppercase tracking-widest text-sm transition-all duration-200 shadow-sm w-full sm:w-auto'>
            Search For
            <br className='sm:hidden' /> Errandr
          </Link>
        </div>

        {/* Bottom centered button */}
        <Link
          href='/post-errand'
          className='bg-primary  active:scale-95 text-white font-extrabold py-3 px-6 rounded-md uppercase tracking-widest text-sm transition-all duration-200 shadow-sm w-full sm:w-auto'>
          Post An Errand
        </Link>
      </div>
    </section>
  );
};

export default Homepage;
