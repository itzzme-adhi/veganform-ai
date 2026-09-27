import { SubstitutionPair, ProductKnowledgeRecord, BatchIngredient } from '../types/formulation';

/**
 * Functional substitution engine that pairs animal precursors with multi-botanical analog matrices
 * Returns mechanistic reason for each substitution
 */
export function buildFunctionalSubstitutions(
  productKnowledge: ProductKnowledgeRecord,
  batchMatrix: BatchIngredient[]
): SubstitutionPair[] {
  const pairs: SubstitutionPair[] = [];

  // Use pre-configured recommended substitutions if available
  if (productKnowledge.recommendedSubstitutions && productKnowledge.recommendedSubstitutions.length > 0) {
    for (const rec of productKnowledge.recommendedSubstitutions) {
      // Find matching ingredients currently in the batch
      const matched = rec.suggestedVeganIngredients.filter(suggested =>
        batchMatrix.some(b => b.name.toLowerCase().includes(suggested.toLowerCase().split(' ')[0]))
      );

      const analogLabel = matched.length > 0
        ? matched.join(' + ')
        : rec.suggestedVeganIngredients.slice(0, 2).join(' + ');

      pairs.push({
        animalPrecursor: rec.animalComponent,
        botanicalAnalog: analogLabel,
        functionalRole: rec.functionalRole,
        scientificReasoning: rec.mechanisticReasoning
      });
    }
  }

  // Ensure at least 3 substitution pairs
  if (pairs.length < 3) {
    // Generate functional pairs from batch ingredients
    const primaryScaffold = batchMatrix.find(b => b.highlight) || batchMatrix[0];
    const lipid = batchMatrix.find(b => b.function.toLowerCase().includes('lipid') || b.function.toLowerCase().includes('fat') || b.name.toLowerCase().includes('oil'));
    const binder = batchMatrix.find(b => b.function.toLowerCase().includes('binder') || b.function.toLowerCase().includes('starch') || b.function.toLowerCase().includes('gel'));

    if (primaryScaffold && !pairs.some(p => p.animalPrecursor.includes('protein') || p.animalPrecursor.includes('muscle') || p.animalPrecursor.includes('curd'))) {
      pairs.push({
        animalPrecursor: 'Animal structural protein matrix',
        botanicalAnalog: primaryScaffold.name,
        functionalRole: primaryScaffold.function,
        scientificReasoning: 'Texturized botanical protein unfolds under thermal shear into anisotropic structural filaments mimicking native animal tissue.'
      });
    }

    if (lipid && !pairs.some(p => p.animalPrecursor.includes('fat') || p.animalPrecursor.includes('lipid'))) {
      pairs.push({
        animalPrecursor: 'Animal saturated & intramuscular fat',
        botanicalAnalog: lipid.name,
        functionalRole: lipid.function,
        scientificReasoning: 'Plant lipid blend provides controlled melting phase transition for juiciness and creamy mouth-coating.'
      });
    }

    if (binder && !pairs.some(p => p.animalPrecursor.includes('binding') || p.animalPrecursor.includes('gel'))) {
      pairs.push({
        animalPrecursor: 'Connective collagen / albumin heat-set gel',
        botanicalAnalog: binder.name,
        functionalRole: binder.function,
        scientificReasoning: 'Forms an elastic colloidal gel network during thermal processing that prevents moisture weeping and maintains structural integrity.'
      });
    }
  }

  return pairs;
}
