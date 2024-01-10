import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import { Societe } from '../../../models/Societe';

@Component({
  selector: 'app-gestionclient',
  templateUrl: './gestionclient.component.html',
  styleUrl: './gestionclient.component.scss'
})
export class GestionclientComponent {
  clients: Societe[] = [];
  displayedColumns: string[] = ['nomsociete', 'produits'];

  nouveauClient = { nomsociete: '', password: '', mail: '' };


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
    this.adminService.ajouterClient(this.nouveauClient.nomsociete,this.nouveauClient.password, this.nouveauClient.mail).subscribe(data => {
      this.nouveauClient = { nomsociete: '', password: '',mail:'' };
      this.getClient();
    });
  }
}
