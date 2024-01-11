import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Societe } from '../../models/Societe';
import { Fds } from '../../models/Fds';
import { FdsProduit } from '../../models/FdsProduit';
import { Produits } from '../../models/Produit';


const BASE_URL = ['http://localhost:8080']

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
 
  getClients(): Observable<Societe[]> {
    return this.http.get<Societe[]>(`${BASE_URL}/admin/societes/clients`);
  }

  getFds(): Observable<FdsProduit[]> {
    return this.http.get<FdsProduit[]>(`${BASE_URL}/admin/fds/`);
  }

  updateStatutFiche(ficheId: number, nouveauStatut: string): Observable<any> {
    return this.http.put(`${BASE_URL}/admin/fds/${ficheId}/updatestatut`, {statut : nouveauStatut}) ;
  }

  getProduits():Observable<Produits[]>{
    return this.http.get<Produits[]>(`${BASE_URL}/produits/fds`);
  }


  getAllProduits():Observable<Produits[]>{
    return this.http.get<Produits[]>(`${BASE_URL}/produits/`);
  }

  ajouterProduit(nouveauProduit: string): Observable<Produits> {
    const produitData = { nom: nouveauProduit };
    return this.http.post<Produits>(`${BASE_URL}/produits/add`, produitData);
  }
  

  ajouterClient(nomsociete : string, password: string, mail: string):Observable<any>{
    return this.http.post<any>(`${BASE_URL}/admin/societes/addClient`,{ nomsociete, password, mail });
  }

  envoyerFichierPDF(formData: FormData): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/admin/fds/upload`, formData);
  }
}
