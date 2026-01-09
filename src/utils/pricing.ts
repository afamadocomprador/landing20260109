// utils/pricing.ts
export const calculatePrice = (age: number, basePrice: number) => {
  // Regla de negocio: Menores de 15 años (0 a 14) = 0€
  if (age < 15) return 0;
  return basePrice;
};
