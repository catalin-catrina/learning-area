import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthApiService } from '../../../../domains/auth/data-access/auth-api.service';
import { tap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  private formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthApiService);

  ngOnInit(): void {
    this.initializeform();
  }

  onSubmit(): void {
    this.authService
      .login(this.loginForm.value)
      .pipe(tap((x) => console.log(x)))
      .subscribe();
  }

  private initializeform(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
}
