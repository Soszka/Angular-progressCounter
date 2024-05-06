import { Injectable, signal } from '@angular/core';

export interface ExerciseDailyData {
  date: string;
  repetitions: number;
  weight: number;
}

export interface ExerciseUiData {
  name: string;
  icon: string;
  lastEdited: string;
  maxWeight: number;
  dailyData: ExerciseDailyData[];
}

const EXERCISES_DATA = {
  pushExercises: [
    { 
      name: "WYCISKANIE NA ŁAWCE PŁASKIEJ", 
      icon: "fitness_center", 
      lastEdited: "10.03.2024", 
      maxWeight: 120, 
      dailyData: [
        { date: "2024-03-25", repetitions: 6, weight: 85 },
        { date: "2024-03-11", repetitions: 6, weight: 80 },
        { date: "2024-02-25", repetitions: 6, weight: 75 },
        { date: "2024-02-11", repetitions: 6, weight: 70 },
        { date: "2024-01-28", repetitions: 6, weight: 65 },
        { date: "2024-01-14", repetitions: 8, weight: 60 },
        { date: "2023-12-31", repetitions: 8, weight: 55 },
        { date: "2023-12-17", repetitions: 8, weight: 52 },
        { date: "2023-12-03", repetitions: 8, weight: 50 },
        { date: "2023-11-19", repetitions: 8, weight: 48 }
      ]
    },
    {
      name: "WYCISKANIE NA ŁAWCE SKOŚNEJ", 
      icon: "swap_vert", 
      lastEdited: "10.03.2024", 
      maxWeight: 90,
      dailyData: [
        { date: "2024-03-25", repetitions: 5, weight: 80 },
        { date: "2024-03-11", repetitions: 5, weight: 75 },
        { date: "2024-02-25", repetitions: 5, weight: 70 },
        { date: "2024-02-11", repetitions: 5, weight: 65 },
        { date: "2024-01-28", repetitions: 5, weight: 60 },
        { date: "2024-01-14", repetitions: 7, weight: 55 },
        { date: "2023-12-31", repetitions: 7, weight: 50 },
        { date: "2023-12-17", repetitions: 7, weight: 45 },
        { date: "2023-12-03", repetitions: 7, weight: 40 },
        { date: "2023-11-19", repetitions: 7, weight: 35 }
      ]
    },
    {
      name: "ROZPIĘTKI", 
      icon: "fitness_center", 
      lastEdited: "10.03.2024", 
      maxWeight: 12,
      dailyData: [
        { date: "2024-03-25", repetitions: 12, weight: 12 },
        { date: "2024-03-11", repetitions: 12, weight: 12 },
        { date: "2024-02-25", repetitions: 12, weight: 12 },
        { date: "2024-02-11", repetitions: 12, weight: 12 },
        { date: "2024-01-28", repetitions: 12, weight: 12 },
        { date: "2024-01-14", repetitions: 14, weight: 12 },
        { date: "2023-12-31", repetitions: 14, weight: 12 },
        { date: "2023-12-17", repetitions: 14, weight: 12 },
        { date: "2023-12-03", repetitions: 14, weight: 12 },
        { date: "2023-11-19", repetitions: 14, weight: 12 }
      ]
    },
    {
      name: "WYCISKANIE NA PORĘCZACH", 
      icon: "accessibility_new", 
      lastEdited: "10.03.2024", 
      maxWeight: 70,
      dailyData: [
        { date: "2024-03-25", repetitions: 8, weight: 70 },
        { date: "2024-03-11", repetitions: 8, weight: 68 },
        { date: "2024-02-25", repetitions: 8, weight: 66 },
        { date: "2024-02-11", repetitions: 8, weight: 64 },
        { date: "2024-01-28", repetitions: 8, weight: 62 },
        { date: "2024-01-14", repetitions: 10, weight: 60 },
        { date: "2023-12-31", repetitions: 10, weight: 58 },
        { date: "2023-12-17", repetitions: 10, weight: 56 },
        { date: "2023-12-03", repetitions: 10, weight: 54 },
        { date: "2023-11-19", repetitions: 10, weight: 52 }
      ]
    },
    {
      name: "WYCISKANIE NA ŁAWCE WĄSKO", 
      icon: "swap_vert", 
      lastEdited: "10.03.2024", 
      maxWeight: 100,
      dailyData: [
        { date: "2024-03-25", repetitions: 6, weight: 100 },
        { date: "2024-03-11", repetitions: 6, weight: 95 },
        { date: "2024-02-25", repetitions: 6, weight: 90 },
        { date: "2024-02-11", repetitions: 6, weight: 85 },
        { date: "2024-01-28", repetitions: 6, weight: 80 },
        { date: "2024-01-14", repetitions: 8, weight: 75 },
        { date: "2023-12-31", repetitions: 8, weight: 70 },
        { date: "2023-12-17", repetitions: 8, weight: 65 },
        { date: "2023-12-03", repetitions: 8, weight: 60 },
        { date: "2023-11-19", repetitions: 8, weight: 55 }
      ]
    }
  ],
  pullExercises: [
    {
      name: "PODCIĄGANIE", 
      icon: "swap_vert", 
      lastEdited: "10.03.2024", 
      maxWeight: 20,
      dailyData: [
        { date: "2024-03-25", repetitions: 12, weight: 20 },
        { date: "2024-03-11", repetitions: 12, weight: 19 },
        { date: "2024-02-25", repetitions: 12, weight: 18 },
        { date: "2024-02-11", repetitions: 12, weight: 17 },
        { date: "2024-01-28", repetitions: 12, weight: 16 },
        { date: "2024-01-14", repetitions: 14, weight: 15 },
        { date: "2023-12-31", repetitions: 14, weight: 14 },
        { date: "2023-12-17", repetitions: 14, weight: 13 },
        { date: "2023-12-03", repetitions: 14, weight: 12 },
        { date: "2023-11-19", repetitions: 14, weight: 11 }
      ]
    },
    {
      name: "WIOSŁOWANIE SZTANGĄ", 
      icon: "accessibility_new", 
      lastEdited: "10.03.2024", 
      maxWeight: 90,
      dailyData: [
        { date: "2024-03-25", repetitions: 10, weight: 90 },
        { date: "2024-03-11", repetitions: 10, weight: 85 },
        { date: "2024-02-25", repetitions: 10, weight: 80 },
        { date: "2024-02-11", repetitions: 10, weight: 75 },
        { date: "2024-01-28", repetitions: 10, weight: 70 },
        { date: "2024-01-14", repetitions: 12, weight: 65 },
        { date: "2023-12-31", repetitions: 12, weight: 60 },
        { date: "2023-12-17", repetitions: 12, weight: 55 },
        { date: "2023-12-03", repetitions: 12, weight: 50 },
        { date: "2023-11-19", repetitions: 12, weight: 45 }
      ]
    },
    {
      name: "TYŁ BARKÓW HANTLAMI", 
      icon: "fitness_center", 
      lastEdited: "10.03.2024", 
      maxWeight: 10,
      dailyData: [
        { date: "2024-03-25", repetitions: 15, weight: 10 },
        { date: "2024-03-11", repetitions: 15, weight: 9 },
        { date: "2024-02-25", repetitions: 15, weight: 8 },
        { date: "2024-02-11", repetitions: 15, weight: 7 },
        { date: "2024-01-28", repetitions: 15, weight: 6 },
        { date: "2024-01-14", repetitions: 17, weight: 5 },
        { date: "2023-12-31", repetitions: 17, weight: 4 },
        { date: "2023-12-17", repetitions: 17, weight: 3 },
        { date: "2023-12-03", repetitions: 17, weight: 2 },
        { date: "2023-11-19", repetitions: 17, weight: 1 }
      ]
    },
    {
      name: "BICEPS SZTANGĄ", 
      icon: "accessibility_new", 
      lastEdited: "10.03.2024", 
      maxWeight: 120,
      dailyData: [
        { date: "2024-03-25", repetitions: 8, weight: 120 },
        { date: "2024-03-11", repetitions: 8, weight: 115 },
        { date: "2024-02-25", repetitions: 8, weight: 110 },
        { date: "2024-02-11", repetitions: 8, weight: 105 },
        { date: "2024-01-28", repetitions: 8, weight: 100 },
        { date: "2024-01-14", repetitions: 10, weight: 95 },
        { date: "2023-12-31", repetitions: 10, weight: 90 },
        { date: "2023-12-17", repetitions: 10, weight: 85 },
        { date: "2023-12-03", repetitions: 10, weight: 80 },
        { date: "2023-11-19", repetitions: 10, weight: 75 }
      ]
    }
  ],
  legsExercises: [
    {
      name: "PRZYSIADY", 
      icon: "fitness_center", 
      lastEdited: "10.03.2024", 
      maxWeight: 120,
      dailyData: [
        { date: "2024-03-25", repetitions: 10, weight: 120 },
        { date: "2024-03-11", repetitions: 10, weight: 115 },
        { date: "2024-02-25", repetitions: 10, weight: 110 },
        { date: "2024-02-11", repetitions: 10, weight: 105 },
        { date: "2024-01-28", repetitions: 10, weight: 100 },
        { date: "2024-01-14", repetitions: 12, weight: 95 },
        { date: "2023-12-31", repetitions: 12, weight: 90 },
        { date: "2023-12-17", repetitions: 12, weight: 85 },
        { date: "2023-12-03", repetitions: 12, weight: 80 },
        { date: "2023-11-19", repetitions: 12, weight: 75 }
      ]
    },
    {
      name: "WYCISKANIE NOGAMI NA SUWNICY", 
      icon: "accessibility_new", 
      lastEdited: "10.03.2024", 
      maxWeight: 120,
      dailyData: [
        { date: "2024-03-25", repetitions: 8, weight: 120 },
        { date: "2024-03-11", repetitions: 8, weight: 118 },
        { date: "2024-02-25", repetitions: 8, weight: 116 },
        { date: "2024-02-11", repetitions: 8, weight: 114 },
        { date: "2024-01-28", repetitions: 8, weight: 112 },
        { date: "2024-01-14", repetitions: 10, weight: 110 },
        { date: "2023-12-31", repetitions: 10, weight: 108 },
        { date: "2023-12-17", repetitions: 10, weight: 106 },
        { date: "2023-12-03", repetitions: 10, weight: 104 },
        { date: "2023-11-19", repetitions: 10, weight: 102 }
      ]
    }
  ]
};

@Injectable({ providedIn: 'root' })
export class TrainingService {
  
  exercises = EXERCISES_DATA;
  allExercises: ExerciseUiData[] = [
    ...this.exercises.pushExercises,
    ...this.exercises.pullExercises,
    ...this.exercises.legsExercises
  ];
  private currentIndex = signal(0);

  getCurrentExercise = () => this.allExercises[this.currentIndex()];

  setCurrentIndex = (index: number) => {
    if (index >= 0 && index < this.allExercises.length) {
      this.currentIndex.set(index);
    }
  };

  findExerciseByName(name: string): ExerciseUiData | undefined {
    return this.allExercises
    .find(exercise => exercise.name.toLowerCase() === name.toLowerCase());
  }
}