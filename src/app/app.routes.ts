import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { TicketComponent } from './pages/ticket/ticket.component';
import { TicketItemComponent } from './pages/ticket-item/ticket-item.component';
import { TicketCreateComponent } from './pages/ticket-create/ticket-create.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/main', pathMatch: 'full'
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'tickets', component: TicketComponent, canActivate: [authGuard]
    },
    {
        path: 'create-ticket', component: TicketCreateComponent, canActivate: [authGuard]
    },
    {
        path: 'main', component: MainComponent, canActivate: [authGuard]
    },
    {
        path: '**', redirectTo: '/main'
    }
];
