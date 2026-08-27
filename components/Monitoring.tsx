import React from 'react';

export default function Monitoring() {
  return (
    <section className="monitor">
      <div className="wrap">
        <div className="monitor-grid">
          <div className="light-on-dark reveal">
            <span className="eyebrow" style={{ color: 'var(--gold-soft)' }}>
              Jibsolar Monitor
            </span>
            <h2>Know what your roof earned today.</h2>
            <p>Live generation, savings trend, and service requests — on your phone.</p>
            <ul>
              <li>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Track generation wherever you are
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                See savings trends, not just raw units
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Raise a service request in a few taps
              </li>
            </ul>
          </div>
          <div className="phone-mock reveal">
            <div className="phone-head">
              <span>Jibsolar Monitor</span>
              <span>Today</span>
            </div>
            <div className="phone-stat">
              <b>24.6 kWh</b>
              <span>Generation</span>
            </div>
            <div className="phone-row">
              <span>Saved today</span>
              <b>₹186</b>
            </div>
            <div className="phone-row">
              <span>Month to date</span>
              <b>₹4,820</b>
            </div>
            <div className="phone-row">
              <span>Service requests</span>
              <b>0 open</b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
