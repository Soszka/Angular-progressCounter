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
}

const EXERCISES_DATA =  {
  pushExercises: [
    { 
      name: "WYCISKANIE NA ŁAWCE PŁASKIEJ", 
      icon: "fitness_center", 
      lastEdited: "10.03.2024", 
      maxWeight: 120, 
      dailyData: [
        { date: "2024-03-25", repetitions: 6, "weight": 85 },
        { date: "2024-03-11", repetitions: 6, "weight": 80 },
        { date: "2024-02-25", repetitions: 6, "weight": 75 },
        { date: "2024-02-11", repetitions: 6, "weight": 70 },
        { date: "2024-01-28", repetitions: 6, "weight": 65 },
        { date: "2024-01-14", repetitions: 8, "weight": 60 },
        { date: "2023-12-31", repetitions: 8, "weight": 55 },
        { date: "2023-12-17", repetitions: 8, "weight": 52 },
        { date: "2023-12-03", repetitions: 8, "weight": 50 },
        { date: "2023-11-19", repetitions: 8, "weight": 48 }
      ]
    },
    { 
      name: "WYCISKANIE NA ŁAWCE SKOŚNEJ", 
      icon: "swap_vert", 
      lastEdited: "10.03.2024", 
      maxWeight: 90,
      dailyData: [
        { date: "2024-03-25", repetitions: 6, "weight": 85 },
        { date: "2024-03-11", repetitions: 6, "weight": 80 },
        { date: "2024-02-25", repetitions: 6, "weight": 75 },
        { date: "2024-02-11", repetitions: 6, "weight": 70 },
        { date: "2024-01-28", repetitions: 6, "weight": 65 },
        { date: "2024-01-14", repetitions: 8, "weight": 60 },
        { date: "2023-12-31", repetitions: 8, "weight": 55 },
        { date: "2023-12-17", repetitions: 8, "weight": 52 },
        { date: "2023-12-03", repetitions: 8, "weight": 50 },
        { date: "2023-11-19", repetitions: 8, "weight": 48 }
      ] 
    },
    { name: "ROZPIĘTKI", icon: "fitness_center", lastEdited: "10.03.2024", maxWeight: 12 },
    { name: "WYCISKANIE NA PORĘCZACH", icon: "accessibility_new", lastEdited: "10.03.2024", maxWeight: 70 },
    { name: "WYCISKANIE NA ŁAWCE WĄSKO", icon: "swap_vert", lastEdited: "10.03.2024", maxWeight: 100 }
  ],
  pullExercises: [
    { name: "PODCIĄGANIE", icon: "swap_vert", lastEdited: "10.03.2024", maxWeight: 20 },
    { name: "WIOSŁOWANIE SZTANGĄ", icon: "accessibility_new", lastEdited: "10.03.2024", maxWeight: 90 },
    { name: "TYŁ BARKÓW HANTLAMI", icon: "fitness_center", lastEdited: "10.03.2024", maxWeight: 10 },
    { name: "BICEPS SZTANGĄ", icon: "accessibility_new", lastEdited: "10.03.2024", maxWeight: 120 }
  ],
  legsExercises: [
    { name: "PRZYSIADY", icon: "fitness_center", lastEdited: "10.03.2024", maxWeight: 120 },
    { name: "WYCISKANIE NOGAMI NA SUWNICY", icon: "accessibility_new", lastEdited: "10.03.2024", maxWeight: 120 }
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