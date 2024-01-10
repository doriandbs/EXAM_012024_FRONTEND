import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = ['http://localhost:8080']

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {


  constructor(private http: HttpClient) { }

  login(nomsociete: string, password: string): Observable<any> {
    const response = this.http.post(BASE_URL + "/login", { nomsociete, password });
    return response;
  }
}
