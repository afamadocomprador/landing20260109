
import React from 'react';
import { PremiumCalculator } from './PremiumCalculator';

const PlanComparison: React.FC = () => {
  return (
    <section id="plan-comparison" className="py-12 md:py-20 bg-dkv-grey-bg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-dkv-grey-main font-lemon">Compara nuestros planes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plan Classic */}
          <div className="border border-dkv-grey-light rounded-dkv p-6 flex flex-col">
            <h3 className="text-2xl font-bold font-lemon text-dkv-green-digital mb-4">Classic</h3>
            <p className="text-dkv-grey-main mb-6 flex-grow">El seguro dental que te da acceso a una amplia red de clínicas con precios competitivos.</p>
            <div className="mt-auto">
                <PremiumCalculator initialPlan="Classic" />
            </div>
          </div>

          {/* Plan Élite */}
          <div className="border-2 border-dkv-green-digital rounded-dkv p-6 flex flex-col relative">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dkv-green-digital text-white px-3 py-1 text-sm font-bold rounded-full">MÁS POPULAR</span>
            <h3 className="text-2xl font-bold font-lemon text-dkv-green-digital mb-4">Élite</h3>
            <p className="text-dkv-grey-main mb-6 flex-grow">La cobertura más completa con más de 50 tratamientos gratuitos y precios especiales en el resto.</p>
            <div className="mt-auto">
                <PremiumCalculator initialPlan="Elite" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanComparison;
