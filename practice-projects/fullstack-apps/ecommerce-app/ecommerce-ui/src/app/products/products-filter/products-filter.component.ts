import { Component, effect, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { NgStyle } from '@angular/common';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { Filters } from '../../utilities/filters.interface';
import {
  FILTER_OPTIONS,
  FilterOption,
} from '../../utilities/filters.constants';

@Component({
  standalone: true,
  selector: 'app-products-filter',
  imports: [ReactiveFormsModule, NgStyle],
  templateUrl: './products-filter.component.html',
  styleUrl: './products-filter.component.scss',
})
export class ProductsFilterComponent implements OnInit {
  FILTER_OPTIONS: readonly FilterOption[] = FILTER_OPTIONS;

  filtersForm = new FormGroup({
    minPrice: new FormControl('0'),
    maxPrice: new FormControl('3000'),
    category: new FormControl(''),
    sortBy: new FormControl(''),
    sortOrder: new FormControl('asc'),
  });

  private productsService = inject(ProductsService);

  categories = this.productsService.categoriesData;

  defaultCategoryEffect = effect(() => {
    const cats = this.categories();

    if (cats && cats.length) {
      this.filtersForm.get('sortBy')?.setValue(cats[0]);
    }
  });

  ngOnInit(): void {
    this.filtersForm.valueChanges
      .pipe(
        debounceTime(300),
        map(
          (filters) =>
            ({
              minPrice: filters.minPrice ? Number(filters.minPrice) : 0,
              maxPrice: filters.maxPrice ? Number(filters.maxPrice) : 1500,
              category: filters.category?.toLowerCase(),
              sortBy: filters.sortBy || '',
              sortOrder: filters.sortOrder || '',
            } as Filters)
        ),
        distinctUntilChanged()
      )
      .subscribe((filters: Filters) =>
        this.productsService.setFilters(filters)
      );
  }
}
