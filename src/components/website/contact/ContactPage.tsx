"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/logo2.svg";
import { useState } from "react";
import { useFormValidation } from "@/hooks/useFormValidation";
import { validateName, validateEmail, validateSubject, validateTextarea } from "@/lib/validation";
import { toast } from "sonner";
import axiosInstance from "@/services/api/axios";

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const { errors, touched, handleBlur, validateForm, setErrors } = useFormValidation({
    firstName: (v) => validateName(v),
    lastName: (v) => validateName(v),
    email: (v) => validateEmail(v),
    subject: (v) => validateSubject(v),
    message: (v) => validateTextarea(v, 2000, "Message"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(formData)) return;
    
    setLoading(true);
    try {
      await axiosInstance.post("/contact", formData);
      toast.success("Message sent successfully! We will get back to you soon.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message || "Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

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

            <div className='mt-14 w-[250px] max-w-full flex flex-col items-center text-center'>
              <Image
                src={logo}
                alt='ErrandHubb Logo'
                className='h-auto w-full'
                priority
              />
              <div className='mt-5 w-full text-center'>
                <Link
                  href='/press-release'
                  className='inline-block text-[#e52e2e] hover:text-[#c42323] text-xl font-extrabold italic uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95'
                >
                  PRESS RELEASE
                </Link>
              </div>
            </div>
          </aside>

          <section className='rounded-xl bg-white p-6 md:p-9 shadow-lg'>
            <h3 className='text-secondary text-4xl font-extrabold'>
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className='mt-6 flex flex-col gap-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                <label className='flex flex-col gap-1.5'>
                  <span className='text-[12px] font-extrabold uppercase tracking-wide text-[#555]'>
                    First Name
                  </span>
                  <input
                    type='text'
                    placeholder='First name'
                    className={`h-11 rounded-md border border-[#dddddd]  px-3 text-sm outline-none focus:border-primary ${touched.firstName && errors.firstName ? "border-red-500 focus:border-red-500" : ""}`}
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    maxLength={50}
                    onBlur={(e) => handleBlur('firstName', e.target.value)}
                    aria-invalid={touched.firstName && !!errors.firstName}
                    aria-describedby={touched.firstName && errors.firstName ? "firstName-error" : undefined}
                  />
                {touched.firstName && errors.firstName && (
                  <p id="firstName-error" className="text-red-500 text-xs mt-1 font-medium">{errors.firstName}</p>
                )}
                </label>
                <label className='flex flex-col gap-1.5'>
                  <span className='text-[12px] font-extrabold uppercase tracking-wide text-[#555]'>
                    Last Name
                  </span>
                  <input
                    type='text'
                    placeholder='Last name'
                    className={`h-11 rounded-md border border-[#dddddd]  px-3 text-sm outline-none focus:border-primary ${touched.lastName && errors.lastName ? "border-red-500 focus:border-red-500" : ""}`}
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    maxLength={50}
                    onBlur={(e) => handleBlur('lastName', e.target.value)}
                    aria-invalid={touched.lastName && !!errors.lastName}
                    aria-describedby={touched.lastName && errors.lastName ? "lastName-error" : undefined}
                  />
                {touched.lastName && errors.lastName && (
                  <p id="lastName-error" className="text-red-500 text-xs mt-1 font-medium">{errors.lastName}</p>
                )}
                </label>
              </div>

              <label className='flex flex-col gap-1.5'>
                <span className='text-[12px] font-extrabold uppercase tracking-wide text-[#555]'>
                  Email Address
                </span>
                <input
                  type='email'
                  placeholder='your@email.com'
                  className={`h-11 rounded-md border border-[#dddddd]  px-3 text-sm outline-none focus:border-primary ${touched.email && errors.email ? "border-red-500 focus:border-red-500" : ""}`}
                  name="email"
                    value={formData.email}
                    onChange={handleChange}
                    maxLength={254}
                    onBlur={(e) => handleBlur('email', e.target.value)}
                    aria-invalid={touched.email && !!errors.email}
                    aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                  />
                {touched.email && errors.email && (
                  <p id="email-error" className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>
                )}
              </label>

              <label className='flex flex-col gap-1.5'>
                <span className='text-[12px] font-extrabold uppercase tracking-wide text-[#555]'>
                  Subject
                </span>
                <input
                  type='text'
                  placeholder='How can we help?'
                  className={`h-11 rounded-md border border-[#dddddd]  px-3 text-sm outline-none focus:border-primary ${touched.subject && errors.subject ? "border-red-500 focus:border-red-500" : ""}`}
                  name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    maxLength={120}
                    onBlur={(e) => handleBlur('subject', e.target.value)}
                    aria-invalid={touched.subject && !!errors.subject}
                    aria-describedby={touched.subject && errors.subject ? "subject-error" : undefined}
                  />
                {touched.subject && errors.subject && (
                  <p id="subject-error" className="text-red-500 text-xs mt-1 font-medium">{errors.subject}</p>
                )}
              </label>

              <label className='flex flex-col gap-1.5'>
                <span className='text-[12px] font-extrabold uppercase tracking-wide text-[#555]'>
                  Your Message
                </span>
                <textarea
                  placeholder='Write your message here...'
                  className={`min-h-[120px] rounded-md border border-[#dddddd]  px-3 py-2 text-sm outline-none focus:border-primary resize-none ${touched.message && errors.message ? "border-red-500 focus:border-red-500" : ""}`}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  maxLength={2000}
                  onBlur={(e) => handleBlur('message', e.target.value)}
                  aria-invalid={touched.message && !!errors.message}
                  aria-describedby={touched.message && errors.message ? "message-error" : undefined}
                />
              {touched.message && errors.message && (
                <p id="message-error" className="text-red-500 text-xs mt-1 font-medium">{errors.message}</p>
              )}
              </label>

              <button
                type='submit'
                disabled={loading}
                className='mt-1 h-12 rounded-md bg-primary text-white text-sm font-extrabold uppercase tracking-wider transition-colors hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </section>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
