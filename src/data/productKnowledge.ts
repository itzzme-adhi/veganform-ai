import { ProductKnowledgeRecord } from '../types/formulation';

export const PRODUCT_KNOWLEDGE_BASE: Record<string, ProductKnowledgeRecord> = {
  'chicken-nugget': {
    name: 'Chicken Nugget',
    category: 'Poultry Emulsion Matrix',
    functionalProperties: [
      'Oriented fibrillar actomyosin protein network (shear alignment)',
      'Water-holding capacity (54% internal moisture)',
      'Juiciness from dispersed intramuscular lipid droplets',
      'Cohesive thermal gelation upon heating (>68°C)',
      'Savory, brothy, pyrazine-driven umami flavor'
    ],
    keyAnimalDerivedComponents: [
      'Myofibrillar actin & myosin (muscle fibers)',
      'Intramuscular animal fat (tallow/poultry lipid)',
      'Connective collagen matrix',
      'Albumin / batter binder'
    ],
    benchmarks: {
      proteinPer100g: 18.2,
      caloriesPer100g: 225,
      fatPer100g: 13.5,
      carbsPer100g: 7.8,
      fiberPer100g: 0.8,
      ironPer100g: 1.1,
      b12Per100g: 0.35,
      waterContentPercent: 54,
      referenceCarbonKgPerKg: 6.8, // kg CO2e / kg broiler chicken
      referenceCostPerKg: 240
    },
    recommendedSubstitutions: [
      {
        animalComponent: 'Myofibrillar actomyosin muscle fibers',
        functionalRole: 'Fibrillar scaffold & tensile cutting chew',
        suggestedVeganIngredients: ['Pea Protein Isolate 85%', 'Vital Wheat Gluten', 'Young Green Jackfruit'],
        mechanisticReasoning: 'High-moisture extrusion (HMEC) uncoils globular pea globulins and glutenin chains into parallel longitudinal fibers with Warner-Bratzler shear resistance matching breast meat.'
      },
      {
        animalComponent: 'Animal intramuscular fat droplets',
        functionalRole: 'Thermal melt juiciness & mouth-coating lubricity',
        suggestedVeganIngredients: ['Refined Coconut Oil', 'High-Oleic Sunflower Oil'],
        mechanisticReasoning: 'Biphasic lipid blend: coconut oil provides a crisp melt at 24°C mimicking animal fat, while sunflower oil ensures lingering juiciness without post-chew waxiness.'
      },
      {
        animalComponent: 'Connective tissue & heat-set binding',
        functionalRole: 'Structural integrity during deep-frying',
        suggestedVeganIngredients: ['Methylcellulose (Thermal Gel)', 'Potato Starch'],
        mechanisticReasoning: 'Methylcellulose undergoes reversible thermal gelation above 55°C, sealing in volatile moisture steam during hot frying while potato starch retrogrades to preserve crust adhesion.'
      },
      {
        animalComponent: 'Brothy poultry umami volatiles',
        functionalRole: 'Savory depth & peptide mouthfeel',
        suggestedVeganIngredients: ['Shiitake & Button Mushroom Extract', 'Nutritional Yeast'],
        mechanisticReasoning: 'Naturally occurring 5\'-GMP nucleotide from shiitake acts synergistically with free glutamates in yeast to trigger salivary umami receptors without poultry stock.'
      }
    ]
  },

  'mozzarella-cheese': {
    name: 'Mozzarella Cheese',
    category: 'Cultured Dairy Emulsion',
    functionalProperties: [
      'Casein micelle cross-linked hydrophobic matrix',
      'Biaxial thermoreversible stretch and fiber drawing (>58°C)',
      'Free fat oiling-off on baking (controlled release)',
      'Moisture retention in acidified gel network',
      'Milky, lactic, subtle cultured diacetyl flavor'
    ],
    keyAnimalDerivedComponents: [
      'Bovine casein micelle network (alpha-s1, beta, kappa)',
      'Bovine milk fat globules (high palmitic/oleic ratio)',
      'Whey proteins & lactose',
      'Lactic acid bacteria culture acids'
    ],
    benchmarks: {
      proteinPer100g: 22.0,
      caloriesPer100g: 300,
      fatPer100g: 22.4,
      carbsPer100g: 2.2,
      fiberPer100g: 0.0,
      ironPer100g: 0.4,
      b12Per100g: 2.3,
      waterContentPercent: 50,
      referenceCarbonKgPerKg: 9.5, // kg CO2e / kg dairy cheese
      referenceCostPerKg: 380
    },
    recommendedSubstitutions: [
      {
        animalComponent: 'Casein micelle stretching strands',
        functionalRole: 'Biaxial thermoreversible stretch & melt',
        suggestedVeganIngredients: ['Tapioca Starch (Modified Cassava)', 'Soy Milk / Pea Protein'],
        mechanisticReasoning: 'Pregelatinized amylopectin in tapioca forms long intermolecular entanglements when heated with water and lipids, replicating the continuous molten stringiness of curd fibers.'
      },
      {
        animalComponent: 'Bovine milk fat globules',
        functionalRole: 'Firm chilled block + creamy melt release',
        suggestedVeganIngredients: ['Refined Coconut Oil', 'Raw Cashew Butter / Paste'],
        mechanisticReasoning: 'Coconut oil solidifies at refrigeration temperatures for clean grating/shredding, while cashew butter micro-droplets contribute natural dairy-like colloidal richness.'
      },
      {
        animalComponent: 'Calcium-phosphate bridging',
        functionalRole: 'Curd gel firmness & ionic cross-linking',
        suggestedVeganIngredients: ['Calcium Carbonate & B12 Micro-Premix', 'Sea Salt & Natural Flavor Synergy'],
        mechanisticReasoning: 'Divalent Ca2+ ions cross-link botanical hydrocolloids and plant proteins, stabilizing the emulsion against oil separation during pizza baking.'
      }
    ]
  },

  'milk': {
    name: 'Dairy Milk',
    category: 'Bovine Liquid Dispersion',
    functionalProperties: [
      'Submicellar colloidal dispersion in water',
      'Subtle lactose carbohydrate sweetness',
      'Light mouthfeel viscosity (2.0 cP at 20°C)',
      'Steam micro-foaming capability (protein-stabilized bubbles)',
      'Neutral, fresh, creamy volatile profile'
    ],
    keyAnimalDerivedComponents: [
      'Soluble whey & colloidal casein protein',
      'Milk fat globule membrane (MFGM)',
      'Lactose disaccharide sugar',
      'Bioavailable calcium & Vitamin B12'
    ],
    benchmarks: {
      proteinPer100g: 3.4,
      caloriesPer100g: 61,
      fatPer100g: 3.3,
      carbsPer100g: 4.8,
      fiberPer100g: 0.0,
      ironPer100g: 0.1,
      b12Per100g: 0.45,
      waterContentPercent: 88,
      referenceCarbonKgPerKg: 3.2,
      referenceCostPerKg: 70
    },
    recommendedSubstitutions: [
      {
        animalComponent: 'Casein & whey protein suspension',
        functionalRole: 'Protein density & barista micro-foaming',
        suggestedVeganIngredients: ['Soy Milk (Whole Bean Extract)', 'Pea Protein Isolate 85%'],
        mechanisticReasoning: 'Soluble botanical globulins create interfacial films around injected steam bubbles, producing velvety micro-foam with elastic foam stability.'
      },
      {
        animalComponent: 'Milk fat globules',
        functionalRole: 'Mouth-coating creaminess and opacity',
        suggestedVeganIngredients: ['High-Oleic Sunflower Oil', 'Oat Milk'],
        mechanisticReasoning: 'High-pressure homogenization shears botanical oil into sub-micron droplets (d50 < 0.8 μm), mimicking whole milk opacity and non-viscous light creaminess.'
      },
      {
        animalComponent: 'Lactose & dairy minerals',
        functionalRole: 'Natural sweet balance & daily mineral parity',
        suggestedVeganIngredients: ['Oat Milk (Enzymatically Hydrolyzed)', 'Calcium Carbonate & B12 Micro-Premix'],
        mechanisticReasoning: 'Enzymatic amylase treatment yields natural maltose sweetness with zero added cane sugar, fortified with calcium carbonate to 120mg/100g.'
      }
    ]
  },

  'ice-cream': {
    name: 'Ice Cream',
    category: 'Cryogenic Frozen Foam & Emulsion',
    functionalProperties: [
      'Partially coalesced fat globule crystal network',
      'Viscous concentrated sugar-water matrix freezing depression',
      'Overrun air cell stabilization (micro-air bubbles)',
      'Slow thermal meltdown rate without iciness',
      'Smooth, creamy, velvety mouthfeel at -15°C'
    ],
    keyAnimalDerivedComponents: [
      'Heavy dairy cream fat (36% milk fat)',
      'Skim milk solids-non-fat (MSNF protein)',
      'Dairy sucrose & lactose balance',
      'Egg yolk lecithin (custard styles)'
    ],
    benchmarks: {
      proteinPer100g: 3.5,
      caloriesPer100g: 207,
      fatPer100g: 11.0,
      carbsPer100g: 23.6,
      fiberPer100g: 0.7,
      ironPer100g: 0.2,
      b12Per100g: 0.4,
      waterContentPercent: 61,
      referenceCarbonKgPerKg: 4.8,
      referenceCostPerKg: 180
    },
    recommendedSubstitutions: [
      {
        animalComponent: 'Heavy dairy cream fat',
        functionalRole: 'Fat crystal network preventing ice crystal growth',
        suggestedVeganIngredients: ['Coconut Milk (18% Medium Chain Lipid)', 'Refined Coconut Oil'],
        mechanisticReasoning: 'Solid fat content at -18°C creates a rigid scaffolding that physically blocks ice recrystallization, ensuring smooth scoopability.'
      },
      {
        animalComponent: 'Milk solids non-fat & egg yolk',
        functionalRole: 'Emulsification & air cell overrun entrapment',
        suggestedVeganIngredients: ['Raw Cashew Butter / Paste', 'Aquafaba'],
        mechanisticReasoning: 'Cashew paste provides fine natural emulsified solids, while aquafaba peptides stabilize tiny air pockets during cryogenic churning.'
      },
      {
        animalComponent: 'Dairy sugar cryoprotectant',
        functionalRole: 'Freezing point depression & creamy scoop',
        suggestedVeganIngredients: ['Tapioca Starch (Modified Cassava)', 'Oat Milk'],
        mechanisticReasoning: 'Low-molecular weight plant oligosaccharides depress freezing point to -2.5°C, ensuring a soft scoop without brittle crystal shards.'
      }
    ]
  },

  'egg': {
    name: 'Whole Egg',
    category: 'Avian Colloid & Emulsion',
    functionalProperties: [
      'Thermally induced irreversible protein coagulation (62°C–70°C)',
      'Phospholipid-rich amphiphilic emulsification (lecithin)',
      'Surface-active foaming and expansion',
      'Water entrapment in tight 3D gel mesh',
      'Rich, fatty, sulfurous/savory custard notes'
    ],
    keyAnimalDerivedComponents: [
      'Egg white ovalbumin & ovotransferrin (coagulating proteins)',
      'Egg yolk vitellin & high-density lipoproteins',
      'Yolk lecithin (phosphatidylcholine emulsifier)',
      'Carotenoid lutein / zeaxanthin pigment'
    ],
    benchmarks: {
      proteinPer100g: 12.6,
      caloriesPer100g: 143,
      fatPer100g: 9.5,
      carbsPer100g: 0.7,
      fiberPer100g: 0.0,
      ironPer100g: 1.8,
      b12Per100g: 1.1,
      waterContentPercent: 75,
      referenceCarbonKgPerKg: 4.2,
      referenceCostPerKg: 150
    },
    recommendedSubstitutions: [
      {
        animalComponent: 'Ovalbumin heat-set coagulation',
        functionalRole: 'Thermal gelation & scrambles/baking binding',
        suggestedVeganIngredients: ['Chickpea Flour (Besan)', 'Soy Protein Isolate 90%'],
        mechanisticReasoning: 'Legume 7S and 11S globulins denature at 68°C, forming a coherent continuous protein gel that holds moisture without separating into curds.'
      },
      {
        animalComponent: 'Egg yolk lecithin emulsification',
        functionalRole: 'Binding water and oil phases in culinary matrices',
        suggestedVeganIngredients: ['Ground Cold-Milled Flaxseed', 'Aquafaba'],
        mechanisticReasoning: 'Flaxseed arabinoxylans and aquafaba saponins mimic the amphiphilic properties of egg yolk lecithin, forming stable micellar emulsions.'
      },
      {
        animalComponent: 'Yolk color and rich lipid mouthfeel',
        functionalRole: 'Golden yellow color & unctuous coating',
        suggestedVeganIngredients: ['High-Oleic Sunflower Oil', 'Corn Starch'],
        mechanisticReasoning: 'Plant oils enriched with botanical carotenoids replicate the creamy mouth-coat and golden chromaticity of freshly cracked yolk.'
      }
    ]
  },

  'mayonnaise': {
    name: 'Mayonnaise',
    category: 'Oil-in-Water Colloid Matrix',
    functionalProperties: [
      'Extremely high internal phase packing (>70% oil droplet volume)',
      'Viscoelastic yield stress and shear-thinning rheology',
      'Stable emulsion against coalescence under ambient storage',
      'Creamy spreadability with clean spoon-cut edges',
      'Tangy, rich, acidic emulsified flavor'
    ],
    keyAnimalDerivedComponents: [
      'Egg yolk low-density lipoprotein (LDL)',
      'Egg yolk phosvitin & livetin proteins',
      'Egg yolk cholesterol & triglycerides',
      'Vinegar/lemon acid coagulation'
    ],
    benchmarks: {
      proteinPer100g: 1.2,
      caloriesPer100g: 680,
      fatPer100g: 74.8,
      carbsPer100g: 0.6,
      fiberPer100g: 0.0,
      ironPer100g: 0.2,
      b12Per100g: 0.1,
      waterContentPercent: 20,
      referenceCarbonKgPerKg: 3.8,
      referenceCostPerKg: 190
    },
    recommendedSubstitutions: [
      {
        animalComponent: 'Egg yolk LDL emulsifier',
        functionalRole: 'Packing 70%+ oil droplets into dense non-flowing gel',
        suggestedVeganIngredients: ['Aquafaba (Chickpea Albumin Extract)', 'Modified Potato Starch'],
        mechanisticReasoning: 'Aquafaba proteins adsorb at the oil-water interface, lowering interfacial tension below 10 mN/m and preventing droplet coalescence.'
      },
      {
        animalComponent: 'High-fat dispersion',
        functionalRole: 'Viscoelastic body and creamy spoonable scoop',
        suggestedVeganIngredients: ['Canola Oil (Low Erucic Acid)', 'High-Oleic Sunflower Oil'],
        mechanisticReasoning: 'High-shear rotor-stator blending disperses plant oil into uniform 2-5 micron droplets, achieving a yield stress of >45 Pa.'
      },
      {
        animalComponent: 'Egg yolk rich savory mouthfeel',
        functionalRole: 'Creamy lingering finish without oil slick',
        suggestedVeganIngredients: ['Sea Salt & Natural Flavor Synergy', 'Ground Cold-Milled Flaxseed'],
        mechanisticReasoning: 'Hydrated flaxseed mucilage provides non-Newtonian shear thinning: high viscosity when resting on a spoon, instant smooth melt on tongue contact.'
      }
    ]
  }
};

