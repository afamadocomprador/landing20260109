
import { calculateAllFrequencies, Plan } from '../utils/pricing';

describe('calculateAllFrequencies', () => {
  // Test para el caso de 1 adulto en el plan Classic
  it('should mark monthly payment as unavailable for 1 adult on Classic plan', () => {
    const result = calculateAllFrequencies({ adults: 1, plan: 'Classic' });
    const monthlyResult = result.find(r => r.frequency === 'Mensual');

    expect(monthlyResult).toBeDefined();
    expect(monthlyResult!.isAvailable).toBe(false);
    expect(monthlyResult!.total).toBe(7.90);
  });

  // Test para el caso de 4 adultos en el plan Classic
  it('should mark monthly payment as available for 4 adults on Classic plan', () => {
    const result = calculateAllFrequencies({ adults: 4, plan: 'Classic' });
    const monthlyResult = result.find(r => r.frequency === 'Mensual');

    expect(monthlyResult).toBeDefined();
    expect(monthlyResult!.isAvailable).toBe(true);
    // 4 adultos * 7.90€/mes = 31.60€
    expect(monthlyResult!.total).toBe(31.60);
  });

  // Test para el caso de 1 adulto en el plan Élite
  it('should mark monthly payment as unavailable for 1 adult on Elite plan', () => {
    const result = calculateAllFrequencies({ adults: 1, plan: 'Elite' });
    const monthlyResult = result.find(r => r.frequency === 'Mensual');

    expect(monthlyResult).toBeDefined();
    expect(monthlyResult!.isAvailable).toBe(false);
    expect(monthlyResult!.total).toBe(10.90);
  });

  // Test para el caso de 0 adultos
  it('should mark all frequencies as unavailable if there are 0 adults', () => {
    const result = calculateAllFrequencies({ adults: 0, plan: 'Classic' });
    const allUnavailable = result.every(r => !r.isAvailable);

    expect(allUnavailable).toBe(true);
  });

  // Test para verificar que los cálculos sean correctos para múltiples adultos
  it('should calculate the correct total for multiple adults', () => {
    const result = calculateAllFrequencies({ adults: 3, plan: 'Elite' });

    const annualResult = result.find(r => r.frequency === 'Anual');
    // 3 adultos * 121.68€/año = 365.04€
    expect(annualResult!.total).toBe(365.04);
  });
});
