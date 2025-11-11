import React from 'react';

const StyleCard = ({ style, onClick, swimCount = 0 }) => {
  return (
    <button
      onClick={onClick}
      className="bg-slate-800 rounded-2xl p-6 border-2 border-slate-700 hover:border-primary-500 active:scale-95 transition-all shadow-lg w-full"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-5xl">{style.emoji}</span>
        {swimCount > 0 && (
          <span className="bg-primary-500/20 text-primary-400 text-xs font-bold px-2 py-1 rounded-full">
            {swimCount} {swimCount === 1 ? 'registro' : 'registros'}
          </span>
        )}
      </div>
      <h3 className="text-xl font-bold text-white mb-1">{style.name}</h3>
      <p className="text-sm text-slate-400">{style.description}</p>
    </button>
  );
};

export default StyleCard;
