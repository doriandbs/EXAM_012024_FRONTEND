import { Component } from '@angular/core';
import { Fds } from '../../../models/Fds';
import { AdminService } from '../../../services/admin/admin.service';
import { FdsProduit } from '../../../models/FdsProduit';
import { Produits } from '../../../models/Produit';

@Component({
  selector: 'app-gestionfds',
  templateUrl: './gestionfds.component.html',
  styleUrl: './gestionfds.component.scss'
})
export class GestionfdsComponent {

  produitDejaCree: boolean = false;
  nomFichier: string = '';
  produitSelectionne: string = '';
  fichierPDF: File | null = null;
  fds: FdsProduit[] = [];
  produits : Produits[] = [];
  displayedColumns: string[] = ['nomFiche', 'dateCreationFiche', 'dateMajFiche','nomProduit', 'telecharger','statut'];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getFds();
    this.getAllProduits();
  }


  getAllProduits(){
    this.adminService.getAllProduits().subscribe(data => {
      this.produits = data;
    }, error => console.error(error));
  }
  getFds(){
    this.adminService.getFds().subscribe(data => {
      this.fds = data;
    }, error => console.error(error));
  }


  telechargerPdf(titre: string, pdfContent: string): void {
    const byteCharacters = atob(pdfContent); 
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${titre}.pdf`;
    anchor.click();
    window.URL.revokeObjectURL(url);
}

  enregistrerStatutFiche(fiche: Fds): void {
   this.adminService.updateStatutFiche(fiche.id, fiche.statut).subscribe(
      response => {
        
        this.getFds();
      },
   );
  }


  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.fichierPDF = target.files ? target.files[0] : null;
  }

  onSubmit(): void {
    const formData = new FormData();
  
    if (!this.produitDejaCree) {
      if (this.nomFichier && this.fichierPDF) {
        formData.append('nomFichier', this.nomFichier);
        formData.append('fichier', this.fichierPDF);
        this.produitSelectionne==null;
        formData.append('produitId', this.produitSelectionne);
      } else {
        console.error('Nom fichier et fichier requis');
        return;
      }
    } else {
      if (this.nomFichier && this.produitSelectionne && this.fichierPDF) {
        formData.append('nomFichier', this.nomFichier);
        formData.append('produitId', this.produitSelectionne);
        formData.append('fichier', this.fichierPDF);
      } else {
        console.error('Tout les champs requis');
        return;
      }
    }
  
    this.adminService.envoyerFichierPDF(formData).subscribe(response => {
      this.nomFichier = '';
      this.produitSelectionne = '';
      this.fichierPDF = null;
      this.resetFileInput();
      this.getFds();
    });
  }
    
  resetFileInput(): void {
    let input = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (input) input.value = '';
  }

  

}