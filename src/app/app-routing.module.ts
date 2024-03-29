import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { ClientComponent } from './components/client/client.component';
import { AdminGuard } from './guards/admin.guard';
import { GestionclientComponent } from './components/admin/gestionclient/gestionclient.component';
import { GestionfdsComponent } from './components/admin/gestionfds/gestionfds.component';
import { GestionproduitComponent } from './components/admin/gestionproduit/gestionproduit.component';
import { InactiveComponent } from './components/admin/gestionfds/inactive/inactive.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'client', component: ClientComponent, canActivate: [AuthGuard] },
  { path: 'gestion-client', component: GestionclientComponent, canActivate:[AdminGuard]},
  { path: 'gestion-fds', component: GestionfdsComponent, canActivate:[AdminGuard] },
  { path: 'gestion-produits', component: GestionproduitComponent, canActivate:[AdminGuard] },
  { path: 'fds-inactive', component: InactiveComponent, canActivate:[AdminGuard] },


  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
