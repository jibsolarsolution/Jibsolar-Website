import React from 'react';

export default function Segments() {
  return (
    <section className="segments" id="homes">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Who we power</span>
          <h2>Built for every Indian roof.</h2>
          <p>Whichever path fits you, it ends the same way — a site-specific design, a clear number, and a free survey.</p>
        </div>
        <div className="seg-grid">
          <div
            className="seg-card reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1745187946672-2c1d8cf26a2b?q=80&w=900&auto=format&fit=crop')",
            }}
          >
            <h3>Homes</h3>
            <p>Cut monthly bills for houses and independent homes anywhere in India.</p>
            <a href="#contact">Book a home survey →</a>
          </div>
          <div
            className="seg-card reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1757125505346-2d71c70e6003?q=80&w=900&auto=format&fit=crop')",
            }}
          >
            <h3>Housing societies</h3>
            <p>Bring down common-area electricity costs for apartments and gated communities.</p>
            <a href="#contact">Book a society survey →</a>
          </div>
          <div
            className="seg-card reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1745015446589-7ee6f702d8c1?q=80&w=900&auto=format&fit=crop')",
            }}
          >
            <h3>Businesses</h3>
            <p>Stabilize operating costs for shops, offices, and small commercial loads.</p>
            <a href="#contact">Book a business survey →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
