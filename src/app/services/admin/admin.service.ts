import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../../models/Utilisateur';
import { Fds } from '../../models/Fds';
import { FdsProduit } from '../../models/FdsProduit';


const BASE_URL = ['http://localhost:8080/admin']

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
 
  getClients(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${BASE_URL}/users/clients`);
  }

  getFds(): Observable<FdsProduit[]> {
    return this.http.get<FdsProduit[]>(`${BASE_URL}/fds/`);
  }

  updateStatutFiche(ficheId: number, nouveauStatut: string): Observable<any> {
    return this.http.put(`${BASE_URL}/fds/${ficheId}/updatestatut`, {statut : nouveauStatut}) ;
  }
}
