'use client';

import React, { useEffect, useState } from 'react';
import {
  X,
  Phone,
  Mail,
  MapPin,
  Globe,
  Play,
  Copy,
  Check,
  Building2,
  Tag,
  ExternalLink,
} from 'lucide-react';
import { getImageUrl } from '@/configs/api.config';
import { parseAdContactInfo } from '@/utils/ads.utils';
import { toast } from 'sonner';

export interface AdDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  ad: any | null;
}

export const AdDetailsModal: React.FC<AdDetailsModalProps> = ({ isOpen, onClose, ad }) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !ad) return null;

  const contact = parseAdContactInfo(ad);
  const posterUrl =
    getImageUrl(ad.imageUrl) ||
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713';

  const copyToClipboard = async (text: string, type: 'phone' | 'email') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'phone') {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      } else {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      }
      toast.success(`${type === 'phone' ? 'Phone number' : 'Email'} copied to clipboard!`);
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200'
      onClick={onClose}
      role='dialog'
      aria-modal='true'
      aria-labelledby='ad-details-title'
    >
      <div
        className='relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-100 animate-in zoom-in-95 duration-200'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/70'>
          <div className='flex items-center gap-2'>
            <Building2 className='text-[var(--color-primary)]' size={20} />
            <h2 id='ad-details-title' className='font-bold text-gray-800 text-lg sm:text-xl truncate'>
              {ad.companyName || 'Business Details'}
            </h2>
          </div>
          <button
            onClick={onClose}
            type='button'
            className='p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 rounded-full transition-colors cursor-pointer'
            aria-label='Close modal'
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className='overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8'>
          {/* Left Column: Poster Artwork (5 cols) */}
          <div className='md:col-span-5 flex flex-col items-center gap-3'>
            <div className='relative w-full aspect-[3/4] max-w-[340px] rounded-2xl overflow-hidden bg-slate-100 border border-gray-200/80 shadow-md flex items-center justify-center group'>
              <img
                src={posterUrl}
                alt={ad.companyName || ad.title || 'Poster'}
                className='w-full h-full object-contain'
              />
            </div>

            {ad.imageUrl && (
              <a
                href={posterUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='text-xs font-semibold text-gray-500 hover:text-[var(--color-primary)] flex items-center gap-1.5 transition-colors py-1'
              >
                <ExternalLink size={13} /> View Full Size Poster
              </a>
            )}
          </div>

          {/* Right Column: Business & Contact Information (7 cols) */}
          <div className='md:col-span-7 flex flex-col justify-between space-y-6'>
            <div className='space-y-4'>
              {/* Category Badges */}
              <div className='flex flex-wrap items-center gap-2'>
                {ad.category?.name && (
                  <span className='inline-flex items-center gap-1 text-xs font-bold text-white bg-[var(--color-primary)] px-3 py-1 rounded-full uppercase tracking-wider shadow-xs'>
                    <Tag size={12} />
                    {ad.category.name}
                  </span>
                )}
                {ad.subcategory?.name && (
                  <span className='inline-block text-xs font-semibold text-gray-600 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full uppercase tracking-wider'>
                    {ad.subcategory.name}
                  </span>
                )}
              </div>

              {/* Title / Headline */}
              <div>
                <h3 className='text-2xl font-extrabold text-gray-900 leading-tight mb-1'>
                  {ad.title}
                </h3>
                <p className='text-sm font-semibold text-[var(--color-primary)]'>
                  {ad.companyName}
                </p>
              </div>

              {/* Contact Information Card */}
              <div className='bg-slate-50 border border-slate-200/80 rounded-2xl p-4.5 space-y-3 shadow-xs'>
                <h4 className='text-xs font-bold uppercase tracking-wider text-slate-400'>
                  Contact & Location
                </h4>

                {/* Phone */}
                {contact.phone ? (
                  <div className='flex items-center justify-between gap-3 text-sm'>
                    <div className='flex items-center gap-2.5 min-w-0'>
                      <div className='w-8 h-8 rounded-lg bg-orange-100 text-[var(--color-primary)] flex items-center justify-center shrink-0'>
                        <Phone size={15} />
                      </div>
                      <div className='min-w-0'>
                        <p className='text-[10px] text-gray-400 font-semibold uppercase'>Phone</p>
                        <a
                          href={`tel:${contact.phone}`}
                          className='font-bold text-gray-800 hover:text-[var(--color-primary)] truncate block transition-colors'
                        >
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                    <button
                      type='button'
                      onClick={() => copyToClipboard(contact.phone!, 'phone')}
                      className='p-2 text-gray-400 hover:text-gray-700 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all cursor-pointer shrink-0'
                      title='Copy Phone Number'
                    >
                      {copiedPhone ? <Check size={14} className='text-emerald-600' /> : <Copy size={14} />}
                    </button>
                  </div>
                ) : null}

                {/* Email */}
                {contact.email ? (
                  <div className='flex items-center justify-between gap-3 text-sm'>
                    <div className='flex items-center gap-2.5 min-w-0'>
                      <div className='w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0'>
                        <Mail size={15} />
                      </div>
                      <div className='min-w-0'>
                        <p className='text-[10px] text-gray-400 font-semibold uppercase'>Email</p>
                        <a
                          href={`mailto:${contact.email}`}
                          className='font-bold text-gray-800 hover:text-blue-600 truncate block transition-colors'
                        >
                          {contact.email}
                        </a>
                      </div>
                    </div>
                    <button
                      type='button'
                      onClick={() => copyToClipboard(contact.email!, 'email')}
                      className='p-2 text-gray-400 hover:text-gray-700 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all cursor-pointer shrink-0'
                      title='Copy Email'
                    >
                      {copiedEmail ? <Check size={14} className='text-emerald-600' /> : <Copy size={14} />}
                    </button>
                  </div>
                ) : null}

                {/* Location / Address */}
                {contact.location ? (
                  <div className='flex items-center gap-2.5 text-sm'>
                    <div className='w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0'>
                      <MapPin size={15} />
                    </div>
                    <div>
                      <p className='text-[10px] text-gray-400 font-semibold uppercase'>Address / Service Area</p>
                      <p className='font-bold text-gray-800'>{contact.location}</p>
                    </div>
                  </div>
                ) : null}

                {/* Website */}
                {contact.websiteUrl ? (
                  <div className='flex items-center gap-2.5 text-sm'>
                    <div className='w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0'>
                      <Globe size={15} />
                    </div>
                    <div className='min-w-0 flex-1'>
                      <p className='text-[10px] text-gray-400 font-semibold uppercase'>Official Website</p>
                      <a
                        href={contact.websiteUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='font-bold text-purple-700 hover:text-purple-900 truncate flex items-center gap-1 transition-colors'
                      >
                        <span className='truncate'>{contact.websiteUrl.replace(/^https?:\/\//, '')}</span>
                        <ExternalLink size={12} className='shrink-0' />
                      </a>
                    </div>
                  </div>
                ) : null}

                {/* If no contact details exist at all */}
                {!contact.phone && !contact.email && !contact.location && !contact.websiteUrl && (
                  <p className='text-xs text-gray-400 italic py-1'>
                    No specific direct contact information provided for this business.
                  </p>
                )}
              </div>

              {/* YouTube Promo Video Button */}
              {ad.youtubeLink && (
                <div className='pt-1'>
                  <a
                    href={ad.youtubeLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-xs'
                  >
                    <Play size={14} fill='currentColor' />
                    Watch Video Promotion
                    <ExternalLink size={12} />
                  </a>
                </div>
              )}

              {/* Full Description */}
              <div className='space-y-1.5 pt-2'>
                <h4 className='text-xs font-bold uppercase tracking-wider text-slate-400'>
                  About This Business
                </h4>
                <div className='text-sm text-gray-700 leading-relaxed max-h-48 overflow-y-auto pr-2 whitespace-pre-wrap'>
                  {ad.description || 'No description provided.'}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className='pt-4 border-t border-gray-100 flex items-center justify-end gap-3'>
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className='flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-colors cursor-pointer'
                >
                  <Phone size={15} /> Call Now
                </a>
              )}
              <button
                type='button'
                onClick={onClose}
                className='px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm rounded-xl transition-colors cursor-pointer'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDetailsModal;
