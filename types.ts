export type View = 'onboarding' | 'checkin' | 'history' | 'resources';

export enum MoodType {
  Great = 5,
  Good = 4,
  Okay = 3,
  Low = 2,
  Bad = 1
}

export interface MoodEntry {
  id: string;
  timestamp: number;
  moodValue: MoodType;
  moodLabel: string; // e.g., "Anxious", "Excited"
  note: string;
  aiResponse?: AIAnalysisResult;
}

export interface AIAnalysisResult {
  empatheticMessage: string;
  suggestions: string[];
  colorTheme?: string;
}

// Helper types for chart data
export interface ChartDataPoint {
  date: string;
  value: number;
}