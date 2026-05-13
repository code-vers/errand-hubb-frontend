import Image from "next/image";
import logo from "../../../public/logo.svg";

const Homepage = () => {
  return (
    <section className='min-h-full w-full flex flex-col justify-center items-center bg-white font-sans antialiased py-10'>
      {/* Logo Section */}
      <div className='flex flex-col items-center mb-10'>
        <Image
          src={logo}
          alt='ErrandHubb Logo'
          width={240}
          height={80}
          priority
        />
      </div>

      {/* Action Buttons */}
      <div className='flex flex-col items-center gap-4 w-full max-w-md px-4'>
        {/* Top row */}
        <div className='flex flex-col sm:flex-row gap-4 w-full justify-center'>
          <button className='bg-primary hover:bg-primary-dark active:scale-95 whitespace-nowrap text-white font-extrabold py-3 px-6 rounded-md uppercase tracking-widest text-sm transition-all duration-200 shadow-sm w-full sm:w-auto'>
            Become an Errandr
          </button>

          <button className='bg-primary hover:bg-primary-dark active:scale-95 whitespace-nowrap text-white font-extrabold py-3 px-6 rounded-md uppercase tracking-widest text-sm transition-all duration-200 shadow-sm w-full sm:w-auto'>
            Search For
            <br className='sm:hidden' /> Errandr
          </button>
        </div>

        {/* Bottom centered button */}
        <button className='bg-primary hover:bg-primary-dark active:scale-95 text-white font-extrabold py-3 px-6 rounded-md uppercase tracking-widest text-sm transition-all duration-200 shadow-sm w-full sm:w-auto'>
          Post An Errand
        </button>
      </div>
    </section>
  );
};

export default Homepage;
