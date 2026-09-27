import React, { useState } from 'react';
import { TabType, CandidateFormulation, FormulationWeights } from '../types/formulation';
import { RadarChart, RadarSeries } from '../components/RadarChart';
import { rankFormulationCandidates } from '../engine/rankingEngine';
import { validateFormulation } from '../engine/allergenValidator';

interface CandidatesViewProps {
  onNavigate: (tab: TabType) => void;
  onSelectCandidate: (candidateId: string) => void;
  selectedCandidateId: string;
  candidates: CandidateFormulation[];
  productName: string;
  allergenRestrictions?: string[];
  onRelaxConstraints?: () => void;
  onUpdateWeights?: (weights: FormulationWeights) => void;
  initialWeights?: FormulationWeights;
  isUnknownProduct?: boolean;
}

export const CandidatesView: React.FC<CandidatesViewProps> = ({
  onNavigate,
  onSelectCandidate,
  selectedCandidateId,
  candidates: inputCandidates,
  productName,
  allergenRestrictions = [],
  onRelaxConstraints,
  initialWeights = {
    tasteWeight: 30,
    textureWeight: 25,
    nutritionWeight: 20,
    costWeight: 15,
    sustainabilityWeight: 10
  },
  isUnknownProduct = false
}) => {
  const [weights, setWeights] = useState<FormulationWeights>(initialWeights);
  const [showWeightSliders, setShowWeightSliders] = useState(false);
  const [sortBy, setSortBy] = useState<'score' | 'cost' | 'texture' | 'protein'>('score');
  const [filterBase, setFilterBase] = useState<string>('all');
  const [activeSeriesIds, setActiveSeriesIds] = useState<string[]>(['cand-1', 'cand-2', 'reference']);

  // Validate every candidate immediately before displaying (Requirement 10, 12)
  // Hard constraint violations are completely excluded from displayed top candidates
  const validCandidates = React.useMemo(() => {
    return (inputCandidates || []).filter(c => {
      const { valid } = validateFormulation(c, allergenRestrictions);
      return valid;
    }).map(c => ({
      ...c,
      constraintCompliant: true
    }));
  }, [inputCandidates, allergenRestrictions]);

  // Dynamically re-score and re-rank valid candidates based on active weights
  const rankedCandidates = React.useMemo(() => {
    return rankFormulationCandidates(validCandidates, weights);
  }, [validCandidates, weights]);

  // Sort logic
  const sortedCandidates = React.useMemo(() => {
    return [...rankedCandidates].sort((a, b) => {
      if (sortBy === 'score') return b.aiScore - a.aiScore;
      if (sortBy === 'cost') return a.costPerKg - b.costPerKg;
      if (sortBy === 'texture') return b.textureParity - a.textureParity;
      if (sortBy === 'protein') return b.proteinPer100g - a.proteinPer100g;
      return 0;
    }).filter(c => {
      if (filterBase === 'all') return true;
      return c.baseIsolate.toLowerCase().includes(filterBase.toLowerCase());
    });
  }, [rankedCandidates, sortBy, filterBase]);

  // Dynamically build radar chart series from top candidates
  const radarSeries: RadarSeries[] = React.useMemo(() => {
    const palette = ['#00f5a0', '#00d8f6', '#c084fc', '#f472b6'];
    const fillPalette = ['rgba(0, 245, 160, 0.25)', 'rgba(0, 216, 246, 0.18)', 'rgba(192, 132, 252, 0.18)', 'rgba(244, 114, 182, 0.18)'];

    const dynamicSeries: RadarSeries[] = rankedCandidates.slice(0, 3).map((c, i) => ({
      id: `cand-${i + 1}`,
      name: `${c.name} (${c.code})`,
      color: palette[i % palette.length],
      fillColor: fillPalette[i % fillPalette.length],
      // [Taste, Texture, Nutrition, Cost Efficiency, Sustainability]
      values: [
        c.tasteMatch,
        c.textureParity,
        c.nutritionDensity,
        c.costEfficiency,
        c.sustainabilityLca
      ]
    }));

    // Add animal reference benchmark series
    dynamicSeries.push({
      id: 'reference',
      name: `${productName} Control Benchmark`,
      color: '#94a3b8',
      strokeDash: '4 3',
      values: [95, 95, 80, 85, 45]
    });

    return dynamicSeries;
  }, [rankedCandidates, productName]);

  const toggleSeries = (id: string) => {
    setActiveSeriesIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleWeightChange = (key: keyof FormulationWeights, val: number) => {
    setWeights(prev => ({
      ...prev,
      [key]: val
    }));
  };

  return (
    <div className="flex flex-col w-full px-margin pb-32 pt-20 max-w-5xl mx-auto gap-6 text-[#dfe4e0]">
      {/* Top Banner & Target Archetype Badge */}
      <div className="relative rounded-2xl bg-[#131d18] border border-[#1f382b] p-6 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#00f5a0]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00f5a0] shadow-[0_0_8px_#00f5a0]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#00f5a0] font-semibold">
                CANDIDATE RANKING ENGINE • TOP {rankedCandidates.length} FORMULATIONS
              </span>
              <span className="font-mono text-[10px] text-[#8da396] bg-[#0a0f0d] px-2 py-0.5 rounded border border-[#1f382b]">
                PROTOTYPE ESTIMATES
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1.5">
              Candidate Comparison &amp; Overview
            </h1>
            <p className="text-xs sm:text-sm text-[#8da396] mt-1 max-w-xl">
              Target Reference: <span className="text-white font-medium">{productName}</span>. In-silico simulated solutions evaluated against chemical, textural, and economic benchmarks.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            <button
              onClick={() => setShowWeightSliders(!showWeightSliders)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer border ${
                showWeightSliders
                  ? 'bg-[#00f5a0] text-[#0a0f0d] border-[#00f5a0] font-bold shadow-[0_0_12px_rgba(0,245,160,0.3)]'
                  : 'bg-[#18241e] hover:bg-[#1f382b] text-white border-[#1f382b]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
              <span>{showWeightSliders ? 'Hide Ranking Weights' : 'Adjust Priority Weights'}</span>
            </button>

            <button
              onClick={() => onNavigate('formulate')}
              className="px-3.5 py-2 rounded-xl bg-[#18241e] hover:bg-[#1f382b] text-white border border-[#1f382b] text-xs font-mono transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#00f5a0]">refresh</span>
              <span>Re-run Parameters</span>
            </button>
          </div>
        </div>

        {/* Dynamic Weight Adjustment Drawer */}
        {showWeightSliders && (
          <div className="mt-5 p-4 rounded-xl bg-[#0a0f0d] border border-[#00f5a0]/40 flex flex-col gap-3 animate-fade-in">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-[#1f382b]">
              <span className="font-mono text-[#00f5a0] font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">equalizer</span>
                Dynamic Multi-Objective Re-ranking
              </span>
              <span className="font-mono text-[11px] text-[#8da396]">
                Candidates and radar scores update live
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-[#8da396]">Taste</span>
                  <span className="text-[#00f5a0] font-bold">{weights.tasteWeight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.tasteWeight}
                  onChange={(e) => handleWeightChange('tasteWeight', Number(e.target.value))}
                  className="w-full accent-[#00f5a0] cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-[#8da396]">Texture</span>
                  <span className="text-[#00f5a0] font-bold">{weights.textureWeight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.textureWeight}
                  onChange={(e) => handleWeightChange('textureWeight', Number(e.target.value))}
                  className="w-full accent-[#00f5a0] cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-[#8da396]">Nutrition</span>
                  <span className="text-[#00f5a0] font-bold">{weights.nutritionWeight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.nutritionWeight}
                  onChange={(e) => handleWeightChange('nutritionWeight', Number(e.target.value))}
                  className="w-full accent-[#00f5a0] cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-[#8da396]">Cost</span>
                  <span className="text-[#00f5a0] font-bold">{weights.costWeight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.costWeight}
                  onChange={(e) => handleWeightChange('costWeight', Number(e.target.value))}
                  className="w-full accent-[#00f5a0] cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-[#8da396]">Sustain</span>
                  <span className="text-[#00f5a0] font-bold">{weights.sustainabilityWeight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.sustainabilityWeight}
                  onChange={(e) => handleWeightChange('sustainabilityWeight', Number(e.target.value))}
                  className="w-full accent-[#00f5a0] cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Unknown Product Warning Banner if applicable */}
        {isUnknownProduct && (
          <div className="mt-4 p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-amber-300">
              <span className="material-symbols-outlined text-amber-400 text-[20px]">warning</span>
              <div>
                <span className="font-bold">Limited knowledge-base coverage: </span>
                This food target is synthesized using Gemini conceptual reasoning. Physical laboratory validation is strictly required before commercial use.
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-amber-900/60 text-amber-200 font-mono text-[10px] uppercase font-semibold shrink-0">
              EXPLORATORY SPEC
            </span>
          </div>
        )}

        {/* Filter & Sort Bar */}
        <div className="mt-5 pt-4 border-t border-[#1f382b] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-mono text-[#8da396] mr-1">Base Filter:</span>
            {['all', 'pea', 'soy', 'oat', 'cashew', 'chickpea'].map((base) => (
              <button
                key={base}
                onClick={() => setFilterBase(base)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono capitalize transition-all cursor-pointer ${
                  filterBase === base
                    ? 'bg-[#00f5a0] text-[#0a0f0d] font-bold shadow-[0_0_8px_rgba(0,245,160,0.3)]'
                    : 'bg-[#0a0f0d] text-[#8da396] hover:text-white border border-[#1f382b]'
                }`}
              >
                {base}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#8da396]">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#0a0f0d] border border-[#1f382b] rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-[#00f5a0] cursor-pointer"
            >
              <option value="score">AI Bio-Score (High to Low)</option>
              <option value="cost">Unit Cost / kg (Low to High)</option>
              <option value="texture">Texture Parity % (High to Low)</option>
              <option value="protein">Protein Density (High to Low)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interactive Radar Comparison Arena */}
      <div className="rounded-2xl bg-[#131d18] border border-[#1f382b] p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00f5a0]">radar</span>
              <h3 className="font-semibold text-white text-base">Multi-Objective Organoleptic Frontier</h3>
            </div>
            <p className="text-xs text-[#8da396]">
              Equilibrium comparison along 5 bio-physical dimensions against {productName} benchmark
            </p>
          </div>

          {/* Radar Series Legend Toggles */}
          <div className="flex items-center gap-2 flex-wrap">
            {radarSeries.map(s => {
              const active = activeSeriesIds.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggleSeries(s.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono flex items-center gap-1.5 transition-all border cursor-pointer ${
                    active
                      ? 'bg-[#0a0f0d] text-white border-[#1f382b]'
                      : 'bg-[#0a0f0d]/40 text-[#8da396] opacity-50 border-transparent'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <span>{s.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Radar Graphic Display */}
        <div className="w-full flex items-center justify-center p-2 bg-[#0a0f0d] rounded-xl border border-[#1f382b]">
          <RadarChart
            series={radarSeries.filter(s => activeSeriesIds.includes(s.id))}
            axes={['Taste (AI-estimated)', 'Texture (AI-estimated)', 'Nutrition', 'Cost Efficiency', 'Sustainability (Prototype estimate)']}
            size={360}
          />
        </div>
      </div>

      {/* If no formulation satisfies constraints (Requirement 7) */}
      {sortedCandidates.length === 0 ? (
        <div className="rounded-2xl bg-[#131d18] border border-red-500/40 p-8 sm:p-10 text-center flex flex-col items-center justify-center gap-4 my-4 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-red-950/60 border border-red-500/50 flex items-center justify-center text-red-400">
            <span className="material-symbols-outlined text-[36px]">block</span>
          </div>
          <div className="max-w-md">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              No formulation satisfies all selected constraints.
            </h3>
            <p className="text-xs sm:text-sm text-[#8da396] leading-relaxed">
              The active hard allergen exclusions ({allergenRestrictions.join(', ')}) combined with cost and protein targets eliminated all formulation routes. Relax constraints to synthesize viable botanical candidates.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-3 flex-wrap justify-center">
            <button
              onClick={() => onRelaxConstraints ? onRelaxConstraints() : onNavigate('formulate')}
              className="px-5 py-2.5 rounded-xl bg-[#00f5a0] text-[#0a0f0d] font-bold text-xs font-mono hover:bg-[#00f5a0]/90 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,245,160,0.3)]"
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
              <span>Relax Constraints</span>
            </button>
            <button
              onClick={() => onNavigate('formulate')}
              className="px-4 py-2.5 rounded-xl bg-[#18241e] text-white border border-[#1f382b] text-xs font-mono hover:bg-[#1f382b] transition-all cursor-pointer"
            >
              Modify Formulation Parameters
            </button>
          </div>
        </div>
      ) : (
        /* Candidate Cards Grid */
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Ranked Formulation Candidates</span>
              <span className="font-mono text-xs text-[#00f5a0] bg-[#18241e] px-2 py-0.5 rounded border border-[#1f382b]">
                {sortedCandidates.length} Active
              </span>
            </h2>
            <span className="text-xs font-mono text-[#8da396]">
              All scores labelled: AI-estimated / Prototype estimate
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {sortedCandidates.map((candidate) => {
              const isSelected = selectedCandidateId === candidate.id;
              return (
                <div
                  key={candidate.id}
                  onClick={() => onSelectCandidate(candidate.id)}
                  className={`relative rounded-2xl bg-[#131d18] border transition-all duration-300 p-5 sm:p-6 shadow-xl cursor-pointer hover:border-[#00f5a0]/60 ${
                    isSelected
                      ? 'border-[#00f5a0] ring-1 ring-[#00f5a0]/40 shadow-[0_0_24px_rgba(0,245,160,0.15)] bg-[#14221b]'
                      : 'border-[#1f382b] hover:bg-[#15221b]'
                  }`}
                >
                  {/* Top Row: Rank, Title, Score */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1f382b]">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#0a0f0d] border border-[#1f382b] flex flex-col items-center justify-center shrink-0">
                        <span className="text-[10px] font-mono text-[#8da396]">RANK</span>
                        <span className="text-base font-bold font-mono text-[#00f5a0]">#{candidate.rank}</span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-lg text-white group-hover:text-[#00f5a0] transition-colors">
                            {candidate.name}
                          </span>
                          <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#18241e] text-[#8da396] border border-[#1f382b]">
                            {candidate.code}
                          </span>
                          <span className={`font-mono text-[10px] px-2 py-0.5 rounded font-semibold uppercase tracking-wider ${
                            candidate.rank === 1
                              ? 'bg-[#00f5a0]/20 text-[#00f5a0] border border-[#00f5a0]/40'
                              : 'bg-[#18241e] text-[#8da396] border border-[#1f382b]'
                          }`}>
                            {candidate.rankBadge}
                          </span>

                          {/* Constraint Compliant Badge (Requirement 11) */}
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 flex items-center gap-1 font-semibold shadow-[0_0_8px_rgba(16,185,129,0.25)]">
                            <span className="text-emerald-400">✓</span> Constraint Compliant
                          </span>

                          {candidate.allergenWarning && (
                            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-red-950/60 text-red-300 border border-red-500/40">
                              {candidate.allergenWarning}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#8da396] mt-0.5">{candidate.tagline}</p>
                      </div>
                    </div>

                    {/* AI Score Badge */}
                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <div className="text-right">
                        <div className="text-[10px] font-mono text-[#8da396] uppercase">AI Bio-Score (Estimated)</div>
                        <div className="text-xl sm:text-2xl font-bold font-mono text-[#00f5a0]">
                          {candidate.aiScore}
                          <span className="text-xs text-[#8da396] font-normal"> / 100</span>
                        </div>
                      </div>
                      <div className="w-11 h-11 rounded-xl bg-[#00f5a0]/15 border border-[#00f5a0]/30 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#00f5a0] text-[24px]">verified</span>
                      </div>
                    </div>
                  </div>

                {/* Middle Row: Specs and Mini Texture Preview */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-4 items-center">
                  {/* Texture cross-section thumbnail */}
                  <div className="md:col-span-3 relative h-28 rounded-xl overflow-hidden border border-[#1f382b] bg-[#0a0f0d] group">
                    <img
                      src={candidate.crossSectionTextureImage}
                      alt={candidate.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-transparent to-transparent" />
                    <div className="absolute bottom-1.5 left-2 right-2 flex justify-between items-center text-[10px] font-mono text-white">
                      <span>TEXTURE SCAN</span>
                      <span className="text-[#8da396]">MICROGRAPH</span>
                    </div>
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="md:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="p-2.5 rounded-xl bg-[#0a0f0d] border border-[#1f382b]">
                      <div className="text-[10px] font-mono text-[#8da396]">Commercial Cost</div>
                      <div className="font-mono text-sm font-bold text-white mt-0.5">
                        {candidate.currencySymbol}{candidate.costPerKg.toFixed(2)} <span className="text-[11px] text-[#8da396] font-normal">/ kg</span>
                      </div>
                      <div className="text-[10px] font-mono text-[#00f5a0] mt-0.5">Calculated from ingredients</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#0a0f0d] border border-[#1f382b]">
                      <div className="text-[10px] font-mono text-[#8da396]">Texture Similarity</div>
                      <div className="font-mono text-sm font-bold text-[#00f5a0] mt-0.5">
                        {candidate.textureParity}%
                      </div>
                      <div className="text-[10px] font-mono text-[#8da396] mt-0.5">AI-estimated</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#0a0f0d] border border-[#1f382b]">
                      <div className="text-[10px] font-mono text-[#8da396]">Taste Similarity</div>
                      <div className="font-mono text-sm font-bold text-[#00f5a0] mt-0.5">
                        {candidate.tasteMatch}%
                      </div>
                      <div className="text-[10px] font-mono text-[#8da396] mt-0.5">AI-estimated</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#0a0f0d] border border-[#1f382b]">
                      <div className="text-[10px] font-mono text-[#8da396]">Protein Density</div>
                      <div className="font-mono text-sm font-bold text-white mt-0.5">
                        {candidate.proteinPer100g}g <span className="text-[11px] text-[#8da396] font-normal">/ 100g</span>
                      </div>
                      <div className="text-[10px] font-mono text-[#8da396] mt-0.5">{candidate.caloriesKcal} kcal</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Base isolate summary & Action Button */}
                <div className="mt-4 pt-3 border-t border-[#1f382b] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-[#8da396] flex-wrap">
                    <span className="font-mono text-[11px] uppercase text-white font-medium">Scaffold:</span>
                    <span>{candidate.baseIsolate}</span>
                    <span className="font-mono text-[10px] text-[#00f5a0] bg-[#0a0f0d] px-2 py-0.5 rounded border border-[#1f382b]">
                      {candidate.carbonFootprintDelta}
                    </span>
                    <span className="text-[10px] font-mono text-[#8da396]">Prototype estimate — not a lifecycle assessment</span>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCandidate(candidate.id);
                        onNavigate('detail');
                      }}
                      className="px-4 py-1.5 rounded-xl bg-[#00f5a0] hover:bg-[#00f5a0]/90 text-[#0a0f0d] font-mono font-bold text-xs tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(0,245,160,0.2)]"
                    >
                      <span>VIEW LAB FORMULATION SHEET</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      )}

      {/* Comparative Matrix Table */}
      {sortedCandidates.length > 0 && (
      <div className="rounded-2xl bg-[#131d18] border border-[#1f382b] p-5 sm:p-6 shadow-xl overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f5a0]">table_chart</span>
            <h3 className="font-semibold text-white text-base">Direct Cross-Candidate Benchmark Matrix</h3>
          </div>
          <span className="text-[10px] font-mono text-[#8da396]">
            Deterministic Macro Calculations &bull; AI Sensory Estimates
          </span>
        </div>

        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-[#1f382b] text-[#8da396]">
              <th className="pb-3 font-medium">CANDIDATE</th>
              <th className="pb-3 font-medium">AI SCORE</th>
              <th className="pb-3 font-medium">BASE SYSTEM</th>
              <th className="pb-3 font-medium">COST / KG</th>
              <th className="pb-3 font-medium">TASTE (AI-ESTIMATED)</th>
              <th className="pb-3 font-medium">TEXTURE (AI-ESTIMATED)</th>
              <th className="pb-3 font-medium">PROTEIN</th>
              <th className="pb-3 font-medium text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1f382b]/60">
            {sortedCandidates.map((c) => (
              <tr key={c.id} className="hover:bg-[#18241e]/50 transition-colors">
                <td className="py-3 font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.rankBadgeColor?.includes('primary') ? '#00f5a0' : '#00d8f6' }} />
                  {c.name}
                </td>
                <td className="py-3 text-[#00f5a0] font-bold">{c.aiScore}</td>
                <td className="py-3 text-[#8da396] max-w-[140px] truncate">{c.baseIsolate}</td>
                <td className="py-3 text-white">{c.currencySymbol}{c.costPerKg.toFixed(2)}</td>
                <td className="py-3 text-[#00f5a0]">
                  <div>{c.tasteMatch}%</div>
                  <div className="text-[9px] text-[#8da396] font-normal">AI-estimated</div>
                </td>
                <td className="py-3 text-[#00f5a0]">
                  <div>{c.textureParity}%</div>
                  <div className="text-[9px] text-[#8da396] font-normal">AI-estimated</div>
                </td>
                <td className="py-3 text-white">{c.proteinPer100g}g</td>
                <td className="py-3 text-right">
                  <button
                    onClick={() => {
                      onSelectCandidate(c.id);
                      onNavigate('detail');
                    }}
                    className="text-[#00f5a0] hover:underline font-semibold cursor-pointer"
                  >
                    Inspect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

      {/* Consistent Prototype Disclaimer Footer */}
      <div className="p-4 rounded-xl bg-[#0a0f0d] border border-[#1f382b] text-[11px] font-mono text-[#8da396] flex items-center justify-between gap-4 mt-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#00f5a0] text-[16px]">info</span>
          <span>AI-generated prototype. Results require physical laboratory validation before food production or commercial use.</span>
        </div>
        <span className="text-[#00f5a0] shrink-0 font-semibold">VEGANFORM AI R&amp;D</span>
      </div>
    </div>
  );
};
