import React from 'react';

export default function Subsidy() {
  return (
    <section className="subsidy">
      <div className="wrap">
        <div className="subsidy-grid">
          <div className="reveal">
            <span className="eyebrow">PM Surya Ghar</span>
            <h2>Go solar without a lump-sum shock.</h2>
            <p>
              Central subsidy support up to ₹78,000 where eligible for Indian homes, plus flexible EMI so bill savings can help cover installments.
            </p>
            <div className="subsidy-steps">
              <div className="subsidy-step">
                <div className="n">01</div>
                <div>
                  <h4>Check eligibility</h4>
                  <p>Home segment, bill band, and roof readiness.</p>
                </div>
              </div>
              <div className="subsidy-step">
                <div className="n">02</div>
                <div>
                  <h4>Subsidy support</h4>
                  <p>We handle PM Surya Ghar paperwork with you.</p>
                </div>
              </div>
              <div className="subsidy-step">
                <div className="n">03</div>
                <div>
                  <h4>EMI options</h4>
                  <p>Structure payments so bill savings can offset EMIs.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="subsidy-table reveal">
            <table>
              <thead>
                <tr>
                  <th>System size</th>
                  <th>Indicative subsidy</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1 kW</td>
                  <td>
                    <b>₹30,000</b>
                  </td>
                </tr>
                <tr>
                  <td>2 kW</td>
                  <td>
                    <b>₹60,000</b>
                  </td>
                </tr>
                <tr>
                  <td>3 kW and above</td>
                  <td>
                    <b>₹78,000</b>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="subsidy-foot">
              Subject to current PM Surya Ghar scheme rules and eligibility.{' '}
              <a href="#contact" style={{ color: 'var(--forest-800)', fontWeight: 600 }}>
                Check my subsidy eligibility →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
