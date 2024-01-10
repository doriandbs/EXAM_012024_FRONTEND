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
    fichierPdf: null
  };

  constructor(private adminService: AdminService) { }

  
  ngOnInit(): void {
    this.adminService.getProduits().subscribe(data => {
      this.produits = data;
      console.log(this.produits)
    }, error => console.error(error));
  }

  ajouterProduit() {
    this.adminService.ajouterProduit(this.nouveauProduit).subscribe(data => {
      console.log(data)
    });
    this.nouveauProduit = { nom: '', fichierPdf: null };
  }
}


