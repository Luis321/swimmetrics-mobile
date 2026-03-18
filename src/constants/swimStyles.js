export const SWIM_STYLES = {
  LIBRE: {
    id: 'libre',
    name: 'Libre',
    emoji: '🏊‍♂️',
    color: '#3B82F6',
    description: 'Estilo libre / Crol'
  },
  MARIPOSA: {
    id: 'mariposa',
    name: 'Mariposa',
    emoji: '🦋',
    color: '#8B5CF6',
    description: 'Estilo mariposa'
  },
  ESPALDA: {
    id: 'espalda',
    name: 'Espalda',
    emoji: '🔄',
    color: '#10B981',
    description: 'Estilo espalda'
  },
  PECHO: {
    id: 'pecho',
    name: 'Pecho',
    emoji: '💪',
    color: '#F59E0B',
    description: 'Estilo pecho / Braza'
  }
};

export const SWIM_STYLES_ARRAY = Object.values(SWIM_STYLES);

export const getStyleById = (id) => {
  return SWIM_STYLES_ARRAY.find(style => style.id === id) || SWIM_STYLES.LIBRE;
};

export const METRICS_INFO = {
  SL: {
    name: 'SL',
    fullName: 'Longitud de Brazada',
    description: 'Distancia recorrida por brazada',
    unit: 'm',
    formula: 'Distancia / Nº de brazadas',
    better: 'higher'
  },
  SR: {
    name: 'SR',
    fullName: 'Frecuencia de Brazada',
    description: 'Brazadas por minuto',
    unit: 'brazadas/min',
    formula: '(Nº de brazadas / Tiempo) × 60',
    better: 'balanced'
  },
  IET: {
    name: 'IET',
    fullName: 'Índice de Eficiencia Técnica',
    description: 'Eficiencia de nado',
    unit: '',
    formula: 'Distancia / (Tiempo × Nº de brazadas)',
    better: 'higher'
  },
  SWOLF: {
    name: 'SWOLF',
    fullName: 'SWOLF',
    description: 'Suma de tiempo y brazadas',
    unit: '',
    formula: 'Tiempo + Nº de brazadas',
    better: 'lower'
  },
  IEC: {
    name: 'IEC',
    fullName: 'Índice de Economía Cardíaca',
    description: 'Relación entre FC y velocidad',
    unit: 'bpm/(m/s)',
    formula: 'FC / Velocidad',
    better: 'lower'
  }
};
