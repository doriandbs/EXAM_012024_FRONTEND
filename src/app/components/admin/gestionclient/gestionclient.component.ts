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

  nouveauClient = { username: '', password: '', mail: '' };


  constructor(private adminService: AdminService) { }

  
  ngOnInit(): void {
    this.getClient();
  }

  getClient(){
    this.adminService.getClients().subscribe(data => {
      this.clients = data;
    });
  }

  ajouterClient() {
    this.adminService.ajouterClient(this.nouveauClient.username,this.nouveauClient.password, this.nouveauClient.mail).subscribe(data => {
      this.nouveauClient = { username: '', password: '',mail:'' };
      this.getClient();
    });
  }
}
