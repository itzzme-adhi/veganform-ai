import { CandidateFormulation, BaselineTarget, BotanicalIngredient } from '../types/formulation';

export const CELLULAR_HERO_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvbw5mUZLLSf-5ZzqLHor9oiT3EgxyYbP2baUNn3EfGgEgAzhZxzNBSmF3QWHKr9sn7UHVnWtOqjDmv-SkhUirtwAn1ewh6hUSZTt1nfI5OAcEEQCLW7Ol3hA4iv8rKz9z5BtsshnpKXI5o3NpbtcPKExx4_X-8jm0gYMnqIs4ML8EGrMvfy_oN9bVUBy00Pirh2CU0fcazr1yZ1Ai-sWDMJgDW7D3nijG0ndzgp7vkwKI0KEWyg';
export const NUGGET_TEXTURE_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6coUZohy-zeEnNxuCuoMQnkTGu3QIZyEgQA8tnh6eWU7jsdHI4UU8Rqx8zzBEDNaInPG92df6oZ1qXoHHlnmGzMOZuxsjVye5bTBQLb5HBxDmw4kySDYbVphDsS9JPhiDib3fgWEAYGr-CMkEyP5zzsot8ZhzptC5QhaUkzA6G2eMpm_6Bp99Jt7iJetPwqtMG8_6tuBLZv7O8FVkwhFhc5P7e3GV3lsQgkPXJulFzuA1OlRshA';
export const ACTOMYOSIN_SCAN_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7jstAdwxjkWnuIpYMoYh6QR439qjSKE7z_IXchauIm0wjCix-tos3DvE8sC-dj8RwIEhp7jFp-JymyqEo053R2mxqi69Mvx557mzG1G3KEblxhy6gcCNTcbCKCtLVP_zqQ2iDVVR8N6Hcf4-QHR57w7rlCFPJpm3f2qgZOxNkgWpKom97LQAW4j4NBlMLd1tWztMqI63Kei4EycJEiEAL6B5wruB6Mbk2m7sAy7_Ji7i8q4_lkw';

export const BASELINE_TARGETS: BaselineTarget[] = [
  {
    id: 'chicken-nugget',
    name: 'Chicken Nugget',
    subtitle: 'Whole Muscle Emulsion',
    archetypeImage: ACTOMYOSIN_SCAN_IMAGE,
    rasterCode: 'ACTOMYOSIN-09',
    matchPrecision: 98.4,
    description: 'Tri-phase matrix: Oriented fibrillar actomyosin scaffold, 54% captive moisture phase, volatile pyrazine-driven savory umami, heat-gelled binding core.',
    proteinDensity: '18.2g / 100g',
    anisotropicFiber: '0.74 λ-ratio',
    thermalGelation: '68°C – 74°C',
    waterActivity: '0.94 a_w'
  },
  {
    id: 'mozzarella-curd',
    name: 'Mozzarella Curd',
    subtitle: 'Strung Casein Micelle Emulsion',
    archetypeImage: CELLULAR_HERO_IMAGE,
    rasterCode: 'CASEIN-MICELLE-14',
    matchPrecision: 96.1,
    description: 'Biaxial stretch matrix: Hydrophobic core casein aggregates with calcium-phosphate bridging, 50% fat emulsion release upon melting.',
    proteinDensity: '22.0g / 100g',
    anisotropicFiber: '0.86 λ-ratio',
    thermalGelation: '55°C – 62°C',
    waterActivity: '0.97 a_w'
  },
  {
    id: 'whole-egg',
    name: 'Whole Egg',
    subtitle: 'Albumin & Vitellin Colloid',
    archetypeImage: ACTOMYOSIN_SCAN_IMAGE,
    rasterCode: 'OVALBUMIN-04',
    matchPrecision: 97.8,
    description: 'Biphasic thermal gel: Ovalbumin-driven irreversible heat entrapment at 64°C, rich lecithin lipid emulsification network.',
    proteinDensity: '12.6g / 100g',
    anisotropicFiber: '0.31 λ-ratio',
    thermalGelation: '62°C – 70°C',
    waterActivity: '0.99 a_w'
  },
  {
    id: 'dairy-milk',
    name: 'Dairy Milk',
    subtitle: 'Bovine Submicellar Dispersion',
    archetypeImage: CELLULAR_HERO_IMAGE,
    rasterCode: 'LACTALBUMIN-02',
    matchPrecision: 99.1,
    description: 'Stable globular fat globule suspension with submicellar casein suspension and neutral dairy volatile aromatics.',
    proteinDensity: '3.4g / 100g',
    anisotropicFiber: '0.05 λ-ratio',
    thermalGelation: '85°C – 90°C',
    waterActivity: '0.99 a_w'
  },
  {
    id: 'mayonnaise',
    name: 'Mayonnaise',
    subtitle: 'Oil-in-Water Colloid Matrix',
    archetypeImage: ACTOMYOSIN_SCAN_IMAGE,
    rasterCode: 'LIPID-EMULS-08',
    matchPrecision: 95.7,
    description: 'Densely packed droplet packing (>74% internal phase), viscoelastic yield stress under ambient shear rate.',
    proteinDensity: '1.2g / 100g',
    anisotropicFiber: '0.12 λ-ratio',
    thermalGelation: 'N/A (Ambient)',
    waterActivity: '0.92 a_w',
    category: 'Colloid Emulsion',
    defaultCostCeiling: 190,
    defaultProteinTarget: 1.5
  },
  {
    id: 'ice-cream',
    name: 'Ice Cream',
    subtitle: 'Cryogenic Frozen Foam Emulsion',
    archetypeImage: CELLULAR_HERO_IMAGE,
    rasterCode: 'CRYOFAT-AIR-06',
    matchPrecision: 96.8,
    description: 'Partially coalesced lipid crystal network, 60% overrun air cells, freezing point depression preventing coarse iciness.',
    proteinDensity: '3.5g / 100g',
    anisotropicFiber: '0.08 λ-ratio',
    thermalGelation: '-2.5°C Meltdown',
    waterActivity: '0.88 a_w',
    category: 'Frozen Dairy Emulsion',
    defaultCostCeiling: 220,
    defaultProteinTarget: 4.0
  }
];

