import React from 'react';
import StyleCard from '../components/StyleCard';
import { SWIM_STYLES_ARRAY } from '../constants/swimStyles';

const HomeView = ({ onSelectStyle, swimCounts }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white p-6 pb-8">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <span className="text-4xl">🏊</span>
            SwimMetrics
          </h1>
          <p className="text-primary-100 text-sm">
            Registra y analiza tu rendimiento en natación
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 -mt-4">
        {/* Stats Summary */}
        <div className="bg-slate-800 rounded-2xl p-4 mb-6 border border-slate-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-400 mb-1">Total registros</div>
              <div className="text-2xl font-bold text-white">
                {Object.values(swimCounts).reduce((a, b) => a + b, 0)}
              </div>
            </div>
            <div className="text-4xl">📊</div>
          </div>
        </div>

        {/* Styles Grid */}
        <div className="space-y-4">
          <h2 className="text-white text-lg font-bold px-2">Estilos de Natación</h2>
          {SWIM_STYLES_ARRAY.map((style) => (
            <StyleCard
              key={style.id}
              style={style}
              onClick={() => onSelectStyle(style)}
              swimCount={swimCounts[style.id] || 0}
            />
          ))}
        </div>

        {/* Help text */}
        <div className="mt-8 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400 text-center">
            💡 Selecciona un estilo para registrar entrenamientos y ver tus métricas
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
