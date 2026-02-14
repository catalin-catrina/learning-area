import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthFacade } from './services/auth-facade';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  loginForm!: FormGroup;

  private formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthFacade);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.initializeform();
  }

  onSubmit(): void {
    this.authService
      .login(this.loginForm.value)
      .pipe(
        tap(() => {
          this.router.navigate(['/home']);
        }),
      )
      .subscribe();
  }

  private initializeform(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
}
