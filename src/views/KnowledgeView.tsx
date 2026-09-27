import React, { useState } from 'react';
import { TabType, BotanicalIngredient } from '../types/formulation';
import { BOTANICAL_INGREDIENTS } from '../data/mockData';

interface KnowledgeViewProps {
  onNavigate: (tab: TabType) => void;
  onOpenTerminal: () => void;
}

export const KnowledgeView: React.FC<KnowledgeViewProps> = ({ onNavigate, onOpenTerminal }) => {
  const [ingredients] = useState<BotanicalIngredient[]>(BOTANICAL_INGREDIENTS);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [selectedIngredient, setSelectedIngredient] = useState<BotanicalIngredient | null>(BOTANICAL_INGREDIENTS[0]);

  const categories = [
    'all',
    'Protein Isolate',
    'Hydrocolloid & Binder',
    'Functional Lipid',
    'Umami & Flavor',
    'Scaffold Starch'
  ];

  const filtered = ingredients.filter(i => {
    const matchCat = filterCategory === 'all' || i.category === filterCategory;
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) ||
                        i.keyProperty.toLowerCase().includes(search.toLowerCase()) ||
                        i.origin.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="flex flex-col w-full px-margin pb-32 pt-20 max-w-5xl mx-auto gap-6 text-[#dfe4e0]">
      {/* Top Banner */}
      <div className="relative rounded-2xl bg-[#131d18] border border-[#1f382b] p-6 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#00f5a0]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00f5a0] shadow-[0_0_8px_#00f5a0]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#00f5a0] font-semibold">
                BIOPOLYMER ENCYCLOPEDIA & CHEMOTYPE ATLAS
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1.5">
              Botanical Ingredient Library
            </h1>
            <p className="text-xs sm:text-sm text-[#8da396] mt-1 max-w-2xl">
              Validated biochemical characteristics, thermal denaturation plateaus, and texturization shear compatibility for plant protein precursors.
            </p>
          </div>

          <button
            onClick={onOpenTerminal}
            className="px-3.5 py-2 rounded-xl bg-[#0a0f0d] hover:bg-[#18241e] text-white border border-[#1f382b] text-xs font-mono transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto"
          >
            <span className="material-symbols-outlined text-[16px] text-[#00f5a0]">terminal</span>
            <span>Live Chem-Log</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-5 pt-4 border-t border-[#1f382b] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#8da396] text-[18px]">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search botanical isolate, property, or origin..."
              className="w-full bg-[#0a0f0d] border border-[#1f382b] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[#8da396]/60 focus:outline-none focus:border-[#00f5a0]"
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-[#00f5a0] text-[#0a0f0d] font-bold shadow-[0_0_8px_rgba(0,245,160,0.3)]'
                    : 'bg-[#0a0f0d] text-[#8da396] hover:text-white border border-[#1f382b]'
                }`}
              >
                {cat === 'all' ? 'All Botanical Classes' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: List & Selected Detail */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Ingredient Cards List */}
        <div className="md:col-span-7 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#8da396]">
            <span>{filtered.length} INGREDIENTS INDEXED</span>
            <span>CLICK TO VIEW MECHANISTIC PROFILE</span>
          </div>

          <div className="flex flex-col gap-2.5 max-h-[640px] overflow-y-auto pr-1">
            {filtered.map(item => {
              const isSelected = selectedIngredient?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedIngredient(item)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#18241e] border-[#00f5a0] shadow-[0_0_12px_rgba(0,245,160,0.15)]'
                      : 'bg-[#131d18] border-[#1f382b] hover:bg-[#16221c]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{item.name}</span>
                        {item.cleanLabel && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#00f5a0]/15 text-[#00f5a0] border border-[#00f5a0]/30">
                            CLEAN LABEL
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#8da396] font-mono mt-0.5">
                        {item.category} • Origin: {item.origin}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-bold font-mono text-[#00f5a0]">
                        ${item.estCostKg.toFixed(2)}/kg
                      </div>
                      <div className="text-[10px] font-mono text-[#8da396]">
                        {item.proteinContent}% Protein
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#8da396] mt-2 line-clamp-2">
                    {item.keyProperty}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Profile Detail Panel */}
        <div className="md:col-span-5">
          {selectedIngredient ? (
            <div className="rounded-2xl bg-[#131d18] border border-[#1f382b] p-5 shadow-xl sticky top-24 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1f382b]">
                <div>
                  <span className="text-[10px] font-mono text-[#00f5a0] uppercase tracking-wider">
                    {selectedIngredient.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">{selectedIngredient.name}</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#0a0f0d] border border-[#1f382b] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#00f5a0] text-[20px]">
                    science
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#0a0f0d] border border-[#1f382b]">
                  <div className="text-[10px] font-mono text-[#8da396]">Functional Property & Mechanism</div>
                  <div className="text-white mt-1 leading-relaxed">{selectedIngredient.keyProperty}</div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-[#0a0f0d] border border-[#1f382b]">
                    <div className="text-[10px] font-mono text-[#8da396]">Protein Purity</div>
                    <div className="font-mono text-sm font-bold text-[#00f5a0] mt-0.5">
                      {selectedIngredient.proteinContent}%
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#0a0f0d] border border-[#1f382b]">
                    <div className="text-[10px] font-mono text-[#8da396]">Shear Suitability</div>
                    <div className="font-mono text-sm font-bold text-[#00f5a0] mt-0.5">
                      {selectedIngredient.shearSuitability}%
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#0a0f0d] border border-[#1f382b]">
                    <div className="text-[10px] font-mono text-[#8da396]">Gelling Transition</div>
                    <div className="font-mono text-xs font-bold text-white mt-0.5">
                      {selectedIngredient.gellingTemp}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#0a0f0d] border border-[#1f382b]">
                    <div className="text-[10px] font-mono text-[#8da396]">Estimated Cost</div>
                    <div className="font-mono text-xs font-bold text-white mt-0.5">
                      ${selectedIngredient.estCostKg.toFixed(2)} / kg
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#0a0f0d] border border-[#1f382b]">
                  <div className="text-[10px] font-mono text-[#8da396]">Allergen Declaration</div>
                  <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                    {selectedIngredient.allergens.map((alg, i) => (
                      <span
                        key={i}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          alg === 'None'
                            ? 'bg-[#00f5a0]/15 text-[#00f5a0]'
                            : 'bg-amber-950/40 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {alg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('formulate')}
                className="w-full py-2.5 rounded-xl bg-[#00f5a0] hover:bg-[#00f5a0]/90 text-[#0a0f0d] font-mono font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(0,245,160,0.2)] mt-2"
              >
                <span>USE IN NEW FORMULATION</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          ) : (
            <div className="p-8 text-center text-xs font-mono text-[#8da396] border border-dashed border-[#1f382b] rounded-2xl">
              Select an ingredient from the list to inspect biochemical properties.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
