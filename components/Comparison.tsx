import React from 'react';

export default function Comparison() {
  return (
    <section className="compare">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Compare</span>
          <h2>Not every &quot;solar company&quot; works the same way.</h2>
          <p>A clear side-by-side so you can choose on substance, not brochure language.</p>
        </div>
        <table className="compare-table reveal">
          <thead>
            <tr>
              <th>Capability</th>
              <th>Typical contractor</th>
              <th>Big brand reseller</th>
              <th className="hl">Jibsolar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Design ownership</td>
              <td>Subcontracted</td>
              <td>Template layouts</td>
              <td className="hl">Site-specific for your roof</td>
            </tr>
            <tr>
              <td>DISCOM / subsidy filing</td>
              <td>You chase the paperwork</td>
              <td>Partial support</td>
              <td className="hl">End-to-end filing support</td>
            </tr>
            <tr>
              <td>Monitoring</td>
              <td>Optional / unclear</td>
              <td>Basic app</td>
              <td className="hl">Live savings + service requests</td>
            </tr>
            <tr>
              <td>Maintenance</td>
              <td>Call-and-wait</td>
              <td>Paid AMC later</td>
              <td className="hl">Proactive care plan</td>
            </tr>
            <tr>
              <td>Performance promise</td>
              <td>Verbal estimate</td>
              <td>Brochure claim</td>
              <td className="hl">Written generation band</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
