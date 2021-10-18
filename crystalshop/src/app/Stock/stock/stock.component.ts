import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stock } from '../models/stock';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent implements OnInit, OnDestroy {
  edit: boolean = false;
  alert: boolean = false;
  items: Stock[] = [];
  @Input() title: string = 'Stock';
  stockSuscription: any;

  private baseUrl = 'http://localhost:5000/';
  constructor(
    private httpClient: HttpClient,
    private StockService: StockService
  ) {}

  ngOnInit(): void {
    this.getStock();
  }

  ngOnDestroy(): void {
    this.stockSuscription.unsubscribe();
    console.log('on destroy on');
  }

  public getStock() {
    this.stockSuscription = this.StockService.getStock().subscribe(
      //onDestroy
      (res) => {
        this.items = res;
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
      this.StockService.deleteStock(id_stock).subscribe(
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
