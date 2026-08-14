'use client';

import { useState } from "react";
import AudioPlayer from "@/components/shared/AudioPlayer";

const AboutPage = () => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

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

        <div className='mt-7'>
          <button
            type='button'
            onClick={() => setIsMoreOpen((isOpen) => !isOpen)}
            aria-expanded={isMoreOpen}
            aria-controls='graeme-bio'
            className='rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
          >
            {isMoreOpen ? 'Show Less' : 'More'}
          </button>
        </div>

        {isMoreOpen && (
          <section
            id='graeme-bio'
            className='mt-6 rounded-2xl border border-primary/20 bg-surface-dim p-6 md:p-8'
            aria-labelledby='graeme-bio-heading'
          >
            <h2
              id='graeme-bio-heading'
              className='text-2xl font-extrabold text-secondary'
            >
              About Graeme X. Barrington
            </h2>
            <div className='mt-5'>
              <AudioPlayer
                src='/MORE ABOUT ERRANDHUBB.mp3'
                label='More About ErrandHubb'
              />
            </div>

            <div className='mt-5 space-y-4 text-[15px] font-normal leading-relaxed text-foreground'>
              <p>
                Graeme X. Barrington is a Los Angeles–born entrepreneur,
                investor, and former investment banking professional with
                decades of experience spanning technology, finance, consumer
                services, and emerging-growth companies.
              </p>
              <p>
                After graduating from Stanford University in 1988, Graeme began
                building a career focused on entrepreneurship, investment, and
                innovation. Throughout his career, he has been involved in the
                founding, financing, and development of numerous companies and
                early-stage ventures, including investments in companies such as
                1-800-Flowers and PayPal. He was also involved with Great
                Expectations, an innovative video-based dating platform that
                introduced a concept similar to modern online and video dating
                services long before the widespread adoption of the internet.
              </p>

              <h3 className='pt-2 text-lg font-extrabold text-secondary'>
                Investment Banking &amp; Entrepreneurship
              </h3>
              <p>
                During the late 1980s and early 1990s, Graeme worked in the
                investment banking industry with Bear Stearns and Shearson
                Lehman Brothers. During this period, he gained extensive
                experience in corporate finance, capital formation, investment
                strategy, and working with emerging companies and investors.
              </p>
              <p>
                Over the course of his career, Graeme has participated in
                raising substantial capital for startup and growth companies
                while focusing on creating opportunities capable of generating
                attractive returns for investors.
              </p>
              <p>
                An entrepreneur at heart, Graeme has consistently looked for
                opportunities to identify inefficiencies in established
                industries and develop businesses designed to provide consumers
                with simpler, more affordable, and more convenient alternatives.
              </p>

              <h3 className='pt-2 text-lg font-extrabold text-secondary'>
                ErrandHubb
              </h3>
              <p>
                Graeme&apos;s latest technology venture is ErrandHubb, an online
                marketplace designed to simplify the way consumers connect with
                independent errand runners and service providers.
              </p>
              <p>
                The concept was born from a simple observation: consumers and
                service providers are often burdened by complicated pricing
                structures, lead fees, commissions, subscriptions, and other
                charges imposed by existing marketplace platforms.
              </p>
              <p>
                ErrandHubb seeks to take a fundamentally different approach by
                creating a more transparent and cost-effective marketplace where
                clients can connect directly with Errand&apos;ers and service
                providers while minimizing the fees traditionally associated
                with these platforms.
              </p>
              <p>
                The opportunity is significant. Across the United States,
                millions of consumers use online marketplaces each year to find
                individuals and businesses capable of completing household
                projects, personal errands, deliveries, and other services.
                Graeme believes the industry represents a substantial
                opportunity for innovation.
              </p>
            </div>
          </section>
        )}

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
