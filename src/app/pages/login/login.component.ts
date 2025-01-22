import { Component } from '@angular/core';
import { LoginFormComponent } from "../../comps/login-form/login-form.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  error = '';
  loginTitle = 'Beethoven';

  onSubmit(){
    
  }
}
