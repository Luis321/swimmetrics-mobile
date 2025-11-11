import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadarController,
  RadialLinearScale,
} from 'chart.js';
import { Line, Bar, Radar } from 'react-chartjs-2';
import { format } from 'date-fns';
import { calculateMetrics } from '../utils/calculations';
import { exportChartAsPNG } from '../utils/export';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadarController,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

export const TimeVsStrokesChart = ({ swims, color }) => {
  const chartRef = useRef(null);

  const sortedSwims = [...swims].sort((a, b) => new Date(a.date) - new Date(b.date));

  const data = {
    labels: sortedSwims.map(s => format(new Date(s.date), 'dd/MM')),
    datasets: [
      {
        label: 'Tiempo (s)',
        data: sortedSwims.map(s => s.time),
        borderColor: color,
        backgroundColor: `${color}33`,
        yAxisID: 'y',
      },
      {
        label: 'Brazadas',
        data: sortedSwims.map(s => s.strokes),
        borderColor: '#F59E0B',
        backgroundColor: '#F59E0B33',
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        labels: {
          color: '#CBD5E1',
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: '#1E293B',
        titleColor: '#F1F5F9',
        bodyColor: '#CBD5E1',
        borderColor: '#334155',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        ticks: { color: '#94A3B8' },
        grid: { color: '#334155' }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: { color: '#94A3B8' },
        grid: { color: '#334155' },
        title: {
          display: true,
          text: 'Tiempo (s)',
          color: '#CBD5E1'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        ticks: { color: '#94A3B8' },
        grid: { display: false },
        title: {
          display: true,
          text: 'Brazadas',
          color: '#CBD5E1'
        }
      },
    },
  };

  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-white font-bold">Evolución Tiempo vs Brazadas</h4>
        <button
          onClick={() => exportChartAsPNG(chartRef, 'tiempo-vs-brazadas')}
          className="text-primary-400 hover:text-primary-300 text-sm font-medium px-3 py-1 rounded-lg hover:bg-slate-700 transition-colors"
        >
          📤 Exportar
        </button>
      </div>
      <div style={{ height: '250px' }}>
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export const SLvsSRChart = ({ swims, color }) => {
  const chartRef = useRef(null);

  const swimsWithMetrics = swims.map(s => calculateMetrics(s));

  const data = {
    datasets: [
      {
        label: 'Eficiencia Técnica',
        data: swimsWithMetrics.map(s => ({ x: s.sr, y: s.sl })),
        backgroundColor: color,
        borderColor: color,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#CBD5E1',
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: '#1E293B',
        titleColor: '#F1F5F9',
        bodyColor: '#CBD5E1',
        borderColor: '#334155',
        borderWidth: 1,
        callbacks: {
          label: (context) => {
            return `SR: ${context.parsed.x.toFixed(2)} | SL: ${context.parsed.y.toFixed(2)}m`;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'linear',
        ticks: { color: '#94A3B8' },
        grid: { color: '#334155' },
        title: {
          display: true,
          text: 'SR (brazadas/min)',
          color: '#CBD5E1'
        }
      },
      y: {
        ticks: { color: '#94A3B8' },
        grid: { color: '#334155' },
        title: {
          display: true,
          text: 'SL (m/brazada)',
          color: '#CBD5E1'
        }
      },
    },
  };

  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-white font-bold">SL vs SR (Eficiencia)</h4>
        <button
          onClick={() => exportChartAsPNG(chartRef, 'sl-vs-sr')}
          className="text-primary-400 hover:text-primary-300 text-sm font-medium px-3 py-1 rounded-lg hover:bg-slate-700 transition-colors"
        >
          📤 Exportar
        </button>
      </div>
      <div style={{ height: '250px' }}>
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export const SWOLFChart = ({ swims, color }) => {
  const chartRef = useRef(null);

  const sortedSwims = [...swims].sort((a, b) => new Date(a.date) - new Date(b.date));
  const swimsWithMetrics = sortedSwims.map(s => calculateMetrics(s));

  const data = {
    labels: sortedSwims.map(s => format(new Date(s.date), 'dd/MM')),
    datasets: [
      {
        label: 'SWOLF',
        data: swimsWithMetrics.map(s => s.swolf),
        backgroundColor: color,
        borderColor: color,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#CBD5E1',
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: '#1E293B',
        titleColor: '#F1F5F9',
        bodyColor: '#CBD5E1',
        borderColor: '#334155',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        ticks: { color: '#94A3B8' },
        grid: { color: '#334155' }
      },
      y: {
        ticks: { color: '#94A3B8' },
        grid: { color: '#334155' },
        title: {
          display: true,
          text: 'SWOLF (menor es mejor)',
          color: '#CBD5E1'
        }
      },
    },
  };

  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-white font-bold">SWOLF por Sesión</h4>
        <button
          onClick={() => exportChartAsPNG(chartRef, 'swolf')}
          className="text-primary-400 hover:text-primary-300 text-sm font-medium px-3 py-1 rounded-lg hover:bg-slate-700 transition-colors"
        >
          📤 Exportar
        </button>
      </div>
      <div style={{ height: '250px' }}>
        <Bar ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export const IETChart = ({ swims, color }) => {
  const chartRef = useRef(null);

  const sortedSwims = [...swims].sort((a, b) => new Date(a.date) - new Date(b.date));
  const swimsWithMetrics = sortedSwims.map(s => calculateMetrics(s));

  const data = {
    labels: sortedSwims.map(s => format(new Date(s.date), 'dd/MM')),
    datasets: [
      {
        label: 'IET',
        data: swimsWithMetrics.map(s => s.iet),
        borderColor: color,
        backgroundColor: `${color}33`,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#CBD5E1',
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: '#1E293B',
        titleColor: '#F1F5F9',
        bodyColor: '#CBD5E1',
        borderColor: '#334155',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        ticks: { color: '#94A3B8' },
        grid: { color: '#334155' }
      },
      y: {
        ticks: { color: '#94A3B8' },
        grid: { color: '#334155' },
        title: {
          display: true,
          text: 'IET (mayor es mejor)',
          color: '#CBD5E1'
        }
      },
    },
  };

  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-white font-bold">Índice de Eficiencia Técnica</h4>
        <button
          onClick={() => exportChartAsPNG(chartRef, 'iet')}
          className="text-primary-400 hover:text-primary-300 text-sm font-medium px-3 py-1 rounded-lg hover:bg-slate-700 transition-colors"
        >
          📤 Exportar
        </button>
      </div>
      <div style={{ height: '250px' }}>
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export const ComparisonRadarChart = ({ styleData }) => {
  const chartRef = useRef(null);

  const data = {
    labels: ['SL', 'SR', 'IET × 100', 'Velocidad', 'SWOLF (inv)'],
    datasets: styleData.map(style => ({
      label: `${style.emoji} ${style.name}`,
      data: [
        style.avgSL,
        style.avgSR,
        style.avgIET * 100,
        style.avgSpeed,
        100 - style.avgSWOLF,
      ],
      backgroundColor: `${style.color}33`,
      borderColor: style.color,
      borderWidth: 2,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#CBD5E1',
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: '#1E293B',
        titleColor: '#F1F5F9',
        bodyColor: '#CBD5E1',
        borderColor: '#334155',
        borderWidth: 1,
      }
    },
    scales: {
      r: {
        ticks: { 
          color: '#94A3B8',
          backdropColor: 'transparent'
        },
        grid: { color: '#334155' },
        pointLabels: {
          color: '#CBD5E1',
          font: { size: 11 }
        }
      }
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-white font-bold">Comparación de Estilos</h4>
        <button
          onClick={() => exportChartAsPNG(chartRef, 'comparacion-estilos')}
          className="text-primary-400 hover:text-primary-300 text-sm font-medium px-3 py-1 rounded-lg hover:bg-slate-700 transition-colors"
        >
          📤 Exportar
        </button>
      </div>
      <div style={{ height: '350px' }}>
        <Radar ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};
