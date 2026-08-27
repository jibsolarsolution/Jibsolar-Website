import React from 'react';

export default function Assurance() {
  return (
    <section className="assurance">
      <div className="wrap">
        <div className="assurance-panel reveal">
          <div>
            <span className="eyebrow" style={{ color: 'var(--gold-soft)' }}>
              The Jibsolar guarantee
            </span>
            <h2>We put our output estimate on paper.</h2>
            <p>
              If your system underperforms against the agreed generation band in the first 12 months, we make it right — service first, compensation if it&apos;s still needed.
            </p>
            <a href="#contact" className="btn btn-primary">
              Get Assurance on my quote
            </a>
          </div>
          <div className="cert-card">
            <h4>Assurance certificate — issued with every approved design</h4>
            <ul className="cert-list">
              <li>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Written generation band for year one
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Free corrective visits if output drifts
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Real-time monitoring included
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Repair cover inside your care plan
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
