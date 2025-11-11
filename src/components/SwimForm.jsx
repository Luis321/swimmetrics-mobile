import React, { useState } from 'react';
import { format } from 'date-fns';

const SwimForm = ({ style, onSubmit, onCancel, editData = null }) => {
  const [formData, setFormData] = useState({
    date: editData?.date || format(new Date(), 'yyyy-MM-dd'),
    distance: editData?.distance || '',
    time: editData?.time || '',
    strokes: editData?.strokes || '',
    heartRate: editData?.heartRate || '',
    notes: editData?.notes || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación
    if (!formData.distance || !formData.time || !formData.strokes) {
      alert('Por favor completa los campos obligatorios: Distancia, Tiempo y Brazadas');
      return;
    }

    // Convertir a números
    const swimData = {
      style: style.id,
      date: formData.date,
      distance: parseFloat(formData.distance),
      time: parseFloat(formData.time),
      strokes: parseInt(formData.strokes),
      heartRate: formData.heartRate ? parseInt(formData.heartRate) : null,
      notes: formData.notes.trim(),
    };

    onSubmit(swimData);
    
    // Reset form si no está editando
    if (!editData) {
      setFormData({
        date: format(new Date(), 'yyyy-MM-dd'),
        distance: '',
        time: '',
        strokes: '',
        heartRate: '',
        notes: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-slate-800 rounded-2xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="text-2xl">{style.emoji}</span>
          {editData ? 'Editar' : 'Nuevo'} {style.name}
        </h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Fecha *
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          max={format(new Date(), 'yyyy-MM-dd')}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Distancia (m) *
          </label>
          <input
            type="number"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            placeholder="25"
            min="1"
            step="0.1"
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Tiempo (s) *
          </label>
          <input
            type="number"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="30.5"
            min="0.1"
            step="0.1"
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Brazadas *
          </label>
          <input
            type="number"
            name="strokes"
            value={formData.strokes}
            onChange={handleChange}
            placeholder="15"
            min="1"
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            FC (bpm)
          </label>
          <input
            type="number"
            name="heartRate"
            value={formData.heartRate}
            onChange={handleChange}
            placeholder="140"
            min="30"
            max="220"
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Notas / Sensaciones
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Ej: Buen ritmo, técnica mejorada..."
          rows="3"
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
        >
          {editData ? '✓ Guardar cambios' : '+ Añadir registro'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default SwimForm;
