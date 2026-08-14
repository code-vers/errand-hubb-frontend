import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  CalendarDays,
  Check,
  LockKeyhole,
  Megaphone,
  MessageCircle,
  ShieldCheck,
  Tags,
  UserRound,
  UsersRound,
} from "lucide-react";

const monthlyBenefits = [
  "Create your profile",
  "List your services",
  "Receive customer requests",
  "Connect with customers",
  "Set your own pricing",
  "No long-term contract",
];

const annualBenefits = [
  "All Monthly Benefits",
  "12 Months of Membership",
  "Save $10 with annual payment",
  "No long-term contract",
  "Cancel anytime",
];

const adsBenefits = [
  "Promote your business or service",
  "Featured ad placement",
  "Increased visibility",
  "Reach more customers",
  "Cancel anytime",
];

type PlanCardProps = {
  title: ReactNode;
  icon: typeof UserRound;
  price: string;
  priceDetail: ReactNode;
  benefits: string[];
  href: string;
  buttonText: string;
  featured?: boolean;
  ads?: boolean;
};

function PlanCard({
  title,
  icon: Icon,
  price,
  priceDetail,
  benefits,
  href,
  buttonText,
  featured = false,
  ads = false,
}: PlanCardProps) {
  const accent = featured ? "#f97316" : "#0b5fb8";

  return (
    <article
      className={`relative flex min-h-[590px] flex-col rounded-[22px] border bg-white px-5 pb-4 pt-6 shadow-[0_8px_30px_rgba(0,34,84,0.10)] sm:min-h-[650px] ${
        featured ? "border-2 border-[#f97316]" : "border-slate-100"
      }`}
    >
      {featured && (
        <div className='absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#f97316] px-7 py-2 text-base font-extrabold text-white shadow-sm'>
          BEST VALUE
        </div>
      )}

      <div
        className={`mx-auto mb-3 flex h-[72px] w-[72px] items-center justify-center rounded-full sm:h-[82px] sm:w-[82px] ${
          featured ? "bg-orange-100 text-[#f97316]" : "bg-[#eaf3ff] text-[#0b5fb8]"
        }`}
      >
        <Icon className='h-9 w-9 sm:h-10 sm:w-10' strokeWidth={1.8} />
      </div>

      <h2 className='text-center text-[22px] font-black uppercase leading-[1.08] text-[#082e5d] sm:text-[25px]'>
        {title}
      </h2>
      {ads && <p className='mt-0.5 text-center text-[32px] font-black leading-none text-[#f97316]'>ADS</p>}

      <div className='mx-auto my-4 h-0.5 w-4/5' style={{ backgroundColor: accent }} />
      <p className={`text-center text-[72px] font-black leading-none tracking-[-0.07em] sm:text-[84px] ${featured ? "text-[#f97316]" : "text-[#0757b7]"}`}>
        {price}
      </p>
      <p className='mt-1 min-h-12 text-center text-[18px] font-medium leading-[1.15] text-[#0b2751] sm:text-[20px]'>
        {priceDetail}
      </p>

      <ul className={`mt-3 flex flex-1 flex-col gap-3 border-t border-dotted pt-4 ${featured ? "border-orange-300" : "border-blue-200"}`}>
        {benefits.map((benefit) => (
          <li key={benefit} className='flex items-start gap-3 text-[15px] font-medium leading-[1.25] text-[#10284d] sm:text-[17px]'>
            <span
              className='mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white'
              style={{ backgroundColor: accent }}
            >
              <Check className='h-3.5 w-3.5' strokeWidth={4} />
            </span>
            {benefit}
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className={`mt-5 block rounded-lg px-3 py-4 text-center text-[16px] font-extrabold uppercase text-white transition-transform hover:-translate-y-0.5 hover:shadow-lg sm:text-[18px] ${
          featured ? "bg-[#f97316]" : "bg-[#064f9e]"
        }`}
      >
        {buttonText}
      </Link>
      {featured && (
        <div className='mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#fff1df] py-2.5 text-[18px] font-extrabold text-[#f97316]'>
          <Tags className='h-5 w-5' /> SAVE $10
        </div>
      )}
    </article>
  );
}

const introductionBenefits = [
  "No Commission from Transaction",
  "No Percentage Deduction",
  "No Withholding Funds in Escrow",
];

export default function PricingPage() {
  return (
    <section className='w-full bg-white text-[#0d3155]'>
      <div className='mx-auto grid max-w-[1500px] grid-cols-1 gap-6 px-5 py-10 lg:grid-cols-[1.15fr_.8fr_.9fr_.9fr] lg:items-stretch lg:gap-[18px] lg:px-6'>
        <div className='pr-0 pt-2 lg:pr-5'>
          <Image
            src='/errandhubb-logo.png'
            alt='ErrandHubb'
            width={857}
            height={196}
            className='mb-7 h-auto w-full max-w-[430px]'
            priority
          />
          <h1 className='text-[58px] font-black leading-[0.92] tracking-[-0.06em] text-[#0a3560] sm:text-[78px] lg:text-[clamp(54px,5vw,92px)]'>
            SIMPLE
            <span className='block text-[#f97316]'>PRICING!</span>
          </h1>
          <div className='my-6 h-[3px] w-36 bg-[#f97316]' />

          <div className='border-b border-dotted border-slate-300'>
            {introductionBenefits.map((benefit) => (
              <div key={benefit} className='flex items-center gap-4 border-t border-dotted border-slate-300 py-4 first:border-t-0'>
                <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0757b7] text-white sm:h-[58px] sm:w-[58px]'>
                  <Check className='h-7 w-7 sm:h-8 sm:w-8' strokeWidth={4} />
                </span>
                <p className='text-[19px] font-extrabold uppercase leading-[1.2] text-[#073d76] sm:text-[23px]'>
                  {benefit}
                </p>
              </div>
            ))}
          </div>
          <p className='mt-6 text-[23px] font-bold italic leading-[1.25] text-[#092f5d] sm:text-[27px]'>
            Just affordable, honest &amp;<br />straight forward pricing.
          </p>
        </div>

        <PlanCard
          title={<>Monthly<br />Membership</>}
          icon={UserRound}
          price='$5'
          priceDetail='Per Mo.'
          benefits={monthlyBenefits}
          href='/dashboard/subscription'
          buttonText='Join for $5/month'
        />

        <PlanCard
          title={<>Annual<br />Membership</>}
          icon={CalendarDays}
          price='$50'
          priceDetail={<>If paid upfront<br />for entire Year</>}
          benefits={annualBenefits}
          href='/dashboard/subscription'
          buttonText='Save with $50/year'
          featured
        />

        <PlanCard
          title='Pro Plan'
          icon={Megaphone}
          price='$20'
          priceDetail='Per Mo.'
          benefits={adsBenefits}
          href='/dashboard/ads-subscription'
          buttonText='Get your ad placement'
          ads
        />
      </div>

      <footer className='mt-3 bg-gradient-to-r from-[#073d78] to-[#004b95] text-white'>
        <div className='mx-auto grid max-w-[1500px] grid-cols-1 divide-y divide-white/25 px-6 py-6 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4'>
          <div className='flex items-center gap-4 py-4 pr-5 sm:py-0'>
            <LockKeyhole className='h-13 w-13 shrink-0 text-white' strokeWidth={1.7} />
            <div>
              <h3 className='text-[18px] font-extrabold leading-[1.25]'>No hidden fees.<br />No surprises.</h3>
              <p className='mt-2 text-sm font-bold text-orange-400'>Just simple, honest pricing.</p>
            </div>
          </div>
          <div className='flex items-center gap-4 py-4 pr-5 sm:px-6 sm:py-0'>
            <UsersRound className='h-13 w-13 shrink-0' strokeWidth={1.7} />
            <div>
              <h3 className='text-[18px] font-extrabold leading-[1.25]'>Choose your<br />own Errander</h3>
              <p className='mt-2 text-sm'>You&apos;re in control.</p>
            </div>
          </div>
          <div className='flex items-center gap-4 py-4 pr-5 sm:py-5 lg:px-6 lg:py-0'>
            <MessageCircle className='h-13 w-13 shrink-0' strokeWidth={1.7} />
            <div>
              <h3 className='text-[18px] font-extrabold leading-[1.25]'>Message before<br />you hire</h3>
              <p className='mt-2 text-sm'>Communicate first.</p>
            </div>
          </div>
          <div className='flex items-center gap-4 py-4 sm:py-5 lg:pl-6 lg:py-0'>
            <ShieldCheck className='h-13 w-13 shrink-0 text-orange-400' strokeWidth={1.7} />
            <div>
              <h3 className='text-[18px] font-extrabold leading-[1.25]'>Safe, Secure<br />&amp; Trusted</h3>
              <p className='mt-2 text-sm'>Your safety matters.</p>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
