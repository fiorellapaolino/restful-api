import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stock } from '../models/stock';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:5000/';
  }
  items: Stock[] = [];

  ngOnInit(): void {}

  getStock() {
    return this.httpClient.get<Stock[]>(this.baseUrl + '/stock');
  }

  getOneItem(id_stock: number) {
    return this.httpClient.get<Stock>(this.baseUrl + 'stock/' + id_stock);
  }

  updateStock(id_stock: number, updated: Stock) {
    return this.httpClient.put<Stock>(
      this.baseUrl + 'stock/edit/' + id_stock, updated
    );
  }

  deleteStock(id_stock: number) {
    return this.httpClient.delete<Stock[]>(this.baseUrl + 'stock/' + id_stock)
  }
}
