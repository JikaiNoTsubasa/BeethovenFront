import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { MainLayout } from './layout/main-layout/main-layout';
import { authGuard } from './services/guard.service';
import { UserList } from './pages/user/user-list/user-list';
import { Logout } from './pages/logout/logout';
import { UserDetail } from './pages/user/user-detail/user-detail';
import { GlobalParameterPage } from './pages/config/global-parameter/global-parameter';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: 'logout',
        component: Logout
    },
    { 
        path: '', 
        component: MainLayout, 
        canActivate: [authGuard], 
        children: [
            { path: 'main', component: Dashboard},
            { path: 'users', component: UserList},
            { path: 'users/:id', component: UserDetail},
            { path: 'global-parameters', component: GlobalParameterPage},
        ]
    },
    { path: '**', redirectTo: '' }
];
