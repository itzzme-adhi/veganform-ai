export type TabType = 'product' | 'formulate' | 'candidates' | 'detail' | 'knowledge' | 'demo';

export interface BatchIngredient {
  name: string;
  function: string;
  wtPercent: number;
  highlight?: boolean;
  costContribution?: number;
  allergens?: string[];
}

export interface SubstitutionPair {
  animalPrecursor: string;
  botanicalAnalog: string;
  functionalRole?: string;
  scientificReasoning?: string;
}

export interface NutritionBenchmark {
  metric: string;
  veganValue: string;
  poultryValue: string;
  deltaPercent?: string;
  highlight?: boolean;
}

export interface SensoryMetric {
  name: string;
  value: number; // percentage
  targetLabel?: string;
}

export interface MechanisticRationale {
  title: string;
  icon: string;
  description: string;
}

export interface CandidateFormulation {
  id: string;
  code: string;
  name: string;
  tagline: string;
  rank: number;
  rankBadge: string;
  rankBadgeColor: string;
  aiScore: number;
  qScore: number;
  costPerKg: number;
  currencySymbol: string;
  proteinPer100g: number;
  baseIsolate: string;
  sustainabilityLca: number;
  tasteMatch: number;
  textureParity: number;
  nutritionDensity: number;
  costEfficiency: number;
  carbonFootprintDelta: string;
  functionalParity: number;
  tasteDescriptor: string;
  textureDescriptor: string;
  caloriesKcal: number;
  fatPer100g?: number;
  carbsPer100g?: number;
  fiberPer100g?: number;
  ironPer100g?: number;
  b12Per100g?: number;
  crossSectionTextureImage: string;
  cellularMatchPercent: number;
  
  // Allergen flags
  detectedAllergens?: string[];
  allergenWarning?: string;
  constraintCompliant?: boolean;
  validationViolations?: string[];
  
  // Unknown product coverage
  isLimitedCoverage?: boolean;
  coverageNote?: string;
  
  // Detail sheet specifics
  batchMatrix: BatchIngredient[];
  substitutionMap: SubstitutionPair[];
  nutritionalProfile: NutritionBenchmark[];
  costAllocation: {
    name: string;
    percent: number;
    amount: number;
    color: string;
  }[];
  flavorChemistry: SensoryMetric[];
  rheologyTexture: SensoryMetric[];
  aiRationales: MechanisticRationale[];
  processingDirectives?: {
    technology: string;
    temperatures: { zone: string; temp: string; note: string }[];
    screwSpeedRpm: number;
    smeEnergyKjKg: number;
    diePressureMpa: number;
  };
}

export interface BaselineTarget {
  id: string;
  name: string;
  subtitle: string;
  archetypeImage: string;
  rasterCode: string;
  matchPrecision: number;
  description: string;
  proteinDensity: string;
  anisotropicFiber: string;
  thermalGelation: string;
  waterActivity: string;
  category?: string;
  defaultCostCeiling?: number;
  defaultProteinTarget?: number;
}

export interface BotanicalIngredient {
  id: string;
  name: string;
  category: 'Protein Isolate' | 'Hydrocolloid & Binder' | 'Functional Lipid' | 'Umami & Flavor' | 'Scaffold Starch' | 'Whole Botanical' | 'Plant Milk' | 'Functional Mineral';
  origin: string;
  proteinContent: number; // %
  shearSuitability: number; // %
  gellingTemp: string;
  allergens: string[];
  cleanLabel: boolean;
  estCostKg: number;
  keyProperty: string;
}

export interface IngredientRecord {
  id: string;
  name: string;
  category: 'Protein Isolate' | 'Flour & Grain' | 'Functional Lipid' | 'Starch & Binder' | 'Umami & Flavor' | 'Plant Milk' | 'Fiber & Whole Food' | 'Hydrocolloid' | 'Mineral & Liquid';
  vegan: boolean;
  proteinPer100g: number;
  caloriesPer100g: number;
  fatPer100g: number;
  carbsPer100g: number;
  fiberPer100g: number;
  ironPer100g: number; // mg
  b12Per100g: number; // mcg
  estimatedCostPerKg: number; // in ₹ or $
  carbonKgPerKg: number; // kg CO2e / kg
  functionalRoles: string[];
  textureProperties: string[];
  flavorProperties: string[];
  allergens: string[]; // e.g. ['Soy'], ['Gluten'], ['Tree Nuts']
}

export interface FormulationWeights {
  tasteWeight: number; // 0-100
  textureWeight: number; // 0-100
  nutritionWeight: number; // 0-100
  costWeight: number; // 0-100
  sustainabilityWeight: number; // 0-100
}

export interface FormulationRequest {
  productName: string;
  tastePriority: number;
  texturePriority: number;
  nutritionPriority: number;
  costPriority: number;
  sustainabilityPriority: number;
  costCeiling: number;
  proteinTarget: number;
  allergenRestrictions: string[]; // e.g. ['Soy', 'Gluten', 'Nuts', 'Dairy', 'Egg']
  additionalRequirements: string;
  primaryBase?: string;
  extrusionTech?: string;
}

export interface ProductKnowledgeRecord {
  name: string;
  category: string;
  functionalProperties: string[];
  keyAnimalDerivedComponents: string[];
  benchmarks: {
    proteinPer100g: number;
    caloriesPer100g: number;
    fatPer100g: number;
    carbsPer100g: number;
    fiberPer100g: number;
    ironPer100g: number;
    b12Per100g: number;
    waterContentPercent: number;
    referenceCarbonKgPerKg: number;
    referenceCostPerKg: number;
  };
  recommendedSubstitutions: {
    animalComponent: string;
    functionalRole: string;
    suggestedVeganIngredients: string[];
    mechanisticReasoning: string;
  }[];
}
