import { Component, inject } from '@angular/core';
import { LoginFormComponent } from "../../comps/login-form/login-form.component";
import { BeeService } from '../../services/BeeService';
import { ResponseLogin } from '../../models/database/dto/ResponseLogin';
import { log } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  beeService = inject(BeeService);

  error = '';
  loading: boolean = false;
  loginTitle = 'Beethoven';

  loginResponse: ResponseLogin | null = null;

  onSubmit(event: any){
    this.loading = true;
    this.beeService.loginUser(event.username, event.password).subscribe({
      next: (response) => {
        this.loginResponse = response;
      },
      error: (error) => {
        this.error = error.message;
      },
      complete: () => {
        this.loading = false;

        if (!this.loginResponse?.isLogged) {
          this.error = 'Invalid credentials';
        }
      }
    })
  }
}
