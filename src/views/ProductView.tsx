import React from 'react';
import { TabType } from '../types/formulation';
import { CELLULAR_HERO_IMAGE } from '../data/mockData';

interface ProductViewProps {
  onNavigate: (tab: TabType) => void;
  onSelectCandidate: (candidateId: string) => void;
}

export const ProductView: React.FC<ProductViewProps> = ({ onNavigate, onSelectCandidate }) => {
  return (
    <div className="flex flex-col w-full px-margin pb-28 pt-20 max-w-4xl mx-auto gap-6 text-[#dfe4e0]">
      {/* Ambient Light Scrim & Hero Banner */}
      <div className="relative w-full rounded-2xl bg-[#131d18] border border-[#1f382b]/80 p-5 sm:p-7 shadow-2xl overflow-hidden">
        {/* Glow ambient spots */}
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#00f5a0]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-14 -left-14 w-52 h-52 bg-[#00a572]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-4">
          {/* Live Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18241e] border border-[#00f5a0]/30 w-fit shadow-[0_0_12px_rgba(0,245,160,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#00f5a0] animate-pulse shadow-[0_0_8px_#00f5a0]" />
            <span className="font-mono text-[10px] text-[#00f5a0] font-semibold tracking-widest uppercase">
              AI-POWERED FOOD PRODUCT DEVELOPMENT
            </span>
          </div>

          {/* Core Headline */}
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Redesign animal-based foods.{' '}
              <span className="text-[#00f5a0] drop-shadow-[0_0_14px_rgba(0,245,160,0.4)]">
                Virtually. Intelligently.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-[#8da396] leading-relaxed max-w-2xl">
              Generate and compare optimized vegan formulations across taste, texture, nutrition, cost, and sustainability — before moving to physical wet-lab assays.
            </p>
          </div>

          {/* Visual Formulation Render Showcase */}
          <div className="relative w-full h-48 sm:h-60 rounded-xl overflow-hidden border border-[#1f382b] shadow-xl group">
            <img
              src={CELLULAR_HERO_IMAGE}
              alt="High-resolution fluorescent cellular microscopy scan of plant-based protein matrix"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-[#0a0f0d]/30 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[11px]">
              <div className="flex items-center gap-2 text-white bg-[#0a0f0d]/80 px-2.5 py-1 rounded-md border border-[#1f382b]">
                <span className="material-symbols-outlined text-[16px] text-[#00f5a0]">biotech</span>
                <span>SIMULATION RUN #4982-B</span>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-[#131d18] text-[#00f5a0] border border-[#00f5a0]/40 font-semibold shadow-[0_0_8px_rgba(0,245,160,0.2)]">
                AI PROTOTYPE
              </span>
            </div>
          </div>

          {/* Main Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => onNavigate('formulate')}
              className="flex-1 py-3.5 px-5 rounded-lg bg-[#00f5a0] text-[#002111] font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,245,160,0.35)] hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
            >
              <span>Start Formulation</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
            <button
              onClick={() => onNavigate('demo')}
              className="py-3 px-5 rounded-lg bg-[#18241e] border border-[#1f382b] text-white font-mono text-xs font-medium flex items-center justify-center gap-2 hover:bg-[#1f382b] hover:border-[#00f5a0]/40 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-[#00f5a0]">play_arrow</span>
              <span>Try Live Interactive Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Impact Telemetry Bar */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4 w-full">
        <div className="flex flex-col p-3 sm:p-4 rounded-xl bg-[#131d18] border border-[#1f382b] shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[10px] text-[#8da396] uppercase font-semibold">CYCLE</span>
            <span className="material-symbols-outlined text-[16px] text-[#00f5a0]">trending_down</span>
          </div>
          <span className="text-xl sm:text-2xl font-bold text-[#00f5a0] font-mono leading-none">-65%</span>
          <span className="text-xs text-[#8da396] truncate mt-1">Cycle Time</span>
        </div>

        <div className="flex flex-col p-3 sm:p-4 rounded-xl bg-[#131d18] border border-[#1f382b] shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[10px] text-[#8da396] uppercase font-semibold">SPEED</span>
            <span className="material-symbols-outlined text-[16px] text-[#00f5a0]">bolt</span>
          </div>
          <span className="text-xl sm:text-2xl font-bold text-white font-mono leading-none">4.2x</span>
          <span className="text-xs text-[#8da396] truncate mt-1">Faster R&amp;D</span>
        </div>

        <div className="flex flex-col p-3 sm:p-4 rounded-xl bg-[#131d18] border border-[#1f382b] shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[10px] text-[#8da396] uppercase font-semibold">BENCH</span>
            <span className="material-symbols-outlined text-[16px] text-[#00f5a0]">eco</span>
          </div>
          <span className="text-xl sm:text-2xl font-bold text-[#4edea3] font-mono leading-none">0.0kg</span>
          <span className="text-xs text-[#8da396] truncate mt-1">Phase 1 Waste</span>
        </div>
      </div>

      {/* Real-time Rheology & Texture Radar Telemetry */}
      <div className="flex flex-col rounded-2xl bg-[#131d18] border border-[#1f382b] p-5 shadow-lg gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#00f5a0] rounded-sm shadow-[0_0_8px_#00f5a0]" />
            <h2 className="text-base sm:text-lg font-semibold text-white">Organoleptic Equilibrium</h2>
          </div>
          <span className="font-mono text-[10px] text-[#8da396] uppercase tracking-wider">
            PARETO FRONT v3.2
          </span>
        </div>

        {/* Inline Interactive SVG Spider Chart */}
        <div className="relative w-full py-4 flex items-center justify-center bg-[#0a0f0d] rounded-xl border border-[#1f382b]/60 overflow-hidden">
          <svg className="w-full h-56 max-w-sm" viewBox="0 0 240 190">
            {/* Concentric Pentagons */}
            <polygon points="120,20 190,60 170,145 70,145 50,60" fill="none" stroke="#26382f" strokeWidth="1.2" />
            <polygon points="120,45 165,72 152,128 88,128 75,72" fill="none" stroke="#26382f" strokeDasharray="2,2" strokeWidth="1" />
            <polygon points="120,70 145,85 137,112 103,112 95,85" fill="none" stroke="#26382f" strokeWidth="0.8" />

            {/* Axis Lines */}
            <line x1="120" y1="90" x2="120" y2="20" stroke="#1f382b" strokeWidth="1" />
            <line x1="120" y1="90" x2="190" y2="60" stroke="#1f382b" strokeWidth="1" />
            <line x1="120" y1="90" x2="170" y2="145" stroke="#1f382b" strokeWidth="1" />
            <line x1="120" y1="90" x2="70" y2="145" stroke="#1f382b" strokeWidth="1" />
            <line x1="120" y1="90" x2="50" y2="60" stroke="#1f382b" strokeWidth="1" />

            {/* Baseline Animal Matrix (Pink dashed polygon) */}
            <polygon
              points="120,28 178,66 158,136 82,134 58,68"
              fill="#ffb4ab"
              fillOpacity="0.08"
              stroke="#ffb4ab"
              strokeDasharray="3,3"
              strokeWidth="1.5"
            />

            {/* In-Silico Synthesis Polygon (Neon Green) */}
            <polygon
              points="120,24 182,64 162,140 78,141 54,64"
              fill="#00f5a0"
              fillOpacity="0.22"
              stroke="#00f5a0"
              strokeWidth="2"
              style={{ filter: 'drop-shadow(0 0 6px rgba(0, 245, 160, 0.6))' }}
            />

            {/* Vertices */}
            <circle cx="120" cy="24" r="3.5" fill="#00f5a0" />
            <circle cx="182" cy="64" r="3.5" fill="#00f5a0" />
            <circle cx="162" cy="140" r="3.5" fill="#00f5a0" />
            <circle cx="78" cy="141" r="3.5" fill="#00f5a0" />
            <circle cx="54" cy="64" r="3.5" fill="#00f5a0" />

            {/* Axis Labels */}
            <text x="120" y="14" fill="#dfe4e0" fontFamily="JetBrains Mono" fontSize="8" fontWeight="600" textAnchor="middle">
              MASTICATION
            </text>
            <text x="200" y="62" fill="#dfe4e0" fontFamily="JetBrains Mono" fontSize="8" fontWeight="600" textAnchor="start">
              MOISTURE
            </text>
            <text x="175" y="158" fill="#dfe4e0" fontFamily="JetBrains Mono" fontSize="8" fontWeight="600" textAnchor="start">
              SHEAR BOND
            </text>
            <text x="65" y="158" fill="#dfe4e0" fontFamily="JetBrains Mono" fontSize="8" fontWeight="600" textAnchor="end">
              EMULSION
            </text>
            <text x="40" y="62" fill="#dfe4e0" fontFamily="JetBrains Mono" fontSize="8" fontWeight="600" textAnchor="end">
              AROMA
            </text>
          </svg>

          {/* Overlay Legend */}
          <div className="absolute bottom-2 left-2 flex flex-col gap-1 bg-[#131d18]/90 backdrop-blur-md p-2 rounded-lg border border-[#1f382b] font-mono text-[10px]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-[#ffb4ab] border-dashed" />
              <span className="text-[#8da396]">Target Animal Matrix</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 bg-[#00f5a0] shadow-[0_0_6px_#00f5a0]" />
              <span className="text-[#00f5a0] font-semibold">Candidate Alpha-7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Central Scientific Simulation Pipeline: Computational Wet-Lab Flow */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#18241e] text-[#00f5a0] border border-[#00f5a0]/30">
              PIPELINE ARCHITECTURE
            </span>
            <span className="font-mono text-[10px] text-[#8da396]">ENGINE v3.2</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Computational Wet-Lab Flow
          </h2>
          <p className="text-xs sm:text-sm text-[#8da396]">
            Bidirectional multi-omics mapping transforming avian and bovine cellular targets into plant-native equivalents.
          </p>
        </div>

        {/* Stepper Nodes */}
        <div className="flex flex-col gap-2 relative">
          {/* Step 01 */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#131d18] border border-[#1f382b] shadow-md relative overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-[#18241e] border border-[#00f5a0]/30 flex items-center justify-center shrink-0 text-[#00f5a0] font-mono text-xs font-bold shadow-[0_0_8px_rgba(0,245,160,0.15)]">
              01
            </div>
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#00f5a0] uppercase tracking-wider font-semibold">
                  INPUT TARGET
                </span>
                <span className="px-2 py-0.5 rounded bg-[#18241e] text-[#8da396] font-mono text-[10px]">
                  BASELINE
                </span>
              </div>
              <h3 className="font-semibold text-white text-sm sm:text-base">
                Avian Myofibrillar Matrix
              </h3>
              <p className="text-xs text-[#8da396] leading-relaxed">
                Full spectrographic breakdown of muscle fiber bundles, pH isoelectric profile, and thermal denaturation points (68°C to 74°C).
              </p>
              <div className="flex flex-wrap gap-1.5 mt-1 font-mono text-[10px]">
                <span className="px-2 py-0.5 rounded bg-[#18241e] text-[#8da396] border border-[#1f382b]">Actin: 18.2%</span>
                <span className="px-2 py-0.5 rounded bg-[#18241e] text-[#8da396] border border-[#1f382b]">Myosin Heavy: 43.1%</span>
                <span className="px-2 py-0.5 rounded bg-[#18241e] text-[#00f5a0] border border-[#00f5a0]/30">WHC: 84%</span>
              </div>
            </div>
          </div>

          {/* Pipette Connector */}
          <div className="flex items-center justify-center h-3">
            <div className="w-0.5 h-full bg-[#00f5a0]/50 shadow-[0_0_4px_#00f5a0]" />
          </div>

          {/* Step 02 */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#131d18] border border-[#1f382b] shadow-md relative overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-[#18241e] border border-[#00f5a0]/30 flex items-center justify-center shrink-0 text-[#00f5a0] font-mono text-xs font-bold shadow-[0_0_8px_rgba(0,245,160,0.15)]">
              02
            </div>
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#00f5a0] uppercase tracking-wider font-semibold">
                  DECONSTRUCTION
                </span>
                <span className="px-2 py-0.5 rounded bg-[#18241e] text-[#8da396] font-mono text-[10px]">
                  KINETICS
                </span>
              </div>
              <h3 className="font-semibold text-white text-sm sm:text-base">
                Ingredient Function Mapping
              </h3>
              <p className="text-xs text-[#8da396] leading-relaxed">
                Isolating mechanical properties: gelation threshold limits, ionic strength dependencies, and shear-induced alignment vectors.
              </p>
              <div className="flex flex-wrap gap-1.5 mt-1 font-mono text-[10px]">
                <span className="px-2 py-0.5 rounded bg-[#18241e] text-[#4edea3] border border-[#1f382b]">Shear Stress: 4.8 kPa</span>
                <span className="px-2 py-0.5 rounded bg-[#18241e] text-[#4edea3] border border-[#1f382b]">Emulsion Capacity: High</span>
              </div>
            </div>
          </div>

          {/* Pipette Connector */}
          <div className="flex items-center justify-center h-3">
            <div className="w-0.5 h-full bg-[#00f5a0]/50 shadow-[0_0_4px_#00f5a0]" />
          </div>

          {/* Step 03 */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#131d18] border border-[#1f382b] shadow-md relative overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-[#18241e] border border-[#00f5a0]/30 flex items-center justify-center shrink-0 text-[#00f5a0] font-mono text-xs font-bold shadow-[0_0_8px_rgba(0,245,160,0.15)]">
              03
            </div>
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#00f5a0] uppercase tracking-wider font-semibold">
                  BOTANICAL SEARCH
                </span>
                <span className="px-2 py-0.5 rounded bg-[#0b3d2e] text-[#00f5a0] border border-[#00f5a0]/40 font-mono text-[10px] font-semibold">
                  1,420 MOLECULES
                </span>
              </div>
              <h3 className="font-semibold text-white text-sm sm:text-base">
                Vegan Substitution Engine
              </h3>
              <p className="text-xs text-[#8da396] leading-relaxed">
                Screening legume globulins, precision-fermented lipid droplets, and cross-linking dietary hydrocolloids to match elasticity.
              </p>
              <div className="flex flex-col gap-1.5 mt-2 bg-[#0a0f0d] p-2.5 rounded-lg border border-[#1f382b]/60">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#dfe4e0]">Pisum sativum isolate</span>
                  <span className="font-mono text-[#00f5a0] font-semibold">Primary Base</span>
                </div>
                <div className="w-full bg-[#18241e] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#00f5a0] h-full rounded-full shadow-[0_0_6px_#00f5a0]" style={{ width: '90%' }} />
                </div>
                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="text-[#dfe4e0]">Oat beta-glucan scaffold</span>
                  <span className="font-mono text-[#00f5a0] font-semibold">Hydrocolloid Matrix</span>
                </div>
                <div className="w-full bg-[#18241e] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#00f5a0] h-full rounded-full shadow-[0_0_6px_#00f5a0]" style={{ width: '75%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Pipette Connector */}
          <div className="flex items-center justify-center h-3">
            <div className="w-0.5 h-full bg-[#00f5a0]/50 shadow-[0_0_4px_#00f5a0]" />
          </div>

          {/* Step 04 */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#131d18] border border-[#1f382b] shadow-md relative overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-[#18241e] border border-[#00f5a0]/30 flex items-center justify-center shrink-0 text-[#00f5a0] font-mono text-xs font-bold shadow-[0_0_8px_rgba(0,245,160,0.15)]">
              04
            </div>
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#00f5a0] uppercase tracking-wider font-semibold">
                  PARETO OPTIMIZER
                </span>
                <span className="px-2 py-0.5 rounded bg-[#18241e] text-[#8da396] font-mono text-[10px]">
                  MULTI-DIMENSIONAL
                </span>
              </div>
              <h3 className="font-semibold text-white text-sm sm:text-base">
                Dynamic Cost-Sensory Balancing
              </h3>
              <p className="text-xs text-[#8da396] leading-relaxed">
                Resolving trade-offs between clean-label non-GMO status, production line throughput, and target gross margin unit cost ($/kg).
              </p>
              <div className="grid grid-cols-2 gap-2 mt-1.5">
                <div className="p-2 rounded bg-[#0a0f0d] border border-[#1f382b]/60">
                  <span className="font-mono text-[10px] text-[#8da396] block">Target Cost</span>
                  <p className="font-mono text-sm text-[#00f5a0] font-semibold mt-0.5">$3.12 / kg</p>
                </div>
                <div className="p-2 rounded bg-[#0a0f0d] border border-[#1f382b]/60">
                  <span className="font-mono text-[10px] text-[#8da396] block">Clean Index</span>
                  <p className="font-mono text-sm text-[#00f5a0] font-semibold mt-0.5">9.4 / 10</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pipette Connector */}
          <div className="flex items-center justify-center h-3">
            <div className="w-0.5 h-full bg-[#00f5a0]/50 shadow-[0_0_4px_#00f5a0]" />
          </div>

          {/* Step 05 */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#14211a] border border-[#00f5a0]/40 shadow-[0_0_24px_rgba(0,245,160,0.15)] relative overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-[#00f5a0] text-[#002111] flex items-center justify-center shrink-0 font-mono text-xs font-bold shadow-[0_0_12px_#00f5a0]">
              05
            </div>
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#00f5a0] uppercase tracking-wider font-semibold">
                  SYNTHESIS READY
                </span>
                <span className="px-2 py-0.5 rounded bg-[#0b3d2e] text-[#00f5a0] border border-[#00f5a0]/30 font-mono text-[10px] font-semibold">
                  3 CANDIDATES
                </span>
              </div>
              <h3 className="font-semibold text-white text-sm sm:text-base">
                Top-Ranked Lab Formulations
              </h3>
              <p className="text-xs text-[#8da396] leading-relaxed">
                Candidate Alpha-7 achieves high sensory mimicry with verified extrusion thermals.
              </p>
              {/* Candidate Pill Strip */}
              <div className="flex flex-col gap-1.5 mt-2">
                <div
                  onClick={() => onSelectCandidate('vfa-chk-092')}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-[#0a0f0d] border border-[#1f382b] hover:border-[#00f5a0]/50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00f5a0] text-[18px]">verified</span>
                    <span className="font-mono text-xs text-white font-medium">Alpha-7 (Golden Shortlist - Pea)</span>
                  </div>
                  <span className="font-mono text-xs text-[#00f5a0] font-bold">Rank #1</span>
                </div>
                <div
                  onClick={() => onSelectCandidate('vfa-chk-041')}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-[#0a0f0d] border border-[#1f382b] hover:border-[#00f5a0]/50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#8da396] text-[18px]">check_circle</span>
                    <span className="font-mono text-xs text-[#dfe4e0]">Beta-12 (Budget Focused - Chickpea)</span>
                  </div>
                  <span className="font-mono text-xs text-[#8da396]">Rank #2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Biocentric Capabilities (Bento Grid) */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Core Biocentric Capabilities</h2>
          <span className="font-mono text-[10px] text-[#00f5a0] uppercase tracking-wider">v2.4 MODULES</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Card 1 */}
          <div className="flex flex-col p-4 rounded-xl bg-[#131d18] border border-[#1f382b] shadow-sm gap-2">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-[#18241e] border border-[#1f382b] flex items-center justify-center text-[#00f5a0]">
                <span className="material-symbols-outlined text-[22px]">account_tree</span>
              </div>
              <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#18241e] text-[#00f5a0] border border-[#1f382b]">
                ONTOLOGY GRAPH
              </span>
            </div>
            <h3 className="font-semibold text-white text-sm">Ingredient Intelligence</h3>
            <p className="text-xs text-[#8da396] leading-relaxed">
              Predictive cross-reactivity mapping for over 3,800 botanical proteins, microalgae isolates, and fungal mycelium structures.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col p-4 rounded-xl bg-[#131d18] border border-[#1f382b] shadow-sm gap-2">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-[#18241e] border border-[#1f382b] flex items-center justify-center text-[#00f5a0]">
                <span className="material-symbols-outlined text-[22px]">tune</span>
              </div>
              <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#18241e] text-[#00f5a0] border border-[#1f382b]">
                PARETO ENGINE
              </span>
            </div>
            <h3 className="font-semibold text-white text-sm">Multi-Objective Optimization</h3>
            <p className="text-xs text-[#8da396] leading-relaxed">
              Dynamically tune parameters across bite firmness, juiciness, lipid bleed rate, sodium limits, and global raw material costs.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col p-4 rounded-xl bg-[#131d18] border border-[#1f382b] shadow-sm gap-2">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-[#18241e] border border-[#1f382b] flex items-center justify-center text-[#00f5a0]">
                <span className="material-symbols-outlined text-[22px]">view_in_ar</span>
              </div>
              <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#18241e] text-[#00f5a0] border border-[#1f382b]">
                IN SILICO MATRIX
              </span>
            </div>
            <h3 className="font-semibold text-white text-sm">Virtual Iteration Engine</h3>
            <p className="text-xs text-[#8da396] leading-relaxed">
              Synthesize 10,000+ hypothetical blend variations per batch run. Eliminate 90% of bench-scale trial errors before ingredients ship.
            </p>
          </div>

          {/* Card 4 */}
          <div className="flex flex-col p-4 rounded-xl bg-[#131d18] border border-[#1f382b] shadow-sm gap-2">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-[#18241e] border border-[#1f382b] flex items-center justify-center text-[#00f5a0]">
                <span className="material-symbols-outlined text-[22px]">speed</span>
              </div>
              <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#18241e] text-[#00f5a0] border border-[#1f382b]">
                VELOCITY ACCELERATOR
              </span>
            </div>
            <h3 className="font-semibold text-white text-sm">R&amp;D Sprint Acceleration</h3>
            <p className="text-xs text-[#8da396] leading-relaxed">
              Transform typical 14-month alt-protein formulation roadmaps into agile 3-week computational candidate generation cycles.
            </p>
          </div>
        </div>
      </div>

      {/* 5-Stage Computational Matrix Checklist */}
      <div className="flex flex-col p-4 sm:p-5 rounded-xl bg-[#131d18] border border-[#1f382b] shadow-sm gap-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#00f5a0] text-[20px]">science</span>
          <h2 className="font-semibold text-white text-sm sm:text-base">5-Stage Computational Matrix</h2>
        </div>
        <div className="flex flex-col gap-2.5 font-sans">
          {[
            {
              step: '1',
              title: 'Spectrographic Protein Profiling',
              desc: 'Deconstruct reference animal protein matrices into molecular descriptors.'
            },
            {
              step: '2',
              title: 'Functional Affinity Scoring',
              desc: 'Quantify hydrocolloid binding and lipid phase dispersion indices.'
            },
            {
              step: '3',
              title: 'Algorithmic Formulation Assembly',
              desc: 'Simulate structural cross-links under industrial pilot extrusion pressures.'
            },
            {
              step: '4',
              title: 'Sensory & Clean-Label Pareto Filter',
              desc: 'Eliminate non-compliant binders and high-allergen components automatically.'
            },
            {
              step: '5',
              title: 'Wet-Lab Assay Sheet Export',
              desc: 'Direct step-by-step hydration protocols and shear torque calibration logs.'
            }
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded bg-[#00f5a0] text-[#002111] flex items-center justify-center font-mono text-[11px] font-bold mt-0.5 shrink-0">
                {item.step}
              </span>
              <div className="flex flex-col">
                <span className="font-medium text-white text-xs sm:text-sm">{item.title}</span>
                <span className="text-xs text-[#8da396]">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mandatory Laboratory Protocol Callout */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-[#14211a] border border-[#00f5a0]/30 shadow-md">
        <span className="material-symbols-outlined text-[#00f5a0] text-[24px] shrink-0 mt-0.5">policy</span>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs text-[#00f5a0] font-bold uppercase tracking-wider">
            Mandatory Laboratory Validation Protocol
          </span>
          <p className="text-xs text-[#8da396] leading-relaxed">
            All generated formulations constitute in-silico computational predictions. Prior to commercial scale-up or human taste panels, formulations must undergo pilot plant shear trials, microbiological shelf assays, and regulatory allergen assessments according to ISO-22000 standards.
          </p>
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="flex flex-col p-5 rounded-xl bg-[#14211a] border border-[#00f5a0]/40 shadow-xl gap-4 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-[#00f5a0]/15 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col gap-1 z-10">
          <span className="font-mono text-[10px] text-[#00f5a0] uppercase tracking-widest font-semibold">
            DEPLOYMENT COHORT READY
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-white">Deploy Candidate Formulations Now</h2>
          <p className="text-xs text-[#8da396]">
            Access the synthesis workspace to configure raw ingredient catalogs, export sensory mixing protocols, or launch custom neural simulations.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2.5 z-10">
          <button
            onClick={() => onNavigate('formulate')}
            className="flex-1 py-3 px-4 rounded-lg bg-[#00f5a0] text-[#002111] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(0,245,160,0.35)] hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">science</span>
            <span>Open Formulation Studio</span>
          </button>
          <button
            onClick={() => onNavigate('candidates')}
            className="py-2.5 px-4 rounded-lg bg-[#18241e] border border-[#1f382b] text-[#dfe4e0] font-mono text-xs flex items-center justify-center gap-2 hover:bg-[#1f382b] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#00f5a0]">folder_open</span>
            <span>Explore Validated Repository (48)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
