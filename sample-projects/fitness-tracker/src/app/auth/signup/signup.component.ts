import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AuthService } from '../../services/auth.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatCheckboxModule,
    SpinnerComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  currentYear = new Date().getFullYear();
  maxDate = new Date(this.currentYear - 18, 0, 1);

  authService = inject(AuthService);
  stateService = inject(StateService);

  isLoading = this.stateService.loginLoadingSignal;

  onSubmit(form: NgForm) {
    const user = {
      email: form.value.email,
      password: form.value.password,
    };

    this.authService.register(user);
  }
}
