import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const societeDetailsString = localStorage.getItem('societeDetails');
    if (societeDetailsString) {
      const societeDetails = JSON.parse(societeDetailsString);
      const isAdmin = societeDetails.authorities.some((auth: { authority: string; }) => auth.authority === 'ROLE_ADMIN');
      if (isAdmin) {
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
  
}
