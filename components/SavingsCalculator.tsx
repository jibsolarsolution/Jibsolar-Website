"use client";

import React, { useState } from 'react';
import {
  Segment,
  calculateSavings,
  formatInr,
} from '@/lib/calculator';

export default function SavingsCalculator() {
  const [activeSegment, setActiveSegment] = useState<Segment>('home');
  const [bill, setBill] = useState<number>(3000);
  const [loadKw, setLoadKw] = useState<number>(3.0);

  const results = calculateSavings(bill, activeSegment);

  return (
    <section className="calc-section" id="calculator">
      <div className="wrap">
        <div className="section-head light-on-dark reveal">
          <span className="eyebrow">Savings calculator</span>
          <h2>See what your roof could save.</h2>
          <p>
            A quick national estimate based on your bill. Your exact number is confirmed after a free rooftop survey.
          </p>
        </div>
        <div className="calc-grid">
          <div className="calc-panel reveal">
            <div className="calc-field">
              <label>Segment</label>
              <div className="seg-toggle" id="segToggle">
                <button
                  type="button"
                  className={activeSegment === 'home' ? 'active' : ''}
                  onClick={() => setActiveSegment('home')}
                >
                  Home
                </button>
                <button
                  type="button"
                  className={activeSegment === 'society' ? 'active' : ''}
                  onClick={() => setActiveSegment('society')}
                >
                  Society
                </button>
                <button
                  type="button"
                  className={activeSegment === 'business' ? 'active' : ''}
                  onClick={() => setActiveSegment('business')}
                >
                  Business
                </button>
              </div>
            </div>
            <div className="calc-field">
              <label htmlFor="billSlider">
                Average monthly electricity bill{' '}
                <b id="billVal">{formatInr(bill)}</b>
              </label>
              <input
                type="range"
                id="billSlider"
                min="500"
                max="60000"
                step="100"
                value={bill}
                onChange={(e) => setBill(parseFloat(e.target.value))}
              />
              <div className="range-minmax">
                <span>₹500</span>
                <span>₹60,000</span>
              </div>
            </div>
            <div className="calc-field">
              <label htmlFor="loadSlider">
                Sanctioned / contracted load{' '}
                <b id="loadVal">{loadKw.toFixed(1)} kW</b>
              </label>
              <input
                type="range"
                id="loadSlider"
                min="1"
                max="15"
                step="0.5"
                value={loadKw}
                onChange={(e) => setLoadKw(parseFloat(e.target.value))}
              />
              <div className="range-minmax">
                <span>1 kW</span>
                <span>15 kW</span>
              </div>
            </div>
            <p className="calc-note" style={{ marginTop: '6px' }}>
              Find these on your latest electricity bill — average monthly amount and sanctioned/contracted load.
            </p>
          </div>
          <div className="calc-result reveal">
            <div className="result-row">
              <span>Your current monthly bill</span>
              <b id="currentBill">{formatInr(results.currentBill)}</b>
            </div>
            <div className="result-row">
              <span>Recommended system size</span>
              <b id="sysSize">{results.recSizeKw.toFixed(1)} kW</b>
            </div>
            <div className="result-row">
              <span>Estimated bill after solar</span>
              <b id="afterBill">{formatInr(results.afterBill)}</b>
            </div>
            <div className="result-row">
              <span>Monthly savings</span>
              <b className="hl" id="monthlySave">
                {formatInr(results.monthlySave)}
              </b>
            </div>
            <div className="result-row">
              <span>Estimated annual savings</span>
              <b id="annualSave">{formatInr(results.annualSave)}</b>
            </div>
            <div className="result-row">
              <span>Indicative PM Surya Ghar subsidy</span>
              <b id="subsidyAmt">{formatInr(results.subsidyAmt)}</b>
            </div>
            <p className="calc-note">
              A simplified national estimate — assumes a blended per-unit tariff by segment and ~4.3 average peak-sun-hours/day. Actual electricity tariffs are set state-by-state and vary a fair amount, so treat this as a starting point, not a quote. Your free survey confirms the real number for your address and DISCOM.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
