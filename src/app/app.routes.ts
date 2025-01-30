import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { TicketComponent } from './pages/ticket/ticket.component';
import { TicketItemComponent } from './pages/ticket-item/ticket-item.component';
import { TicketCreateComponent } from './pages/ticket-create/ticket-create.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CustomerComponent } from './pages/customer/customer.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/main', pathMatch: 'full'
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'tickets',
        component: TicketComponent,
        canActivate: [authGuard],
        title: 'Beethoven - Tickets',
        data: { title: 'Tickets' },
    },
    {
        path: 'ticket/new', 
        component: TicketCreateComponent, 
        canActivate: [authGuard],
        title: 'Beethoven - New Ticket',
        data: { title: 'New' },
    },
    { 
        path: 'ticket/:id', 
        component: TicketItemComponent,
        canActivate: [authGuard],
        title: 'Beethoven - Ticket Item',
        data: { title: '' },
    },
    { 
        path: 'customers', 
        component: CustomerComponent,
        canActivate: [authGuard],
        title: 'Beethoven - Customers',
        data: { title: 'Customers' },
    },
    {
        path: 'settings', component: SettingsComponent, canActivate: [authGuard]
    },
    
    {
        path: 'main', component: MainComponent, canActivate: [authGuard]
    },
    {
        path: '**', redirectTo: '/main'
    }
];
