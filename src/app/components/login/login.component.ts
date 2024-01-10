import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../services/authentification/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthentificationService, private router: Router) { }

  ngOnInit(): void {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const userDetailsString = localStorage.getItem('userDetails');
      if (userDetailsString) {
        const userDetails = JSON.parse(userDetailsString);
        const isAdmin = userDetails.authorities.some((auth: { authority: string; }) => auth.authority === 'ROLE_ADMIN');
        
        if (isAdmin) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/client']);
        }
      } else {
        this.router.navigate(['/login']);
      }
    }
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      data => {
        localStorage.setItem('jwt', data.jwt);
        localStorage.setItem('userDetails', JSON.stringify(data.user));
        this.redirectUser();
      },
      error => {
        this.errorMessage = 'Échec de la connexion. Veuillez réessayer.';
      }
    );
  }
  
  redirectUser(): void {
    const userString = localStorage.getItem('userDetails');
    if(userString){
      const user = JSON.parse(userString);
      const isAdmin=user.authorities.some((auth: { authority: string; })=> auth.authority ==='ROLE_ADMIN');
      if (isAdmin) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/client']);
      }
    }
    
  }
  
  
  

}
