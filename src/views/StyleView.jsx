import React, { useState, useEffect } from 'react';
import SwimForm from '../components/SwimForm';
import SwimTable from '../components/SwimTable';
import { TimeVsStrokesChart, SLvsSRChart, SWOLFChart, IETChart } from '../components/Charts';
import { exportToCSV, exportToExcel, shareData } from '../utils/export';
import { calculateAverages } from '../utils/calculations';
import { getSwimsByStyle, addSwim, updateSwim, deleteSwim } from '../utils/db';

const StyleView = ({ style, onBack }) => {
  const [swims, setSwims] = useState([]);
  const [editingSwim, setEditingSwim] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('data'); // data, charts

  useEffect(() => {
    loadSwims();
  }, [style]);

  const loadSwims = async () => {
    const data = await getSwimsByStyle(style.id);
    setSwims(data);
  };

  const handleSubmit = async (swimData) => {
    try {
      if (editingSwim) {
        await updateSwim(editingSwim.id, swimData);
        setEditingSwim(null);
      } else {
        await addSwim(swimData);
      }
      await loadSwims();
      setShowForm(false);
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar el registro');
    }
  };

  const handleEdit = (swim) => {
    setEditingSwim(swim);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar este registro?')) {
      try {
        await deleteSwim(id);
        await loadSwims();
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Error al eliminar el registro');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingSwim(null);
    setShowForm(false);
  };

  const averages = calculateAverages(swims);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pb-20">
      {/* Header */}
      <div 
        className="text-white p-6 pb-8"
        style={{ background: `linear-gradient(135deg, ${style.color} 0%, ${style.color}dd 100%)` }}
      >
        <div className="max-w-lg mx-auto">
          <button
            onClick={onBack}
            className="text-white/80 hover:text-white mb-4 flex items-center gap-2 text-sm font-medium"
          >
            ← Volver
          </button>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <span className="text-4xl">{style.emoji}</span>
            {style.name}
          </h1>
          <p className="text-white/90 text-sm">{swims.length} {swims.length === 1 ? 'registro' : 'registros'}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 -mt-4">
        {/* Stats Cards */}
        {swims.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="text-xs text-slate-400 mb-1">SL Promedio</div>
              <div className="text-xl font-bold text-primary-400">{averages.avgSL}m</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="text-xs text-slate-400 mb-1">IET Promedio</div>
              <div className="text-xl font-bold text-primary-400">{averages.avgIET}</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="text-xs text-slate-400 mb-1">SWOLF Promedio</div>
              <div className="text-xl font-bold text-primary-400">{averages.avgSWOLF}</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="text-xs text-slate-400 mb-1">Velocidad Prom.</div>
              <div className="text-xl font-bold text-primary-400">{averages.avgSpeed} m/s</div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('data')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
              activeTab === 'data'
                ? 'bg-primary-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            📝 Datos
          </button>
          <button
            onClick={() => setActiveTab('charts')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
              activeTab === 'charts'
                ? 'bg-primary-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
            disabled={swims.length === 0}
          >
            📊 Gráficos
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'data' && (
          <div className="space-y-4">
            {/* Add Button */}
            {!showForm && (
              <button
                onClick={() => {
                  setEditingSwim(null);
                  setShowForm(true);
                }}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-xl">+</span>
                Nuevo Registro
              </button>
            )}

            {/* Form */}
            {showForm && (
              <SwimForm
                style={style}
                onSubmit={handleSubmit}
                onCancel={handleCancelEdit}
                editData={editingSwim}
              />
            )}

            {/* Export Buttons */}
            {swims.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={() => exportToCSV(swims, `${style.id}-data`)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 px-4 rounded-xl font-medium transition-colors text-sm"
                >
                  📄 CSV
                </button>
                <button
                  onClick={() => exportToExcel(swims, `${style.id}-data`)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 px-4 rounded-xl font-medium transition-colors text-sm"
                >
                  📊 Excel
                </button>
                <button
                  onClick={() => shareData(swims, `${style.emoji} ${style.name}`)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 px-4 rounded-xl font-medium transition-colors text-sm"
                >
                  🔗 Compartir
                </button>
              </div>
            )}

            {/* Table */}
            <SwimTable
              swims={swims}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}

        {activeTab === 'charts' && swims.length > 0 && (
          <div className="space-y-4">
            <TimeVsStrokesChart swims={swims} color={style.color} />
            <SLvsSRChart swims={swims} color={style.color} />
            <SWOLFChart swims={swims} color={style.color} />
            <IETChart swims={swims} color={style.color} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StyleView;
