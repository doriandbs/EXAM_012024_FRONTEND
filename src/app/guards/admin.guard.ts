import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const userDetailsString = localStorage.getItem('userDetails');
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      const isAdmin = userDetails.authorities.some((auth: { authority: string; }) => auth.authority === 'ROLE_ADMIN');
      if (isAdmin) {
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
  
}
