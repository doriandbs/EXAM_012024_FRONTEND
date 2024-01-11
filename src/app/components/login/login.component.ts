import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../services/authentification/authentification.service';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  nomsociete: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthentificationService, private router: Router) { }

  ngOnInit(): void {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const societeDetailsString = localStorage.getItem('societeDetails');
      if (societeDetailsString) {
        const societeDetails = JSON.parse(societeDetailsString);
        const isAdmin = societeDetails.authorities.some((auth: { authority: string; }) => auth.authority === 'ROLE_ADMIN');

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
    this.authService.login(this.nomsociete, this.password).subscribe(
      data => {
        localStorage.setItem('jwt', data.jwt);
        localStorage.setItem('societeDetails', JSON.stringify(data.societe));
        this.redirectSociete();
      },
      error => {
        this.errorMessage = 'Échec de la connexion. Veuillez réessayer.';
      }
    );
  }

  redirectSociete(): void {
    const societeString = localStorage.getItem('societeDetails');
    if(societeString){
      const societe = JSON.parse(societeString);
      const isAdmin=societe.authorities.some((auth: { authority: string; })=> auth.authority ==='ROLE_ADMIN');
      if (isAdmin) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/client']);
      }
    }

  }




}
