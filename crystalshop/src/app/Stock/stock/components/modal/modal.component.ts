import { Component, OnInit } from '@angular/core';
import { StockComponent } from 'src/app/Stock/stock/stock.component';
import { StockService } from 'src/app/Stock/services/stock.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Stock, StockResponse } from '../../../models/stock';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  providers: [StockService],
})
export class ModalComponent implements OnInit {
  item: Stock = {
    id_stock: 0,
    name_crystal: '',
    quantity: 0,
  };

  private baseUrl = 'http://localhost:5000/';

  constructor(
    private StockService: StockService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params.id_stock) {
      this.StockService.getOneItem(params.id_stock).subscribe(
        (res) => {
          this.item = res;
          this.item.id_stock = res.id_stock;
          this.edit = true;
          console.log('item', this.item); // la actualización
          console.log('funcion this.item = res', res); //el que hay que editar
        },
        (err) => console.log(err)
      );
    }
  }
  edit: boolean = false;

  saveNewItem(item: Stock) {
    this.httpClient.post(this.baseUrl + 'newstock', item).subscribe(
      (newitem) => {
        console.log('savenewitem', newitem);
        this.router.navigate(['/stock']);
      },
      (err) => {
        if (err.status == 500) console.log(err);
      }
    );
  }

  enviarDatos(): any {
    console.log(this.item.id_stock);
  }

  updateStock() {
    this.StockService.updateStock(this.item.id_stock, this.item).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/stock']);
      },
      (err) => console.error(err)
    );
  }
}
