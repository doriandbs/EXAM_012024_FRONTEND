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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'client', component: ClientComponent, canActivate: [AuthGuard] },
  { path: 'gestion-client', component: GestionclientComponent },
  { path: 'gestion-fds', component: GestionfdsComponent },
  { path: 'gestion-produits', component: GestionproduitComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
