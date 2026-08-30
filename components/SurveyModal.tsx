"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSurveyModal } from '@/context/SurveyModalContext';

export interface SurveyFormData {
  svName: string;
  svEmail: string;
  svPhone: string;
  svCity: string;
  svBill: string;
}

export function sanitizePhone(input: string): string {
  let text = input.trim();
  if (text.startsWith('+91')) {
    text = text.slice(3);
  } else if (/^91[\s\-\.]/.test(text)) {
    text = text.slice(2);
  } else if (/^91\d{10}$/.test(text)) {
    text = text.slice(2);
  }
  const digits = text.replace(/[^\d]/g, '');
  return digits.slice(0, 10);
}

export function isValidPhone(phone: string): boolean {
  return /^\d{10}$/.test(phone);
}

export function isValidName(name: string): boolean {
  return name.trim().length > 0;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidCity(city: string): boolean {
  return city.trim().length > 0;
}

export function isValidBill(bill: string): boolean {
  if (bill.trim() === '') return true;
  return /^\d{1,7}$/.test(bill.trim());
}

export function getTrackingParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const allowlist = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
    'platform', 'gclid', 'fbclid', 'fbp', 'fbc', 'matchtype', 'network',
    'device', 'keyword', 'placement', 'campaignid', 'adgroupid'
  ];
  const tracking: Record<string, string> = {};
  for (const key of allowlist) {
    const val = params.get(key);
    if (val && val.trim().length > 0) {
      tracking[key] = val.trim().slice(0, 200);
    }
  }
  return tracking;
}

export async function submitSurveyLead(data: SurveyFormData): Promise<{ success: boolean; status?: string; code?: string }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  let resolvedTimezone = 'Asia/Kolkata';
  try {
    resolvedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
  } catch {
    // fallback to Asia/Kolkata
  }

  const payload: Record<string, any> = {
    name: data.svName.trim(),
    email: data.svEmail.trim().toLowerCase(),
    phone: data.svPhone,
    city: data.svCity.trim(),
    countryCode: '+91',
    timezone: resolvedTimezone,
    route: typeof window !== 'undefined' ? window.location.pathname || '/' : '/',
    ...getTrackingParams(),
  };

  if (data.svBill.trim()) {
    payload.monthlyPowerBill = data.svBill.trim();
  }

  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    let resData: any = null;
    try {
      resData = await response.json();
    } catch {
      return { success: false, code: 'MALFORMED_RESPONSE' };
    }

    if (
      (response.status === 200 || response.status === 201) &&
      resData &&
      resData.success === true &&
      resData.data &&
      (resData.data.status === 'new' || resData.data.status === 'existing')
    ) {
      return { success: true, status: resData.data.status };
    }

    return {
      success: false,
      code: resData?.code || 'SERVER_ERROR',
    };
  } catch (err: any) {
    if (err.name === 'AbortError') {
      return { success: false, code: 'TIMEOUT' };
    }
    return { success: false, code: 'NETWORK_ERROR' };
  } finally {
    clearTimeout(timeoutId);
  }
}

