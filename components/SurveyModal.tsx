"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSurveyModal } from '@/context/SurveyModalContext';

export interface SurveyFormData {
  svName: string;
  svPhone: string;
  svCity: string;
  svBill: string;
}

export function sanitizePhone(input: string): string {
  let text = input.trim();
  // Strip leading +91 or 91 country code prefix if followed by non-digit or 10 digits
  if (text.startsWith('+91')) {
    text = text.slice(3);
  } else if (/^91[\s\-\.]/.test(text)) {
    text = text.slice(2);
  } else if (/^91\d{10}$/.test(text)) {
    text = text.slice(2);
  }
  // Strip all non-digit characters
  const digits = text.replace(/[^\d]/g, '');
  return digits.slice(0, 10);
}

export function isValidPhone(phone: string): boolean {
  return /^\d{10}$/.test(phone);
}

export function isValidName(name: string): boolean {
  return name.trim().length > 0;
}

export function isValidCity(city: string): boolean {
  return city.trim().length > 0;
}

export function isValidBill(bill: string): boolean {
  if (bill.trim() === '') return true;
  const num = Number(bill);
  return !isNaN(num) && num >= 0;
}

// Isolated function for future API integration
export async function submitSurveyLead(data: SurveyFormData): Promise<{ success: boolean }> {
  // Local frontend implementation only — ready for real API endpoint hook
  return Promise.resolve({ success: true });
}

