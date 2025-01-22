import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/main', pathMatch: 'full'
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'main', component: MainComponent, canActivate: [authGuard]
    },
    {
        path: '**', redirectTo: '/main'
    }
];
