import React, { useState, useEffect } from 'react';
import { ComparisonRadarChart } from '../components/Charts';
import { calculateAverages } from '../utils/calculations';
import { getAllSwims } from '../utils/db';
import { SWIM_STYLES_ARRAY } from '../constants/swimStyles';
import { exportToCSV } from '../utils/export';

const CompareView = ({ onBack }) => {
  const [allSwims, setAllSwims] = useState([]);
  const [styleData, setStyleData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const swims = await getAllSwims();
    setAllSwims(swims);

    // Calcular promedios por estilo
    const data = SWIM_STYLES_ARRAY.map(style => {
      const styleSwims = swims.filter(s => s.style === style.id);
      const averages = calculateAverages(styleSwims);
      
      return {
        ...style,
        count: styleSwims.length,
        ...averages,
      };
    }).filter(style => style.count > 0); // Solo estilos con datos

    setStyleData(data);
  };

  if (styleData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pb-20">
        <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white p-6 pb-8">
          <div className="max-w-lg mx-auto">
            <button
              onClick={onBack}
              className="text-white/80 hover:text-white mb-4 flex items-center gap-2 text-sm font-medium"
            >
              ← Volver
            </button>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <span className="text-4xl">📊</span>
              Comparar Estilos
            </h1>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 -mt-4">
          <div className="bg-slate-800 rounded-2xl p-8 text-center border border-slate-700">
            <div className="text-6xl mb-4">🏊</div>
            <p className="text-white text-lg font-medium mb-2">
              No hay datos para comparar
            </p>
            <p className="text-slate-400 text-sm">
              Añade registros en al menos un estilo para ver comparaciones
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white p-6 pb-8">
        <div className="max-w-lg mx-auto">
          <button
            onClick={onBack}
            className="text-white/80 hover:text-white mb-4 flex items-center gap-2 text-sm font-medium"
          >
            ← Volver
          </button>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <span className="text-4xl">📊</span>
            Comparar Estilos
          </h1>
          <p className="text-primary-100 text-sm">
            Análisis comparativo de tu rendimiento
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 -mt-4 space-y-4">
        {/* Summary Cards */}
        <div className="space-y-3">
          {styleData.map(style => (
            <div
              key={style.id}
              className="bg-slate-800 rounded-xl p-4 border-2 border-slate-700"
              style={{ borderLeftColor: style.color, borderLeftWidth: '4px' }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{style.emoji}</span>
                  <div>
                    <h3 className="text-white font-bold">{style.name}</h3>
                    <p className="text-sm text-slate-400">
                      {style.count} {style.count === 1 ? 'registro' : 'registros'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div>
                  <div className="text-xs text-slate-400 mb-1">SL</div>
                  <div className="text-sm font-bold" style={{ color: style.color }}>
                    {style.avgSL}m
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">SR</div>
                  <div className="text-sm font-bold" style={{ color: style.color }}>
                    {style.avgSR}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">IET</div>
                  <div className="text-sm font-bold" style={{ color: style.color }}>
                    {style.avgIET}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">SWOLF</div>
                  <div className="text-sm font-bold" style={{ color: style.color }}>
                    {style.avgSWOLF}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Radar Chart */}
        {styleData.length > 1 && (
          <ComparisonRadarChart styleData={styleData} />
        )}

        {/* Best Metrics */}
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            🏆 Mejores Métricas
          </h3>
          
          <div className="space-y-3">
            {/* Mejor SL */}
            {(() => {
              const best = styleData.reduce((max, s) => s.avgSL > max.avgSL ? s : max);
              return (
                <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                  <div>
                    <div className="text-xs text-slate-400">Mayor SL (longitud de brazada)</div>
                    <div className="text-white font-medium">
                      {best.emoji} {best.name}
                    </div>
                  </div>
                  <div className="text-lg font-bold" style={{ color: best.color }}>
                    {best.avgSL}m
                  </div>
                </div>
              );
            })()}

            {/* Mejor IET */}
            {(() => {
              const best = styleData.reduce((max, s) => s.avgIET > max.avgIET ? s : max);
              return (
                <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                  <div>
                    <div className="text-xs text-slate-400">Mayor IET (eficiencia técnica)</div>
                    <div className="text-white font-medium">
                      {best.emoji} {best.name}
                    </div>
                  </div>
                  <div className="text-lg font-bold" style={{ color: best.color }}>
                    {best.avgIET}
                  </div>
                </div>
              );
            })()}

            {/* Mejor SWOLF */}
            {(() => {
              const best = styleData.reduce((min, s) => s.avgSWOLF < min.avgSWOLF ? s : min);
              return (
                <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                  <div>
                    <div className="text-xs text-slate-400">Menor SWOLF (más eficiente)</div>
                    <div className="text-white font-medium">
                      {best.emoji} {best.name}
                    </div>
                  </div>
                  <div className="text-lg font-bold" style={{ color: best.color }}>
                    {best.avgSWOLF}
                  </div>
                </div>
              );
            })()}

            {/* Mejor Velocidad */}
            {(() => {
              const best = styleData.reduce((max, s) => s.avgSpeed > max.avgSpeed ? s : max);
              return (
                <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                  <div>
                    <div className="text-xs text-slate-400">Mayor velocidad</div>
                    <div className="text-white font-medium">
                      {best.emoji} {best.name}
                    </div>
                  </div>
                  <div className="text-lg font-bold" style={{ color: best.color }}>
                    {best.avgSpeed} m/s
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Export Button */}
        <button
          onClick={() => exportToCSV(allSwims, 'todos-los-estilos')}
          className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-6 rounded-xl transition-colors"
        >
          📥 Exportar Todos los Datos
        </button>
      </div>
    </div>
  );
};

export default CompareView;
