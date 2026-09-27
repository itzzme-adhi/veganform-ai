import React, { useState } from 'react';
import { TabType, BaselineTarget, FormulationRequest } from '../types/formulation';
import { BASELINE_TARGETS, ACTOMYOSIN_SCAN_IMAGE, CELLULAR_HERO_IMAGE } from '../data/mockData';

interface FormulateViewProps {
  onNavigate: (tab: TabType) => void;
  onSynthesize: (request: FormulationRequest) => void;
  isSynthesizing: boolean;
  currentSimulationStep?: string;
  simulationStepIndex?: number;
  totalSimulationSteps?: number;
  initialTargetName?: string;
}

const DEMO_PRESETS: {
  id: string;
  name: string;
  subtitle: string;
  proteinTarget: number;
  costCeiling: number;
  tastePriority: number;
  texturePriority: number;
  nutritionPriority: number;
  costPriority: number;
  sustainabilityPriority: number;
  primaryBase: string;
  extrusionTech: string;
  allergens: string[];
}[] = [
  {
    id: 'chicken-nugget',
    name: 'Chicken Nugget',
    subtitle: 'Whole Muscle Emulsion',
    proteinTarget: 22,
    costCeiling: 220,
    tastePriority: 94,
    texturePriority: 96,
    nutritionPriority: 88,
    costPriority: 78,
    sustainabilityPriority: 86,
    primaryBase: 'pea',
    extrusionTech: 'hmec',
    allergens: []
  },
  {
    id: 'mozzarella-cheese',
    name: 'Mozzarella Cheese',
    subtitle: 'Curd & Stretch Matrix',
    proteinTarget: 20,
    costCeiling: 260,
    tastePriority: 96,
    texturePriority: 95,
    nutritionPriority: 82,
    costPriority: 75,
    sustainabilityPriority: 85,
    primaryBase: 'cashew',
    extrusionTech: 'lmec',
    allergens: []
  },
  {
    id: 'milk',
    name: 'Milk',
    subtitle: 'Colloidal Bovine Dispersion',
    proteinTarget: 3.4,
    costCeiling: 65,
    tastePriority: 92,
    texturePriority: 90,
    nutritionPriority: 90,
    costPriority: 88,
    sustainabilityPriority: 92,
    primaryBase: 'oat',
    extrusionTech: 'spinning',
    allergens: []
  },
  {
    id: 'ice-cream',
    name: 'Ice Cream',
    subtitle: 'Cryogenic Frozen Emulsion',
    proteinTarget: 4.0,
    costCeiling: 190,
    tastePriority: 98,
    texturePriority: 94,
    nutritionPriority: 70,
    costPriority: 72,
    sustainabilityPriority: 80,
    primaryBase: 'coconut',
    extrusionTech: 'lmec',
    allergens: []
  },
  {
    id: 'egg',
    name: 'Egg',
    subtitle: 'Albumin & Vitellin Colloid',
    proteinTarget: 13,
    costCeiling: 140,
    tastePriority: 93,
    texturePriority: 95,
    nutritionPriority: 89,
    costPriority: 80,
    sustainabilityPriority: 88,
    primaryBase: 'chickpea',
    extrusionTech: 'spinning',
    allergens: []
  },
  {
    id: 'mayonnaise',
    name: 'Mayonnaise',
    subtitle: 'Oil-in-Water Colloid Matrix',
    proteinTarget: 1.5,
    costCeiling: 175,
    tastePriority: 95,
    texturePriority: 97,
    nutritionPriority: 65,
    costPriority: 82,
    sustainabilityPriority: 84,
    primaryBase: 'aquafaba',
    extrusionTech: 'lmec',
    allergens: []
  }
];

