/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorkflowSection } from './components/WorkflowSection';
import { Simulator } from './components/Simulator';
import { RoiCalculator } from './components/RoiCalculator';
import { ComparisonTable } from './components/ComparisonTable';
import { PricingSection } from './components/PricingSection';
import { FounderModal } from './components/FounderModal';
import { Footer } from './components/Footer';
import { FounderReservation } from './types';

export default function App() {
  const [isFounderModalOpen, setIsFounderModalOpen] = useState(false);
  const [remainingSpots, setRemainingSpots] = useState(12);

  // Initialize remaining spots from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ledgerchaser_reservations');
      if (stored) {
        const parsed: FounderReservation[] = JSON.parse(stored);
        const calculatedRemaining = Math.max(2, 12 - parsed.length);
        setRemainingSpots(calculatedRemaining);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleReservationSuccess = (_newReservation: FounderReservation) => {
    setRemainingSpots(prev => Math.max(1, prev - 1));
  };

  const handleScrollToSimulator = () => {
    const el = document.getElementById('interactive-simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070B12] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Navigation */}
      <Navbar
        onOpenFounderModal={() => setIsFounderModalOpen(true)}
        remainingSpots={remainingSpots}
      />

      {/* Main Content */}
      <main className="flex-1">
        <Hero
          onOpenFounderModal={() => setIsFounderModalOpen(true)}
          onScrollToSimulator={handleScrollToSimulator}
          remainingSpots={remainingSpots}
        />

        <WorkflowSection />

        <Simulator
          onOpenFounderModal={() => setIsFounderModalOpen(true)}
        />

        <RoiCalculator
          onOpenFounderModal={() => setIsFounderModalOpen(true)}
        />

        <ComparisonTable />

        <PricingSection
          onOpenFounderModal={() => setIsFounderModalOpen(true)}
          remainingSpots={remainingSpots}
        />
      </main>

      {/* Early Access / Validation Modal */}
      <FounderModal
        isOpen={isFounderModalOpen}
        onClose={() => setIsFounderModalOpen(false)}
        onReservationSuccess={handleReservationSuccess}
        remainingSpots={remainingSpots}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
