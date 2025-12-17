import React from 'react';
import { View } from '../types';

interface BottomNavProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const NavIcon: React.FC<{ icon: string; label: string; active: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${active ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'}`}
  >
    <span className="text-2xl">{icon}</span>
    <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
  </button>
);

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate }) => {
  return (
    <nav className="h-20 bg-white border-t border-slate-100 absolute bottom-0 w-full flex justify-around items-center px-2 pb-2 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <NavIcon 
        icon="✨" 
        label="Check In" 
        active={currentView === 'checkin'} 
        onClick={() => onNavigate('checkin')} 
      />
      <NavIcon 
        icon="📊" 
        label="History" 
        active={currentView === 'history'} 
        onClick={() => onNavigate('history')} 
      />
      <NavIcon 
        icon="🌿" 
        label="Resources" 
        active={currentView === 'resources'} 
        onClick={() => onNavigate('resources')} 
      />
    </nav>
  );
};