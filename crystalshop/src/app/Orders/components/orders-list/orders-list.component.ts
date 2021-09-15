import { Component, OnInit, Input } from '@angular/core';
import { Orders } from '../../models/orders';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { StockService } from 'src/app/Stock/services/stock.service';
import { StockComponent } from '../../../Stock/stock/stock.component'
import { Stock } from 'src/app/Stock/models/stock';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit {
  @Input() title: string = 'Orders';
  orders: Orders[] = [];
  @Input() items: Stock[] = [];

  private baseUrl = 'http://localhost:5000/';

  constructor(
    private httpClient: HttpClient,
    private StockService: StockService
  ) {}

  ngOnInit(): void {
    this.getOrders();
    this.StockService.getStock().subscribe((res: Stock[]) => {
      this.items = res;
      console.log(this.items);
    });
  }

  getOrders() {
    this.httpClient.get<Orders[]>(this.baseUrl + 'orders').subscribe(
      (res) => {
        this.orders = res;
        console.log('this.items', this.orders);
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
}