import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Serene",
      desc: "Your personal space for mental wellness, reflection, and growth.",
      icon: "🌿"
    },
    {
      title: "Track Your Mood",
      desc: "Check in daily to understand your emotional patterns and triggers.",
      icon: "📊"
    },
    {
      title: "AI-Powered Support",
      desc: "Get personalized, empathetic feedback and coping strategies instantly.",
      icon: "✨"
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="h-screen w-full bg-white flex flex-col items-center justify-between p-8 max-w-md mx-auto relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[60%] bg-teal-50 rounded-full blur-3xl -z-10 opacity-60"></div>
      
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 w-full text-center">
        <div className="w-32 h-32 bg-white rounded-3xl shadow-xl flex items-center justify-center text-6xl mb-6 animate-breathe">
          {steps[step].icon}
        </div>
        
        <div className="space-y-4 animate-fade-in key={step}">
          <h1 className="text-3xl font-bold text-slate-800">{steps[step].title}</h1>
          <p className="text-slate-500 text-lg leading-relaxed">{steps[step].desc}</p>
        </div>
      </div>

      <div className="w-full space-y-6">
        <div className="flex justify-center space-x-2">
          {steps.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-teal-600' : 'w-2 bg-slate-200'}`} />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full py-4 bg-teal-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-teal-700 transition-colors active:scale-[0.98]"
        >
          {step === steps.length - 1 ? "Get Started" : "Next"}
        </button>
      </div>
    </div>
  );
};