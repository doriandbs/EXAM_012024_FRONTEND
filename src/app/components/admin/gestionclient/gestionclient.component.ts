import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import { Utilisateur } from '../../../models/Utilisateur';

@Component({
  selector: 'app-gestionclient',
  templateUrl: './gestionclient.component.html',
  styleUrl: './gestionclient.component.scss'
})
export class GestionclientComponent {
  clients: Utilisateur[] = [];
  displayedColumns: string[] = ['username', 'produits'];

  constructor(private adminService: AdminService) { }

  
  ngOnInit(): void {
    this.adminService.getClients().subscribe(data => {
      this.clients = data;
    }, error => console.error(error));
  }
}
