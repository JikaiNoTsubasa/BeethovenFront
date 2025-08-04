import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginEnv } from '../../models/dto/LoginEnv';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  authService = inject(AuthService);

  envs: LoginEnv[] = [
    {name: 'LOCAL', url: 'http://localhost:5088'},
    {name: 'TEST', url: 'http://localhost:4200'},
    {name: 'PROD', url: 'http://localhost:4200'}
  ]

  protected loginForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    env: new FormControl(this.envs[0].url, [Validators.required])
  });

  onSubmit() {
    if (this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
    }else{
      let currentEnvUrl: string = this.loginForm.value.env ?? this.envs[0].url;
      let login: string = this.loginForm.value.login ?? '';
      let password: string = this.loginForm.value.password ?? '';
      // Setup env
      sessionStorage.setItem('env', currentEnvUrl);
      // Login
      this.authService.login(login, password);
    }
  }
}