export default function SurveyModal() {
  const { isOpen, closeSurveyModal } = useSurveyModal();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<SurveyFormData>({
    svName: '',
    svPhone: '',
    svCity: '',
    svBill: '',
  });

  const [touched, setTouched] = useState({
    svName: false,
    svPhone: false,
    svCity: false,
    svBill: false,
  });

  const [errors, setErrors] = useState({
    svName: '',
    svPhone: '',
    svCity: '',
    svBill: '',
  });

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const billInputRef = useRef<HTMLInputElement>(null);

  // Validate single field
  const validateField = (field: keyof SurveyFormData, value: string): string => {
    switch (field) {
      case 'svName':
        return isValidName(value) ? '' : 'Please enter your name.';
      case 'svPhone':
        return isValidPhone(value) ? '' : 'Enter a valid 10-digit phone number.';
      case 'svCity':
        return isValidCity(value) ? '' : 'Please enter your city.';
      case 'svBill':
        return isValidBill(value) ? '' : 'Enter a valid positive amount.';
      default:
        return '';
    }
  };

  // Re-validate when data or touched changes
  useEffect(() => {
    setErrors({
      svName: touched.svName ? validateField('svName', formData.svName) : '',
      svPhone: touched.svPhone ? validateField('svPhone', formData.svPhone) : '',
      svCity: touched.svCity ? validateField('svCity', formData.svCity) : '',
      svBill: touched.svBill ? validateField('svBill', formData.svBill) : '',
    });
  }, [formData, touched]);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setIsSubmitting(false);
      setFormData({ svName: '', svPhone: '', svCity: '', svBill: '' });
      setTouched({ svName: false, svPhone: false, svCity: false, svBill: false });
      setErrors({ svName: '', svPhone: '', svCity: '', svBill: '' });
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeSurveyModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeSurveyModal]);

  if (!isOpen) return null;

  const handleBlur = (field: keyof SurveyFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizePhone(e.target.value);
    setFormData((prev) => ({ ...prev, svPhone: sanitized }));
  };

  const handlePhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const sanitized = sanitizePhone(pastedText);
    setFormData((prev) => ({ ...prev, svPhone: sanitized }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields touched
    setTouched({
      svName: true,
      svPhone: true,
      svCity: true,
      svBill: true,
    });

    const nameErr = validateField('svName', formData.svName);
    const phoneErr = validateField('svPhone', formData.svPhone);
    const cityErr = validateField('svCity', formData.svCity);
    const billErr = validateField('svBill', formData.svBill);

    setErrors({
      svName: nameErr,
      svPhone: phoneErr,
      svCity: cityErr,
      svBill: billErr,
    });

    // Check if any field is invalid
    if (nameErr) {
      nameInputRef.current?.focus();
      return;
    }
    if (phoneErr) {
      phoneInputRef.current?.focus();
      return;
    }
    if (cityErr) {
      cityInputRef.current?.focus();
      return;
    }
    if (billErr) {
      billInputRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      await submitSurveyLead(formData);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeSurveyModal();
    }
  };

  return (
    <div
      className="survey-modal-backdrop open"
      id="surveyBackdrop"
      onClick={handleBackdropClick}
    >
      <div
        className="survey-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="surveyModalTitle"
      >
        <div className="survey-modal-head">
          <span className="eyebrow" style={{ marginBottom: '6px' }}>
            Free site survey
          </span>
          <button
            type="button"
            className="survey-close"
            id="surveyClose"
            aria-label="Close"
            onClick={closeSurveyModal}
          >
            ✕
          </button>
        </div>

        {!submitted ? (
          <>
            <h3 id="surveyModalTitle">Let&apos;s get a surveyor to your roof.</h3>
            <form id="surveyForm" onSubmit={handleSubmit} noValidate>
              <div className="survey-field">
                <label htmlFor="svName">Name</label>
                <input
                  type="text"
                  id="svName"
                  ref={nameInputRef}
                  placeholder="Your full name"
                  required
                  value={formData.svName}
                  onChange={(e) => setFormData({ ...formData, svName: e.target.value })}
                  onBlur={() => handleBlur('svName')}
                  className={errors.svName ? 'is-invalid' : ''}
                  aria-invalid={Boolean(errors.svName)}
                  aria-describedby={errors.svName ? 'svNameError' : undefined}
                />
                {errors.svName && (
                  <span className="survey-field-error" id="svNameError" role="alert">
                    {errors.svName}
                  </span>
                )}
              </div>

              <div className="survey-field">
                <label htmlFor="svPhone">Mobile number</label>
                <input
                  type="tel"
                  id="svPhone"
                  ref={phoneInputRef}
                  inputMode="numeric"
                  autoComplete="tel"
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  required
                  value={formData.svPhone}
                  onChange={handlePhoneChange}
                  onPaste={handlePhonePaste}
                  onBlur={() => handleBlur('svPhone')}
                  className={errors.svPhone ? 'is-invalid' : ''}
                  aria-invalid={Boolean(errors.svPhone)}
                  aria-describedby={errors.svPhone ? 'svPhoneError' : undefined}
                />
                {errors.svPhone && (
                  <span className="survey-field-error" id="svPhoneError" role="alert">
                    {errors.svPhone}
                  </span>
                )}
              </div>

              <div className="survey-field">
                <label htmlFor="svCity">City</label>
                <input
                  type="text"
                  id="svCity"
                  ref={cityInputRef}
                  placeholder="Your city"
                  required
                  value={formData.svCity}
                  onChange={(e) => setFormData({ ...formData, svCity: e.target.value })}
                  onBlur={() => handleBlur('svCity')}
                  className={errors.svCity ? 'is-invalid' : ''}
                  aria-invalid={Boolean(errors.svCity)}
                  aria-describedby={errors.svCity ? 'svCityError' : undefined}
                />
                {errors.svCity && (
                  <span className="survey-field-error" id="svCityError" role="alert">
                    {errors.svCity}
                  </span>
                )}
              </div>

              <div className="survey-field">
                <label htmlFor="svBill">Monthly power bill</label>
                <div className={`survey-prefixed ${errors.svBill ? 'is-invalid' : ''}`}>
                  <span>₹</span>
                  <input
                    type="number"
                    id="svBill"
                    ref={billInputRef}
                    placeholder="e.g. 3200"
                    value={formData.svBill}
                    onChange={(e) => setFormData({ ...formData, svBill: e.target.value })}
                    onBlur={() => handleBlur('svBill')}
                    aria-invalid={Boolean(errors.svBill)}
                    aria-describedby={errors.svBill ? 'svBillError' : undefined}
                  />
                </div>
                {errors.svBill && (
                  <span className="survey-field-error" id="svBillError" role="alert">
                    {errors.svBill}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Booking survey...' : 'Book my free survey'}
              </button>
              <p className="survey-fine-print">
                We&apos;ll call or WhatsApp within a business day to lock in a time — no spam, no auto-dialers.
              </p>
            </form>
          </>
        ) : (
          <div className="survey-success show" id="surveySuccess">
            <div className="survey-success-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3>You&apos;re on the list.</h3>
            <p>Someone from Jibsolar will reach out shortly to schedule your survey.</p>
            <button
              type="button"
              className="btn btn-ghost-light"
              id="surveyDone"
              onClick={closeSurveyModal}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
