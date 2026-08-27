import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#top" className="brand">
              <Image
                src="/logo.png"
                alt="Jibsolar logo"
                width={190}
                height={64}
                className="brand-logo-img brand-logo-img-footer"
              />
              <span className="brand-fallback">Jibsolar</span>
            </a>
            <p>Rooftop solar across India — quietly reliable, end to end.</p>
          </div>
          <div className="footer-col">
            <h4>Offerings</h4>
            <a href="#calculator">Savings calculator</a>
            <a href="#process">How it works</a>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <a href="#faq">FAQ</a>
            <a href="#">Privacy — placeholder</a>
            <a href="#">Terms — placeholder</a>
          </div>
          <div className="footer-col">
            <h4>Contact — placeholder</h4>
            <span>hello@jibsolar.com</span>
            <span>+91 00000 00000</span>
          </div>
        </div>
        <div className="footer-areas">
          <b>Areas we serve</b>
          Currently active in Hyderabad, Bengaluru, Pune, and Ahmedabad — expanding to more Indian cities every quarter.
        </div>
        <div className="footer-bottom">
          <span>© 2026 Jibsolar. All rights reserved.</span>
          <span>DISCOM-ready installs · PM Surya Ghar support</span>
        </div>
      </div>
    </footer>
  );
}
