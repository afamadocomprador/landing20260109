
export type Plan = 'Classic' | 'Elite';
export type Frequency = 'Anual' | 'Semestral' | 'Trimestral' | 'Mensual';

const MINIMUM_RECEIPT_AMOUNT = 30;

const rates = {
  Classic: {
    Anual: 88.10,
    Semestral: 45.20,
    Trimestral: 23.04,
    Mensual: 7.90,
  },
  Elite: {
    Anual: 121.68,
    Semestral: 62.36,
    Trimestral: 31.80,
    Mensual: 10.90,
  },
};

interface CalculationInput {
  adults: number;
  plan: Plan;
}

export interface PriceResult {
  frequency: Frequency;
  total: number;
  isAvailable: boolean;
}

/**
 * Calcula los precios para todas las frecuencias de pago para un plan y número de adultos dados.
 * Los niños (<14 años) no tienen coste, por lo que no se incluyen en el cálculo.
 * Aplica la regla del recibo mínimo de 30€.
 */
export const calculateAllFrequencies = ({ adults, plan }: CalculationInput): PriceResult[] => {
  // La validación de al menos 1 adulto se hará en el formulario,
  // pero si llega a 0, ningún plan estará disponible.
  if (adults < 1) {
    return (Object.keys(rates[plan]) as Frequency[]).map(freq => ({
        frequency: freq,
        total: 0,
        isAvailable: false,
    }));
  }

  const planRates = rates[plan];

  const results = (Object.keys(planRates) as Frequency[]).map(freq => {
    const rate = planRates[freq as Frequency];
    const total = adults * rate;
    const isAvailable = total >= MINIMUM_RECEIPT_AMOUNT;

    return {
      frequency: freq as Frequency,
      total: parseFloat(total.toFixed(2)), // Asegurar dos decimales
      isAvailable,
    };
  });

  return results;
};
