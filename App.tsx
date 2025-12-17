
import React, { useState, useEffect, useMemo } from 'react';
import { TECHNIQUES } from './constants';
import { Technique, TechniqueId } from './types';

const App: React.FC = () => {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [completed, setCompleted] = useState(false);
  
  // Definimos el orden en que aparecerán las definiciones
  const [quizSequence, setQuizSequence] = useState<Technique[]>([]);
  // Índice de la definición actual que se está preguntando
  const [currentDefIndex, setCurrentDefIndex] = useState(0);
  // Lista de IDs de conceptos que todavía están en el tablero
  const [remainingIds, setRemainingIds] = useState<TechniqueId[]>([]);
  
  const [wrongId, setWrongId] = useState<TechniqueId | null>(null);
  const [successId, setSuccessId] = useState<TechniqueId | null>(null);

  const initGame = () => {
    const shuffled = [...TECHNIQUES].sort(() => Math.random() - 0.5);
    setQuizSequence(shuffled);
    setCurrentDefIndex(0);
    setRemainingIds(TECHNIQUES.map(t => t.id));
    setScore(0);
    setStreak(0);
    setCompleted(false);
    setShowIntro(false);
  };

  const currentTarget = quizSequence[currentDefIndex];

  const handleSelect = (id: TechniqueId) => {
    if (successId || wrongId) return;

    if (id === currentTarget.id) {
      setSuccessId(id);
      const newStreak = streak + 1;
      setStreak(newStreak);
      setScore(prev => prev + (100 * newStreak));

      // Esperar un poco para la animación antes de que desaparezca y pase a la siguiente
      setTimeout(() => {
        setRemainingIds(prev => prev.filter(rid => rid !== id));
        if (currentDefIndex < quizSequence.length - 1) {
          setCurrentDefIndex(prev => prev + 1);
        } else {
          setCompleted(true);
        }
        setSuccessId(null);
      }, 600);
    } else {
      setWrongId(id);
      setStreak(0);
      setScore(prev => Math.max(0, prev - 25));
      setTimeout(() => setWrongId(null), 500);
    }
  };

  if (showIntro) {
    return (
      <div className="min-h-screen bg-indigo-950 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border-b-8 border-indigo-200">
          <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-microscope text-3xl text-white"></i>
          </div>
          <h1 className="text-3xl font-black text-slate-800 mb-2">Laboratorio de Mezclas</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Relaciona la definición con su concepto. Si aciertas, el concepto desaparecerá del tablero. ¡Limpia el laboratorio!
          </p>
          <button 
            onClick={initGame}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-95 flex items-center justify-center space-x-2"
          >
            <span>EMPEZAR PRÁCTICA</span>
            <i className="fas fa-flask"></i>
          </button>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-emerald-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="mb-6 relative">
             <i className="fas fa-star text-7xl text-yellow-400"></i>
             <i className="fas fa-check absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-emerald-600"></i>
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-2">¡Tablero Limpio!</h2>
          <p className="text-slate-500 mb-6">Has demostrado ser un experto en técnicas de separación.</p>
          <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Puntuación Total</p>
            <p className="text-5xl font-black text-indigo-600">{score}</p>
          </div>
          <button 
            onClick={() => setShowIntro(true)}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-2xl transition-all"
          >
            NUEVA PARTIDA
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none">
      {/* HUD Superior */}
      <header className="bg-white border-b p-4 shadow-sm sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg">
              <i className="fas fa-vial"></i>
            </div>
            <div>
               <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight">Misión Mezclas</h2>
               <div className="h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden mt-1">
                 <div 
                   className="h-full bg-indigo-500 transition-all duration-500" 
                   style={{ width: `${(currentDefIndex / TECHNIQUES.length) * 100}%` }}
                 ></div>
               </div>
            </div>
          </div>
          
          <div className="flex space-x-4 items-center">
            {streak > 1 && (
              <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-black animate-pulse">
                COMBO x{streak}
              </div>
            )}
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Puntos</p>
              <p className="text-xl font-black text-indigo-600 tabular-nums">{score}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-4 flex flex-col">
        {/* Panel de Definición Activa */}
        <div className="mt-4 mb-8">
          <div className="bg-white rounded-3xl shadow-xl border-t-4 border-indigo-500 p-8 text-center relative overflow-hidden">
            <div className="absolute top-4 left-4 text-indigo-100 text-6xl opacity-20">
              <i className="fas fa-quote-left"></i>
            </div>
            <span className="relative z-10 inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase mb-4 tracking-widest">
              Analiza la definición:
            </span>
            <h3 className="relative z-10 text-2xl md:text-3xl font-bold text-slate-800 leading-tight px-4">
              {currentTarget?.definition}
            </h3>
          </div>
        </div>

        {/* Tablero de Conceptos */}
        <div className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {TECHNIQUES.map((tech) => {
              const isRemaining = remainingIds.includes(tech.id);
              if (!isRemaining && successId !== tech.id) return <div key={tech.id} className="hidden" />;
              
              const isWrong = wrongId === tech.id;
              const isSuccess = successId === tech.id;

              return (
                <button
                  key={tech.id}
                  onClick={() => handleSelect(tech.id)}
                  className={`
                    group relative p-4 h-24 rounded-2xl font-bold text-sm transition-all duration-300 transform
                    flex flex-col items-center justify-center text-center space-y-2 border-2
                    ${isSuccess ? 'bg-emerald-500 border-emerald-500 text-white scale-110 z-10' : 
                      isWrong ? 'bg-red-50 border-red-500 text-red-600 animate-shake' : 
                      'bg-white border-slate-200 text-slate-600 hover:border-indigo-400 hover:shadow-lg hover:-translate-y-1'}
                    ${!isRemaining && isSuccess ? 'opacity-0 scale-50' : 'opacity-100'}
                  `}
                >
                  <i className={`fas ${tech.icon} text-lg mb-1 ${isSuccess ? 'text-white' : 'text-slate-300 group-hover:text-indigo-400'}`}></i>
                  <span className="leading-tight">{tech.name}</span>
                  
                  {isSuccess && (
                    <div className="absolute -top-2 -right-2 bg-white text-emerald-500 rounded-full w-6 h-6 flex items-center justify-center shadow-md animate-bounce">
                      <i className="fas fa-check text-xs"></i>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="p-4 text-center">
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
          Conceptos restantes: {remainingIds.length} / {TECHNIQUES.length}
        </p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}} />
    </div>
  );
};

export default App;
