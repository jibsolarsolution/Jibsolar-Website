"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSurveyModal } from '@/context/SurveyModalContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openSurveyModal } = useSurveyModal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenSurvey = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    openSurveyModal();
  };

  const closeMobile = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <header id="siteHeader" className={scrolled ? 'scrolled' : ''}>
        <div className="wrap">
          <nav>
            <a href="#top" className="brand">
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
              <a href="#homes">For Homes</a>
              <a href="#process">How it works</a>
              <a href="#calculator">Savings</a>
              <a href="#faq">FAQ</a>
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
              aria-label="Menu"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              ☰
            </button>
          </nav>
        </div>
      </header>

      <div className={`mobile-panel ${mobileOpen ? 'open' : ''}`} id="mobilePanel">
        <a href="#homes" className="mnav" onClick={closeMobile}>
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
