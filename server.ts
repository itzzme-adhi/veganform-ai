import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import { getProductKnowledge } from './src/data/productKnowledge';
import { calculateNutrition } from './src/engine/nutritionEngine';
import { calculateCost } from './src/engine/costEngine';
import { calculateSustainability } from './src/engine/sustainabilityEngine';
import { buildFunctionalSubstitutions } from './src/engine/substitutionEngine';
import { calculateMultiObjectiveScore, rankFormulationCandidates } from './src/engine/rankingEngine';
import { generateDeterministicFormulations } from './src/engine/deterministicFallback';
import { CandidateFormulation, FormulationRequest } from './src/types/formulation';
import { NUGGET_TEXTURE_IMAGE, CELLULAR_HERO_IMAGE } from './src/data/mockData';
import { filterAndEnforceConstraints, validateFormulation, normalizeAllergens } from './src/engine/allergenValidator';

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const app = express();
app.use(express.json());

// Initialize GoogleGenAI SDK with required telemetry header
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// Health status endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    mode: process.env.NODE_ENV || 'development'
  });
});

// Primary formulation endpoint powered by Gemini AI
app.post('/api/formulate', async (req, res) => {
  const request: FormulationRequest = req.body;

  if (!request || !request.productName) {
    return res.status(400).json({ error: 'productName is required' });
  }

  const { record: productKnowledge, isKnown } = getProductKnowledge(request.productName);

  // If Gemini API is not configured, immediately use deterministic engine
  if (!ai || !process.env.GEMINI_API_KEY) {
    console.log(`[VeganForm AI] No GEMINI_API_KEY configured. Running deterministic demo engine for "${request.productName}".`);
    const fallbackResult = generateDeterministicFormulations(request);
    return res.json({
      candidates: fallbackResult.candidates,
      productAnalysis: fallbackResult.productAnalysis,
      isUnknownProduct: fallbackResult.isUnknownProduct,
      isDemoFallback: true,
      modelUsed: 'deterministic-demo-engine'
    });
  }

  try {
    const normalizedConstraints = normalizeAllergens(request.allergenRestrictions || []);
    const allergenFilterText = (normalizedConstraints.length > 0)
      ? `CRITICAL HARD ALLERGEN CONSTRAINTS (STRICTLY PROHIBITED):
The user has selected the following STRICT EXCLUSIONS: ${normalizedConstraints.map(a => `NO ${a.toUpperCase()}`).join(', ')}.
You must strictly observe zero contamination:
${normalizedConstraints.includes('Soy') ? '- NO SOY: ZERO Soy Protein, Soy Isolate, Soy Milk, Soy Flour, Soy Lecithin, or any other soy derivative.' : ''}
${normalizedConstraints.includes('Gluten') ? '- NO GLUTEN: ZERO Wheat Gluten, Vital Wheat Gluten, Seitan, Oat Flour, or gluten-containing grains.' : ''}
${normalizedConstraints.includes('Nuts') ? '- NO NUTS: ZERO Cashew, Almond, Walnut, Peanut, or other tree nuts.' : ''}
${normalizedConstraints.includes('Dairy') ? '- NO DAIRY: 100% dairy-free vegan formulations.' : ''}
${normalizedConstraints.includes('Egg') ? '- NO EGG: 100% egg-free vegan formulations.' : ''}
Any candidate containing any prohibited allergen ingredient will be immediately rejected.`
      : 'No allergen restrictions specified.';

    const approvedIngredientList = [
      '- Pea Protein Isolate 85%',
      '- Chickpea Flour (Besan)',
      ...(normalizedConstraints.includes('Soy') ? [] : ['- Soy Protein Isolate 90%', '- Soy Milk (Whole Bean Extract)']),
      ...(normalizedConstraints.includes('Gluten') ? [] : ['- Oat Flour (De-hulled Whole Oat)', '- Vital Wheat Gluten (Seitan Base)']),
      '- Refined Coconut Oil',
      '- High-Oleic Sunflower Oil',
      '- Canola Oil (Low Erucic Acid)',
      '- Tapioca Starch (Modified Cassava)',
      '- Potato Starch',
      '- Corn Starch',
      '- Nutritional Yeast (Fortified Flakes)',
      ...(normalizedConstraints.includes('Nuts') ? [] : ['- Raw Cashew Butter / Paste', '- Blanched Almond Flour / Paste']),
      '- Oat Milk (Enzymatically Hydrolyzed)',
      '- Coconut Milk (18% Medium Chain Lipid)',
      '- Shiitake & Button Mushroom Extract',
      '- Young Green Jackfruit (Shredded Pulp)',
      '- Beetroot Powder & Thermal Betalain Extract',
      '- Methylcellulose (Thermal Gel Grade)',
      '- Ground Cold-Milled Flaxseed',
      '- Chia Seed Flour / Hydrated Gel',
      '- Aquafaba (Chickpea Albumin Extract)',
      '- Purified Hydration Water',
      '- Sea Salt & Natural Flavor Synergy',
      '- Calcium Carbonate & B12 Micro-Premix'
    ].join('\n');

    const prompt = `
You are the computational formulation reasoning engine for VeganForm AI.
Analyze the animal-derived food target: "${request.productName}".

TASK:
1. Deconstruct the animal product's functional architecture:
   - Identify primary functional properties (e.g., fibrillar actomyosin alignment, casein micelle emulsion, ovalbumin thermal gelation, moisture retention, lipid lubricity).
   - Identify key animal-derived components and their biological roles.
2. Determine botanical ingredient substitutions and provide scientific reasoning for each.
3. Formulate 3 distinct vegan candidate formulations:
   - Candidate 1: High-Performance Benchmark Match (balanced sensory and nutritional parity)
   - Candidate 2: Clean-Label & Structural Optimization (prioritizes native plant biopolymers and minimal additives)
   - Candidate 3: Scalable Commercial Efficiency (optimized for high-speed industrial processing)

CONSTRAINTS:
${allergenFilterText}
- Desired protein density target: ~${request.proteinTarget || 18}g / 100g.
- Maximum cost ceiling: ₹${request.costCeiling || 250} / kg.
- User priority weighting (0-100 scale): Taste: ${request.tastePriority}, Texture: ${request.texturePriority}, Nutrition: ${request.nutritionPriority}, Cost: ${request.costPriority}, Sustainability: ${request.sustainabilityPriority}.
- Additional requirements: ${request.additionalRequirements || 'None'}.

APPROVED BOTANICAL INGREDIENT REPERTOIRE (select ONLY from these compatible plant ingredients):
${approvedIngredientList}

IMPORTANT INSTRUCTIONS:
- For each candidate, provide 5 to 8 ingredients. The percentage weights must sum to approximately 100%.
- Provide AI-estimated Taste Similarity (0-100) and Texture Similarity (0-100) based on organoleptic and rheological principles.
- Do NOT fabricate final nutrition or cost numbers; those will be calculated deterministically by the application engine.
- Return structured JSON according to the schema.
`;

    // Use gemini-2.5-flash for reliable, high-speed reasoning
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an advanced computational food scientist and biochemical engineer specializing in in-silico plant protein texturization, food rheology, and bio-equivalent molecular formulations.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            productAnalysis: {
              type: Type.OBJECT,
              properties: {
                productName: { type: Type.STRING },
                category: { type: Type.STRING },
                functionalProperties: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                keyAnimalDerivedComponents: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ['productName', 'category', 'functionalProperties', 'keyAnimalDerivedComponents']
            },
            candidateFormulations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  code: { type: Type.STRING },
                  tagline: { type: Type.STRING },
                  baseIsolate: { type: Type.STRING },
                  tasteScore: { type: Type.NUMBER, description: 'AI-estimated taste similarity 0-100' },
                  textureScore: { type: Type.NUMBER, description: 'AI-estimated texture parity 0-100' },
                  ingredients: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        wtPercent: { type: Type.NUMBER },
                        functionalRole: { type: Type.STRING },
                        isScaffold: { type: Type.BOOLEAN }
                      },
                      required: ['name', 'wtPercent', 'functionalRole']
                    }
                  },
                  substitutions: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        animalPrecursor: { type: Type.STRING },
                        botanicalAnalog: { type: Type.STRING },
                        functionalRole: { type: Type.STRING },
                        scientificReasoning: { type: Type.STRING }
                      },
                      required: ['animalPrecursor', 'botanicalAnalog', 'functionalRole', 'scientificReasoning']
                    }
                  },
                  scientificRationales: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        title: { type: Type.STRING },
                        icon: { type: Type.STRING },
                        description: { type: Type.STRING }
                      },
                      required: ['title', 'icon', 'description']
                    }
                  }
                },
                required: ['name', 'code', 'tagline', 'baseIsolate', 'tasteScore', 'textureScore', 'ingredients']
              }
            }
          },
          required: ['productAnalysis', 'candidateFormulations']
        }
      }
    });

    const rawText = response.text?.trim() || '{}';
    const parsed = JSON.parse(rawText);

    if (!parsed.candidateFormulations || parsed.candidateFormulations.length === 0) {
      throw new Error('Gemini response missing candidate formulations');
    }

    // Process raw Gemini candidates through our deterministic engines
    const candidates: CandidateFormulation[] = parsed.candidateFormulations.map((cand: any, idx: number) => {
      // Normalize ingredient weights to exactly 100%
      const totalRawWeight = cand.ingredients.reduce((s: number, i: any) => s + (Number(i.wtPercent) || 0), 0) || 100;
      const batchMatrix = cand.ingredients.map((ing: any) => ({
        name: ing.name,
        function: ing.functionalRole || 'Structural Component',
        wtPercent: Math.round(((Number(ing.wtPercent) || 1) / totalRawWeight) * 1000) / 10,
        highlight: Boolean(ing.isScaffold)
      }));

      // If rounding caused slight drift from 100%, adjust largest ingredient
      const adjustedSum = batchMatrix.reduce((s: number, i: any) => s + i.wtPercent, 0);
      if (Math.abs(adjustedSum - 100) > 0.1 && batchMatrix.length > 0) {
        batchMatrix[0].wtPercent = Math.round((batchMatrix[0].wtPercent + (100 - adjustedSum)) * 10) / 10;
      }

      // DETERMINISTIC ENGINES: Nutrition, Cost, Sustainability
      const nutrition = calculateNutrition(batchMatrix, productKnowledge);
      const cost = calculateCost(batchMatrix, request.costCeiling, productKnowledge.benchmarks.referenceCostPerKg);
      const sustainability = calculateSustainability(batchMatrix, productKnowledge.benchmarks.referenceCarbonKgPerKg);
      
      // Merge AI generated substitutions with structured product substitutions
      const structuredSubstitutions = buildFunctionalSubstitutions(productKnowledge, batchMatrix);
      const aiSubstitutions = (cand.substitutions && cand.substitutions.length > 0)
        ? cand.substitutions.map((s: any) => ({
            animalPrecursor: s.animalPrecursor || 'Animal Component',
            botanicalAnalog: s.botanicalAnalog || 'Botanical Blend',
            functionalRole: s.functionalRole || 'Structural function',
            scientificReasoning: s.scientificReasoning || 'Replaces functional role using complementary plant biopolymers.'
          }))
        : [];
      
      const combinedSubstitutions = aiSubstitutions.length >= 3 ? aiSubstitutions : structuredSubstitutions;

      const targetProtein = request.proteinTarget || productKnowledge.benchmarks.proteinPer100g || 18;
      const proteinRatio = Math.min(1.2, nutrition.proteinPer100g / (targetProtein || 1));
      const nutritionDensity = Math.min(99, Math.max(70, Math.round(proteinRatio * 85 + (nutrition.fiberPer100g > 2 ? 10 : 0))));

      const costRatio = Math.max(0.4, Math.min(1.5, cost.costPerKg / (request.costCeiling || 250)));
      const costEfficiency = Math.min(99, Math.max(60, Math.round((1.5 - costRatio) * 70 + 30)));

      const tasteMatch = Math.min(100, Math.max(50, Math.round(cand.tasteScore || 85)));
      const textureParity = Math.min(100, Math.max(50, Math.round(cand.textureScore || 88)));

      const weights = {
        tasteWeight: request.tastePriority,
        textureWeight: request.texturePriority,
        nutritionWeight: request.nutritionPriority,
        costWeight: request.costPriority,
        sustainabilityWeight: request.sustainabilityPriority
      };

      const scoreBreakdown = calculateMultiObjectiveScore(
        {
          tasteMatch,
          textureParity,
          nutritionDensity,
          costEfficiency,
          sustainabilityLca: sustainability.sustainabilityScore
        },
        weights
      );

      const rationales = (cand.scientificRationales && cand.scientificRationales.length > 0)
        ? cand.scientificRationales.map((r: any) => ({
            title: r.title || 'Biochemical Synergy',
            icon: r.icon || 'biotech',
            description: r.description || 'Optimized molecular interactions.'
          }))
        : [
            {
              title: 'Anisotropic Network Formation',
              icon: 'sync_alt',
              description: 'Thermomechanical processing uncoils botanical globulins into longitudinal fibrils.'
            },
            {
              title: 'Lipid Dispersion Matrix',
              icon: 'opacity',
              description: 'Controlled melting transition provides natural mouth-coating lubricity.'
            },
            {
              title: 'Sensory Alignment',
              icon: 'auto_awesome',
              description: 'Balanced umami and volatile release mirrors the animal culinary profile.'
            }
          ];

      return {
        id: `candidate-${idx + 1}`,
        code: cand.code || `VFA-${idx + 1}`,
        name: cand.name || `Formulation ${idx + 1}`,
        tagline: cand.tagline || 'AI-Optimized Botanical Formulation',
        rank: idx + 1,
        rankBadge: `RANK #${idx + 1}`,
        rankBadgeColor: idx === 0 ? 'bg-primary text-black' : 'bg-[#18241e] text-[#8da396]',
        aiScore: scoreBreakdown.overallScore,
        qScore: scoreBreakdown.overallScore,
        costPerKg: cost.costPerKg,
        currencySymbol: cost.currencySymbol,
        proteinPer100g: nutrition.proteinPer100g,
        baseIsolate: cand.baseIsolate || 'Botanical Protein System',
        sustainabilityLca: sustainability.sustainabilityScore,
        tasteMatch,
        textureParity,
        nutritionDensity,
        costEfficiency,
        carbonFootprintDelta: sustainability.carbonFootprintDelta,
        functionalParity: Math.round((tasteMatch + textureParity) / 2),
        tasteDescriptor: tasteMatch > 90 ? 'High Umami Parity' : 'Mild Savory',
        textureDescriptor: textureParity > 90 ? 'Anisotropic Fibrous Bite' : 'Cohesive Tender Chew',
        caloriesKcal: nutrition.caloriesKcal,
        fatPer100g: nutrition.fatPer100g,
        carbsPer100g: nutrition.carbsPer100g,
        fiberPer100g: nutrition.fiberPer100g,
        ironPer100g: nutrition.ironPer100g,
        b12Per100g: nutrition.b12Per100g,
        crossSectionTextureImage: idx === 0 ? NUGGET_TEXTURE_IMAGE : CELLULAR_HERO_IMAGE,
        cellularMatchPercent: Math.min(99, Math.round((tasteMatch + textureParity) / 2 * 1.02)),

        isLimitedCoverage: !isKnown,
        coverageNote: !isKnown ? 'Limited knowledge-base coverage — Physical laboratory validation is strictly required.' : undefined,

        batchMatrix,
        substitutionMap: combinedSubstitutions,
        nutritionalProfile: nutrition.nutritionalProfile,
        costAllocation: cost.costAllocation,
        flavorChemistry: [
          { name: 'Volatile Umami Intensity', value: tasteMatch, targetLabel: 'Target 90%' },
          { name: 'Lipid Salivary Lubrication', value: Math.min(98, tasteMatch + 2), targetLabel: 'Target 92%' },
          { name: 'Off-Flavor Masking Index', value: 94, targetLabel: 'Target 90%' },
          { name: 'Sweet/Saline Balance', value: 91, targetLabel: 'Target 88%' }
        ],
        rheologyTexture: [
          { name: 'Warner-Bratzler Cut Resistance', value: textureParity, targetLabel: '18.2 N Control' },
          { name: 'Anisotropic Fiber Alignment (λ)', value: Math.min(98, textureParity + 1), targetLabel: 'λ = 0.74 Target' },
          { name: 'Moisture Retention on Cooking', value: 92, targetLabel: '54% Target' },
          { name: 'Elastic Recovery After Chew', value: 89, targetLabel: '88% Target' }
        ],
        aiRationales: rationales,
        processingDirectives: {
          technology: 'HMEC Twin-Screw High-Moisture Extrusion',
          temperatures: [
            { zone: 'Zone 1 (Feeding)', temp: '48°C', note: 'Dry blend hydration' },
            { zone: 'Zone 2 (Conveying)', temp: '92°C', note: 'Pre-gelatinization' },
            { zone: 'Zone 3 (Melting)', temp: '138°C', note: 'Protein denaturation' },
            { zone: 'Zone 4 (Shearing)', temp: '152°C', note: 'Fibril formation' },
            { zone: 'Cooling Die', temp: '62°C', note: 'Anisotropic matrix fixation' }
          ],
          screwSpeedRpm: 320,
          smeEnergyKjKg: 112,
          diePressureMpa: 2.2
        }
      };
    });

    // HARD ALLERGEN CONSTRAINT ENFORCEMENT (Requirements 2, 3, 4, 5, 6, 8, 12)
    // Inspect every ingredient in every candidate.
    // Candidates violating hard allergen constraints are repaired or removed BEFORE ranking.
    const { compliantCandidates } = filterAndEnforceConstraints(
      candidates,
      request.allergenRestrictions,
      productKnowledge,
      request.costCeiling
    );

    // If fewer than 3 candidates are compliant after filtering/repairing Gemini candidates,
    // supplement with deterministic compliant formulations so user receives 3 valid candidates.
    let finalCandidatePool = compliantCandidates;
    if (finalCandidatePool.length < 3) {
      console.log(`[VeganForm AI] Gemini returned ${compliantCandidates.length} compliant candidates. Supplementing with deterministic compliant candidates.`);
      const fallback = generateDeterministicFormulations(request);
      for (const fbCand of fallback.candidates) {
        if (finalCandidatePool.length >= 3) break;
        if (!finalCandidatePool.some(c => c.name === fbCand.name)) {
          finalCandidatePool.push(fbCand);
        }
      }
    }

    // Rank compliant candidates using user weights
    const rankedCandidates = rankFormulationCandidates(finalCandidatePool, {
      tasteWeight: request.tastePriority,
      textureWeight: request.texturePriority,
      nutritionWeight: request.nutritionPriority,
      costWeight: request.costPriority,
      sustainabilityWeight: request.sustainabilityPriority
    });

    return res.json({
      candidates: rankedCandidates.slice(0, 3),
      productAnalysis: parsed.productAnalysis,
      isUnknownProduct: !isKnown,
      isDemoFallback: false,
      modelUsed: 'gemini-2.5-flash'
    });
  } catch (error) {
    console.error('[VeganForm AI] Gemini API processing error, falling back to deterministic engine:', error);
    const fallbackResult = generateDeterministicFormulations(request);
    return res.json({
      candidates: fallbackResult.candidates,
      productAnalysis: fallbackResult.productAnalysis,
      isUnknownProduct: fallbackResult.isUnknownProduct,
      isDemoFallback: true,
      modelUsed: 'deterministic-demo-engine'
    });
  }
});

// Mount Vite or serve static dist in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[VeganForm AI] Computational Food R&D server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
