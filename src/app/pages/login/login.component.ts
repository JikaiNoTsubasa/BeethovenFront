import { Component, inject } from '@angular/core';
import { LoginFormComponent } from "../../comps/login-form/login-form.component";
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { FadeIn } from '../../animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [FadeIn(1000, false)]
})
export class LoginComponent {
  router = inject(Router);
  authService = inject(AuthService);

  error = '';
  loading: boolean = false;
  loginTitle = 'Beethoven';

  onSubmit(event: any){
    this.loading = true;
    this.authService.login(event.username, event.password).subscribe({complete: () => {
      this.loading = false;
      if (this.authService.isLoggedIn()){
        this.router.navigate(['/main']);
      }else{
        this.error = 'Invalid username or password';
      }
    }});
  }
}
