import { BatchIngredient } from '../types/formulation';
import { resolveIngredient } from '../data/ingredientDatabase';

export interface CalculatedCost {
  costPerKg: number;
  currencySymbol: string;
  costAllocation: {
    name: string;
    percent: number;
    amount: number;
    color: string;
  }[];
  isUnderCeiling: boolean;
  costSavingsPercentVsRef: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  'Protein Isolate': '#00f5a0',
  'Flour & Grain': '#4edea3',
  'Functional Lipid': '#00d8f6',
  'Starch & Binder': '#fbbf24',
  'Umami & Flavor': '#c084fc',
  'Plant Milk': '#38bdf8',
  'Fiber & Whole Food': '#a3e635',
  'Hydrocolloid': '#f472b6',
  'Mineral & Liquid': '#94a3b8'
};

const FALLBACK_PALETTE = ['#00f5a0', '#00d8f6', '#fbbf24', '#c084fc', '#a3e635', '#f472b6', '#38bdf8', '#94a3b8'];

/**
 * Calculates formulation cost using structured ingredient data
 */
export function calculateCost(
  batchMatrix: BatchIngredient[],
  costCeiling: number = 250,
  referenceCostPerKg: number = 240,
  currencySymbol: string = '₹'
): CalculatedCost {
  const totalWeight = batchMatrix.reduce((sum, item) => sum + item.wtPercent, 0) || 100;
  
  let totalCost = 0;
  const rawItems: { name: string; costContribution: number; color: string }[] = [];

  batchMatrix.forEach((item, idx) => {
    const ing = resolveIngredient(item.name);
    const costPerKg = ing ? ing.estimatedCostPerKg : 120;
    const fraction = item.wtPercent / totalWeight;
    const costContribution = fraction * costPerKg;
    totalCost += costContribution;

    const color = ing ? (CATEGORY_COLORS[ing.category] || FALLBACK_PALETTE[idx % FALLBACK_PALETTE.length]) : FALLBACK_PALETTE[idx % FALLBACK_PALETTE.length];
    rawItems.push({
      name: item.name,
      costContribution,
      color
    });
  });

  const finalCost = Math.round(totalCost * 10) / 10;
  const isUnderCeiling = finalCost <= costCeiling;
  const costSavingsPercentVsRef = Math.max(0, Math.round(((referenceCostPerKg - finalCost) / referenceCostPerKg) * 100));

  // Build allocation breakdown (top items + other if many)
  const sorted = [...rawItems].sort((a, b) => b.costContribution - a.costContribution);
  const costAllocation = sorted.map(item => {
    const pct = totalCost > 0 ? Math.round((item.costContribution / totalCost) * 100) : 0;
    return {
      name: item.name,
      percent: pct,
      amount: Math.round(item.costContribution * 100) / 100,
      color: item.color
    };
  });

  return {
    costPerKg: finalCost,
    currencySymbol,
    costAllocation,
    isUnderCeiling,
    costSavingsPercentVsRef
  };
}
