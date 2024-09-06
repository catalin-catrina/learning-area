import { DatePipe, DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TrainingService } from '../../services/training.service';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

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
  ],
  templateUrl: './past-training.component.html',
  styleUrl: './past-training.component.css',
})
export class PastTrainingComponent implements AfterViewInit {
  filter: string = '';
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];

  @ViewChild(MatSort) sort!: MatSort;

  trainingService = inject(TrainingService);
  data = this.trainingService.getExercises();

  dataSource = new MatTableDataSource(this.data);

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onFilter(filter: string) {
    filter = filter.trim().toLowerCase();
    this.dataSource.filter = filter;
  }
}
