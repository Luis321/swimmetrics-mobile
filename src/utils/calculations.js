/**
 * Cálculos de métricas de natación
 */

// SL (Longitud de brazada) = Distancia / Nº de brazadas
export const calculateSL = (distance, strokes) => {
  if (!strokes || strokes === 0) return 0;
  return parseFloat((distance / strokes).toFixed(2));
};

// SR (Frecuencia de brazada) = (Nº de brazadas / Tiempo) × 60
export const calculateSR = (strokes, time) => {
  if (!time || time === 0) return 0;
  return parseFloat(((strokes / time) * 60).toFixed(2));
};

// IET (Índice de Eficiencia Técnica) = Distancia / (Tiempo × Nº de brazadas)
export const calculateIET = (distance, time, strokes) => {
  if (!time || !strokes || time === 0 || strokes === 0) return 0;
  return parseFloat((distance / (time * strokes)).toFixed(4));
};

// SWOLF = Tiempo + Nº de brazadas (menor es mejor)
export const calculateSWOLF = (time, strokes) => {
  return parseFloat((time + strokes).toFixed(2));
};

// Velocidad = Distancia / Tiempo (m/s)
export const calculateSpeed = (distance, time) => {
  if (!time || time === 0) return 0;
  return parseFloat((distance / time).toFixed(2));
};

// IEC (Índice de Economía Cardíaca) = FC / Velocidad
export const calculateIEC = (heartRate, distance, time) => {
  if (!heartRate) return null;
  const speed = calculateSpeed(distance, time);
  if (speed === 0) return null;
  return parseFloat((heartRate / speed).toFixed(2));
};

// Calcular todas las métricas a la vez
export const calculateMetrics = (swim) => {
  const { distance, time, strokes, heartRate } = swim;
  
  return {
    ...swim,
    sl: calculateSL(distance, strokes),
    sr: calculateSR(strokes, time),
    iet: calculateIET(distance, time, strokes),
    swolf: calculateSWOLF(time, strokes),
    speed: calculateSpeed(distance, time),
    iec: calculateIEC(heartRate, distance, time),
  };
};

// Calcular promedios para un conjunto de entrenamientos
export const calculateAverages = (swims) => {
  if (!swims || swims.length === 0) {
    return {
      avgSL: 0,
      avgSR: 0,
      avgIET: 0,
      avgSWOLF: 0,
      avgSpeed: 0,
      avgHeartRate: 0,
    };
  }

  const totals = swims.reduce(
    (acc, swim) => {
      const metrics = calculateMetrics(swim);
      return {
        sl: acc.sl + metrics.sl,
        sr: acc.sr + metrics.sr,
        iet: acc.iet + metrics.iet,
        swolf: acc.swolf + metrics.swolf,
        speed: acc.speed + metrics.speed,
        heartRate: acc.heartRate + (swim.heartRate || 0),
        hrCount: acc.hrCount + (swim.heartRate ? 1 : 0),
      };
    },
    { sl: 0, sr: 0, iet: 0, swolf: 0, speed: 0, heartRate: 0, hrCount: 0 }
  );

  const count = swims.length;

  return {
    avgSL: parseFloat((totals.sl / count).toFixed(2)),
    avgSR: parseFloat((totals.sr / count).toFixed(2)),
    avgIET: parseFloat((totals.iet / count).toFixed(4)),
    avgSWOLF: parseFloat((totals.swolf / count).toFixed(2)),
    avgSpeed: parseFloat((totals.speed / count).toFixed(2)),
    avgHeartRate: totals.hrCount > 0 
      ? parseFloat((totals.heartRate / totals.hrCount).toFixed(0)) 
      : 0,
  };
};
