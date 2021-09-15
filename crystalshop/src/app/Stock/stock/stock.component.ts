import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stock, StockResponse } from '../models/stock';
import { StockService } from '../services/stock.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent implements OnInit {
  @Input() title: string = 'Stock';

  @Input() items: Stock[] = [];

  private baseUrl = 'http://localhost:5000/';
  constructor(
    private httpClient: HttpClient,
    private StockService: StockService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}
  edit: boolean = false;
  alert: boolean = false;

  ngOnInit(): void {
    this.getStock();
  }

  public getStock() {
    // this.httpClient.get<StockResponse>(this.baseUrl + 'stock').subscribe(
      this.StockService.getStock().subscribe(  
    (res) => {
        this.items = res;
        console.log('this.items', this.items);
        console.log('response.stock', res);
      },
      (err) => {
        if (err.status == 400) {
          alert('Bad request');
        } else if (err.status == 500) {
          alert('Server 500');
        }
      }
    );
  }

  delete(id_stock: number) {
    var answer = confirm('Are you sure?');
    if (answer == true) {
      this.httpClient
        .delete<StockResponse>(this.baseUrl + 'stock/' + id_stock)
        .subscribe(
          (res) => {
            this.getStock();
            this.alert = true;
          },
          (err) => {
            if (err.status == 405) {
              alert("Item can't be deleted. The item has an order.");
            }
          }
        );
    }
  }
}
