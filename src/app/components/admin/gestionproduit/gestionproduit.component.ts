import { Component } from '@angular/core';
import { Produits } from '../../../models/Produit';
import { AdminService } from '../../../services/admin/admin.service';
import { Fds } from '../../../models/Fds';

@Component({
  selector: 'app-gestionproduit',
  templateUrl: './gestionproduit.component.html',
  styleUrl: './gestionproduit.component.scss'
})
export class GestionproduitComponent {
  ficheDejaCree: boolean = false;
  ficheSelectionne: string = '';
  fichierPDF: File | null = null;


  produits: Produits[] = [];
  fds: Fds[] = [];
  displayedColumns: string[] = ['produits', 'fiches'];


  nouveauProduit = {
    nom: '',
  };

  constructor(private adminService: AdminService) { }

  
  ngOnInit(): void {
    this.getProduits();
    this.getFdsSansProduit();
  }


  getProduits(){
    this.adminService.getProduits().subscribe(data => {
      this.produits = data;
    });
  }

  getFdsSansProduit(){
    this.adminService.getFdsSansProduits().subscribe(data => {
      this.fds = data;
    });
  }


  

  ajouterProduit() {
    const formData = new FormData();
    formData.append('nom', this.nouveauProduit.nom);
  
    if (this.ficheDejaCree) {
      formData.append('ficheId', this.ficheSelectionne);
    } else if (this.fichierPDF) {
      formData.append('fichier', this.fichierPDF, this.fichierPDF.name);
    }
  
    this.adminService.ajouterProduit(formData).subscribe(data => {
      this.getProduits();
      this.nouveauProduit = { nom: '' };
      this.ficheDejaCree = false;
      this.fichierPDF = null;
    });
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.fichierPDF = target.files ? target.files[0] : null;
  }

}


