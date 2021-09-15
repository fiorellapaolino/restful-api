import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Clients } from '../models/clients';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:5000/';
  }

  getClients() {
    return this.httpClient.get<Clients[]>(this.baseUrl + 'client');
  }

  getOneClient(id_client: number) {
    return this.httpClient.get<Clients>(this.baseUrl + 'client/' + id_client);
  }

  saveClients(client: Clients) {
    return this.httpClient.post<Clients[]>(this.baseUrl + 'newclient', client);
  }

  updateClients(id_stock: number, updated: Clients) {
    return this.httpClient.put<Clients[]>(this.baseUrl + 'client/edit/' + id_stock, updated);
  }
}
