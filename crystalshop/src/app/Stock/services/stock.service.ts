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

  getmap() {
    return this.httpClient.get<Stock[]>(this.baseUrl + '/stock');
  }

  getChartsStock() {
    let urlAPI = this.baseUrl + '/stock';
    return this.httpClient.get<Stock[]>(urlAPI).pipe(map((res) => res));
  }

  getOneItem(id_stock: number) {
    return this.httpClient.get<Stock>(this.baseUrl + 'stock/' + id_stock);
  }

  updateStock(id_stock: number, updated: Stock) {
    return this.httpClient.put<Stock>(
      this.baseUrl + 'stock/edit/' + id_stock, updated
    );
  }
}
