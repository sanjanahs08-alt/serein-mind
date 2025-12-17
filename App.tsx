import React, { useState, useEffect } from 'react';
import { Onboarding } from './components/Onboarding';
import { MoodCheckIn } from './components/MoodCheckIn';
import { MoodHistory } from './components/MoodHistory';
import { Resources } from './components/Resources';
import { BottomNav } from './components/BottomNav';
import { Header } from './components/Header';
import { View, MoodEntry } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('onboarding');
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [history, setHistory] = useState<MoodEntry[]>([]);

  // Simulate loading history from local storage
  useEffect(() => {
    const saved = localStorage.getItem('serene_mood_history');
    const onboarded = localStorage.getItem('serene_onboarded');
    
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
    
    if (onboarded === 'true') {
      setHasOnboarded(true);
      setCurrentView('checkin');
    }
  }, []);

  const handleCompleteOnboarding = () => {
    localStorage.setItem('serene_onboarded', 'true');
    setHasOnboarded(true);
    setCurrentView('checkin');
  };

  const handleAddEntry = (entry: MoodEntry) => {
    const newHistory = [entry, ...history];
    setHistory(newHistory);
    localStorage.setItem('serene_mood_history', JSON.stringify(newHistory));
    setCurrentView('history');
  };

  const handleNavigate = (view: View) => {
    setCurrentView(view);
  };

  if (!hasOnboarded && currentView === 'onboarding') {
    return <Onboarding onComplete={handleCompleteOnboarding} />;
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-slate-50 relative shadow-2xl overflow-hidden">
      <Header title={
        currentView === 'checkin' ? 'Check In' :
        currentView === 'history' ? 'Your Journey' :
        currentView === 'resources' ? 'Resources' : 'Serene'
      } />
      
      <main className="flex-1 overflow-y-auto pb-24 scroll-smooth">
        {currentView === 'checkin' && (
          <MoodCheckIn onEntryComplete={handleAddEntry} />
        )}
        {currentView === 'history' && (
          <MoodHistory history={history} />
        )}
        {currentView === 'resources' && (
          <Resources />
        )}
      </main>

      <BottomNav currentView={currentView} onNavigate={handleNavigate} />
    </div>
  );
}