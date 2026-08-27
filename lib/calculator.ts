export type Segment = 'home' | 'society' | 'business';

export const RATE_BY_SEGMENT: Record<Segment, number> = {
  home: 7,
  society: 8,
  business: 9.5,
};

export function subsidyFor(kw: number): number {
  if (kw < 1.5) return 30000;
  if (kw < 2.5) return 60000;
  return 78000;
}

export interface CalculationResult {
  currentBill: number;
  recSizeKw: number;
  afterBill: number;
  monthlySave: number;
  annualSave: number;
  subsidyAmt: number;
}

export function formatInr(n: number): string {
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

export function calculateSavings(bill: number, segment: Segment): CalculationResult {
  const rate = RATE_BY_SEGMENT[segment];
  const impliedUnits = bill / rate;
  const genPerKwMonth = 130; // ~4.3 peak-sun-hours/day
  
  let recSize = Math.max(1, Math.round((impliedUnits / genPerKwMonth) * 2) / 2);
  recSize = Math.min(recSize, 15);
  
  const generated = recSize * genPerKwMonth;
  const netUnits = Math.max(0, impliedUnits - generated);
  const afterBill = netUnits * rate;
  const monthlySave = Math.max(0, bill - afterBill);
  const annualSave = monthlySave * 12;
  const subsidyAmt = subsidyFor(recSize);

  return {
    currentBill: bill,
    recSizeKw: recSize,
    afterBill,
    monthlySave,
    annualSave,
    subsidyAmt,
  };
}
