import React from 'react';
import { MoodEntry, MoodType } from '../types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface MoodHistoryProps {
  history: MoodEntry[];
}

export const MoodHistory: React.FC<MoodHistoryProps> = ({ history }) => {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-6 text-center text-slate-400">
        <div className="text-4xl mb-4">📓</div>
        <p>No check-ins yet. Start your journey today!</p>
      </div>
    );
  }

  // Process data for chart - take last 7 entries and reverse for chronological order
  const chartData = [...history].reverse().slice(-7).map((entry) => ({
    date: new Date(entry.timestamp).toLocaleDateString(undefined, { weekday: 'short' }),
    value: entry.moodValue,
  }));

  const latestEntry = history[0];

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      {latestEntry && latestEntry.aiResponse && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center space-x-2 mb-3">
             <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Latest Insight</span>
             <span className="text-slate-300">|</span>
             <span className="text-xs text-slate-400">{new Date(latestEntry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <p className="text-slate-800 text-lg font-medium leading-relaxed mb-4">
            "{latestEntry.aiResponse.empatheticMessage}"
          </p>
          
          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-500">Try this:</p>
            <ul className="space-y-2">
              {latestEntry.aiResponse.suggestions.map((s, i) => (
                <li key={i} className="flex items-start space-x-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                  <span className="text-teal-500 mt-0.5">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">Mood Trend (Last 7 Entries)</h3>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 10 }} 
                dy={10}
              />
              <YAxis hide domain={[1, 5]} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#0d9488" 
                strokeWidth={3} 
                dot={{ fill: '#0d9488', strokeWidth: 2, r: 4, stroke: '#fff' }} 
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Recent Logs</h3>
        {history.map((entry) => (
          <div key={entry.id} className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-50 hover:border-slate-200 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">
                {entry.moodValue === MoodType.Great ? '☀️' :
                 entry.moodValue === MoodType.Good ? '🌤️' :
                 entry.moodValue === MoodType.Okay ? '🌥️' :
                 entry.moodValue === MoodType.Low ? '🌧️' : '☁️'}
              </div>
              <div>
                <p className="font-semibold text-slate-700 capitalize">{entry.moodLabel}</p>
                <p className="text-xs text-slate-400 truncate max-w-[150px]">{entry.note || 'No note added'}</p>
              </div>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {new Date(entry.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};