"use client";

import React, { useState } from 'react';

type FilterType = 'all' | 'home' | 'society' | 'business';

interface GalleryItem {
  id: number;
  category: 'home' | 'society' | 'business';
  imageUrl: string;
  tag: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    category: 'home',
    imageUrl:
      'https://images.unsplash.com/photo-1745187946672-2c1d8cf26a2b?q=80&w=900&auto=format&fit=crop',
    tag: 'Bengaluru · 6 kW · Home',
  },
  {
    id: 2,
    category: 'home',
    imageUrl:
      'https://images.unsplash.com/photo-1756232973381-5ed87773a908?q=80&w=900&auto=format&fit=crop',
    tag: 'Ahmedabad · 3 kW · Home',
  },
  {
    id: 3,
    category: 'society',
    imageUrl:
      'https://images.unsplash.com/photo-1757125505346-2d71c70e6003?q=80&w=900&auto=format&fit=crop',
    tag: 'Pune · 42 kW · Society',
  },
  {
    id: 4,
    category: 'business',
    imageUrl:
      'https://images.unsplash.com/photo-1745015446589-7ee6f702d8c1?q=80&w=900&auto=format&fit=crop',
    tag: 'Jaipur · 15 kW · Business',
  },
  {
    id: 5,
    category: 'home',
    imageUrl:
      'https://images.unsplash.com/photo-1745187946672-2c1d8cf26a2b?q=80&w=900&auto=format&fit=crop',
    tag: 'Hyderabad · 7 kW · Home',
  },
  {
    id: 6,
    category: 'business',
    imageUrl:
      'https://images.unsplash.com/photo-1745015446589-7ee6f702d8c1?q=80&w=900&auto=format&fit=crop',
    tag: 'Chennai · 22 kW · Business',
  },
];

export default function ProjectGallery() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  return (
    <section className="gallery">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Installs</span>
          <h2>Placeholder gallery — swap for real project photos.</h2>
          <p>These images are Unsplash stock placeholders standing in for real installation photography.</p>
        </div>
        <div className="filter-tabs" id="galleryFilters">
          <button
            type="button"
            className={activeFilter === 'all' ? 'active' : ''}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button
            type="button"
            className={activeFilter === 'home' ? 'active' : ''}
            onClick={() => setActiveFilter('home')}
          >
            Home
          </button>
          <button
            type="button"
            className={activeFilter === 'society' ? 'active' : ''}
            onClick={() => setActiveFilter('society')}
          >
            Society
          </button>
          <button
            type="button"
            className={activeFilter === 'business' ? 'active' : ''}
            onClick={() => setActiveFilter('business')}
          >
            Business
          </button>
        </div>
        <div className="gallery-grid" id="galleryGrid">
          {GALLERY_ITEMS.map((item) => {
            const isHidden = activeFilter !== 'all' && item.category !== activeFilter;
            return (
              <div
                key={item.id}
                className={`gallery-item ${isHidden ? 'hidden' : ''}`}
                data-cat={item.category}
                style={{ backgroundImage: `url('${item.imageUrl}')` }}
              >
                <span className="tag">{item.tag}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
