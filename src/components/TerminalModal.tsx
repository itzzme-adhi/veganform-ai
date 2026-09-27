import React, { useState, useEffect } from 'react';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState<string[]>([
    '[INIT] CUDA-BIO Neural Physics Engine v2.8 initialized on 8x Tensor Core nodes',
    '[LOAD] Botanical ontology loaded: 3,842 verified molecular isolates across 14 kingdoms',
    '[SPECTRO] Avian myofibrillar deconstruction complete: Actin (18.2%), Myosin Heavy (43.1%)',
    '[CONSTRAINTS] Boundary applied: Soy-Free allergen filter active (1,140 candidates eliminated)',
    '[PARETO] Exploring multi-objective frontier: Taste (30%), Texture (25%), Cost (25%), LCA (10%)',
    '[SIM_RUN #8841-B] Converged in 42.1ms. Top 3 candidates synthesized with >80 Q-score',
    '[READY] In-silico twin-screw texturization model verified. Ready for pilot lab dispatch.'
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      const liveTelemetry = [
        `[HEARTBEAT] Bioreactor array #04 temperature: 74.2°C | Viscosity: 4.8 kPa·s | pH: 6.82`,
        `[SPECTRO] Real-time confocal laser telemetry stable. Zero denatured off-target crosslinks detected.`,
        `[MEM] In-memory graph query speed: 0.18ms | Cache hit ratio: 99.4%`,
      ];
      const randomLine = liveTelemetry[Math.floor(Math.random() * liveTelemetry.length)];
      setLogs((prev) => [...prev.slice(-15), `[${new Date().toLocaleTimeString()}] ${randomLine}`]);
    }, 6000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const cmd = inputVal.trim();
    setInputVal('');

    setLogs((prev) => [...prev, `$ ${cmd}`]);

    if (cmd.toLowerCase() === 'clear') {
      setLogs([]);
      return;
    }

    if (cmd.toLowerCase() === 'help') {
      setLogs((prev) => [
        ...prev,
        'Available commands:',
        '  status     - Show CUDA-BIO engine and GPU memory status',
        '  recompute  - Trigger in-silico Pareto frontier re-synthesis',
        '  clear      - Clear terminal logs',
        '  ping       - Test Pilot Lab 4 LIMS server connection'
      ]);
      return;
    }

    if (cmd.toLowerCase() === 'recompute') {
      setIsSimulating(true);
      setLogs((prev) => [...prev, '>>> Running 10,000 iterative Monte-Carlo shear-cell permutations...']);
      setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          '>>> Iteration 10,000 complete: Pareto front re-converged. Candidate VFA-CHK-092 maintains #1.'
        ]);
        setIsSimulating(false);
      }, 1200);
      return;
    }

    setLogs((prev) => [...prev, `Command executed: "${cmd}". Type "help" for diagnostic commands.`]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl bg-[#0a0f0d] border border-[#1f382b] rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_20px_rgba(0,245,160,0.15)] overflow-hidden flex flex-col h-[520px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Title Bar */}
        <div className="px-4 py-2.5 bg-[#131d18] border-b border-[#1f382b] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f5a0] animate-pulse shadow-[0_0_6px_#00f5a0]" />
            <span className="font-mono text-xs font-bold text-white tracking-wide">
              VeganForm CUDA-BIO Synthesis Terminal [Thread 0x8F94]
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLogs([])}
              className="font-mono text-[10px] text-[#8da396] hover:text-[#00f5a0] px-2 py-0.5 rounded border border-[#1f382b] hover:border-[#00f5a0]/40 transition-colors"
            >
              CLEAR
            </button>
            <button
              onClick={onClose}
              className="text-[#8da396] hover:text-white p-1 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Logs Output */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-[#dfe4e0] space-y-1.5 bg-[#0a0f0d]">
          {logs.map((log, i) => (
            <div
              key={i}
              className={`leading-relaxed ${
                log.startsWith('$')
                  ? 'text-[#00f5a0] font-semibold'
                  : log.includes('[SPECTRO]')
                  ? 'text-sky-400'
                  : log.includes('[PARETO]')
                  ? 'text-amber-300'
                  : log.includes('[READY]')
                  ? 'text-emerald-400 font-semibold'
                  : 'text-[#8da396]'
              }`}
            >
              {log}
            </div>
          ))}
          {isSimulating && (
            <div className="flex items-center gap-2 text-[#00f5a0] animate-pulse">
              <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
              <span>Running parallel in-silico texturization tensors...</span>
            </div>
          )}
        </div>

        {/* Command Line Input */}
        <form onSubmit={handleCommand} className="p-3 bg-[#131d18] border-t border-[#1f382b] flex items-center gap-2">
          <span className="font-mono text-xs text-[#00f5a0] font-bold">$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'recompute', 'status', or custom bio-query..."
            className="flex-1 bg-transparent font-mono text-xs text-white placeholder-[#8da396]/50 focus:outline-none"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-[#0b3d2e] border border-[#00f5a0]/40 text-[#00f5a0] font-mono text-xs rounded hover:bg-[#00f5a0] hover:text-black transition-all"
          >
            EXEC
          </button>
        </form>
      </div>
    </div>
  );
};
