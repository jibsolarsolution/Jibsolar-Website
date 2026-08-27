import React from 'react';

export default function Process() {
  return (
    <section className="process" id="process">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">How it works</span>
          <h2>Four steps, one team, zero runaround.</h2>
          <p>A calm path from first conversation to live generation — no chasing vendors across five WhatsApp groups.</p>
        </div>
        <div className="process-grid">
          <div className="process-card reveal">
            <div className="process-num">01</div>
            <div className="process-line" />
            <h3>Survey</h3>
            <p>On-site roof, load, and shadow mapping at your address.</p>
          </div>
          <div className="process-card reveal">
            <div className="process-num">02</div>
            <div className="process-line" />
            <h3>Design</h3>
            <p>A site-specific layout with a clear, itemized quote.</p>
          </div>
          <div className="process-card reveal">
            <div className="process-num">03</div>
            <div className="process-line" />
            <h3>Install &amp; subsidy</h3>
            <p>Clean install plus PM Surya Ghar paperwork support where eligible.</p>
          </div>
          <div className="process-card reveal">
            <div className="process-num">04</div>
            <h3>Live &amp; maintain</h3>
            <p>System online, net-metered, with monitoring and care staying with us.</p>
          </div>
        </div>
        <div
          className="process-banner reveal"
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(4,20,15,0.85), rgba(4,20,15,0.15)), url('https://images.unsplash.com/photo-1745187946672-2c1d8cf26a2b?q=80&w=1600&auto=format&fit=crop')",
          }}
        >
          <span>Every step, tracked end to end — right up to your first day on solar.</span>
        </div>
      </div>
    </section>
  );
}
