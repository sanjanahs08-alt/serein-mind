import React from 'react';

export const Resources: React.FC = () => {
  const resources = [
    { title: "Crisis Text Line", desc: "Text HOME to 741741 to connect with a crisis counselor.", icon: "🆘", link: "#" },
    { title: "Meditation Guide", desc: "A simple 5-minute breathing exercise for anxiety.", icon: "🧘", link: "#" },
    { title: "Sleep Hygiene", desc: "Tips for better sleep and restful nights.", icon: "🌙", link: "#" },
    { title: "Gratitude Journal", desc: "Why writing down 3 good things changes your brain.", icon: "📓", link: "#" },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100">
        <h3 className="text-lg font-bold text-teal-800 mb-2">Need immediate help?</h3>
        <p className="text-teal-700 text-sm mb-4">You are not alone. If you are in crisis, please reach out to professional support immediately.</p>
        <button className="w-full py-3 bg-teal-600 text-white rounded-lg font-semibold shadow-sm hover:bg-teal-700 transition-colors">
          Call Emergency Services
        </button>
      </div>

      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-8">Wellness Library</h3>
      
      <div className="grid gap-4">
        {resources.map((res, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-start space-x-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-3xl bg-slate-50 p-2 rounded-lg">{res.icon}</div>
            <div>
              <h4 className="font-semibold text-slate-800">{res.title}</h4>
              <p className="text-sm text-slate-500 mt-1">{res.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};