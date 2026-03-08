import {
  AfterViewInit,
  Component,
  DestroyRef,
  ViewChild,
  effect,
  inject,
  input,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../shared/button/button.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NavigationComponent } from '../../../shared/navigation/navigation.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../../shared/title/title.component';
import { MatButtonModule } from '@angular/material/button';
import { TrainingService } from '../../training.service';
import { Exercise, ExerciseDailyData } from '../../training.model';
import { AddExercisePositionDialogComponent } from '../../training-dialogs/add-exercise-position-dialog/add-exercise-position-dialog.component';
import { RemovingConfirmDialogComponent } from '../../training-dialogs/removing-confirm-dialog/removing-confirm-dialog.component';
import { TrainingsStore } from '../../../store/trainings.store';
import { ExercisePositionDetailsDialogComponent } from '../../training-dialogs/exercise-position-details-dialog/exercise-position-details-dialog.component';
import { DialogService } from '../../../shared/services/dialog.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { provideNativeDateAdapter } from '@angular/material/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';

interface ExerciseSummary {
  totalEntries: number;
  maxWeight: number;
  avgWeight: number;
  avgRepetitions: number;
  totalVolume: number;
  lastEntryDate: string;
}

type QuickAddForm = FormGroup<{
  date: FormControl<Date | null>;
  weight: FormControl<number | null>;
  repetitions: FormControl<number | null>;
}>;

