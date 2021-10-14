import { Component, OnInit } from '@angular/core';
import { Orders } from '../../models/orders';
import { StockService } from 'src/app/Stock/services/stock.service';
import { Stock } from 'src/app/Stock/models/stock';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit {
  title: string = 'Orders';
  orders: Orders[] = [];
  items: Stock[] = [];

  constructor(
    private StockService: StockService,
    private OrdersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.getOrders();
    this.StockService.getStock().subscribe((res: Stock[]) => {
      this.items = res;
      console.log(this.items);
    });
  }

  getOrders() {
    this.OrdersService.getOrders().subscribe(
      (res) => {
        this.orders = res;
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

  deleteOrders(id_order: number) {
    var answer = confirm('Are you sure?');
    if (answer == true) {
      this.OrdersService.deleteOrders(id_order).subscribe((res) => {
        this.getOrders();
      });
    }
  }
}