export const FormulateView: React.FC<FormulateViewProps> = ({
  onNavigate,
  onSynthesize,
  isSynthesizing,
  currentSimulationStep,
  simulationStepIndex = 1,
  totalSimulationSteps = 9,
  initialTargetName = 'Chicken Nugget'
}) => {
  const [productQuery, setProductQuery] = useState(initialTargetName);
  const [selectedBaseline, setSelectedBaseline] = useState<BaselineTarget>(BASELINE_TARGETS[0]);

  // Priority weights (0-100)
  const [tastePriority, setTastePriority] = useState(94);
  const [texturePriority, setTexturePriority] = useState(96);
  const [nutritionPriority, setNutritionPriority] = useState(88);
  const [costPriority, setCostPriority] = useState(76);
  const [sustainabilityPriority, setSustainabilityPriority] = useState(85);

  // Numerical constraints
  const [costCeiling, setCostCeiling] = useState(250); // ₹ / kg default
  const [proteinTarget, setProteinTarget] = useState(22); // g / 100g

  // Allergen restrictions
  const [allergenRestrictions, setAllergenRestrictions] = useState<string[]>([]);

  // Additional requirements text
  const [additionalRequirements, setAdditionalRequirements] = useState('');

  // Processing constraints
  const [selectedBase, setSelectedBase] = useState<'pea' | 'soy' | 'mycoprotein' | 'faba'>('pea');
  const [extrusionTech, setExtrusionTech] = useState<'hmec' | 'lmec' | 'spinning' | 'bioprint'>('hmec');
  const [nonGmoOnly, setNonGmoOnly] = useState(true);
  const [sodiumCap, setSodiumCap] = useState(420);

  // Preset chip selection
  const handleSelectPreset = (presetName: string) => {
    setProductQuery(presetName);
    const preset = DEMO_PRESETS.find(p => p.name.toLowerCase() === presetName.toLowerCase());
    const matchedBaseline = BASELINE_TARGETS.find(b => b.name.toLowerCase().includes(presetName.toLowerCase().split(' ')[0])) || BASELINE_TARGETS[0];
    
    setSelectedBaseline(matchedBaseline);

    if (preset) {
      setProteinTarget(preset.proteinTarget);
      setCostCeiling(preset.costCeiling);
      setTastePriority(preset.tastePriority);
      setTexturePriority(preset.texturePriority);
      setNutritionPriority(preset.nutritionPriority);
      setCostPriority(preset.costPriority);
      setSustainabilityPriority(preset.sustainabilityPriority);
    }
  };

  const toggleAllergen = (allergen: string) => {
    setAllergenRestrictions(prev => {
      const isCurrentlySelected = prev.includes(allergen);
      const next = isCurrentlySelected ? prev.filter(a => a !== allergen) : [...prev, allergen];
      if (!isCurrentlySelected && allergen.toLowerCase().includes('soy') && selectedBase === 'soy') {
        setSelectedBase('pea');
      }
      return next;
    });
  };

  const handleRunSynthesis = () => {
    const targetName = productQuery.trim() || selectedBaseline.name;
    const request: FormulationRequest = {
      productName: targetName,
      tastePriority,
      texturePriority,
      nutritionPriority,
      costPriority,
      sustainabilityPriority,
      costCeiling,
      proteinTarget,
      allergenRestrictions,
      additionalRequirements,
      primaryBase: selectedBase,
      extrusionTech
    };

    onSynthesize(request);
  };

  return (
    <div className="flex flex-col w-full px-margin pb-32 pt-20 max-w-4xl mx-auto gap-6 text-[#dfe4e0]">
      {/* Top Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#131d18] border border-[#1f382b] p-6 sm:p-7 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00f5a0]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f5a0] shadow-[0_0_8px_#00f5a0]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#00f5a0] font-semibold">
              BIO-COMPUTATIONAL WORKSPACE • STEP 01
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Target Formulation Studio
            </h1>
            <span className="font-mono text-[10px] text-[#00f5a0] bg-[#18241e] px-2.5 py-1 rounded-md border border-[#00f5a0]/30 w-fit">
              AI REASONING + DETERMINISTIC BIO-CALCULATIONS
            </span>
          </div>

          <p className="text-sm text-[#8da396] max-w-2xl leading-relaxed">
            Enter an animal-based food product to analyze its functional matrix, select multi-objective priorities, and synthesize candidate vegan formulations.
          </p>

          {/* Search / Target Product Input Bar */}
          <div className="relative mt-2">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8da396] text-[20px]">
              search
            </span>
            <input
              type="text"
              value={productQuery}
              onChange={(e) => setProductQuery(e.target.value)}
              placeholder="Enter animal target (e.g. Chicken Nugget, Mozzarella Cheese, Milk, Ice Cream, Egg, Mayonnaise...)"
              className="w-full bg-[#0a0f0d] border border-[#1f382b] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-[#8da396]/60 focus:outline-none focus:border-[#00f5a0] focus:ring-1 focus:ring-[#00f5a0] transition-all font-sans"
            />
          </div>

          {/* Quick Select Demo Chips */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="font-mono text-[11px] text-[#8da396] uppercase tracking-wider mr-1">
              Demo Targets:
            </span>
            {DEMO_PRESETS.map((demo) => {
              const isSelected = productQuery.toLowerCase() === demo.name.toLowerCase();
              return (
                <button
                  key={demo.id}
                  onClick={() => handleSelectPreset(demo.name)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#00f5a0] text-[#0a0f0d] font-bold shadow-[0_0_12px_rgba(0,245,160,0.3)]'
                      : 'bg-[#18241e] text-[#8da396] hover:text-white hover:bg-[#1f382b] border border-[#1f382b]'
                  }`}
                >
                  <span>{demo.name}</span>
                  {isSelected && (
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3D Lattice Scan & Reference Archetype Preview */}
      <div className="relative rounded-2xl bg-[#131d18] border border-[#1f382b] overflow-hidden shadow-lg p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#1f382b]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#00f5a0] font-semibold uppercase tracking-wider">
                Target Reference Matrix
              </span>
              <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#18241e] text-[#8da396] border border-[#1f382b]">
                {selectedBaseline.rasterCode}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              {productQuery || selectedBaseline.name} Matrix
            </h2>
            <p className="text-xs text-[#8da396]">
              {selectedBaseline.subtitle} • Computational Food Science Reference
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <span className="font-mono text-xs text-[#8da396]">Bio-Parity Target:</span>
            <span className="font-mono text-xs font-semibold text-[#00f5a0] bg-[#0a0f0d] px-2.5 py-1 rounded-lg border border-[#00f5a0]/30">
              REFERENCE ARCHETYPE
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-4 items-center">
          <div className="md:col-span-4 relative h-36 rounded-xl overflow-hidden border border-[#1f382b] bg-[#0a0f0d] group">
            <img
              src={selectedBaseline.archetypeImage || ACTOMYOSIN_SCAN_IMAGE}
              alt={selectedBaseline.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white bg-[#0a0f0d]/80 px-2 py-0.5 rounded border border-[#1f382b]">
              SEM TOMOGRAPHY SCAN
            </div>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-2.5 rounded-xl bg-[#0a0f0d] border border-[#1f382b]">
              <div className="text-[10px] font-mono text-[#8da396]">Protein Density</div>
              <div className="font-mono text-sm font-bold text-white mt-0.5">{proteinTarget}g / 100g</div>
              <div className="text-[10px] font-mono text-[#00f5a0] mt-0.5">Target Spec</div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#0a0f0d] border border-[#1f382b]">
              <div className="text-[10px] font-mono text-[#8da396]">Max Unit Cost</div>
              <div className="font-mono text-sm font-bold text-[#00f5a0] mt-0.5">₹{costCeiling} / kg</div>
              <div className="text-[10px] font-mono text-[#8da396] mt-0.5">Ceiling Target</div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#0a0f0d] border border-[#1f382b]">
              <div className="text-[10px] font-mono text-[#8da396]">Thermal Gelation</div>
              <div className="font-mono text-sm font-bold text-white mt-0.5">{selectedBaseline.thermalGelation}</div>
              <div className="text-[10px] font-mono text-[#8da396] mt-0.5">Endothermic Point</div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#0a0f0d] border border-[#1f382b]">
              <div className="text-[10px] font-mono text-[#8da396]">Water Activity</div>
              <div className="font-mono text-sm font-bold text-[#00f5a0] mt-0.5">{selectedBaseline.waterActivity}</div>
              <div className="text-[10px] font-mono text-[#8da396] mt-0.5">Bound Moisture</div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Objective Optimization Priorities (Weights 0-100) */}
      <div className="rounded-2xl bg-[#131d18] border border-[#1f382b] p-5 sm:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f5a0]">tune</span>
            <h3 className="font-semibold text-white text-base">Multi-Objective Optimization Priorities</h3>
          </div>
          <span className="text-[11px] font-mono text-[#8da396]">
            Weights dynamically calibrate the Pareto ranking function
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Priority 1: Taste */}
          <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-[#0a0f0d] border border-[#1f382b]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-white flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#00f5a0]">restaurant</span>
                Taste & Flavor Priority
              </span>
              <span className="font-mono text-[#00f5a0] font-bold">{tastePriority}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={tastePriority}
              onChange={(e) => setTastePriority(Number(e.target.value))}
              className="w-full accent-[#00f5a0] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#8da396]">
              <span>Moderate Umami (20%)</span>
              <span>Near-Identical Volatiles (100%)</span>
            </div>
          </div>

          {/* Priority 2: Texture */}
          <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-[#0a0f0d] border border-[#1f382b]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-white flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#00f5a0]">grain</span>
                Texture & Mouthfeel Priority
              </span>
              <span className="font-mono text-[#00f5a0] font-bold">{texturePriority}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={texturePriority}
              onChange={(e) => setTexturePriority(Number(e.target.value))}
              className="w-full accent-[#00f5a0] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#8da396]">
              <span>Tender Soft Chew (20%)</span>
              <span>Anisotropic Fibrillar Chew (100%)</span>
            </div>
          </div>

          {/* Priority 3: Nutrition */}
          <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-[#0a0f0d] border border-[#1f382b]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-white flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#00f5a0]">nutrition</span>
                Nutrition Density Priority
              </span>
              <span className="font-mono text-[#00f5a0] font-bold">{nutritionPriority}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={nutritionPriority}
              onChange={(e) => setNutritionPriority(Number(e.target.value))}
              className="w-full accent-[#00f5a0] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#8da396]">
              <span>Baseline Plant Macros (20%)</span>
              <span>High Protein / Micronutrient Parity (100%)</span>
            </div>
          </div>

          {/* Priority 4: Cost */}
          <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-[#0a0f0d] border border-[#1f382b]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-white flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#00f5a0]">payments</span>
                Cost Efficiency Priority
              </span>
              <span className="font-mono text-[#00f5a0] font-bold">{costPriority}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={costPriority}
              onChange={(e) => setCostPriority(Number(e.target.value))}
              className="w-full accent-[#00f5a0] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#8da396]">
              <span>Premium Artisanal (20%)</span>
              <span>Strict Cost Minimization (100%)</span>
            </div>
          </div>

          {/* Priority 5: Sustainability */}
          <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-[#0a0f0d] border border-[#1f382b] sm:col-span-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-white flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#00f5a0]">eco</span>
                Sustainability Priority
                <span className="text-[10px] font-mono text-[#8da396] font-normal hidden sm:inline">(Prototype estimate — not a lifecycle assessment)</span>
              </span>
              <span className="font-mono text-[#00f5a0] font-bold">{sustainabilityPriority}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={sustainabilityPriority}
              onChange={(e) => setSustainabilityPriority(Number(e.target.value))}
              className="w-full accent-[#00f5a0] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#8da396]">
              <span>Standard Botanical Footprint (20%)</span>
              <span>Maximum CO2e & Water Savings (100%)</span>
            </div>
          </div>
        </div>

        {/* Numerical Target Settings: Cost Ceiling & Protein Target */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 pt-4 border-t border-[#1f382b]">
          <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-[#0a0f0d] border border-[#1f382b]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-white">Maximum Cost Ceiling</span>
              <span className="font-mono text-[#00f5a0] font-bold">₹{costCeiling} / kg</span>
            </div>
            <input
              type="range"
              min="50"
              max="450"
              step="5"
              value={costCeiling}
              onChange={(e) => setCostCeiling(Number(e.target.value))}
              className="w-full accent-[#00f5a0] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#8da396]">
              <span>Economical (₹50)</span>
              <span>Artisanal Spec (₹450)</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-[#0a0f0d] border border-[#1f382b]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-white">Target Protein Density</span>
              <span className="font-mono text-[#00f5a0] font-bold">{proteinTarget}g / 100g</span>
            </div>
            <input
              type="range"
              min="1"
              max="35"
              step="0.5"
              value={proteinTarget}
              onChange={(e) => setProteinTarget(Number(e.target.value))}
              className="w-full accent-[#00f5a0] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#8da396]">
              <span>Low (1g)</span>
              <span>High Performance (35g)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Allergen Exclusions & Restrictions */}
      <div className="rounded-2xl bg-[#131d18] border border-[#1f382b] p-5 sm:p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-[#00f5a0]">shield</span>
          <h3 className="font-semibold text-white text-base">Allergen Restrictions & Dietary Filters</h3>
        </div>
        <p className="text-xs text-[#8da396] mb-4">
          Selected allergens are strictly filtered out of formulation candidates. All formulations are 100% vegan.
        </p>

        <div className="flex flex-wrap gap-2.5">
          {['Soy', 'Gluten', 'Nuts', 'Dairy', 'Egg'].map((allergen) => {
            const isRestricted = allergenRestrictions.includes(allergen);
            return (
              <button
                key={allergen}
                type="button"
                onClick={() => toggleAllergen(allergen)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                  isRestricted
                    ? 'bg-red-950/60 text-red-300 border border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.2)]'
                    : 'bg-[#0a0f0d] text-[#8da396] hover:text-white border border-[#1f382b]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {isRestricted ? 'block' : 'check_box_outline_blank'}
                </span>
                <span>Exclude {allergen}</span>
                {isRestricted && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-900/60 text-red-200">
                    EXCLUDED
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Additional Requirements Input */}
        <div className="mt-4 pt-4 border-t border-[#1f382b]">
          <label className="text-xs font-mono text-[#8da396] uppercase tracking-wider block mb-1.5">
            Additional R&D Requirements & Qualitative Instructions
          </label>
          <input
            type="text"
            value={additionalRequirements}
            onChange={(e) => setAdditionalRequirements(e.target.value)}
            placeholder="e.g. Clean label, zero methylcellulose, high crispness upon pan-frying, high calcium fortification..."
            className="w-full bg-[#0a0f0d] border border-[#1f382b] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#8da396]/60 focus:outline-none focus:border-[#00f5a0] transition-colors font-sans"
          />
        </div>
      </div>

      {/* Multi-Variable Processing Constraints & Base Isolate Selection */}
      <div className="rounded-2xl bg-[#131d18] border border-[#1f382b] p-5 sm:p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-[#00f5a0]">science</span>
          <h3 className="font-semibold text-white text-base">Biochemical Scaffold & Extrusion Regimen</h3>
        </div>

        {/* Base Isolate Grid */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono text-[#8da396] uppercase tracking-wider">
            Primary Botanical Protein Isolate
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: 'pea', label: 'Yellow Pea 85%', desc: 'High gel strength, low allergen' },
              { id: 'soy', label: 'Defatted Soy 90%', desc: 'Classic fibrillar matrix', allergen: 'Soy' },
              { id: 'mycoprotein', label: 'Mycoprotein 65%', desc: 'Natural mycelial web' },
              { id: 'faba', label: 'Faba Bean 82%', desc: 'Neutral flavor, rapid hydrate' }
            ].map((base) => {
              const isRestricted = base.allergen ? allergenRestrictions.some(a => a.toLowerCase().includes(base.allergen!.toLowerCase())) : false;
              const active = selectedBase === base.id;
              return (
                <button
                  key={base.id}
                  disabled={isRestricted}
                  onClick={() => !isRestricted && setSelectedBase(base.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isRestricted
                      ? 'opacity-40 bg-[#0a0f0d] border-red-900/40 cursor-not-allowed'
                      : active
                      ? 'bg-[#18241e] border-[#00f5a0] shadow-[0_0_12px_rgba(0,245,160,0.15)] cursor-pointer'
                      : 'bg-[#0a0f0d] border-[#1f382b] hover:border-[#8da396]/40 cursor-pointer'
                  }`}
                >
                  <div className={`text-xs font-semibold ${isRestricted ? 'text-red-300' : active ? 'text-[#00f5a0]' : 'text-white'}`}>
                    {base.label}
                  </div>
                  <div className="text-[10px] text-[#8da396] mt-0.5">
                    {isRestricted ? 'Excluded by allergen constraint' : base.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Processing Technology Selection */}
        <div className="flex flex-col gap-2 mt-5">
          <label className="text-xs font-mono text-[#8da396] uppercase tracking-wider">
            Thermomechanical Texturization Regimen
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: 'hmec', name: 'HMEC Twin-Screw', param: '145°C • 2.4 MPa' },
              { id: 'lmec', name: 'Low Moisture Extrusion', param: '120°C • 1.1 MPa' },
              { id: 'spinning', name: 'Wet Fiber Spinning', param: 'pH 4.6 Coagulation' },
              { id: 'bioprint', name: 'Multi-Nozzle 3D', param: '0.4mm Lattice Gel' }
            ].map((tech) => {
              const active = extrusionTech === tech.id;
              return (
                <button
                  key={tech.id}
                  onClick={() => setExtrusionTech(tech.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    active
                      ? 'bg-[#18241e] border-[#00f5a0]'
                      : 'bg-[#0a0f0d] border-[#1f382b] hover:border-[#8da396]/40'
                  }`}
                >
                  <div className={`text-xs font-semibold ${active ? 'text-[#00f5a0]' : 'text-white'}`}>
                    {tech.name}
                  </div>
                  <div className="text-[10px] font-mono text-[#8da396] mt-0.5">{tech.param}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Boundary Toggles: Non-GMO, Sodium */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 pt-4 border-t border-[#1f382b]">
          <label className="flex items-center gap-3 p-3 rounded-xl bg-[#0a0f0d] border border-[#1f382b] cursor-pointer">
            <input
              type="checkbox"
              checked={nonGmoOnly}
              onChange={(e) => setNonGmoOnly(e.target.checked)}
              className="w-4 h-4 accent-[#00f5a0] rounded"
            />
            <div>
              <div className="text-xs font-medium text-white">Non-GMO Certified</div>
              <div className="text-[10px] text-[#8da396]">Exclude bioengineered strains</div>
            </div>
          </label>

          <div className="p-3 rounded-xl bg-[#0a0f0d] border border-[#1f382b] flex flex-col justify-between">
            <div className="flex justify-between items-center text-xs">
              <span className="text-white font-medium">Sodium Ceiling</span>
              <span className="font-mono text-[#00f5a0]">{sodiumCap} mg</span>
            </div>
            <input
              type="range"
              min="200"
              max="600"
              step="10"
              value={sodiumCap}
              onChange={(e) => setSodiumCap(Number(e.target.value))}
              className="w-full accent-[#00f5a0] cursor-pointer mt-1"
            />
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer Callout */}
      <div className="rounded-xl bg-[#131d18] border border-[#1f382b] p-4 text-xs text-[#8da396] flex items-start gap-3">
        <span className="material-symbols-outlined text-[#00f5a0] text-[20px] shrink-0 mt-0.5">info</span>
        <div>
          <span className="text-white font-medium">Research Prototype Disclaimer: </span>
          AI-generated prototype. Results require physical laboratory validation before food production or commercial use.
        </div>
      </div>

      {/* Bottom Synthesis Trigger Action Card */}
      <div className="rounded-2xl bg-gradient-to-r from-[#131d18] via-[#18241e] to-[#131d18] border border-[#00f5a0]/40 p-6 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#00f5a0]/15 border border-[#00f5a0]/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,245,160,0.2)]">
            <span className="material-symbols-outlined text-[#00f5a0] text-[28px] animate-spin-slow">
              memory
            </span>
          </div>
          <div>
            <div className="text-base font-bold text-white flex items-center gap-2">
              Ready to Synthesize Top 3 Formulations
              <span className="font-mono text-[10px] bg-[#00f5a0]/20 text-[#00f5a0] px-2 py-0.5 rounded border border-[#00f5a0]/40">
                AI + BIOCHEMISTRY
              </span>
            </div>
            <p className="text-xs text-[#8da396] mt-0.5">
              Calculates nutrition, cost, and sustainability deterministically from structured ingredient data.
            </p>
          </div>
        </div>

        <button
          onClick={handleRunSynthesis}
          disabled={isSynthesizing}
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#00f5a0] hover:bg-[#00f5a0]/90 text-[#0a0f0d] font-bold font-mono text-sm tracking-wide shadow-[0_0_20px_rgba(0,245,160,0.4)] hover:shadow-[0_0_30px_rgba(0,245,160,0.6)] transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
        >
          {isSynthesizing ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">
                progress_activity
              </span>
              <span>SYNTHESIZING MATRIX...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">
                auto_awesome
              </span>
              <span>GENERATE FORMULATION</span>
            </>
          )}
        </button>
      </div>

      {/* Step-by-Step Simulation Loading Modal Overlay */}
      {isSynthesizing && (
        <div className="fixed inset-0 z-50 bg-[#0a0f0d]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
          <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-[#00f5a0]/20 animate-ping" />
            <div className="absolute inset-2 rounded-full border-2 border-t-[#00f5a0] border-r-transparent border-b-[#00a572] border-l-transparent animate-spin" />
            <span className="material-symbols-outlined text-[#00f5a0] text-[40px]">
              biotech
            </span>
          </div>

          <div className="font-mono text-xs uppercase tracking-widest text-[#00f5a0] font-semibold mb-2">
            IN-SILICO R&amp;D SYNTHESIS • STEP {simulationStepIndex} OF {totalSimulationSteps}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {currentSimulationStep || 'Analyzing Target Food Matrix...'}
          </h2>
          <p className="text-xs text-[#8da396] max-w-md font-mono mb-4">
            Evaluating biopolymer hydrogen bonding, moisture entrapment, lipid dispersion, and multi-objective Pareto ranking.
          </p>

          {/* Progress Bar */}
          <div className="w-64 h-1.5 bg-[#18241e] rounded-full overflow-hidden border border-[#1f382b]">
            <div
              className="h-full bg-[#00f5a0] transition-all duration-300 shadow-[0_0_8px_#00f5a0]"
              style={{ width: `${Math.round((simulationStepIndex / totalSimulationSteps) * 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
