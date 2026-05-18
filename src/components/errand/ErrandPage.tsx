import Image from "next/image";
import Link from "next/link";
import icon from "../../../public/icon.svg";
import logo from "../../../public/logo.svg";

interface MembershipPlan {
  priceLabel: string;
  billingCycle: string;
}

interface ErrandrProfile {
  id: number;
  name: string;
  bioLink: string;
  services: string[];
  pricingText: string;
  imageUrl: string;
  videoThumbUrl: string;
}

const membershipPlan: MembershipPlan = {
  priceLabel: "JUST $10",
  billingCycle: "MONTHLY",
};

const errandrProfiles: ErrandrProfile[] = [
  {
    id: 1,
    name: "Jessica M.",
    bioLink: "#",
    services: ["Grocery Shopping", "Delivery", "Pet Care", "Errands"],
    pricingText: "Errands from $25 to $100 per hour",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    videoThumbUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=66&h=40&fit=crop",
  },
  {
    id: 2,
    name: "Marcus T.",
    bioLink: "#",
    services: ["Moving Help", "Handyman", "Delivery", "Shopping"],
    pricingText: "Errands from $25 to $100 per hour",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    videoThumbUrl:
      "https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?w=66&h=40&fit=crop",
  },
  {
    id: 3,
    name: "Sandra R.",
    bioLink: "#",
    services: ["Scheduling", "Admin Help", "Research", "Errands"],
    pricingText: "Errands from $25 to $100 per hour",
    imageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    videoThumbUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=66&h=40&fit=crop",
  },
];

const ErrandPage = () => {
  return (
    <section className='w-full bg-(--color-warning-bg)'>
      <div className='bg-white py-8 pb-8'>
        <div className='mx-auto max-w-310 px-6 lg:px-10'>
          <div className='grid grid-cols-1 items-center gap-6 text-center xl:grid-cols-[1fr_auto_1fr] xl:items-end xl:text-left'>
            <div className='flex flex-col items-center gap-4 xl:items-start'>
              <p className=' text-[18px] lg:whitespace-nowrap font-bold leading-tight tracking-[0.4px] text-(--color-secondary) md:text-[34px]'>
                MARKET YOURSELF TO PEOPLE WHO NEED
              </p>
              <p className=' text-[18px] font-bold leading-tight tracking-[0.4px] text-(--color-secondary) md:text-[34px]'>
                YOUR HELP WITH AN ERRANDR POST
              </p>
              <Link
                href='/errand-registration'
                className='inline-flex min-h-12.5 items-center mt-12 justify-center rounded-md bg-(--color-primary) px-6 text-[14px] font-bold tracking-[0.8px] text-white no-underline hover:bg-(--color-primary-dark)'>
                CREATE ERRAND PROFILE
              </Link>
            </div>

            <div className='flex items-center justify-center pb-1.5'>
              <Image src={logo} alt='ErrandHubb' width={156} height={26} />
            </div>

            <div className='flex flex-col  gap-4 xl:items-end'>
              <p className='text-[44px] leading-[0.95] font-extrabold text-[#171923] md:text-[58px]'>
                {membershipPlan.priceLabel}
              </p>
              <p className='text-[22px] leading-none font-semibold text-(--color-secondary) md:text-[30px]'>
                {membershipPlan.billingCycle}
              </p>
              <Link
                href='/client-registration'
                className='inline-flex min-h-12.5 items-center justify-center rounded-md bg-(--color-primary) px-6 text-[14px] font-bold tracking-[0.8px] text-white no-underline hover:bg-(--color-primary-dark)'>
                CREATE CLIENT PROFILE
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='px-0 py-13 pb-20'>
        <div className='mx-auto max-w-[1240px] px-6 lg:px-10'>
          <header>
            <h1 className='text-[34px] font-extrabold tracking-[0.5px] text-(--color-secondary) md:text-[46px]'>
              ERRANDR&apos;S
            </h1>
            <p className='mt-2 text-[18px] text-[#37556d]'>
              Choose your dedicated errand professional
            </p>
          </header>

          <div className='mt-7.5 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {errandrProfiles.map((profile) => (
              <article
                key={profile.id}
                className='overflow-hidden rounded-[18px] bg-[#f6f6f6] shadow-[0_8px_20px_rgba(0,0,0,0.12)]'>
                <Image
                  src={profile.imageUrl}
                  alt={profile.name}
                  width={350}
                  height={245}
                  className='h-58.75 w-full object-cover md:h-66.5'
                />
                <div className='p-4 pb-4.5'>
                  <div className='flex items-center justify-between gap-2.5'>
                    <h2 className='text-[27px] font-bold text-(--color-secondary)'>
                      {profile.name}
                    </h2>
                    <button
                      type='button'
                      className='h-8.5 rounded-sm border border-[#c4c4c4] bg-[#efefef] px-3.5 text-[12px] font-bold text-[#6b6f75]'>
                      ABOUT ME
                    </button>
                  </div>

                  <div className='mt-3 flex items-center justify-between'>
                    <a
                      href={profile.bioLink}
                      className='text-[18px] text-[#2f66dc] underline'>
                      Intro
                    </a>
                    <div className='flex items-center gap-2'>
                      <button type='button' aria-label='Play intro video'>
                        <Image
                          src={icon}
                          alt='Play intro'
                          width={22}
                          height={22}
                        />
                      </button>
                      <Image
                        src={profile.videoThumbUrl}
                        alt='Video preview'
                        width={33}
                        height={20}
                        className='rounded-xs object-cover'
                      />
                    </div>
                  </div>

                  <p className='mt-3 text-[11px] tracking-[0.8px] text-[#757b84]'>
                    SERVICES
                  </p>
                  <div className='mt-2 flex flex-wrap gap-1.5'>
                    {profile.services.map((service) => (
                      <span
                        key={service}
                        className='rounded-full border border-(--color-primary) bg-[#fff3ea] px-2.5 py-0.75 text-[12px] leading-[1.2] text-[#d96f1f]'>
                        {service}
                      </span>
                    ))}
                  </div>

                  <p className='mt-3 text-[11px] tracking-[0.8px] text-[#757b84]'>
                    PRICES
                  </p>
                  <p className='mt-1.25 text-[27px] font-medium text-[#1e2329]'>
                    {profile.pricingText}
                  </p>

                  <button
                    type='button'
                    className='mt-4 min-h-10 w-full rounded-md bg-(--color-primary) text-[13px] font-extrabold tracking-[1px] text-white hover:bg-(--color-primary-dark)'>
                    HIRE NOW
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrandPage;
