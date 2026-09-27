import { CandidateFormulation, FormulationWeights } from '../types/formulation';

export interface ScoreBreakdown {
  overallScore: number;
  tasteScore: number;
  textureScore: number;
  nutritionScore: number;
  costScore: number;
  sustainabilityScore: number;
  normalizedWeights: {
    taste: number;
    texture: number;
    nutrition: number;
    cost: number;
    sustainability: number;
  };
}

/**
 * Calculates multi-objective score for a formulation candidate:
 * overallScore = tasteWeight * tasteScore +
 *                textureWeight * textureScore +
 *                nutritionWeight * nutritionScore +
 *                costWeight * costScore +
 *                sustainabilityWeight * sustainabilityScore
 */
export function calculateMultiObjectiveScore(
  candidate: {
    tasteMatch: number;
    textureParity: number;
    nutritionDensity: number;
    costEfficiency: number;
    sustainabilityLca: number;
  },
  weights: FormulationWeights
): ScoreBreakdown {
  const sumWeights =
    (weights.tasteWeight || 0) +
    (weights.textureWeight || 0) +
    (weights.nutritionWeight || 0) +
    (weights.costWeight || 0) +
    (weights.sustainabilityWeight || 0);

  const total = sumWeights > 0 ? sumWeights : 100;

  const wTaste = (weights.tasteWeight || 0) / total;
  const wTexture = (weights.textureWeight || 0) / total;
  const wNutrition = (weights.nutritionWeight || 0) / total;
  const wCost = (weights.costWeight || 0) / total;
  const wSustainability = (weights.sustainabilityWeight || 0) / total;

  const weighted =
    wTaste * candidate.tasteMatch +
    wTexture * candidate.textureParity +
    wNutrition * candidate.nutritionDensity +
    wCost * candidate.costEfficiency +
    wSustainability * candidate.sustainabilityLca;

  const overallScore = Math.min(100, Math.max(10, Math.round(weighted)));

  return {
    overallScore,
    tasteScore: candidate.tasteMatch,
    textureScore: candidate.textureParity,
    nutritionScore: candidate.nutritionDensity,
    costScore: candidate.costEfficiency,
    sustainabilityScore: candidate.sustainabilityLca,
    normalizedWeights: {
      taste: Math.round(wTaste * 100),
      texture: Math.round(wTexture * 100),
      nutrition: Math.round(wNutrition * 100),
      cost: Math.round(wCost * 100),
      sustainability: Math.round(wSustainability * 100)
    }
  };
}

/**
 * Reranks candidate formulations dynamically when user changes weights
 */
export function rankFormulationCandidates(
  candidates: CandidateFormulation[],
  weights: FormulationWeights
): CandidateFormulation[] {
  const scored = candidates.map(c => {
    const breakdown = calculateMultiObjectiveScore(
      {
        tasteMatch: c.tasteMatch,
        textureParity: c.textureParity,
        nutritionDensity: c.nutritionDensity,
        costEfficiency: c.costEfficiency,
        sustainabilityLca: c.sustainabilityLca
      },
      weights
    );

    return {
      ...c,
      aiScore: breakdown.overallScore,
      qScore: breakdown.overallScore
    };
  });

  // Sort descending by aiScore
  scored.sort((a, b) => b.aiScore - a.aiScore);

  // Re-assign ranks and badges
  const rankColors = ['bg-primary text-black', 'bg-[#00d8f6] text-black', 'bg-[#c084fc] text-black', 'bg-[#f472b6] text-black', 'bg-[#94a3b8] text-white'];

  return scored.map((item, index) => {
    const rank = index + 1;
    let rankBadge = `RANK #${rank}`;
    if (rank === 1) rankBadge = 'RANK #1 • OPTIMAL FRONTIER';
    if (rank === 2) rankBadge = 'RANK #2 • HIGH PERFORMANCE';
    if (rank === 3) rankBadge = 'RANK #3 • VALUE ALTERNATIVE';

    return {
      ...item,
      rank,
      rankBadge,
      rankBadgeColor: rankColors[index % rankColors.length]
    };
  });
}
