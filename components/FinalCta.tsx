import React from 'react';
import BookSurveyButton from './BookSurveyButton';

export default function FinalCta() {
  return (
    <section className="final-cta" id="contact">
      <div className="wrap">
        <div className="final-panel reveal">
          <span className="eyebrow" style={{ color: 'var(--gold-soft)', justifyContent: 'center' }}>
            Rooftop solar, nationwide
          </span>
          <h2>See what your roof can actually save.</h2>
          <p>Book a free survey. Get a clear design and number before you spend a rupee.</p>
          <div className="final-actions">
            <BookSurveyButton className="btn btn-primary js-open-survey">
              Book free survey
            </BookSurveyButton>
            <a href="#calculator" className="btn btn-ghost-dark">
              Estimate savings first
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
