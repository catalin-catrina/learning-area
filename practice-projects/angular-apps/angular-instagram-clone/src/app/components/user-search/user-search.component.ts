import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UserSearchService } from '../../services/user-search.service';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.scss',
})
export class UserSearchComponent implements OnInit {
  searchForm: FormGroup;

  private userSearchService = inject(UserSearchService);

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      query: [''],
    });
  }

  ngOnInit() {
    this.searchForm
      .get('query')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.userSearchService
          .searchUsers(value)
          .then((user) => console.log(user));
      });
  }

  onSearch() {
    // const searchQuery = this.searchForm.get('query')?.value;
  }
}
