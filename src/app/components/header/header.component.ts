import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isConnected: boolean | undefined;
  logoCB!: string;

  ngOnInit(){
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      this.isConnected = true;
    }
    this.logoCB = 'assets/nouveau_logo_couleur.png';
  }

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('societeDetails');

    this.isConnected = false;
  }
}