export const CANDIDATE_FORMULATIONS: CandidateFormulation[] = [
  {
    id: 'vfa-chk-092',
    code: 'VFA-CHK-092',
    name: 'Pea Protein Crispy Nugget',
    tagline: 'Best Overall Balance • Thermomechanically texturized botanical poultry analog with clean-label hydrocolloid binder',
    rank: 1,
    rankBadge: 'RANK #1',
    rankBadgeColor: 'bg-primary text-black',
    aiScore: 89,
    qScore: 89,
    costPerKg: 185,
    currencySymbol: '₹',
    proteinPer100g: 24,
    baseIsolate: 'Pea + Oat',
    sustainabilityLca: 94,
    tasteMatch: 86,
    textureParity: 92,
    nutritionDensity: 90,
    costEfficiency: 84,
    carbonFootprintDelta: '-84% vs poultry',
    functionalParity: 91,
    tasteDescriptor: 'savory/mild',
    textureDescriptor: 'fibrous bite',
    caloriesKcal: 198,
    crossSectionTextureImage: NUGGET_TEXTURE_IMAGE,
    cellularMatchPercent: 92,

    batchMatrix: [
      { name: 'Yellow Pea Protein Isolate (80%)', function: 'Primary protein scaffold / fibrous texture', wtPercent: 18.5, highlight: true },
      { name: 'Whole Oat Flour', function: 'Bulk matrix / beta-glucan moisture binder', wtPercent: 14.0 },
      { name: 'Tapioca Starch (Modified)', function: 'Crispness in exterior crust / heat set', wtPercent: 8.2 },
      { name: 'High-Oleic Sunflower Oil', function: 'Lipid mouthfeel / flavor carrier', wtPercent: 7.5 },
      { name: 'Methylcellulose (Food Grade)', function: 'Thermal gelation / bite firmness', wtPercent: 1.8 },
      { name: 'Nutritional Yeast Extract', function: 'Savory umami / poultry flavor notes', wtPercent: 2.4 },
      { name: 'Sea Salt & Natural Seasonings', function: 'Flavor enhancement & balance', wtPercent: 1.6 },
      { name: 'Water (Hydration Phase)', function: 'Hydration & twin-screw extrusion medium', wtPercent: 46.0, highlight: true }
    ],

    substitutionMap: [
      { animalPrecursor: 'Chicken Breast Muscle Matrix', botanicalAnalog: 'Pea Isolate + Oat Flour' },
      { animalPrecursor: 'Egg Albumin Thermal Binder', botanicalAnalog: 'Methylcellulose + Tapioca' },
      { animalPrecursor: 'Rendered Chicken Lipids', botanicalAnalog: 'High-Oleic Sunflower Oil' },
      { animalPrecursor: 'Natural Meat Glutamates', botanicalAnalog: 'Yeast Extract + Mushroom' }
    ],

    nutritionalProfile: [
      { metric: 'Calories', veganValue: '198 kcal', poultryValue: '245 kcal' },
      { metric: 'Protein', veganValue: '24.2 g', poultryValue: '22.0 g', deltaPercent: '+10%', highlight: true },
      { metric: 'Sat. Fat', veganValue: '1.1 g', poultryValue: '4.8 g', deltaPercent: '-77%', highlight: true },
      { metric: 'Total Fat', veganValue: '7.8 g', poultryValue: '13.5 g' },
      { metric: 'Dietary Fiber', veganValue: '4.8 g', poultryValue: '0.0 g', highlight: true },
      { metric: 'Cholesterol', veganValue: '0 mg', poultryValue: '68 mg', highlight: true },
      { metric: 'Sodium', veganValue: '420 mg', poultryValue: '480 mg' }
    ],

    costAllocation: [
      { name: 'Pea Protein Isolate', percent: 42, amount: 77.7, color: '#00f5a0' },
      { name: 'Starches & Binders', percent: 22, amount: 40.7, color: '#00a572' },
      { name: 'Functional Lipids', percent: 18, amount: 33.3, color: '#45dfa4' },
      { name: 'Flavor & Yeast', percent: 18, amount: 33.3, color: '#264b38' }
    ],

    flavorChemistry: [
      { name: 'Savory Profile', value: 88 },
      { name: 'Umami Potency', value: 84 },
      { name: 'Mild Botanical / Off-notes (Target Low)', value: 12 },
      { name: 'Salt Equilibrium', value: 90 }
    ],

    rheologyTexture: [
      { name: 'Exterior Crust Crispness', value: 94 },
      { name: 'Fibrous Longitudinal Tear', value: 91 },
      { name: 'Core Hydration / Juiciness', value: 86 },
      { name: 'Mastication Chewiness', value: 88 }
    ],

    aiRationales: [
      {
        title: 'Pea Protein Isolate',
        icon: 'verified',
        description: 'Selected for high PDCAAS amino acid score and excellent shear-cell texturization capability without soy allergens.'
      },
      {
        title: 'Tapioca + Methylcellulose',
        icon: 'device_thermostat',
        description: 'Creates thermal reversible gelation that mimics the denatured meat protein bite when cooked at 75°C.'
      },
      {
        title: 'Oat Flour Beta-Glucan',
        icon: 'water_drop',
        description: 'Retains 3.5x its weight in water, preventing the dryness typical of standard plant patties during hot-holding.'
      }
    ]
  },
  {
    id: 'vfa-chk-041',
    code: 'VFA-CHK-041',
    name: 'Chickpea-Oat Fiber Nugget',
    tagline: 'Texture & Cost Leader • High-yield legume matrix optimized for economic pilot production',
    rank: 2,
    rankBadge: 'RANK #2',
    rankBadgeColor: 'bg-surface-container-high text-on-surface-variant border border-outline-variant',
    aiScore: 84,
    qScore: 84,
    costPerKg: 162,
    currencySymbol: '₹',
    proteinPer100g: 20,
    baseIsolate: 'Chickpea + Oat',
    sustainabilityLca: 91,
    tasteMatch: 82,
    textureParity: 89,
    nutritionDensity: 81,
    costEfficiency: 93,
    carbonFootprintDelta: '-88% vs poultry',
    functionalParity: 86,
    tasteDescriptor: 'nutty/mild',
    textureDescriptor: 'dense chew',
    caloriesKcal: 185,
    crossSectionTextureImage: NUGGET_TEXTURE_IMAGE,
    cellularMatchPercent: 88,

    batchMatrix: [
      { name: 'Chickpea Flour Concentrate (65%)', function: 'Primary legume mass / emulsion stability', wtPercent: 22.0, highlight: true },
      { name: 'Rolled Oat Dietary Fiber', function: 'Matrix integrity & bound hydration', wtPercent: 12.5 },
      { name: 'Native Corn Starch', function: 'Crisping crumb matrix', wtPercent: 9.0 },
      { name: 'Cold-Pressed Rapeseed Oil', function: 'Lipid coating & frying phase stability', wtPercent: 6.8 },
      { name: 'Konjac Glucomannan Gum', function: 'Thermal binding & gel strength', wtPercent: 1.2 },
      { name: 'Inactive Brewer Yeast Flakes', function: 'Poultry flavor base', wtPercent: 2.1 },
      { name: 'Iodized Salt & White Pepper Blend', function: 'Seasoning equilibrium', wtPercent: 1.4 },
      { name: 'Water (Hydration Phase)', function: 'High-shear extruder moisture', wtPercent: 45.0, highlight: true }
    ],

    substitutionMap: [
      { animalPrecursor: 'Chicken Breast Muscle Matrix', botanicalAnalog: 'Chickpea Concentrate + Oat' },
      { animalPrecursor: 'Egg Albumin Thermal Binder', botanicalAnalog: 'Konjac Gum + Corn Starch' },
      { animalPrecursor: 'Rendered Chicken Lipids', botanicalAnalog: 'Cold-Pressed Rapeseed Oil' },
      { animalPrecursor: 'Natural Meat Glutamates', botanicalAnalog: 'Brewer Yeast Flakes' }
    ],

    nutritionalProfile: [
      { metric: 'Calories', veganValue: '185 kcal', poultryValue: '245 kcal' },
      { metric: 'Protein', veganValue: '20.4 g', poultryValue: '22.0 g', deltaPercent: '-7%' },
      { metric: 'Sat. Fat', veganValue: '0.8 g', poultryValue: '4.8 g', deltaPercent: '-83%', highlight: true },
      { metric: 'Total Fat', veganValue: '6.5 g', poultryValue: '13.5 g' },
      { metric: 'Dietary Fiber', veganValue: '6.2 g', poultryValue: '0.0 g', highlight: true },
      { metric: 'Cholesterol', veganValue: '0 mg', poultryValue: '68 mg', highlight: true },
      { metric: 'Sodium', veganValue: '390 mg', poultryValue: '480 mg' }
    ],

    costAllocation: [
      { name: 'Chickpea Concentrate', percent: 34, amount: 55.1, color: '#00f5a0' },
      { name: 'Starches & Gums', percent: 26, amount: 42.1, color: '#00a572' },
      { name: 'Functional Lipids', percent: 22, amount: 35.6, color: '#45dfa4' },
      { name: 'Flavor & Seasonings', percent: 18, amount: 29.2, color: '#264b38' }
    ],

    flavorChemistry: [
      { name: 'Savory Profile', value: 80 },
      { name: 'Umami Potency', value: 78 },
      { name: 'Mild Botanical / Off-notes (Target Low)', value: 16 },
      { name: 'Salt Equilibrium', value: 88 }
    ],

    rheologyTexture: [
      { name: 'Exterior Crust Crispness', value: 91 },
      { name: 'Fibrous Longitudinal Tear', value: 84 },
      { name: 'Core Hydration / Juiciness', value: 87 },
      { name: 'Mastication Chewiness', value: 85 }
    ],

    aiRationales: [
      {
        title: 'Chickpea Flour Concentrate',
        icon: 'monetization_on',
        description: 'Delivers unbeatable raw material cost efficiency (₹162/kg) while maintaining 20g protein threshold.'
      },
      {
        title: 'Konjac Hydrocolloid Synergy',
        icon: 'network_check',
        description: 'Forms a cohesive irreversible gel network that holds internal water throughout continuous frying.'
      },
      {
        title: 'Beta-Glucan Dense Fiber',
        icon: 'spa',
        description: 'Enhances digestive satiety scores by 32% compared with standard ultra-processed fast food nuggets.'
      }
    ]
  },
  {
    id: 'vfa-chk-108',
    code: 'VFA-CHK-108',
    name: 'Mushroom-Faba Protein',
    tagline: 'Umami & Fiber Specialist • Fermentation-derived mycelium scaffold with supreme umami resonance',
    rank: 3,
    rankBadge: 'RANK #3',
    rankBadgeColor: 'bg-surface-container-high text-on-surface-variant border border-outline-variant',
    aiScore: 81,
    qScore: 81,
    costPerKg: 228,
    currencySymbol: '₹',
    proteinPer100g: 22,
    baseIsolate: 'Faba + Mycelium',
    sustainabilityLca: 96,
    tasteMatch: 91,
    textureParity: 80,
    nutritionDensity: 79,
    costEfficiency: 74,
    carbonFootprintDelta: '-91% vs poultry',
    functionalParity: 84,
    tasteDescriptor: 'rich umami',
    textureDescriptor: 'tender fibrous',
    caloriesKcal: 172,
    crossSectionTextureImage: NUGGET_TEXTURE_IMAGE,
    cellularMatchPercent: 94,

    batchMatrix: [
      { name: 'Faba Bean Protein Isolate (85%)', function: 'Dense nitrogen source & solubility', wtPercent: 16.2, highlight: true },
      { name: 'Shiitake Mycelium Biomass Powder', function: 'Natural 5′-ribonucleotide umami booster', wtPercent: 8.5, highlight: true },
      { name: 'Native Potato Starch', function: 'Expanded micro-crisp shell crust', wtPercent: 7.8 },
      { name: 'Algal High-Oleic Triglyceride', function: 'Neutral fatty acid profile & mouthfeel', wtPercent: 5.5 },
      { name: 'Citrus Pectin & Flax Mucilage', function: 'Moisture retention & soft mouthfeel', wtPercent: 2.2 },
      { name: 'Fermented Mushroom Broth Powder', function: 'Deep poultry roast notes', wtPercent: 3.8 },
      { name: 'Mineral Salt Complex', function: 'Electrolyte balance', wtPercent: 1.5 },
      { name: 'Water (Hydration Phase)', function: 'Extrusion dough matrix', wtPercent: 54.5 }
    ],

    substitutionMap: [
      { animalPrecursor: 'Chicken Breast Muscle Matrix', botanicalAnalog: 'Faba Isolate + Mycelium' },
      { animalPrecursor: 'Egg Albumin Thermal Binder', botanicalAnalog: 'Citrus Pectin + Potato Starch' },
      { animalPrecursor: 'Rendered Chicken Lipids', botanicalAnalog: 'Algal High-Oleic Lipid' },
      { animalPrecursor: 'Natural Meat Glutamates', botanicalAnalog: 'Shiitake Mycelium + Broth' }
    ],

    nutritionalProfile: [
      { metric: 'Calories', veganValue: '172 kcal', poultryValue: '245 kcal', highlight: true },
      { metric: 'Protein', veganValue: '22.1 g', poultryValue: '22.0 g', deltaPercent: '+0.5%' },
      { metric: 'Sat. Fat', veganValue: '0.6 g', poultryValue: '4.8 g', deltaPercent: '-87%', highlight: true },
      { metric: 'Total Fat', veganValue: '5.8 g', poultryValue: '13.5 g' },
      { metric: 'Dietary Fiber', veganValue: '5.4 g', poultryValue: '0.0 g', highlight: true },
      { metric: 'Cholesterol', veganValue: '0 mg', poultryValue: '68 mg', highlight: true },
      { metric: 'Sodium', veganValue: '360 mg', poultryValue: '480 mg' }
    ],

    costAllocation: [
      { name: 'Faba Isolate', percent: 38, amount: 86.6, color: '#00f5a0' },
      { name: 'Mycelium Biomass', percent: 32, amount: 73.0, color: '#00a572' },
      { name: 'Algal Lipids & Starches', percent: 18, amount: 41.0, color: '#45dfa4' },
      { name: 'Broth & Seasoning', percent: 12, amount: 27.4, color: '#264b38' }
    ],

    flavorChemistry: [
      { name: 'Savory Profile', value: 92 },
      { name: 'Umami Potency', value: 95 },
      { name: 'Mild Botanical / Off-notes (Target Low)', value: 8 },
      { name: 'Salt Equilibrium', value: 93 }
    ],

    rheologyTexture: [
      { name: 'Exterior Crust Crispness', value: 88 },
      { name: 'Fibrous Longitudinal Tear', value: 81 },
      { name: 'Core Hydration / Juiciness', value: 89 },
      { name: 'Mastication Chewiness', value: 82 }
    ],

    aiRationales: [
      {
        title: 'Shiitake Mycelium Synergy',
        icon: 'psychology',
        description: 'Produces a natural synergy with inosinate and guanylate, achieving 91% taste score without artificial flavor masking.'
      },
      {
        title: 'Faba Bean Clean Solubility',
        icon: 'science',
        description: 'Avoids off-flavor beany notes common in unrefined soy or lupin, leaving clean savory poultry aroma.'
      },
      {
        title: 'Low Carbon Lifecycle',
        icon: 'eco',
        description: 'Prototype estimate shows 91% carbon reduction compared with broiler poultry (not a lifecycle assessment).'
      }
    ]
  }
];

