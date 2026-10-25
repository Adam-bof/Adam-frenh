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
import { FounderReservation, PlanTier } from './types';

export default function App() {
  const [isFounderModalOpen, setIsFounderModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<PlanTier>('founder-monthly');
  const [remainingSpots, setRemainingSpots] = useState(12);
  const [defaultSimulatorView, setDefaultSimulatorView] = useState<'accountant' | 'client'>('accountant');

  // Initialize remaining spots from localStorage and check URL parameters
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

    // Check if user arrived via client magic link URL parameter: ?view=client-demo
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === 'client-demo') {
        setDefaultSimulatorView('client');
        setTimeout(() => {
          const el = document.getElementById('interactive-simulator');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      }
    }
  }, []);

  const handleOpenFounderModal = (tier: PlanTier = 'founder-monthly') => {
    setSelectedTier(tier);
    setIsFounderModalOpen(true);
  };

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
        onOpenFounderModal={() => handleOpenFounderModal('founder-monthly')}
        remainingSpots={remainingSpots}
      />

      {/* Main Content */}
      <main className="flex-1">
        <Hero
          onOpenFounderModal={() => handleOpenFounderModal('founder-monthly')}
          onScrollToSimulator={handleScrollToSimulator}
          remainingSpots={remainingSpots}
        />

        <WorkflowSection />

        <Simulator
          onOpenFounderModal={() => handleOpenFounderModal('founder-monthly')}
          defaultView={defaultSimulatorView}
        />

        <RoiCalculator
          onOpenFounderModal={() => handleOpenFounderModal('founder-monthly')}
        />

        <ComparisonTable />

        <PricingSection
          onOpenFounderModal={handleOpenFounderModal}
          remainingSpots={remainingSpots}
        />
      </main>

      {/* Early Access / Lead Capture Modal */}
      <FounderModal
        isOpen={isFounderModalOpen}
        onClose={() => setIsFounderModalOpen(false)}
        onReservationSuccess={handleReservationSuccess}
        remainingSpots={remainingSpots}
        initialTier={selectedTier}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
