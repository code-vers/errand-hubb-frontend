import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo2.svg";

export default function NotFound() {
  return (
    <section className='flex-1 flex flex-col items-center justify-center bg-white px-6 py-20 text-center min-h-[60vh]'>
      <div className='mb-8'>
        <Image
          src={logo}
          alt='ErrandHubb Logo'
          width={200}
          height={60}
          priority
        />
      </div>

      <h1 className='text-primary font-black text-8xl md:text-9xl mb-4'>404</h1>

      <h2 className='text-secondary font-bold text-2xl md:text-3xl mb-4 uppercase tracking-tight'>
        Page Not Found
      </h2>

      <p className='text-text-secondary max-w-md mx-auto mb-10 text-lg leading-relaxed'>
        Oops! The page you're looking for doesn't exist or has been moved. Don't
        worry, even the best Errandrs get lost sometimes.
      </p>

      <Link
        href='/'
        className='bg-primary hover:bg-primary-dark active:scale-95 text-white font-extrabold py-4 px-8 rounded-md uppercase tracking-widest text-sm transition-all duration-200 shadow-md inline-block'>
        Back to Home
      </Link>
    </section>
  );
}
