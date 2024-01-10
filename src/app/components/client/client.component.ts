import { Component } from '@angular/core';
import { ClientService } from '../../services/client/client.service';
import { Produits } from '../../models/Produit';
import { MatTableDataSource } from '@angular/material/table';
import { Fds } from '../../models/Fds';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {

  produits = new MatTableDataSource<Produits>(); 
  rechercheControl = new FormControl();

  displayedColumns: string[] = ['nomProduit', 'fds', 'date','statut'];


  constructor(private clientService: ClientService) { }

  ngOnInit(){
    this.getMyProducts();
    this.recherche();
  }
  getMyProducts(): void {
    this.clientService.getProduits().subscribe(
      data => {
        this.produits.data=data;
      }
    );

  }

  telechargerPdf(fiche: Fds): void {
    const byteCharacters = atob(fiche.pdfContent); 
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${fiche.nom}.pdf`;
    anchor.click();
    window.URL.revokeObjectURL(url);
}

recherche(): void {
  this.rechercheControl.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged()
  ).subscribe(value => {
    this.produits.filter = value.trim().toLowerCase();
  });
}
}
