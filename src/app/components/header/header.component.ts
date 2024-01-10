import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isConnected: boolean | undefined;


  ngOnInit(){
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      this.isConnected = true;
    }
  }

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userDetails');

    this.isConnected = false;
  }
}
