import React from 'react';
import { format } from 'date-fns';
import { calculateMetrics } from '../utils/calculations';

const SwimTable = ({ swims, onEdit, onDelete }) => {
  if (!swims || swims.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <div className="text-4xl mb-3">📝</div>
        <p>No hay registros aún</p>
        <p className="text-sm mt-1">Añade tu primer entrenamiento</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {swims
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((swim) => {
          const metrics = calculateMetrics(swim);
          
          return (
            <div
              key={swim.id}
              className="bg-slate-800 rounded-xl p-4 border border-slate-700"
            >
              {/* Header con fecha y acciones */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-300">
                  📅 {format(new Date(swim.date), 'dd/MM/yyyy')}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(swim)}
                    className="text-primary-400 hover:text-primary-300 text-sm font-medium px-3 py-1 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => onDelete(swim.id)}
                    className="text-red-400 hover:text-red-300 text-sm font-medium px-3 py-1 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Datos principales */}
              <div className="grid grid-cols-3 gap-3 mb-3 text-center">
                <div>
                  <div className="text-xs text-slate-400 mb-1">Distancia</div>
                  <div className="text-lg font-bold text-white">{swim.distance}m</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Tiempo</div>
                  <div className="text-lg font-bold text-white">{swim.time}s</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Brazadas</div>
                  <div className="text-lg font-bold text-white">{swim.strokes}</div>
                </div>
              </div>

              {/* Métricas calculadas */}
              <div className="grid grid-cols-4 gap-2 p-3 bg-slate-900/50 rounded-lg mb-3">
                <div className="text-center">
                  <div className="text-xs text-slate-400 mb-1">SL</div>
                  <div className="text-sm font-bold text-primary-400">{metrics.sl}m</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-slate-400 mb-1">SR</div>
                  <div className="text-sm font-bold text-primary-400">{metrics.sr}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-slate-400 mb-1">IET</div>
                  <div className="text-sm font-bold text-primary-400">{metrics.iet}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-slate-400 mb-1">SWOLF</div>
                  <div className="text-sm font-bold text-primary-400">{metrics.swolf}</div>
                </div>
              </div>

              {/* Información adicional */}
              <div className="flex gap-3 text-xs text-slate-400">
                {swim.heartRate && (
                  <span>💓 {swim.heartRate} bpm</span>
                )}
                <span>⚡ {metrics.speed} m/s</span>
                {metrics.iec && (
                  <span>📊 IEC: {metrics.iec}</span>
                )}
              </div>

              {/* Notas */}
              {swim.notes && (
                <div className="mt-3 pt-3 border-t border-slate-700">
                  <p className="text-sm text-slate-300">{swim.notes}</p>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default SwimTable;
