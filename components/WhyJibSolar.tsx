import React from 'react';

export default function WhyJibSolar() {
  return (
    <section className="why">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Why Jibsolar</span>
          <h2>Solar, without the usual headaches.</h2>
          <p>Clarity on design, paperwork, performance, and after-care — so going solar feels calm, not complicated.</p>
        </div>
        <div className="why-layout">
          <div
            className="why-photo reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1756232973381-5ed87773a908?q=80&w=900&auto=format&fit=crop')",
            }}
          >
            <div className="why-photo-badge">
              <b>~4.3 hrs</b>
              <span>Average peak-sun hours per day across India</span>
            </div>
          </div>
          <div className="why-grid">
            <div className="why-card reveal">
              <div className="why-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17l6-6 4 4 8-8" />
                  <path d="M15 6h6v6" />
                </svg>
              </div>
              <h3>A single point of contact</h3>
              <p>Survey through net-metering with your local DISCOM — handled entirely by us.</p>
            </div>
            <div className="why-card reveal">
              <div className="why-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" />
                </svg>
              </div>
              <h3>Numbers pulled from the tariff order</h3>
              <p>Estimates built from your real electricity bill, not a generic brochure number.</p>
            </div>
            <div className="why-card reveal">
              <div className="why-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z" />
                </svg>
              </div>
              <h3>Designed around local sun hours</h3>
              <p>Designs sized for local irradiance, roof types, and summer peak generation.</p>
            </div>
            <div className="why-card reveal">
              <div className="why-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 20l4-10 4 6 3-4 5 8" />
                </svg>
              </div>
              <h3>We stay on after install</h3>
              <p>Monitoring and maintenance so year ten still generates like year one.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
