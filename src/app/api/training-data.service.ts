import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Exercise, Training, ExerciseDailyData } from '../training/training.model';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class TrainingDataService {

  private baseUrl = 'https://progress-counter-8443f-default-rtdb.europe-west1.firebasedatabase.app/database';
  http = inject(HttpClient);
  auth = inject(Auth);

  getTrainings(): Observable<Training[]> {
    return this.http.get<{ [key: string]: Exercise[] }>(`${this.baseUrl}.json`).pipe(
      map(response => {
        const trainings: Training[] = [];
        for (const category in response) {
          if (response.hasOwnProperty(category)) {
            trainings.push({ category, exercises: response[category] });
          }
        }
        return trainings;
      })
    );
  }

  addTraining(trainingName: string): Observable<void> {
    const newTraining = {
      [trainingName]: [
        {
          name: 'PRZYKŁADOWE ĆWICZENIE',
          dailyData: [
            { date: new Date().toISOString().split('T')[0], repetitions: 0, weight: 0 }
          ]
        }
      ]
    };
    return this.http.patch<void>(`${this.baseUrl}.json`, newTraining);
  }

  deleteTraining(trainingName: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${trainingName}.json`);
  }

  addExercise(trainingName: string, exerciseName: string): Observable<void> {
    const newExercise = {
      name: exerciseName,
      dailyData: [
        { 
          date: new Date().toISOString().split('T')[0], 
          repetitions: 0, 
          weight: 0 
        }
      ]
    };
    return this.http.get<Exercise[]>(`${this.baseUrl}/${trainingName}.json`).pipe(
      switchMap(existingExercises => {
        const updatedExercises = existingExercises ? [...existingExercises, newExercise] : [newExercise];
        const updatedTraining = { [trainingName]: updatedExercises };
        return this.http.patch<void>(`${this.baseUrl}.json`, updatedTraining);
      })
    );
  }

  deleteExercise(trainingName: string, exerciseName: string): Observable<void> {
    return this.http.get<Exercise[]>(`${this.baseUrl}/${trainingName}.json`).pipe(
      switchMap(existingExercises => {
        const updatedExercises = existingExercises.filter(exercise => exercise.name !== exerciseName);
        const updatedTraining = { [trainingName]: updatedExercises };
        return this.http.patch<void>(`${this.baseUrl}.json`, updatedTraining);
      })
    );
  }

  deleteExercisePosition(trainingName: string, exerciseName: string, date: string): Observable<void> {
    return this.http.get<Exercise[]>(`${this.baseUrl}/${trainingName}.json`).pipe(
      switchMap(existingExercises => {
        const updatedExercises = existingExercises.map(exercise => {
          if (exercise.name === exerciseName) {
            return {
              ...exercise,
              dailyData: exercise.dailyData.filter(data => data.date !== date)
            };
          }
          return exercise;
        });
        const updatedTraining = { [trainingName]: updatedExercises };
        return this.http.patch<void>(`${this.baseUrl}.json`, updatedTraining);
      })
    );
  }

  addExercisePosition(trainingName: string, exerciseName: string, newPosition: ExerciseDailyData): Observable<void> {
    return this.http.get<Exercise[]>(`${this.baseUrl}/${trainingName}.json`).pipe(
      switchMap(existingExercises => {
        const updatedExercises = existingExercises.map(exercise => {
          if (exercise.name === exerciseName) {
            return {
              ...exercise,
              dailyData: [...exercise.dailyData, newPosition]
            };
          }
          return exercise;
        });
        const updatedTraining = { [trainingName]: updatedExercises };
        return this.http.patch<void>(`${this.baseUrl}.json`, updatedTraining);
      })
    );
  }
}
