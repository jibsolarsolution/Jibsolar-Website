import React from 'react';

export default function Testimonials() {
  return (
    <section className="testi">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Rooftops across India</span>
          <h2>What early rooftops are telling us.</h2>
          <p>
            These are illustrative example profiles, not verified customers yet — swap in real names, photos, and numbers as soon as you have them.
          </p>
        </div>
        <div className="testi-grid">
          <div className="testi-card reveal">
            <div
              className="testi-photo"
              role="img"
              aria-label="Model home representing a residential rooftop solar project"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=700&auto=format&fit=crop')",
              }}
            />
            <div className="testi-body">
              <span className="testi-loc">Bengaluru · 5 kW</span>
              <p className="testi-quote">
                The team walked me through the subsidy paperwork step by step — I didn&apos;t have to figure out a single government form on my own.
              </p>
              <div className="testi-nums">
                <div className="before">
                  <span>Before</span>
                  <b>₹3,400</b>
                </div>
                <div className="after">
                  <span>After</span>
                  <b>₹740</b>
                </div>
              </div>
            </div>
          </div>
          <div className="testi-card reveal">
            <div
              className="testi-photo"
              role="img"
              aria-label="Modern home representing a residential rooftop solar project"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=700&auto=format&fit=crop')",
              }}
            />
            <div className="testi-body">
              <span className="testi-loc">Pune · 4 kW</span>
              <p className="testi-quote">
                Install was done in a day and a half. Six months in, the monitoring app still shows exactly what they promised at the survey.
              </p>
              <div className="testi-nums">
                <div className="before">
                  <span>Before</span>
                  <b>₹2,850</b>
                </div>
                <div className="after">
                  <span>After</span>
                  <b>₹610</b>
                </div>
              </div>
            </div>
          </div>
          <div className="testi-card reveal">
            <div
              className="testi-photo"
              role="img"
              aria-label="Commercial buildings representing a society rooftop solar project"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=700&auto=format&fit=crop')",
              }}
            />
            <div className="testi-body">
              <span className="testi-loc">Ahmedabad · 36 kW · Society Secretary</span>
              <p className="testi-quote">
                Getting 40 committee members to agree on anything is hard. The clear cost breakdown upfront made this an easy yes for our society.
              </p>
              <div className="testi-nums">
                <div className="before">
                  <span>Before</span>
                  <b>₹31,000</b>
                </div>
                <div className="after">
                  <span>After</span>
                  <b>₹8,200</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
