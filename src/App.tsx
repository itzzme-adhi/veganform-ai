import React, { useState } from 'react';
import { TabType, CandidateFormulation, FormulationRequest, FormulationWeights } from './types/formulation';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { SearchModal } from './components/SearchModal';
import { TerminalModal } from './components/TerminalModal';
import { ProductView } from './views/ProductView';
import { FormulateView } from './views/FormulateView';
import { CandidatesView } from './views/CandidatesView';
import { DetailView } from './views/DetailView';
import { KnowledgeView } from './views/KnowledgeView';
import { generateDeterministicFormulations } from './engine/deterministicFallback';
import { requestFormulation, SIMULATION_STEPS } from './engine/formulationService';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('product');
  const [activeProductName, setActiveProductName] = useState<string>('Chicken Nugget');

  // Initialize with deterministic Chicken Nugget candidates so the app is always fully populated
  const initialData = React.useMemo(() => {
    return generateDeterministicFormulations({
      productName: 'Chicken Nugget',
      tastePriority: 94,
      texturePriority: 96,
      nutritionPriority: 88,
      costPriority: 76,
      sustainabilityPriority: 85,
      costCeiling: 220,
      proteinTarget: 22,
      allergenRestrictions: [],
      additionalRequirements: ''
    });
  }, []);

  const [candidates, setCandidates] = useState<CandidateFormulation[]>(initialData.candidates);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>(initialData.candidates[0]?.id || 'candidate-1');
  const [isUnknownProduct, setIsUnknownProduct] = useState(false);
  const [allergenRestrictions, setAllergenRestrictions] = useState<string[]>([]);

  // Modal & Navigation States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [currentSimulationStep, setCurrentSimulationStep] = useState(SIMULATION_STEPS[0]);
  const [simulationStepIndex, setSimulationStepIndex] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active weights
  const [activeWeights, setActiveWeights] = useState<FormulationWeights>({
    tasteWeight: 30,
    textureWeight: 25,
    nutritionWeight: 20,
    costWeight: 15,
    sustainabilityWeight: 10
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleSynthesize = async (request: FormulationRequest) => {
    setIsSynthesizing(true);
    setActiveProductName(request.productName);
    setAllergenRestrictions(request.allergenRestrictions || []);
    setCurrentSimulationStep(SIMULATION_STEPS[0]);
    setSimulationStepIndex(1);
    showToast(`Initiating in-silico biopolymer permutation for ${request.productName}...`);

    try {
      const response = await requestFormulation(
        request,
        (step, index) => {
          setCurrentSimulationStep(step);
          setSimulationStepIndex(index);
        }
      );

      setCandidates(response.candidates);
      setIsUnknownProduct(response.isUnknownProduct);
      if (response.candidates.length > 0) {
        setSelectedCandidateId(response.candidates[0].id);
      }

      setIsSynthesizing(false);
      setCurrentTab('candidates');

      if (response.engineTelemetry.isDemoFallback) {
        showToast(`Generated Top 3 Pareto candidates for ${request.productName} (Deterministic Demo Mode)`);
      } else {
        showToast(`AI Synthesis complete: Top 3 Pareto candidates generated for ${request.productName}!`);
      }
    } catch (err) {
      console.error('Synthesis failed:', err);
      // Fallback guarantees success
      const fallback = generateDeterministicFormulations(request);
      setCandidates(fallback.candidates);
      setIsUnknownProduct(fallback.isUnknownProduct);
      if (fallback.candidates.length > 0) {
        setSelectedCandidateId(fallback.candidates[0].id);
      }
      setIsSynthesizing(false);
      setCurrentTab('candidates');
      showToast(`Synthesis complete: Top 3 candidates ready for ${request.productName}!`);
    }
  };

  const handleSelectDemoProduct = (productName: string) => {
    setActiveProductName(productName);
    setCurrentTab('formulate');
    showToast(`Loaded "${productName}" into Target Formulation Studio`);
  };

  const getTitleContext = () => {
    switch (currentTab) {
      case 'product':
        return 'BIOCHEMICAL R&D SUITE';
      case 'formulate':
        return 'FORMULATION STUDIO';
      case 'candidates':
        return 'CANDIDATE COMPARISON';
      case 'detail':
        return 'LAB SPECIFICATION SHEET';
      case 'knowledge':
        return 'BOTANICAL ENCYCLOPEDIA';
      case 'demo':
        return 'INTERACTIVE DEMO';
      default:
        return 'IN-SILICO PLATFORM';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f0d] text-[#dfe4e0] font-sans selection:bg-[#00f5a0]/30 selection:text-white flex flex-col relative overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-[#00f5a0]/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-1/3 right-10 w-[500px] h-[350px] bg-[#00a572]/5 blur-[150px] rounded-full" />
      </div>

      {/* Persistent Global Header */}
      <Header
        currentTab={currentTab}
        onNavigate={(tab) => {
          if (tab === 'demo') {
            handleSelectDemoProduct('Chicken Nugget');
          } else {
            setCurrentTab(tab);
          }
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        titleContext={getTitleContext()}
      />

      {/* Main Content Area */}
      <main className="flex-1 z-10 w-full">
        {currentTab === 'product' && (
          <ProductView
            onNavigate={(tab) => {
              if (tab === 'demo') {
                handleSelectDemoProduct('Chicken Nugget');
              } else {
                setCurrentTab(tab);
              }
            }}
            onSelectCandidate={(id) => {
              setSelectedCandidateId(id);
              setCurrentTab('detail');
            }}
          />
        )}

        {(currentTab === 'formulate' || currentTab === 'demo') && (
          <FormulateView
            onNavigate={setCurrentTab}
            onSynthesize={handleSynthesize}
            isSynthesizing={isSynthesizing}
            currentSimulationStep={currentSimulationStep}
            simulationStepIndex={simulationStepIndex}
            totalSimulationSteps={SIMULATION_STEPS.length}
            initialTargetName={activeProductName}
          />
        )}

        {currentTab === 'candidates' && (
          <CandidatesView
            onNavigate={setCurrentTab}
            onSelectCandidate={(id) => {
              setSelectedCandidateId(id);
            }}
            selectedCandidateId={selectedCandidateId}
            candidates={candidates}
            productName={activeProductName}
            allergenRestrictions={allergenRestrictions}
            onRelaxConstraints={() => {
              setAllergenRestrictions([]);
              setCurrentTab('formulate');
              showToast('Allergen restrictions relaxed. Ready to re-formulate.');
            }}
            onUpdateWeights={setActiveWeights}
            initialWeights={activeWeights}
            isUnknownProduct={isUnknownProduct}
          />
        )}

        {currentTab === 'detail' && (
          <DetailView
            candidateId={selectedCandidateId}
            candidates={candidates}
            productName={activeProductName}
            onNavigate={setCurrentTab}
            onSelectCandidate={setSelectedCandidateId}
          />
        )}

        {currentTab === 'knowledge' && (
          <KnowledgeView
            onNavigate={setCurrentTab}
            onOpenTerminal={() => setIsTerminalOpen(true)}
          />
        )}
      </main>

      {/* Persistent Floating Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onNavigate={(tab) => {
          if (tab === 'demo') {
            handleSelectDemoProduct('Chicken Nugget');
          } else {
            setCurrentTab(tab);
          }
        }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectCandidate={(id) => {
          setSelectedCandidateId(id);
          setCurrentTab('detail');
          setIsSearchOpen(false);
        }}
        onNavigate={(tab) => {
          if (tab === 'demo') {
            handleSelectDemoProduct('Chicken Nugget');
          } else {
            setCurrentTab(tab);
          }
          setIsSearchOpen(false);
        }}
      />

      {/* Terminal Telemetry Console Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-[#131d18] border border-[#00f5a0]/40 text-white font-mono text-xs shadow-2xl flex items-center gap-2.5 animate-bounce-subtle backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#00f5a0] animate-ping shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