export default function SurveyModal() {
  const { isOpen, closeSurveyModal } = useSurveyModal();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string>('');

  const isSubmittingRef = useRef<boolean>(false);

  const [formData, setFormData] = useState<SurveyFormData>({
    svName: '',
    svEmail: '',
    svPhone: '',
    svCity: '',
    svBill: '',
  });

  const [touched, setTouched] = useState({
    svName: false,
    svEmail: false,
    svPhone: false,
    svCity: false,
    svBill: false,
  });

  const [errors, setErrors] = useState({
    svName: '',
    svEmail: '',
    svPhone: '',
    svCity: '',
    svBill: '',
  });

  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const billInputRef = useRef<HTMLInputElement>(null);

  // Validate single field
  const validateField = (field: keyof SurveyFormData, value: string): string => {
    switch (field) {
      case 'svName':
        return isValidName(value) ? '' : 'Please enter your name.';
      case 'svEmail':
        return isValidEmail(value) ? '' : 'Please enter a valid email address.';
      case 'svPhone':
        return isValidPhone(value) ? '' : 'Enter a valid 10-digit phone number.';
      case 'svCity':
        return isValidCity(value) ? '' : 'Please enter your city.';
      case 'svBill':
        return isValidBill(value) ? '' : 'Enter a valid bill amount (up to 7 digits).';
      default:
        return '';
    }
  };

  // Re-validate when data or touched changes
  useEffect(() => {
    setErrors({
      svName: touched.svName ? validateField('svName', formData.svName) : '',
      svEmail: touched.svEmail ? validateField('svEmail', formData.svEmail) : '',
      svPhone: touched.svPhone ? validateField('svPhone', formData.svPhone) : '',
      svCity: touched.svCity ? validateField('svCity', formData.svCity) : '',
      svBill: touched.svBill ? validateField('svBill', formData.svBill) : '',
    });
  }, [formData, touched]);

  // Modal open / close accessibility management
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      setSubmitted(false);
      setIsSubmitting(false);
      isSubmittingRef.current = false;
      setFormError('');
      setFormData({ svName: '', svEmail: '', svPhone: '', svCity: '', svBill: '' });
      setTouched({ svName: false, svEmail: false, svPhone: false, svCity: false, svBill: false });
      setErrors({ svName: '', svEmail: '', svPhone: '', svCity: '', svBill: '' });
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
      if (triggerRef.current && typeof triggerRef.current.focus === 'function') {
        triggerRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard navigation: Escape key & Focus Trapping
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        closeSurveyModal();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
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

  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = e.target.value.replace(/\D/g, '').slice(0, 7);
    setFormData((prev) => ({ ...prev, svBill: sanitized }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Atomic request lock check
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setIsSubmitting(true);

    setFormError('');
    setTouched({
      svName: true,
      svEmail: true,
      svPhone: true,
      svCity: true,
      svBill: true,
    });

    const nameErr = validateField('svName', formData.svName);
    const emailErr = validateField('svEmail', formData.svEmail);
    const phoneErr = validateField('svPhone', formData.svPhone);
    const cityErr = validateField('svCity', formData.svCity);
    const billErr = validateField('svBill', formData.svBill);

    setErrors({
      svName: nameErr,
      svEmail: emailErr,
      svPhone: phoneErr,
      svCity: cityErr,
      svBill: billErr,
    });

    if (nameErr) {
      nameInputRef.current?.focus();
      setIsSubmitting(false);
      isSubmittingRef.current = false;
      return;
    }
    if (emailErr) {
      emailInputRef.current?.focus();
      setIsSubmitting(false);
      isSubmittingRef.current = false;
      return;
    }
    if (phoneErr) {
      phoneInputRef.current?.focus();
      setIsSubmitting(false);
      isSubmittingRef.current = false;
      return;
    }
    if (cityErr) {
      cityInputRef.current?.focus();
      setIsSubmitting(false);
      isSubmittingRef.current = false;
      return;
    }
    if (billErr) {
      billInputRef.current?.focus();
      setIsSubmitting(false);
      isSubmittingRef.current = false;
      return;
    }

    try {
      const result = await submitSurveyLead(formData);
      if (result.success) {
        setSubmitted(true);
      } else {
        // Fixed safe UI error mapping
        if (result.code === 'VALIDATION_ERROR') {
          setFormError('Please check your details and try again.');
        } else if (result.code === 'USER_ALREADY_EXISTS') {
          setFormError('It looks like you already have an account with this email or phone number.');
        } else if (result.code === 'TIMEOUT') {
          setFormError('Request timed out. Please check your connection and try again.');
        } else if (result.code === 'NETWORK_ERROR') {
          setFormError('Network connection failed. Please check your internet and try again.');
        } else {
          setFormError('Something went wrong. Please check your details and try again.');
        }
      }
    } catch {
      setFormError('Something went wrong. Please check your details and try again.');
    } finally {
      setIsSubmitting(false);
      isSubmittingRef.current = false;
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
        ref={modalRef}
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

            {formError && (
              <div
                className="survey-form-alert"
                role="alert"
                aria-live="polite"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#ef4444',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  fontSize: '14px',
                  lineHeight: '1.4',
                }}
              >
                {formError}
              </div>
            )}

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
                <label htmlFor="svEmail">Email address</label>
                <input
                  type="email"
                  id="svEmail"
                  ref={emailInputRef}
                  autoComplete="email"
                  placeholder="name@example.com"
                  required
                  value={formData.svEmail}
                  onChange={(e) => setFormData({ ...formData, svEmail: e.target.value })}
                  onBlur={() => handleBlur('svEmail')}
                  className={errors.svEmail ? 'is-invalid' : ''}
                  aria-invalid={Boolean(errors.svEmail)}
                  aria-describedby={errors.svEmail ? 'svEmailError' : undefined}
                />
                {errors.svEmail && (
                  <span className="survey-field-error" id="svEmailError" role="alert">
                    {errors.svEmail}
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
                    type="text"
                    inputMode="numeric"
                    id="svBill"
                    ref={billInputRef}
                    placeholder="e.g. 3200"
                    value={formData.svBill}
                    onChange={handleBillChange}
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
