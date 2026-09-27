import { IngredientRecord } from '../types/formulation';

/**
 * VEGANFORM AI - BOTANICAL INGREDIENT COMPOSITION DATABASE
 * 
 * DISCLAIMER:
 * Prototype / Demo data values for computational food R&D simulation.
 * Nutritional values (per 100g raw/unhydrated), estimated commodity prices (₹/kg or $/kg scaled),
 * and functional bio-rheological profiles are calibrated for in-silico prototype modeling.
 * Structured to permit drop-in replacement with USDA FoodData Central and Open Food Facts APIs.
 */

export const INGREDIENT_DATABASE: Record<string, IngredientRecord> = {
  'pea-protein': {
    id: 'pea-protein',
    name: 'Pea Protein Isolate 85%',
    category: 'Protein Isolate',
    vegan: true,
    proteinPer100g: 82.5,
    caloriesPer100g: 380,
    fatPer100g: 6.2,
    carbsPer100g: 2.1,
    fiberPer100g: 3.8,
    ironPer100g: 24.5,
    b12Per100g: 0.0,
    estimatedCostPerKg: 340, // ₹ / kg demo
    carbonKgPerKg: 1.4,
    functionalRoles: ['Structural Scaffold', 'High-Moisture Extrusion', 'Gelation', 'Emulsification'],
    textureProperties: ['Anisotropic fibril formation', 'Elastic gel', 'High water holding capacity'],
    flavorProperties: ['Slightly earthy', 'Nutty', 'Low beany off-notes'],
    allergens: []
  },
  'soy-protein': {
    id: 'soy-protein',
    name: 'Soy Protein Isolate 90%',
    category: 'Protein Isolate',
    vegan: true,
    proteinPer100g: 88.0,
    caloriesPer100g: 375,
    fatPer100g: 3.5,
    carbsPer100g: 1.2,
    fiberPer100g: 1.5,
    ironPer100g: 14.2,
    b12Per100g: 0.0,
    estimatedCostPerKg: 280,
    carbonKgPerKg: 1.8,
    functionalRoles: ['Fibrillar Network', 'Tensile Bite', 'Thermal Gelation', 'Foaming'],
    textureProperties: ['Dense fiber alignment', 'High shear modulus', 'Firm bite'],
    flavorProperties: ['Neutralized isoflavone', 'Mild savory backbone'],
    allergens: ['Soy']
  },
  'chickpea-flour': {
    id: 'chickpea-flour',
    name: 'Chickpea Flour (Besan)',
    category: 'Flour & Grain',
    vegan: true,
    proteinPer100g: 22.4,
    caloriesPer100g: 387,
    fatPer100g: 6.7,
    carbsPer100g: 57.8,
    fiberPer100g: 10.8,
    ironPer100g: 4.9,
    b12Per100g: 0.0,
    estimatedCostPerKg: 95,
    carbonKgPerKg: 1.1,
    functionalRoles: ['Scaffold Matrix', 'Browning & Maillard Precursor', 'Coating Binder'],
    textureProperties: ['Cohesive paste', 'Crisp crust on frying', 'Moderate density'],
    flavorProperties: ['Nutty', 'Warm legume base', 'Pleasant savory'],
    allergens: []
  },
  'oat-flour': {
    id: 'oat-flour',
    name: 'Oat Flour (De-hulled Whole Oat)',
    category: 'Flour & Grain',
    vegan: true,
    proteinPer100g: 14.7,
    caloriesPer100g: 389,
    fatPer100g: 6.9,
    carbsPer100g: 66.3,
    fiberPer100g: 10.6,
    ironPer100g: 4.2,
    b12Per100g: 0.0,
    estimatedCostPerKg: 110,
    carbonKgPerKg: 0.9,
    functionalRoles: ['Beta-Glucan Moisture Retention', 'Creaminess', 'Soft Crumb Matrix'],
    textureProperties: ['Viscoelastic smooth crumb', 'Creamy mouth-coating'],
    flavorProperties: ['Sweet cereal notes', 'Toasted oat'],
    allergens: ['Gluten'] // unless certified GF
  },
  'wheat-gluten': {
    id: 'wheat-gluten',
    name: 'Vital Wheat Gluten (Seitan Base)',
    category: 'Protein Isolate',
    vegan: true,
    proteinPer100g: 75.2,
    caloriesPer100g: 370,
    fatPer100g: 1.8,
    carbsPer100g: 13.8,
    fiberPer100g: 1.5,
    ironPer100g: 5.2,
    b12Per100g: 0.0,
    estimatedCostPerKg: 210,
    carbonKgPerKg: 1.6,
    functionalRoles: ['Viscoelastic Elasticity', 'Chewiness', 'Tensile Stringiness', 'Stretch'],
    textureProperties: ['Extensible gluten network', 'High Warner-Bratzler shear resistance', 'Meat-like chew'],
    flavorProperties: ['Neutral grain', 'Readily absorbs savory marinades'],
    allergens: ['Gluten']
  },
  'coconut-oil': {
    id: 'coconut-oil',
    name: 'Coconut Oil (Refined / Deodorized)',
    category: 'Functional Lipid',
    vegan: true,
    proteinPer100g: 0.0,
    caloriesPer100g: 884,
    fatPer100g: 99.8,
    carbsPer100g: 0.0,
    fiberPer100g: 0.0,
    ironPer100g: 0.05,
    b12Per100g: 0.0,
    estimatedCostPerKg: 260,
    carbonKgPerKg: 2.3,
    functionalRoles: ['Solid Fat Mimic', 'Sharp Melt Transition (24°C)', 'Mouthfeel Juiciness'],
    textureProperties: ['Firm at chilled temp', 'Melts cleanly in mouth without waxy residue'],
    flavorProperties: ['Neutral (deodorized)', 'Zero tropical coconut off-flavor'],
    allergens: []
  },
  'sunflower-oil': {
    id: 'sunflower-oil',
    name: 'High-Oleic Sunflower Oil',
    category: 'Functional Lipid',
    vegan: true,
    proteinPer100g: 0.0,
    caloriesPer100g: 884,
    fatPer100g: 99.9,
    carbsPer100g: 0.0,
    fiberPer100g: 0.0,
    ironPer100g: 0.02,
    b12Per100g: 0.0,
    estimatedCostPerKg: 165,
    carbonKgPerKg: 1.7,
    functionalRoles: ['Liquid Phase Emulsion', 'Thermal Stability in Frying', 'Fat Lubrication'],
    textureProperties: ['Smooth fluid spread', 'Non-greasy sheen'],
    flavorProperties: ['Clean', 'Ultra-neutral', 'High smoke point'],
    allergens: []
  },
  'canola-oil': {
    id: 'canola-oil',
    name: 'Canola Oil (Low Erucic Acid)',
    category: 'Functional Lipid',
    vegan: true,
    proteinPer100g: 0.0,
    caloriesPer100g: 884,
    fatPer100g: 99.9,
    carbsPer100g: 0.0,
    fiberPer100g: 0.0,
    ironPer100g: 0.0,
    b12Per100g: 0.0,
    estimatedCostPerKg: 145,
    carbonKgPerKg: 1.5,
    functionalRoles: ['Omega-3 Balance', 'Fine Droplet Emulsification', 'Cost-Effective Lipid'],
    textureProperties: ['Light liquid viscosity', 'Rapid droplet dispersion'],
    flavorProperties: ['Neutral', 'Subtle seed note'],
    allergens: []
  },
  'tapioca-starch': {
    id: 'tapioca-starch',
    name: 'Tapioca Starch (Modified Cassava)',
    category: 'Starch & Binder',
    vegan: true,
    proteinPer100g: 0.3,
    caloriesPer100g: 358,
    fatPer100g: 0.1,
    carbsPer100g: 88.7,
    fiberPer100g: 0.9,
    ironPer100g: 1.6,
    b12Per100g: 0.0,
    estimatedCostPerKg: 125,
    carbonKgPerKg: 0.8,
    functionalRoles: ['Stretch Induction', 'Translucent Gelation', 'Meltability & Elastic Stringing'],
    textureProperties: ['Glossy cohesive melt', 'Rubbery chew in cheese analogs'],
    flavorProperties: ['Clean', 'Non-masking'],
    allergens: []
  },
  'potato-starch': {
    id: 'potato-starch',
    name: 'Potato Starch',
    category: 'Starch & Binder',
    vegan: true,
    proteinPer100g: 0.5,
    caloriesPer100g: 357,
    fatPer100g: 0.1,
    carbsPer100g: 88.0,
    fiberPer100g: 0.5,
    ironPer100g: 0.6,
    b12Per100g: 0.0,
    estimatedCostPerKg: 135,
    carbonKgPerKg: 0.7,
    functionalRoles: ['High Peak Viscosity', 'Moisture Retention in Shearing', 'Crisp Fry Shell'],
    textureProperties: ['High swelling power at 65°C', 'Stiff cooling gel'],
    flavorProperties: ['Neutral earthy', 'Bland'],
    allergens: []
  },
  'corn-starch': {
    id: 'corn-starch',
    name: 'Corn Starch',
    category: 'Starch & Binder',
    vegan: true,
    proteinPer100g: 0.3,
    caloriesPer100g: 381,
    fatPer100g: 0.1,
    carbsPer100g: 91.3,
    fiberPer100g: 0.9,
    ironPer100g: 0.5,
    b12Per100g: 0.0,
    estimatedCostPerKg: 85,
    carbonKgPerKg: 0.9,
    functionalRoles: ['Short-Texture Thickening', 'Opacity Control', 'Batter Crispness'],
    textureProperties: ['Firm retrograded gel', 'Crisp glass-transition crust'],
    flavorProperties: ['Neutral'],
    allergens: []
  },
  'nutritional-yeast': {
    id: 'nutritional-yeast',
    name: 'Nutritional Yeast (Fortified Flakes)',
    category: 'Umami & Flavor',
    vegan: true,
    proteinPer100g: 50.0,
    caloriesPer100g: 390,
    fatPer100g: 5.0,
    carbsPer100g: 36.0,
    fiberPer100g: 21.0,
    ironPer100g: 19.0,
    b12Per100g: 150.0, // High B12 fortification
    estimatedCostPerKg: 520,
    carbonKgPerKg: 1.9,
    functionalRoles: ['Glutamate Umami Donor', 'Dairy Cheesy Notes', 'B12 & Zinc Micro-fortification'],
    textureProperties: ['Fine soluble powder', 'Smooth savory broth enhancer'],
    flavorProperties: ['Cheesy', 'Nutty', 'Savory bouillon', 'Rich umami depth'],
    allergens: []
  },
  'cashew': {
    id: 'cashew',
    name: 'Raw Cashew Butter / Paste',
    category: 'Fiber & Whole Food',
    vegan: true,
    proteinPer100g: 18.2,
    caloriesPer100g: 553,
    fatPer100g: 43.8,
    carbsPer100g: 30.2,
    fiberPer100g: 3.3,
    ironPer100g: 6.7,
    b12Per100g: 0.0,
    estimatedCostPerKg: 780,
    carbonKgPerKg: 2.8,
    functionalRoles: ['Dairy Fat & Protein Colloid', 'Creaminess', 'Velvety Emulsion', 'Body'],
    textureProperties: ['Ultra-fine submicron particle suspension', 'Rich creamy coating'],
    flavorProperties: ['Mild sweet butter', 'Subtle nut background'],
    allergens: ['Tree Nuts']
  },
  'almond': {
    id: 'almond',
    name: 'Blanched Almond Flour / Paste',
    category: 'Fiber & Whole Food',
    vegan: true,
    proteinPer100g: 21.2,
    caloriesPer100g: 579,
    fatPer100g: 49.9,
    carbsPer100g: 21.6,
    fiberPer100g: 12.5,
    ironPer100g: 3.7,
    b12Per100g: 0.0,
    estimatedCostPerKg: 820,
    carbonKgPerKg: 3.1,
    functionalRoles: ['Dairy Colloid', 'Protein-Lipid Balance', 'Crumb Density'],
    textureProperties: ['Fine grain', 'Rich mouthfeel'],
    flavorProperties: ['Sweet almond', 'Clean nutty finish'],
    allergens: ['Tree Nuts']
  },
  'oat-milk': {
    id: 'oat-milk',
    name: 'Oat Milk (Enzymatically Hydrolyzed)',
    category: 'Plant Milk',
    vegan: true,
    proteinPer100g: 1.4,
    caloriesPer100g: 58,
    fatPer100g: 2.2,
    carbsPer100g: 8.5,
    fiberPer100g: 1.2,
    ironPer100g: 0.4,
    b12Per100g: 0.38,
    estimatedCostPerKg: 65,
    carbonKgPerKg: 0.7,
    functionalRoles: ['Liquid Phase', 'Natural Maltose Sweetness', 'Foaming Micro-bubbles'],
    textureProperties: ['Velvety liquid', 'Stable micro-foam under steam'],
    flavorProperties: ['Gentle oat sweetness', 'Neutral dairy companion'],
    allergens: []
  },
  'soy-milk': {
    id: 'soy-milk',
    name: 'Soy Milk (Whole Bean Extract)',
    category: 'Plant Milk',
    vegan: true,
    proteinPer100g: 3.3,
    caloriesPer100g: 43,
    fatPer100g: 1.8,
    carbsPer100g: 3.0,
    fiberPer100g: 0.5,
    ironPer100g: 0.6,
    b12Per100g: 0.45,
    estimatedCostPerKg: 55,
    carbonKgPerKg: 0.8,
    functionalRoles: ['High-Protein Liquid Carrier', 'Casein-Parity Colloid', 'Curd Coagulation'],
    textureProperties: ['Thick fluid body', 'Coagulates with glucono-delta-lactone or calcium'],
    flavorProperties: ['Clean soy', 'Subtle bean sweetness'],
    allergens: ['Soy']
  },
  'coconut-milk': {
    id: 'coconut-milk',
    name: 'Coconut Milk (18% Medium Chain Lipid)',
    category: 'Plant Milk',
    vegan: true,
    proteinPer100g: 2.3,
    caloriesPer100g: 197,
    fatPer100g: 21.3,
    carbsPer100g: 2.8,
    fiberPer100g: 0.0,
    ironPer100g: 1.6,
    b12Per100g: 0.0,
    estimatedCostPerKg: 140,
    carbonKgPerKg: 1.9,
    functionalRoles: ['Rich Lipid Emulsion', 'Heavy Cream Parity', 'Cryogenic Freeze Creaminess'],
    textureProperties: ['Dense buttery liquid', 'Smooth fat crystal matrix when frozen'],
    flavorProperties: ['Creamy coconut', 'Pleasant sweetness'],
    allergens: []
  },
  'mushroom': {
    id: 'mushroom',
    name: 'Shiitake & Button Mushroom Extract',
    category: 'Umami & Flavor',
    vegan: true,
    proteinPer100g: 3.1,
    caloriesPer100g: 28,
    fatPer100g: 0.3,
    carbsPer100g: 4.3,
    fiberPer100g: 2.2,
    ironPer100g: 0.5,
    b12Per100g: 0.04,
    estimatedCostPerKg: 240,
    carbonKgPerKg: 1.3,
    functionalRoles: ['GMP/IMP Nucleotide Umami Synergist', 'Natural Glutamate', 'Meaty Scent'],
    textureProperties: ['Soluble essence', 'Enhances salivary secretion'],
    flavorProperties: ['Deep forest savory', 'Pyrazine meat-like aroma', 'Umami multiplier'],
    allergens: []
  },
  'jackfruit': {
    id: 'jackfruit',
    name: 'Young Green Jackfruit (Shredded Pulp)',
    category: 'Fiber & Whole Food',
    vegan: true,
    proteinPer100g: 1.7,
    caloriesPer100g: 95,
    fatPer100g: 0.6,
    carbsPer100g: 23.2,
    fiberPer100g: 3.5,
    ironPer100g: 0.6,
    b12Per100g: 0.0,
    estimatedCostPerKg: 110,
    carbonKgPerKg: 0.6,
    functionalRoles: ['Bulking Fiber Scaffold', 'Shredded Meat Striation', 'Sauce Absorption'],
    textureProperties: ['Parallel coarse fibers', 'Tender shredded chicken/pork bite'],
    flavorProperties: ['Completely neutral when unripened', 'Spongy flavor absorber'],
    allergens: []
  },
  'beetroot': {
    id: 'beetroot',
    name: 'Beetroot Powder & Thermal Betalain Extract',
    category: 'Umami & Flavor',
    vegan: true,
    proteinPer100g: 11.8,
    caloriesPer100g: 340,
    fatPer100g: 1.2,
    carbsPer100g: 68.0,
    fiberPer100g: 22.0,
    ironPer100g: 7.9,
    b12Per100g: 0.0,
    estimatedCostPerKg: 310,
    carbonKgPerKg: 0.8,
    functionalRoles: ['Thermal Browning / Myoglobin Color Shift', 'Visual Animal Chromatic Parity'],
    textureProperties: ['Fine dispersible pigment'],
    flavorProperties: ['Slightly earthy sweet', 'Vanishes in savory formulation'],
    allergens: []
  },
  'methylcellulose': {
    id: 'methylcellulose',
    name: 'Methylcellulose (Thermal Gel Grade)',
    category: 'Hydrocolloid',
    vegan: true,
    proteinPer100g: 0.0,
    caloriesPer100g: 0,
    fatPer100g: 0.0,
    carbsPer100g: 0.0,
    fiberPer100g: 92.0, // Non-digestible dietary fiber
    ironPer100g: 0.0,
    b12Per100g: 0.0,
    estimatedCostPerKg: 950,
    carbonKgPerKg: 2.1,
    functionalRoles: ['Reversible Thermal Gelation (Gels at 55°C)', 'Juiciness Retention on Cooking', 'Structure'],
    textureProperties: ['Firm elastic bite while sizzling hot', 'Re-liquifies on cooling'],
    flavorProperties: ['Completely neutral'],
    allergens: []
  },
  'flaxseed': {
    id: 'flaxseed',
    name: 'Ground Cold-Milled Flaxseed',
    category: 'Fiber & Whole Food',
    vegan: true,
    proteinPer100g: 18.3,
    caloriesPer100g: 534,
    fatPer100g: 42.2,
    carbsPer100g: 28.9,
    fiberPer100g: 27.3,
    ironPer100g: 5.7,
    b12Per100g: 0.0,
    estimatedCostPerKg: 190,
    carbonKgPerKg: 1.0,
    functionalRoles: ['Mucilage Hydrocolloid Binder', 'Egg Binding Replacement', 'ALA Omega-3 Fatty Acids'],
    textureProperties: ['Viscous mucilaginous gel when hydrated 1:3 with water'],
    flavorProperties: ['Warm nutty', 'Toasted seed'],
    allergens: []
  },
  'chia-seed': {
    id: 'chia-seed',
    name: 'Chia Seed Flour / Hydrated Gel',
    category: 'Fiber & Whole Food',
    vegan: true,
    proteinPer100g: 16.5,
    caloriesPer100g: 486,
    fatPer100g: 30.7,
    carbsPer100g: 42.1,
    fiberPer100g: 34.4,
    ironPer100g: 7.7,
    b12Per100g: 0.0,
    estimatedCostPerKg: 340,
    carbonKgPerKg: 1.1,
    functionalRoles: ['High Water Absorption (12x)', 'Hydrophilic Gel Network', 'Moisture Stabilization'],
    textureProperties: ['Cohesive springy gel', 'Smooth mouth-coating'],
    flavorProperties: ['Extremely neutral'],
    allergens: []
  },
  'aquafaba': {
    id: 'aquafaba',
    name: 'Aquafaba (Chickpea Albumin Extract)',
    category: 'Starch & Binder',
    vegan: true,
    proteinPer100g: 1.2,
    caloriesPer100g: 18,
    fatPer100g: 0.2,
    carbsPer100g: 3.0,
    fiberPer100g: 0.4,
    ironPer100g: 0.8,
    b12Per100g: 0.0,
    estimatedCostPerKg: 70,
    carbonKgPerKg: 0.5,
    functionalRoles: ['Egg White Foam Replacement', 'Saponin & Albumin Emulsification', 'Air Entrapment'],
    textureProperties: ['Stable stiff foam peaks', 'Light meringue aerated structure'],
    flavorProperties: ['Neutral with very subtle chickpea finish'],
    allergens: []
  },
  'water': {
    id: 'water',
    name: 'Purified Hydration Water',
    category: 'Mineral & Liquid',
    vegan: true,
    proteinPer100g: 0.0,
    caloriesPer100g: 0,
    fatPer100g: 0.0,
    carbsPer100g: 0.0,
    fiberPer100g: 0.0,
    ironPer100g: 0.0,
    b12Per100g: 0.0,
    estimatedCostPerKg: 2,
    carbonKgPerKg: 0.05,
    functionalRoles: ['Extrusion Hydration Solvent', 'Phase Plasticizer', 'Free/Bound Moisture Phase'],
    textureProperties: ['Liquid carrier', 'Solvates biopolymers'],
    flavorProperties: ['Neutral'],
    allergens: []
  },
  'salt-seasoning': {
    id: 'salt-seasoning',
    name: 'Sea Salt & Natural Flavor Synergy',
    category: 'Umami & Flavor',
    vegan: true,
    proteinPer100g: 0.0,
    caloriesPer100g: 5,
    fatPer100g: 0.0,
    carbsPer100g: 1.0,
    fiberPer100g: 0.0,
    ironPer100g: 0.1,
    b12Per100g: 0.0,
    estimatedCostPerKg: 60,
    carbonKgPerKg: 0.2,
    functionalRoles: ['Ionic Strength Modulation', 'Protein Gel Depolarization', 'Palatability Threshold'],
    textureProperties: ['Enhances ionic cross-linking in protein globulins'],
    flavorProperties: ['Saline bite', 'Enhances volatile aromatic receptors'],
    allergens: []
  },
  'calcium-fortification': {
    id: 'calcium-fortification',
    name: 'Calcium Carbonate & B12 Micro-Premix',
    category: 'Mineral & Liquid',
    vegan: true,
    proteinPer100g: 0.0,
    caloriesPer100g: 0,
    fatPer100g: 0.0,
    carbsPer100g: 0.0,
    fiberPer100g: 0.0,
    ironPer100g: 2.0,
    b12Per100g: 250.0, // High potency fortification
    estimatedCostPerKg: 450,
    carbonKgPerKg: 0.4,
    functionalRoles: ['Bovine Mineral Parity', 'Ionic Divalent Calcium Cross-Linking', 'Nutrition'],
    textureProperties: ['Cross-links alginate / pectin / micellar polymers'],
    flavorProperties: ['Clean mineral chalkiness (masked at low wt%)'],
    allergens: []
  }
};

