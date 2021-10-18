import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Orders } from '../models/orders';

@Injectable({
    providedIn: 'root',
  })

  export class OrdersService {
    orders: Orders[] = [];
    baseUrl: string;

    constructor(
        private httpClient: HttpClient,
        ) {this.baseUrl = 'http://localhost:5000/';}   

  getOrders() {
    return this.httpClient.get<Orders[]>(this.baseUrl + 'ordersjoin');
  }

  deleteOrders(id_order: number) {
    return this.httpClient.delete<Orders[]>(this.baseUrl + 'ordersjoin/' + id_order)
  }
}