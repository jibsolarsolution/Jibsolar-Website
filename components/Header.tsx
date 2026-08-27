"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useSurveyModal } from '@/context/SurveyModalContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const { openSurveyModal } = useSurveyModal();

  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section Observer for Active Navigation
  useEffect(() => {
    const sectionIds = ['homes', 'process', 'calculator', 'faq'];
    const sections: HTMLElement[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sections.push(el);
    });

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, []);

  // Keyboard and Focus Management for Mobile Menu
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        firstMobileLinkRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const handleOpenSurvey = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    openSurveyModal();
  };

  const closeMobile = () => {
    setMobileOpen(false);
    menuBtnRef.current?.focus();
  };

  return (
    <>
      <header id="siteHeader" className={scrolled ? 'scrolled' : ''}>
        <div className="wrap">
          <nav>
            <a href="#top" className="brand" aria-label="Jibsolar Homepage">
              <Image
                src="/logo.png"
                alt="Jibsolar logo"
                width={168}
                height={56}
                className="brand-logo-img"
                priority
              />
              <span className="brand-fallback">Jibsolar</span>
            </a>
            <div className="nav-links">
              <a
                href="#homes"
                className={activeSection === 'homes' ? 'active' : ''}
                aria-current={activeSection === 'homes' ? 'page' : undefined}
              >
                For Homes
              </a>
              <a
                href="#process"
                className={activeSection === 'process' ? 'active' : ''}
                aria-current={activeSection === 'process' ? 'page' : undefined}
              >
                How it works
              </a>
              <a
                href="#calculator"
                className={activeSection === 'calculator' ? 'active' : ''}
                aria-current={activeSection === 'calculator' ? 'page' : undefined}
              >
                Savings
              </a>
              <a
                href="#faq"
                className={activeSection === 'faq' ? 'active' : ''}
                aria-current={activeSection === 'faq' ? 'page' : undefined}
              >
                FAQ
              </a>
            </div>
            <div className="nav-right">
              <a href="#calculator" className="btn-outline-small">
                Estimate savings
              </a>
              <a href="#" onClick={handleOpenSurvey} className="btn btn-primary js-open-survey">
                Book free survey
              </a>
            </div>
            <button
              className="menu-btn"
              id="menuBtn"
              ref={menuBtnRef}
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileOpen}
              aria-controls="mobilePanel"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </nav>
        </div>
      </header>

      <div className={`mobile-panel ${mobileOpen ? 'open' : ''}`} id="mobilePanel" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
        <a href="#homes" className="mnav" ref={firstMobileLinkRef} onClick={closeMobile}>
          For Homes
        </a>
        <a href="#process" className="mnav" onClick={closeMobile}>
          How it works
        </a>
        <a href="#calculator" className="mnav" onClick={closeMobile}>
          Savings
        </a>
        <a href="#faq" className="mnav" onClick={closeMobile}>
          FAQ
        </a>
        <a href="#" className="btn btn-primary mnav js-open-survey" onClick={handleOpenSurvey}>
          Book free survey
        </a>
      </div>
    </>
  );
}
