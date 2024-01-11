import { Component } from '@angular/core';
import { Produits } from '../../../models/Produit';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-gestionproduit',
  templateUrl: './gestionproduit.component.html',
  styleUrl: './gestionproduit.component.scss'
})
export class GestionproduitComponent {
  produits: Produits[] = [];
  displayedColumns: string[] = ['produits', 'fiches'];


  nouveauProduit = {
    nom: '',
  };

  constructor(private adminService: AdminService) { }

  
  ngOnInit(): void {
    this.getProduits();
  }


  getProduits(){
    this.adminService.getProduits().subscribe(data => {
      this.produits = data;
    });
  }
  

  ajouterProduit() {
    this.adminService.ajouterProduit(this.nouveauProduit.nom).subscribe(data => {
      this.getProduits();
    });
    this.nouveauProduit = { nom: ''};
  }
}


