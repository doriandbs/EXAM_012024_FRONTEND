import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../../models/Utilisateur';
import { Fds } from '../../models/Fds';
import { FdsProduit } from '../../models/FdsProduit';
import { Produits } from '../../models/Produit';


const BASE_URL = ['http://localhost:8080']

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
 
  getClients(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${BASE_URL}/admin/users/clients`);
  }

  getFds(): Observable<FdsProduit[]> {
    return this.http.get<FdsProduit[]>(`${BASE_URL}/admin/fds/`);
  }

  updateStatutFiche(ficheId: number, nouveauStatut: string): Observable<any> {
    return this.http.put(`${BASE_URL}/fds/${ficheId}/admin/updatestatut`, {statut : nouveauStatut}) ;
  }

  getProduits():Observable<Produits[]>{
    return this.http.get<Produits[]>(`${BASE_URL}/produits/`);
  }

  ajouterProduit(nouveauProduit : any):Observable<Produits>{
    return this.http.post<Produits>(`${BASE_URL}/produits/add`, {newProduit : nouveauProduit});
  }

  ajouterClient(username : string, password: string, mail: string):Observable<any>{
    return this.http.post<any>(`${BASE_URL}/admin/users/addClient`,{ username, password, mail });

  }
}
