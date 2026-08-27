"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SurveyModalContextType {
  isOpen: boolean;
  openSurveyModal: () => void;
  closeSurveyModal: () => void;
}

const SurveyModalContext = createContext<SurveyModalContextType | undefined>(undefined);

export function SurveyModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openSurveyModal = () => {
    setIsOpen(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeSurveyModal = () => {
    setIsOpen(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  };

  return (
    <SurveyModalContext.Provider value={{ isOpen, openSurveyModal, closeSurveyModal }}>
      {children}
    </SurveyModalContext.Provider>
  );
}

export function useSurveyModal(): SurveyModalContextType {
  const context = useContext(SurveyModalContext);
  if (!context) {
    throw new Error('useSurveyModal must be used within a SurveyModalProvider');
  }
  return context;
}
