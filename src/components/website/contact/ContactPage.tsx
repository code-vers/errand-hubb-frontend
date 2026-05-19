import Image from "next/image";
import logo from "../../../../public/logo2.svg";

const ContactPage = () => {
  return (
    <section className='w-full bg-surface-dim min-h-screen my-auto pb-10 pt-16'>
      <div className='mx-auto w-full max-w-310 px-6'>
        <div className='grid grid-cols-1 lg:grid-cols-[330px_1fr] gap-10 lg:gap-12 items-start'>
          <aside className='pt-1'>
            <h2 className='text-secondary text-[22px] font-extrabold leading-tight'>
              Contact Information
            </h2>

            <div className='mt-6 text-secondary'>
              <h3 className='text-[18px] font-extrabold uppercase'>
                Errandhubb
              </h3>
              <p className='mt-5 text-base leading-8 text-foreground'>
                9461 Charleville Blvd., Box 293
                <br />
                Beverly Hills, CA 90212
              </p>

              <p className='mt-8 text-lg text-[#3f4d59]'>
                Phone:{" "}
                <span className='text-primary font-semibold'>425-500-8314</span>
              </p>
              <p className='mt-2 text-lg text-[#3f4d59]'>
                Email:{" "}
                <span className='text-primary font-semibold'>
                  Info@errandhubb.com
                </span>
              </p>
            </div>

            <div className='mt-14 w-[250px] max-w-full'>
              <Image
                src={logo}
                alt='ErrandHubb Logo'
                className='h-auto w-full'
                priority
              />
            </div>
          </aside>

          <section className='rounded-xl bg-white p-6 md:p-9 shadow-lg'>
            <h3 className='text-secondary text-4xl font-extrabold'>
              Send a Message
            </h3>

            <form className='mt-6 flex flex-col gap-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                <label className='flex flex-col gap-1.5'>
                  <span className='text-[12px] font-extrabold uppercase tracking-wide text-[#555]'>
                    First Name
                  </span>
                  <input
                    type='text'
                    placeholder='First name'
                    className='h-11 rounded-md border border-[#dddddd]  px-3 text-sm outline-none focus:border-primary'
                  />
                </label>
                <label className='flex flex-col gap-1.5'>
                  <span className='text-[12px] font-extrabold uppercase tracking-wide text-[#555]'>
                    Last Name
                  </span>
                  <input
                    type='text'
                    placeholder='Last name'
                    className='h-11 rounded-md border border-[#dddddd]  px-3 text-sm outline-none focus:border-primary'
                  />
                </label>
              </div>

              <label className='flex flex-col gap-1.5'>
                <span className='text-[12px] font-extrabold uppercase tracking-wide text-[#555]'>
                  Email Address
                </span>
                <input
                  type='email'
                  placeholder='your@email.com'
                  className='h-11 rounded-md border border-[#dddddd]  px-3 text-sm outline-none focus:border-primary'
                />
              </label>

              <label className='flex flex-col gap-1.5'>
                <span className='text-[12px] font-extrabold uppercase tracking-wide text-[#555]'>
                  Subject
                </span>
                <input
                  type='text'
                  placeholder='How can we help?'
                  className='h-11 rounded-md border border-[#dddddd]  px-3 text-sm outline-none focus:border-primary'
                />
              </label>

              <label className='flex flex-col gap-1.5'>
                <span className='text-[12px] font-extrabold uppercase tracking-wide text-[#555]'>
                  Your Message
                </span>
                <textarea
                  placeholder='Write your message here...'
                  className='min-h-[120px] rounded-md border border-[#dddddd]  px-3 py-2 text-sm outline-none focus:border-primary resize-none'
                />
              </label>

              <button
                type='button'
                className='mt-1 h-12 rounded-md bg-primary text-white text-sm font-extrabold uppercase tracking-wider transition-colors hover:bg-primary-dark'>
                Send Message
              </button>
            </form>
          </section>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