/**
 * Normalizes user query to recognized product record or returns custom template
 */
export function getProductKnowledge(inputName: string): { record: ProductKnowledgeRecord; isKnown: boolean } {
  const clean = inputName.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
  
  for (const [key, record] of Object.entries(PRODUCT_KNOWLEDGE_BASE)) {
    const keyClean = key.replace(/[^a-z0-9]/g, '');
    const nameClean = record.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    if (clean === keyClean || clean === nameClean) return { record, isKnown: true };
    if (clean.includes(keyClean) || nameClean.includes(clean)) return { record, isKnown: true };
  }

  // Common aliases
  if (clean.includes('chicken') || clean.includes('nugget') || clean.includes('poultry') || clean.includes('tender')) {
    return { record: PRODUCT_KNOWLEDGE_BASE['chicken-nugget'], isKnown: true };
  }
  if (clean.includes('mozzarella') || clean.includes('cheese') || clean.includes('curd') || clean.includes('cheddar')) {
    return { record: PRODUCT_KNOWLEDGE_BASE['mozzarella-cheese'], isKnown: true };
  }
  if (clean.includes('milk') || clean.includes('dairy') || clean.includes('latte')) {
    return { record: PRODUCT_KNOWLEDGE_BASE['milk'], isKnown: true };
  }
  if (clean.includes('icecream') || clean.includes('gelato') || clean.includes('frozenyogurt')) {
    return { record: PRODUCT_KNOWLEDGE_BASE['ice-cream'], isKnown: true };
  }
  if (clean.includes('egg') || clean.includes('omelet') || clean.includes('scramble')) {
    return { record: PRODUCT_KNOWLEDGE_BASE['egg'], isKnown: true };
  }
  if (clean.includes('mayo') || clean.includes('mayonnaise') || clean.includes('aioli')) {
    return { record: PRODUCT_KNOWLEDGE_BASE['mayonnaise'], isKnown: true };
  }

  // Unknown animal product - generate conceptual dynamic placeholder
  return {
    isKnown: false,
    record: {
      name: inputName.trim(),
      category: 'Specialty Animal Archetype',
      functionalProperties: [
        'Complex animal protein macro-structure',
        'Specific lipid melting profile',
        'Moisture entrapment and water activity',
        'Savory or rich organoleptic notes'
      ],
      keyAnimalDerivedComponents: [
        'Animal skeletal or cellular protein',
        'Species-specific animal lipids & cholesterol',
        'Emulsifiers and connective structural fibers'
      ],
      benchmarks: {
        proteinPer100g: 16.0,
        caloriesPer100g: 210,
        fatPer100g: 12.0,
        carbsPer100g: 2.0,
        fiberPer100g: 0.0,
        ironPer100g: 1.5,
        b12Per100g: 0.8,
        waterContentPercent: 65,
        referenceCarbonKgPerKg: 7.5,
        referenceCostPerKg: 250
      },
      recommendedSubstitutions: [
        {
          animalComponent: 'Animal cellular protein matrix',
          functionalRole: 'Scaffold structure & bite resistance',
          suggestedVeganIngredients: ['Pea Protein Isolate 85%', 'Vital Wheat Gluten'],
          mechanisticReasoning: 'Thermomechanically extruded botanical protein isolates re-create the tensile fiber network.'
        },
        {
          animalComponent: 'Animal fats & sterols',
          functionalRole: 'Mouthfeel lubrication & melting profile',
          suggestedVeganIngredients: ['Refined Coconut Oil', 'High-Oleic Sunflower Oil'],
          mechanisticReasoning: 'Biphasic vegetable lipid system provides clean solid-to-liquid phase transition.'
        }
      ]
    }
  };
}
