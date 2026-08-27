import React from 'react';
import BookSurveyButton from './BookSurveyButton';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div
        className="hero-photo"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1756232973381-5ed87773a908?q=80&w=1600&auto=format&fit=crop')",
        }}
      />
      <div className="wrap hero-inner">
        <span className="eyebrow" style={{ color: 'var(--gold-soft)' }}>
          Rooftop solar across India
        </span>
        <h1>
          Your roof can pay <em>your electricity bill.</em>
        </h1>
        <p className="lead">
          We size the system, file the paperwork, put panels on the roof, and stay on call after — so switching to solar doesn&apos;t turn into a second job for you.
        </p>
        <div className="hero-cta">
          <BookSurveyButton className="btn btn-primary js-open-survey">
            Book a free site survey →
          </BookSurveyButton>
          <a href="#calculator" className="btn btn-ghost-dark">
            Estimate my savings
          </a>
        </div>
        <div className="hero-bullets">
          <span>Bill-based estimates</span>
          <span>PM Surya Ghar support</span>
          <span>25-year panel warranty</span>
          <span>Serving homes &amp; businesses across India</span>
        </div>
      </div>
    </section>
  );
}
