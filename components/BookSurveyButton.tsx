"use client";

import React, { ReactNode } from 'react';
import { useSurveyModal } from '@/context/SurveyModalContext';

interface BookSurveyButtonProps {
  className?: string;
  children: ReactNode;
  as?: 'a' | 'button';
  href?: string;
}

export default function BookSurveyButton({
  className = 'btn btn-primary',
  children,
  as = 'a',
  href = '#',
}: BookSurveyButtonProps) {
  const { openSurveyModal } = useSurveyModal();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openSurveyModal();
  };

  if (as === 'button') {
    return (
      <button type="button" onClick={handleClick} className={className}>
        {children}
      </button>
    );
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
