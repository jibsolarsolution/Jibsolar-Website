"use client";

import React, { useState } from 'react';

type FaqCategory = 'all' | 'fit' | 'process' | 'money';

interface FaqItemData {
  id: number;
  category: 'fit' | 'process' | 'money';
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

const FAQ_ITEMS: FaqItemData[] = [
  {
    id: 1,
    category: 'fit',
    defaultOpen: true,
    question: 'Is my electricity bill high enough for solar?',
    answer:
      "If your average monthly bill is around ₹1,500 or more, rooftop solar usually makes strong sense. Lower bills are still worth a free assessment — we'll tell you honestly if it doesn't pay off yet.",
  },
  {
    id: 2,
    category: 'fit',
    question: 'Which parts of India do you serve?',
    answer:
      "We're expanding city by city across India. See the service area list in the footer, or ask us directly about your town.",
  },
  {
    id: 3,
    category: 'process',
    question: 'How long does installation take?',
    answer:
      'Most home systems are installed within a few days once the design and subsidy paperwork are finalized. Exact timing depends on system size and roof access.',
  },
  {
    id: 4,
    category: 'process',
    question: 'Who handles the government subsidy?',
    answer:
      "We prepare and file the PM Surya Ghar paperwork with you, so you're not managing forms and portals alone.",
  },
  {
    id: 5,
    category: 'money',
    question: 'What does payback usually look like?',
    answer:
      'It depends on your bill size and system cost — the calculator above gives an estimate, and your survey gives an exact number before you commit to anything.',
  },
  {
    id: 6,
    category: 'money',
    question: 'Will solar work during a power cut?',
    answer:
      'A standard grid-tied system shuts off during outages for safety. Battery backup options are available if you want power during cuts too — ask us during your survey.',
  },
];

export default function Faq() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('all');
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({
    1: true,
  });

  const toggleItem = (id: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Questions, answered clearly</span>
          <h2>What Indian homeowners ask before booking.</h2>
        </div>
        <div className="faq-cats" id="faqCats">
          <button
            type="button"
            className={activeCategory === 'all' ? 'active' : ''}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          <button
            type="button"
            className={activeCategory === 'fit' ? 'active' : ''}
            onClick={() => setActiveCategory('fit')}
          >
            Fit
          </button>
          <button
            type="button"
            className={activeCategory === 'process' ? 'active' : ''}
            onClick={() => setActiveCategory('process')}
          >
            Process
          </button>
          <button
            type="button"
            className={activeCategory === 'money' ? 'active' : ''}
            onClick={() => setActiveCategory('money')}
          >
            Money
          </button>
        </div>
        <div className="faq-list" id="faqList">
          {FAQ_ITEMS.map((item) => {
            const isHidden = activeCategory !== 'all' && item.category !== activeCategory;
            const isOpen = !!openItems[item.id];
            return (
              <div
                key={item.id}
                className={`faq-item ${isOpen ? 'open' : ''} ${isHidden ? 'hidden' : ''}`}
                data-cat={item.category}
              >
                <button
                  type="button"
                  className="faq-q"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <span className="plus" />
                </button>
                <div className="faq-a">
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
