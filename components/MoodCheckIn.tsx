import React, { useState } from 'react';
import { MoodType, MoodEntry } from '../types';
import { analyzeMood } from '../services/geminiService';
import { BreathingLoader } from './BreathingLoader';

interface MoodCheckInProps {
  onEntryComplete: (entry: MoodEntry) => void;
}

export const MoodCheckIn: React.FC<MoodCheckInProps> = ({ onEntryComplete }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [moodValue, setMoodValue] = useState<MoodType | null>(null);
  const [moodLabel, setMoodLabel] = useState('');
  const [note, setNote] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const moodOptions = [
    { value: MoodType.Bad, emoji: '☁️', label: 'Rough' },
    { value: MoodType.Low, emoji: '🌧️', label: 'Low' },
    { value: MoodType.Okay, emoji: '🌥️', label: 'Okay' },
    { value: MoodType.Good, emoji: '🌤️', label: 'Good' },
    { value: MoodType.Great, emoji: '☀️', label: 'Great' },
  ];

  const handleMoodSelect = (value: MoodType) => {
    setMoodValue(value);
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!moodValue) return;

    setIsAnalyzing(true);
    
    // Simulate minimum wait time for breathing animation effect if API is too fast
    const startTime = Date.now();
    
    try {
      const result = await analyzeMood(moodValue, moodLabel || 'Feeling a specific way', note);
      
      const elapsedTime = Date.now() - startTime;
      const minWait = 2500; // Keep the soothing loader for at least 2.5s
      
      if (elapsedTime < minWait) {
        await new Promise(resolve => setTimeout(resolve, minWait - elapsedTime));
      }

      const newEntry: MoodEntry = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        moodValue,
        moodLabel: moodLabel || 'Unspecified',
        note,
        aiResponse: result,
      };

      onEntryComplete(newEntry);
    } catch (error) {
      console.error(error);
      setIsAnalyzing(false);
      // Ideally show error toast here
    }
  };

  if (isAnalyzing) {
    return <BreathingLoader text="Reflecting on your feelings..." />;
  }

  return (
    <div className="p-6 max-w-lg mx-auto h-full flex flex-col animate-fade-in">
      {step === 1 && (
        <div className="flex flex-col h-full justify-center space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-800">How are you feeling right now?</h2>
            <p className="text-slate-500">Select the weather that matches your mood.</p>
          </div>
          
          <div className="grid grid-cols-5 gap-2">
            {moodOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleMoodSelect(option.value)}
                className="flex flex-col items-center p-2 rounded-xl transition-transform hover:scale-110 active:scale-95 focus:outline-none"
              >
                <div className="text-4xl mb-2 drop-shadow-md">{option.emoji}</div>
                <span className="text-xs font-medium text-slate-600">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col h-full animate-fade-in">
          <button 
            onClick={() => setStep(1)} 
            className="self-start text-sm text-slate-400 hover:text-slate-600 mb-6 flex items-center"
          >
            ← Back
          </button>

          <h2 className="text-xl font-bold text-slate-800 mb-6">Tell me a bit more...</h2>

          <div className="space-y-6 flex-1">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">One word to describe it?</label>
              <input
                type="text"
                placeholder="e.g., Anxious, Excited, Tired"
                value={moodLabel}
                onChange={(e) => setMoodLabel(e.target.value)}
                className="w-full p-4 rounded-xl bg-white border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Anything on your mind? (Optional)</label>
              <textarea
                rows={4}
                placeholder="I'm feeling..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-4 rounded-xl bg-white border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all resize-none shadow-sm"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!moodLabel}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-[0.98] ${
              moodLabel ? 'bg-teal-600 hover:bg-teal-700 shadow-teal-200' : 'bg-slate-300 cursor-not-allowed'
            }`}
          >
            Reflect & Check In
          </button>
        </div>
      )}
    </div>
  );
};