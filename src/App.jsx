import React, { useState, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import HomeView from './views/HomeView';
import StyleView from './views/StyleView';
import CompareView from './views/CompareView';
import { getAllSwims } from './utils/db';
import { SWIM_STYLES_ARRAY } from './constants/swimStyles';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [swimCounts, setSwimCounts] = useState({});

  useEffect(() => {
    loadSwimCounts();
  }, []);

  const loadSwimCounts = async () => {
    const allSwims = await getAllSwims();
    const counts = {};
    
    SWIM_STYLES_ARRAY.forEach(style => {
      counts[style.id] = allSwims.filter(s => s.style === style.id).length;
    });
    
    setSwimCounts(counts);
  };

  const handleSelectStyle = (style) => {
    setSelectedStyle(style);
    setCurrentView('style');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedStyle(null);
    loadSwimCounts(); // Reload counts when returning
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
    if (view === 'home') {
      setSelectedStyle(null);
      loadSwimCounts();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Main Content */}
      {currentView === 'home' && (
        <HomeView
          onSelectStyle={handleSelectStyle}
          swimCounts={swimCounts}
        />
      )}

      {currentView === 'style' && selectedStyle && (
        <StyleView
          style={selectedStyle}
          onBack={handleBackToHome}
        />
      )}

      {currentView === 'compare' && (
        <CompareView onBack={handleBackToHome} />
      )}

      {/* Bottom Navigation */}
      {currentView !== 'style' && (
        <BottomNav
          currentView={currentView}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}

export default App;
