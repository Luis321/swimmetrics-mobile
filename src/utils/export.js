import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import { calculateMetrics } from './calculations';

// Exportar a CSV
export const exportToCSV = (swims, filename = 'swimmetrics-export') => {
  if (!swims || swims.length === 0) {
    alert('No hay datos para exportar');
    return;
  }

  // Preparar datos con métricas calculadas
  const data = swims.map(swim => {
    const metrics = calculateMetrics(swim);
    return {
      Fecha: format(new Date(swim.date), 'dd/MM/yyyy'),
      Estilo: swim.style,
      'Distancia (m)': swim.distance,
      'Tiempo (s)': swim.time,
      'Brazadas': swim.strokes,
      'FC': swim.heartRate || '-',
      'SL': metrics.sl,
      'SR': metrics.sr,
      'IET': metrics.iet,
      'SWOLF': metrics.swolf,
      'Velocidad (m/s)': metrics.speed,
      'IEC': metrics.iec || '-',
      'Notas': swim.notes || '-',
    };
  });

  // Convertir a CSV
  const ws = XLSX.utils.json_to_sheet(data);
  const csv = XLSX.utils.sheet_to_csv(ws);
  
  // Descargar
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${filename}_${format(new Date(), 'yyyy-MM-dd')}.csv`);
};

// Exportar a Excel
export const exportToExcel = (swims, filename = 'swimmetrics-export') => {
  if (!swims || swims.length === 0) {
    alert('No hay datos para exportar');
    return;
  }

  // Preparar datos con métricas calculadas
  const data = swims.map(swim => {
    const metrics = calculateMetrics(swim);
    return {
      Fecha: format(new Date(swim.date), 'dd/MM/yyyy'),
      Estilo: swim.style,
      'Distancia (m)': swim.distance,
      'Tiempo (s)': swim.time,
      'Brazadas': swim.strokes,
      'FC': swim.heartRate || '-',
      'SL': metrics.sl,
      'SR': metrics.sr,
      'IET': metrics.iet,
      'SWOLF': metrics.swolf,
      'Velocidad (m/s)': metrics.speed,
      'IEC': metrics.iec || '-',
      'Notas': swim.notes || '-',
    };
  });

  // Crear workbook
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Entrenamientos');

  // Descargar
  XLSX.writeFile(wb, `${filename}_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
};

// Exportar gráfico como imagen PNG
export const exportChartAsPNG = (chartRef, filename = 'grafico') => {
  if (!chartRef || !chartRef.current) {
    alert('No se puede exportar el gráfico');
    return;
  }

  try {
    const canvas = chartRef.current.canvas;
    canvas.toBlob((blob) => {
      saveAs(blob, `${filename}_${format(new Date(), 'yyyy-MM-dd')}.png`);
    });
  } catch (error) {
    console.error('Error al exportar gráfico:', error);
    alert('Error al exportar el gráfico');
  }
};

// Compartir datos usando Web Share API (móviles)
export const shareData = async (swims, title = 'SwimMetrics Data') => {
  if (!navigator.share) {
    alert('Tu navegador no soporta la función de compartir');
    return;
  }

  try {
    // Crear texto resumido
    const summary = `📊 ${title}

Total de entrenamientos: ${swims.length}
Última actualización: ${format(new Date(), 'dd/MM/yyyy HH:mm')}

Descarga la app SwimMetrics Mobile para ver más detalles.`;

    await navigator.share({
      title: title,
      text: summary,
    });
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Error al compartir:', error);
    }
  }
};
