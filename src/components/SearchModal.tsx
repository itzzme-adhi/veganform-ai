import React, { useState } from 'react';
import { CANDIDATE_FORMULATIONS, BOTANICAL_INGREDIENTS } from '../data/mockData';
import { TabType } from '../types/formulation';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCandidate: (candidateId: string) => void;
  onNavigate: (tab: TabType) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCandidate,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredCandidates = CANDIDATE_FORMULATIONS.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.code.toLowerCase().includes(query.toLowerCase()) ||
      c.baseIsolate.toLowerCase().includes(query.toLowerCase())
  );

  const filteredIngredients = BOTANICAL_INGREDIENTS.filter(
    (i) =>
      i.name.toLowerCase().includes(query.toLowerCase()) ||
      i.category.toLowerCase().includes(query.toLowerCase()) ||
      i.keyProperty.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-[#0d1411] border border-[#00f5a0]/40 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8),0_0_20px_rgba(0,245,160,0.2)] overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-3.5 bg-[#131d18] border-b border-[#1f382b] flex items-center gap-3">
          <span className="material-symbols-outlined text-[#00f5a0] text-[22px]">search</span>
          <input
            type="text"
            placeholder="Search candidate codes, botanical isolates, rheology markers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-white placeholder-[#8da396]/60 font-mono text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#8da396] hover:text-white p-1 text-xs font-mono"
            >
              CLEAR
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded text-[#8da396] hover:text-white hover:bg-[#1f382b] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Quick Tag Recommendations */}
        <div className="px-4 py-2 bg-[#0a0f0d] border-b border-[#1f382b]/60 flex items-center gap-2 overflow-x-auto no-scrollbar font-mono text-[11px]">
          <span className="text-[#8da396] uppercase text-[9px] shrink-0">Tags:</span>
          {['Pea Protein', 'Methylcellulose', 'Soy-Free', 'High Umami', 'VFA-CHK-092', 'Beta-Glucan'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2 py-0.5 rounded bg-[#131d18] border border-[#1f382b] text-[#dfe4e0] hover:text-[#00f5a0] hover:border-[#00f5a0]/40 shrink-0 transition-colors"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-4">
          {/* Candidates Group */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#8da396] uppercase tracking-wider mb-2">
              <span>Formulation Prototypes ({filteredCandidates.length})</span>
              <span className="text-[#00f5a0]">IN SILICO</span>
            </div>
            <div className="space-y-2">
              {filteredCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  onClick={() => {
                    onSelectCandidate(candidate.id);
                    onClose();
                  }}
                  className="p-3 rounded-lg bg-[#131d18] border border-[#1f382b] hover:border-[#00f5a0]/50 hover:bg-[#18241e] cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded bg-[#0b3d2e] border border-[#00f5a0]/30 text-[#00f5a0] flex items-center justify-center font-mono text-xs font-bold shrink-0">
                      {candidate.rank}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white group-hover:text-[#00f5a0] transition-colors truncate">
                          {candidate.name}
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-[#0a0f0d] text-[#8da396] font-mono text-[10px]">
                          {candidate.code}
                        </span>
                      </div>
                      <span className="text-xs text-[#8da396] truncate">
                        Score: {candidate.aiScore}/100 • Cost: ₹{candidate.costPerKg}/kg • Protein: {candidate.proteinPer100g}g/100g
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#8da396] group-hover:text-[#00f5a0] group-hover:translate-x-0.5 transition-all text-[18px]">
                    arrow_forward
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Botanical Ingredients Group */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#8da396] uppercase tracking-wider mb-2">
              <span>Botanical Ingredients Library ({filteredIngredients.length})</span>
              <button 
                onClick={() => { onNavigate('knowledge'); onClose(); }}
                className="text-[#00f5a0] hover:underline"
              >
                View Full Ontology →
              </button>
            </div>
            <div className="space-y-2">
              {filteredIngredients.slice(0, 4).map((ing) => (
                <div
                  key={ing.id}
                  onClick={() => {
                    onNavigate('knowledge');
                    onClose();
                  }}
                  className="p-2.5 rounded-lg bg-[#0e1613] border border-[#1f382b]/70 hover:border-[#00f5a0]/40 cursor-pointer flex items-center justify-between"
                >
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white truncate">{ing.name}</span>
                      <span className="px-1.5 py-0.2 rounded bg-[#131d18] text-[#4edea3] font-mono text-[9px]">
                        {ing.category}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#8da396] truncate">{ing.keyProperty}</span>
                  </div>
                  <span className="font-mono text-xs text-[#00f5a0] font-semibold shrink-0 ml-2">
                    ${ing.estCostKg}/kg
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#0a0f0d] border-t border-[#1f382b]/60 flex items-center justify-between text-xs font-mono text-[#8da396]">
          <span>VeganForm.AI Knowledge Base v2.4</span>
          <span>Press ESC or click outside to dismiss</span>
        </div>
      </div>
    </div>
  );
};