export const BOTANICAL_INGREDIENTS: BotanicalIngredient[] = [
  {
    id: 'yellow-pea-80',
    name: 'Yellow Pea Protein Isolate (80%)',
    category: 'Protein Isolate',
    origin: 'Pisum sativum (Canada/France)',
    proteinContent: 80,
    shearSuitability: 94,
    gellingTemp: '74°C',
    allergens: [],
    cleanLabel: true,
    estCostKg: 4.20,
    keyProperty: 'High lysine, excellent texturizing cross-link capability in twin-screw shear cell.'
  },
  {
    id: 'faba-bean-85',
    name: 'Faba Bean Protein Isolate (85%)',
    category: 'Protein Isolate',
    origin: 'Vicia faba (Nordic)',
    proteinContent: 85,
    shearSuitability: 91,
    gellingTemp: '78°C',
    allergens: [],
    cleanLabel: true,
    estCostKg: 5.10,
    keyProperty: 'Mild neutral flavor profile with low lipid auto-oxidation potential.'
  },
  {
    id: 'chickpea-conc-65',
    name: 'Chickpea Flour Concentrate (65%)',
    category: 'Protein Isolate',
    origin: 'Cicer arietinum (India/Australia)',
    proteinContent: 65,
    shearSuitability: 82,
    gellingTemp: '72°C',
    allergens: [],
    cleanLabel: true,
    estCostKg: 2.80,
    keyProperty: 'Superior cold-water emulsification and moisture binding capacity.'
  },
  {
    id: 'shiitake-mycelium',
    name: 'Shiitake Mycelium Biomass',
    category: 'Protein Isolate',
    origin: 'Lentinula edodes (Precision Fermentation)',
    proteinContent: 45,
    shearSuitability: 89,
    gellingTemp: 'Ambient',
    allergens: [],
    cleanLabel: true,
    estCostKg: 7.50,
    keyProperty: 'Rich in natural ribonucleotides and fibrous beta-1,3-glucan mycelial branching.'
  },
  {
    id: 'methylcellulose-fg',
    name: 'Methylcellulose (Food Grade)',
    category: 'Hydrocolloid & Binder',
    origin: 'Wood Pulp Cellulose Derivative',
    proteinContent: 0,
    shearSuitability: 98,
    gellingTemp: '68°C - 75°C',
    allergens: [],
    cleanLabel: false,
    estCostKg: 12.00,
    keyProperty: 'Thermoreversible thermal gelation mimics coagulating meat albumin under cooking.'
  },
  {
    id: 'oat-flour-beta-glucan',
    name: 'Whole Oat Beta-Glucan Flour',
    category: 'Scaffold Starch',
    origin: 'Avena sativa (Finland)',
    proteinContent: 14,
    shearSuitability: 86,
    gellingTemp: '65°C',
    allergens: ['Gluten (Trace)'],
    cleanLabel: true,
    estCostKg: 1.95,
    keyProperty: 'Holds up to 3.5x its dry weight in water, halting freeze-thaw syneresis.'
  },
  {
    id: 'tapioca-modified',
    name: 'Modified Tapioca Starch',
    category: 'Scaffold Starch',
    origin: 'Manihot esculenta (Thailand)',
    proteinContent: 0.5,
    shearSuitability: 90,
    gellingTemp: '62°C',
    allergens: [],
    cleanLabel: true,
    estCostKg: 2.40,
    keyProperty: 'Creates rapid acoustic crispness in external breading layers during high heat.'
  },
  {
    id: 'sunflower-oil-ho',
    name: 'High-Oleic Sunflower Oil',
    category: 'Functional Lipid',
    origin: 'Helianthus annuus (Ukraine/Argentina)',
    proteinContent: 0,
    shearSuitability: 88,
    gellingTemp: 'Liquid (< -5°C)',
    allergens: [],
    cleanLabel: true,
    estCostKg: 2.10,
    keyProperty: '82%+ monounsaturated oleic acid provides oxidative stability up to 210°C.'
  },
  {
    id: 'yeast-extract-umami',
    name: 'Nutritional Yeast Extract',
    category: 'Umami & Flavor',
    origin: 'Saccharomyces cerevisiae',
    proteinContent: 48,
    shearSuitability: 95,
    gellingTemp: 'Soluble',
    allergens: [],
    cleanLabel: true,
    estCostKg: 6.80,
    keyProperty: 'High free glutamic acid content delivers authentic poultry broth baseline.'
  }
];
