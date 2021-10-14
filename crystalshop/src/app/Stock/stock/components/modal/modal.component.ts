import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/Stock/services/stock.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Stock } from '../../../models/stock';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  providers: [StockService],
})
export class ModalComponent implements OnInit {
  edit: boolean = false;

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
        },
        (err) => console.log(err)
      );
    }
  }

  saveNewItem(item: Stock) {
    this.httpClient.post(this.baseUrl + 'newstock', item).subscribe(
      (newitem) => {
        this.router.navigate(['/stock']);
      },
      (err) => {
        if (err.status == 500) console.log(err);
      }
    );
  }

  updateStock() {
    this.StockService.updateStock(this.item.id_stock, this.item).subscribe(
      (res) => {
        this.router.navigate(['/stock']);
      },
      (err) => console.error(err)
    );
  }
}