@Component({
  selector: 'app-training-exercise',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatIconModule,
    ButtonComponent,
    MatTableModule,
    MatPaginatorModule,
    NavigationComponent,
    FooterComponent,
    CommonModule,
    MatButtonModule,
    TitleComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSortModule,
  ],
  templateUrl: './training-exercise.component.html',
  styleUrl: './training-exercise.component.scss',
})
export class TrainingExerciseComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'date',
    'repetitions',
    'weight',
    'volume',
    'record',
    'actions',
  ];
  dataSource = new MatTableDataSource<ExerciseDailyData>([]);
  navBackground = input('rgb(18, 40, 110)');
  footerBackground = input('rgb(18, 40, 110)');
  expandedLinkColor = input('rgb(18, 40, 110)');
  expandedActiveLinkColor = input('white');
  expandedActiveLinkBg = input('rgb(18, 40, 110)');
  subtitle = input('Uzupelniaj trening szybciej i trzymaj porzadek w danych.');
  title = input('TRENING - EDYCJA');
  titleColor = input('rgb(18, 40, 110)');
  exerciseName = 'Nieznane cwiczenie';
  currentTrainingName = 'Nieznany trening';
  exerciseData: Exercise = { name: 'Nieznane cwiczenie', dailyData: [] };
  summary: ExerciseSummary = this.getEmptySummary();
  feedbackMessage = '';
  feedbackTone: 'success' | 'error' | '' = '';

  quickAddForm: QuickAddForm = new FormGroup({
    date: new FormControl<Date | null>(new Date(), {
      validators: [Validators.required],
    }),
    weight: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0), Validators.max(1000)],
    }),
    repetitions: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(1), Validators.max(100)],
    }),
  });
  filterControl = new FormControl('', { nonNullable: true });

  store = inject(TrainingsStore);
  trainingService = inject(TrainingService);
  dialogService = inject(DialogService);
  destroyRef = inject(DestroyRef);

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor() {
    this.configureFiltering();

    effect(() => {
      const exercises = this.trainingService.allExercises();
      if (
        exercises.length &&
        this.trainingService.currentIndex() >= exercises.length
      ) {
        this.trainingService.setCurrentIndex(exercises.length - 1);
        return;
      }
      this.loadExerciseData();
    });

    this.filterControl.valueChanges
      .pipe(startWith(this.filterControl.value), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.applyFilter(value);
      });
  }

  ngOnInit(): void {
    this.store.loadTrainings();
  }

  ngAfterViewInit(): void {
    this.attachTableFeatures();
  }

  loadExerciseData(): void {
    const exercise = this.trainingService.getCurrentExercise();
    this.exerciseName = exercise ? exercise.name : 'Nieznane cwiczenie';
    this.currentTrainingName = exercise
      ? this.trainingService.getCurrentTrainingName()
      : 'Nieznany trening';
    this.exerciseData = exercise
      ? {
          ...exercise,
          dailyData: [...exercise.dailyData],
        }
      : this.getDefaultExerciseData();

    this.exerciseData.dailyData.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

    this.summary = this.calculateSummary(this.exerciseData.dailyData);
    this.dataSource.data = this.exerciseData.dailyData;
    this.attachTableFeatures();
    this.applyFilter(this.filterControl.value);
  }

  getDefaultExerciseData(): Exercise {
    return {
      name: 'Nieznane cwiczenie',
      dailyData: [],
    };
  }

  nextExercise(): void {
    this.navigateExercise(1);
  }

  previousExercise(): void {
    this.navigateExercise(-1);
  }

  private navigateExercise(offset: number): void {
    this.trainingService.setCurrentIndex(
      this.trainingService.currentIndex() + offset
    );
    this.loadExerciseData();
  }

  onAddExercisePosition(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialogService
      .openDialog(
        AddExercisePositionDialogComponent,
        {},
        '1000px',
        'auto',
        enterAnimationDuration,
        exitAnimationDuration
      )
      .afterClosed()
      .subscribe(() => {
        this.loadExerciseData();
      });
  }

  onQuickAdd(): void {
    if (this.quickAddForm.invalid || !this.exerciseData.name) {
      this.quickAddForm.markAllAsTouched();
      this.setFeedback('Uzupelnij poprawnie wszystkie pola.', 'error');
      return;
    }

    const { date, weight, repetitions } = this.quickAddForm.getRawValue();
    const normalizedDate = this.normalizeDate(date);

    if (!normalizedDate || !this.isValidDate(normalizedDate)) {
      this.setFeedback(
        'Data jest niepoprawna. Wybierz dzien od 2020-01-01 do dzisiaj.',
        'error'
      );
      return;
    }

    if (
      this.exerciseData.dailyData.some((entry) => entry.date === normalizedDate)
    ) {
      this.setFeedback(
        'Pozycja z ta data juz istnieje. Wybierz inna date.',
        'error'
      );
      return;
    }

    if (weight === null || repetitions === null) {
      this.setFeedback('Podaj ciezar i liczbe powtorzen.', 'error');
      return;
    }

    const currentTrainingName = this.trainingService.getCurrentTrainingName();
    const currentExerciseName = this.trainingService.getCurrentExercise()?.name;

    if (!currentExerciseName) {
      this.setFeedback('Nie znaleziono aktualnego cwiczenia.', 'error');
      return;
    }

    const newPosition: ExerciseDailyData = {
      date: normalizedDate,
      weight,
      repetitions,
    };

    this.store
      .addExercisePosition(currentTrainingName, currentExerciseName, newPosition)
      .subscribe({
        next: () => {
          this.quickAddForm.patchValue({
            date: new Date(),
            weight: null,
            repetitions: null,
          });
          this.quickAddForm.markAsPristine();
          this.quickAddForm.markAsUntouched();
          this.setFeedback('Nowa pozycja zostala dodana do historii.', 'success');
        },
        error: () => {
          this.setFeedback('Nie udalo sie dodac pozycji. Sprobuj ponownie.', 'error');
        },
      });
  }

  prefillWithLastEntry(): void {
    const latest = this.exerciseData.dailyData[0];
    if (!latest) {
      return;
    }

    this.quickAddForm.patchValue({
      date: new Date(),
      weight: latest.weight,
      repetitions: latest.repetitions,
    });

    this.setFeedback(
      'Wstawiono ostatnio uzyte wartosci. Zmien tylko to, co chcesz.',
      'success'
    );
  }

  onRemoveExercise(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const messages = {
      confirmMessage:
        'Czy na pewno chcesz usunac wybrane cwiczenie z twojego planu treningowego? Gdy to zrobisz, cala historia zwiazana z tym cwiczeniem zostanie trwale usunieta.',
      successMessage:
        'Pomyslnie usunieto wybrane cwiczenie z twojego planu treningowego.',
    };

    const data = {
      type: 'exercise',
      trainingName: this.trainingService.getCurrentTrainingName(),
      exerciseName: this.exerciseName,
      messages,
    };

    this.dialogService
      .openDialog(
        RemovingConfirmDialogComponent,
        data,
        '600px',
        'auto',
        enterAnimationDuration,
        exitAnimationDuration
      )
      .afterClosed()
      .subscribe(() => {
        this.loadExerciseData();
      });
  }

  onRemovePosition(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    date: string
  ): void {
    const messages = {
      confirmMessage: 'Czy na pewno chcesz usunac wybrana pozycje?',
      successMessage:
        'Pomyslnie usunieto wybrana pozycje z historii twojego cwiczenia',
    };

    const data = {
      type: 'position',
      trainingName: this.trainingService.getCurrentTrainingName(),
      exerciseName: this.exerciseName,
      date,
      messages,
    };

    this.dialogService
      .openDialog(
        RemovingConfirmDialogComponent,
        data,
        '600px',
        'auto',
        enterAnimationDuration,
        exitAnimationDuration
      )
      .afterClosed()
      .subscribe(() => {
        this.loadExerciseData();
      });
  }

  onShowDetails(
    date: string,
    repetitions: number,
    weight: number,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialogService
      .openDialog(
        ExercisePositionDetailsDialogComponent,
        {
          name: this.exerciseName,
          date,
          repetitions,
          weight,
        },
        '100vw',
        '100vh',
        enterAnimationDuration,
        exitAnimationDuration
      )
      .afterClosed()
      .subscribe(() => {
        this.loadExerciseData();
      });
  }

  getVolume(entry: ExerciseDailyData): number {
    return entry.weight * entry.repetitions;
  }

  isPersonalBest(entry: ExerciseDailyData): boolean {
    return this.summary.maxWeight > 0 && entry.weight === this.summary.maxWeight;
  }

  hasExercises(): boolean {
    return this.trainingService.allExercises().length > 0;
  }

  clearFilter(): void {
    this.filterControl.setValue('');
  }

  private configureFiltering(): void {
    this.dataSource.filterPredicate = (data, filter) => {
      const phrase = filter.trim().toLowerCase();
      const indexable = `${data.date} ${data.repetitions} ${data.weight} ${this.getVolume(
        data
      )}`;
      return indexable.toLowerCase().includes(phrase);
    };
  }

  private applyFilter(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  private attachTableFeatures(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sortingDataAccessor = (
        item: ExerciseDailyData,
        property: string
      ) => {
        if (property === 'date') {
          return new Date(item.date).getTime();
        }
        if (property === 'volume') {
          return this.getVolume(item);
        }
        if (property === 'record') {
          return item.weight;
        }

        const key = property as keyof ExerciseDailyData;
        return item[key] ?? 0;
      };
      this.dataSource.sort = this.sort;
    }
  }

  private calculateSummary(data: ExerciseDailyData[]): ExerciseSummary {
    if (!data.length) {
      return this.getEmptySummary();
    }

    const totalVolume = data.reduce((sum, entry) => sum + this.getVolume(entry), 0);
    const totalWeight = data.reduce((sum, entry) => sum + entry.weight, 0);
    const totalRepetitions = data.reduce((sum, entry) => sum + entry.repetitions, 0);

    return {
      totalEntries: data.length,
      maxWeight: Math.max(...data.map((entry) => entry.weight)),
      avgWeight: Number((totalWeight / data.length).toFixed(1)),
      avgRepetitions: Number((totalRepetitions / data.length).toFixed(1)),
      totalVolume,
      lastEntryDate: data[0]?.date ?? '-',
    };
  }

  private getEmptySummary(): ExerciseSummary {
    return {
      totalEntries: 0,
      maxWeight: 0,
      avgWeight: 0,
      avgRepetitions: 0,
      totalVolume: 0,
      lastEntryDate: '-',
    };
  }

  private setFeedback(message: string, tone: 'success' | 'error'): void {
    this.feedbackMessage = message;
    this.feedbackTone = tone;
  }

  private normalizeDate(value: Date | string | null): string | null {
    if (!value) {
      return null;
    }

    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return null;
    }

    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private isValidDate(dateString: string): boolean {
    const date = new Date(`${dateString}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date.getFullYear() >= 2020 && date <= today;
  }
}
