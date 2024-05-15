// training model

export interface ExerciseDailyData {
  date: string;
  repetitions: number;
  weight: number;
}

export interface Exercise {
  name: string;
  dailyData: ExerciseDailyData[];
  maxWeight?: number;
  lastEdited?: string; 
}

export interface Training {
  category: string;
  exercises: Exercise[];
}

export interface TrainingsState {
  trainings: Training[];
  loading: boolean;
  error?: string;
};
