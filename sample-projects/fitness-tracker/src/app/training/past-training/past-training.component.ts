import { DatePipe, DecimalPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-past-training',
  standalone: true,
  imports: [
    MatTableModule,
    DatePipe,
    DecimalPipe,
    MatSortModule,
    MatInputModule,
    FormsModule,
    MatPaginatorModule,
  ],
  templateUrl: './past-training.component.html',
  styleUrl: './past-training.component.css',
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  filter: string = '';
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  trainingService = inject(TrainingService);
  completedExercises = this.trainingService.completedExercisesSignal;
  cancelledExercises = this.trainingService.cancelledExercisesSignal;
  allExercises = computed(() => [
    ...this.completedExercises(),
    ...this.cancelledExercises(),
  ]);

  dataSource: any;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.allExercises());
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onFilter(filter: string) {
    filter = filter.trim().toLowerCase();
    this.dataSource.filter = filter;
  }
}
