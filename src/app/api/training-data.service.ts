import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Training } from '../training/training.model';
import { Exercise } from '../training/training.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingDataService {

  private baseUrl = 'https://progress-counter-8443f-default-rtdb.europe-west1.firebasedatabase.app/database';
  http = inject(HttpClient);

  constructor() {}

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
}