/**
 * Normalizes user ingredient string to database key
 */
export function resolveIngredient(nameOrId: string): IngredientRecord | null {
  const clean = nameOrId.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
  
  // Direct match
  if (INGREDIENT_DATABASE[nameOrId]) return INGREDIENT_DATABASE[nameOrId];
  
  // Fuzzy alias lookup
  for (const [key, ing] of Object.entries(INGREDIENT_DATABASE)) {
    const keyClean = key.replace(/[^a-z0-9]/g, '');
    const nameClean = ing.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    if (clean === keyClean || clean === nameClean) return ing;
    if (clean.includes(keyClean) || nameClean.includes(clean)) return ing;
  }
  
  // Keyword mappings
  if (clean.includes('pea')) return INGREDIENT_DATABASE['pea-protein'];
  if (clean.includes('soyprotein') || clean.includes('soya')) return INGREDIENT_DATABASE['soy-protein'];
  if (clean.includes('soymilk')) return INGREDIENT_DATABASE['soy-milk'];
  if (clean.includes('chickpea') || clean.includes('besan')) return INGREDIENT_DATABASE['chickpea-flour'];
  if (clean.includes('oatflour') || clean.includes('oats')) return INGREDIENT_DATABASE['oat-flour'];
  if (clean.includes('oatmilk')) return INGREDIENT_DATABASE['oat-milk'];
  if (clean.includes('gluten') || clean.includes('seitan') || clean.includes('wheat')) return INGREDIENT_DATABASE['wheat-gluten'];
  if (clean.includes('coconutoil')) return INGREDIENT_DATABASE['coconut-oil'];
  if (clean.includes('coconutmilk')) return INGREDIENT_DATABASE['coconut-milk'];
  if (clean.includes('sunflower')) return INGREDIENT_DATABASE['sunflower-oil'];
  if (clean.includes('canola')) return INGREDIENT_DATABASE['canola-oil'];
  if (clean.includes('tapioca')) return INGREDIENT_DATABASE['tapioca-starch'];
  if (clean.includes('potato')) return INGREDIENT_DATABASE['potato-starch'];
  if (clean.includes('corn')) return INGREDIENT_DATABASE['corn-starch'];
  if (clean.includes('yeast') || clean.includes('nooch')) return INGREDIENT_DATABASE['nutritional-yeast'];
  if (clean.includes('cashew')) return INGREDIENT_DATABASE['cashew'];
  if (clean.includes('almond')) return INGREDIENT_DATABASE['almond'];
  if (clean.includes('mushroom') || clean.includes('shiitake')) return INGREDIENT_DATABASE['mushroom'];
  if (clean.includes('jackfruit')) return INGREDIENT_DATABASE['jackfruit'];
  if (clean.includes('beet')) return INGREDIENT_DATABASE['beetroot'];
  if (clean.includes('methyl') || clean.includes('cellulose')) return INGREDIENT_DATABASE['methylcellulose'];
  if (clean.includes('flax')) return INGREDIENT_DATABASE['flaxseed'];
  if (clean.includes('chia')) return INGREDIENT_DATABASE['chia-seed'];
  if (clean.includes('aquafaba')) return INGREDIENT_DATABASE['aquafaba'];
  if (clean.includes('water') || clean.includes('hydrate')) return INGREDIENT_DATABASE['water'];
  if (clean.includes('salt') || clean.includes('flavor') || clean.includes('spice')) return INGREDIENT_DATABASE['salt-seasoning'];
  if (clean.includes('calcium') || clean.includes('b12') || clean.includes('mineral')) return INGREDIENT_DATABASE['calcium-fortification'];
  
  return null;
}
