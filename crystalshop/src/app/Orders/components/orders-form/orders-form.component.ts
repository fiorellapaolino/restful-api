import { Component, OnInit, Input } from '@angular/core';
import { Orders } from '../../models/orders';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Stock } from 'src/app/Stock/models/stock';
import { StockService } from 'src/app/Stock/services/stock.service';
import { ClientsService } from '../../../Clients/services/clients.services';
import { Clients } from '../../../Clients/models/clients';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.css'],
})
export class OrdersFormComponent implements OnInit {
  orders: Orders[] = [];
  items: Stock[] = [];
  clients: Clients[] = [];

  order: Orders = {
    name_crystal: '',
    name_client: '',
    quantity: 0,
    id_order: 0,
    id_stock: 0,
    id_client: 0,
    time: 0,
  };
  private baseUrl = 'http://localhost:5000/';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private Stockservice: StockService,
    private ClientsService: ClientsService
  ) {}

  ngOnInit(): void {
    this.Stockservice.getStock().subscribe((res: Stock[]) => {
      this.items = res;
      console.log(this.items);
    });
    this.ClientsService.getClients().subscribe((res: Clients[]) => {
      this.clients = res;
      console.log(this.clients);
    });
  }

  saveNewOrder(order: Orders) {
    this.httpClient.post<Orders[]>(this.baseUrl + 'neworder', order).subscribe(
      (newclient) => {
        console.log('savenewitem', newclient);
        this.orders = newclient;
        this.router.navigate(['orders']);
      },
      (err) => {
        if (err.status == 500) console.log(err);
      }
    );
  }
}
// hacer alert al ingresar un quantity not available
