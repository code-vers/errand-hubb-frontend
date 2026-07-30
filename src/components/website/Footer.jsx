import Link from "next/link";

const Footer = () => {
  return (
    <div className='bg-[#000000] mt-auto w-full z-50 py-6 border-t border-white/5'>
      <div className="max-w-385 mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className='text-background/60 text-[13px] text-center md:text-left'>
          © 2026 ErrandHubb.com. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-[13px] text-background/60 font-semibold items-center">
          <Link href="/competition" className="text-white font-extrabold hover:text-primary transition-colors">
            Competition
          </Link>
          <Link href="/legal?tab=privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/legal?tab=terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link href="/legal?tab=refund" className="hover:text-primary transition-colors">
            Refund Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;

