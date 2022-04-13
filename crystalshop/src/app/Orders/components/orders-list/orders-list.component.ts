import { Component, OnInit } from '@angular/core';
import { Orders } from '../../models/orders';
import { Stock } from 'src/app/Stock/models/stock';
import { OrdersService } from '../../services/orders.service';
import { Clients } from 'src/app/Clients/models/clients';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit {
  title: string = 'Orders';
  orders: Orders[] = [];
  items: Stock[] = [];
  clients: Clients[] = [];

  constructor(
    private OrdersService: OrdersService,
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.OrdersService.getOrders().subscribe(
      (res) => {
        this.orders = res;
        console.log(res, "res clients")
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