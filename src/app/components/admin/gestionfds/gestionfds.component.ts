import { Component } from '@angular/core';
import { Fds } from '../../../models/Fds';
import { AdminService } from '../../../services/admin/admin.service';
import { FdsProduit } from '../../../models/FdsProduit';

@Component({
  selector: 'app-gestionfds',
  templateUrl: './gestionfds.component.html',
  styleUrl: './gestionfds.component.scss'
})
export class GestionfdsComponent {
  fds: FdsProduit[] = [];
  displayedColumns: string[] = ['nomFiche', 'dateCreationFiche', 'dateMajFiche','nomProduit', 'telecharger','statut'];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getFds();
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
this.getFds()
    },
  );
}

}
