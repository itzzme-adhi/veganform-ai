import { BatchIngredient, NutritionBenchmark, ProductKnowledgeRecord } from '../types/formulation';
import { resolveIngredient } from '../data/ingredientDatabase';

export interface CalculatedNutrition {
  caloriesKcal: number;
  proteinPer100g: number;
  fatPer100g: number;
  carbsPer100g: number;
  fiberPer100g: number;
  ironPer100g: number;
  b12Per100g: number;
  nutritionalProfile: NutritionBenchmark[];
  calculationMethod: string;
}

/**
 * Calculates deterministic nutrition from ingredient percentage composition
 * DO NOT allow Gemini to invent exact nutrition values.
 */
export function calculateNutrition(
  batchMatrix: BatchIngredient[],
  productKnowledge: ProductKnowledgeRecord
): CalculatedNutrition {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalFat = 0;
  let totalCarbs = 0;
  let totalFiber = 0;
  let totalIron = 0;
  let totalB12 = 0;

  // Calculate sum of percentages to ensure normalization
  const totalWeight = batchMatrix.reduce((sum, item) => sum + item.wtPercent, 0) || 100;

  for (const item of batchMatrix) {
    const fraction = item.wtPercent / totalWeight;
    const ing = resolveIngredient(item.name);

    if (ing) {
      totalCalories += fraction * ing.caloriesPer100g;
      totalProtein += fraction * ing.proteinPer100g;
      totalFat += fraction * ing.fatPer100g;
      totalCarbs += fraction * ing.carbsPer100g;
      totalFiber += fraction * ing.fiberPer100g;
      totalIron += fraction * ing.ironPer100g;
      totalB12 += fraction * ing.b12Per100g;
    }
  }

  const roundedCalories = Math.round(totalCalories);
  const roundedProtein = Math.round(totalProtein * 10) / 10;
  const roundedFat = Math.round(totalFat * 10) / 10;
  const roundedCarbs = Math.round(totalCarbs * 10) / 10;
  const roundedFiber = Math.round(totalFiber * 10) / 10;
  const roundedIron = Math.round(totalIron * 10) / 10;
  const roundedB12 = Math.round(totalB12 * 100) / 100;

  const rawBench = productKnowledge?.benchmarks || {};
  const bench = {
    proteinPer100g: rawBench.proteinPer100g ?? 18.0,
    caloriesPer100g: rawBench.caloriesPer100g ?? 220,
    fatPer100g: rawBench.fatPer100g ?? 12.0,
    carbsPer100g: rawBench.carbsPer100g ?? 1.0,
    fiberPer100g: rawBench.fiberPer100g ?? 0.0,
    ironPer100g: rawBench.ironPer100g ?? 1.5,
    b12Per100g: rawBench.b12Per100g ?? 0.3
  };

  // Helper for delta percentage
  const calcDelta = (vegan: number, ref: number) => {
    if (!ref || ref === 0) return '+0%';
    const pct = Math.round(((vegan - ref) / ref) * 100);
    return pct >= 0 ? `+${pct}%` : `${pct}%`;
  };

  const nutritionalProfile: NutritionBenchmark[] = [
    {
      metric: 'Crude Protein Content',
      veganValue: `${roundedProtein.toFixed(1)}g / 100g`,
      poultryValue: `${bench.proteinPer100g.toFixed(1)}g / 100g`,
      deltaPercent: calcDelta(roundedProtein, bench.proteinPer100g),
      highlight: roundedProtein >= bench.proteinPer100g
    },
    {
      metric: 'Total Digestible Calories',
      veganValue: `${roundedCalories} kcal`,
      poultryValue: `${bench.caloriesPer100g} kcal`,
      deltaPercent: calcDelta(roundedCalories, bench.caloriesPer100g)
    },
    {
      metric: 'Total Lipid / Fat',
      veganValue: `${roundedFat.toFixed(1)}g / 100g`,
      poultryValue: `${bench.fatPer100g.toFixed(1)}g / 100g`,
      deltaPercent: calcDelta(roundedFat, bench.fatPer100g)
    },
    {
      metric: 'Total Carbohydrates',
      veganValue: `${roundedCarbs.toFixed(1)}g / 100g`,
      poultryValue: `${bench.carbsPer100g.toFixed(1)}g / 100g`,
      deltaPercent: calcDelta(roundedCarbs, bench.carbsPer100g)
    },
    {
      metric: 'Dietary Prebiotic Fiber',
      veganValue: `${roundedFiber.toFixed(1)}g / 100g`,
      poultryValue: `${bench.fiberPer100g.toFixed(1)}g / 100g`,
      deltaPercent: roundedFiber > 0 ? `+${Math.round(roundedFiber * 100)}%` : '0%',
      highlight: true
    },
    {
      metric: 'Bioavailable Iron (Fe)',
      veganValue: `${roundedIron.toFixed(1)} mg / 100g`,
      poultryValue: `${bench.ironPer100g.toFixed(1)} mg / 100g`,
      deltaPercent: calcDelta(roundedIron, bench.ironPer100g)
    },
    {
      metric: 'Cobalamin (Vitamin B12)',
      veganValue: `${roundedB12.toFixed(2)} mcg / 100g`,
      poultryValue: `${bench.b12Per100g.toFixed(2)} mcg / 100g`,
      deltaPercent: calcDelta(roundedB12, bench.b12Per100g)
    }
  ];

  return {
    caloriesKcal: roundedCalories,
    proteinPer100g: roundedProtein,
    fatPer100g: roundedFat,
    carbsPer100g: roundedCarbs,
    fiberPer100g: roundedFiber,
    ironPer100g: roundedIron,
    b12Per100g: roundedB12,
    nutritionalProfile,
    calculationMethod: 'Estimated from ingredient composition'
  };
}
