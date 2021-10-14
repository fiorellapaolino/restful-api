import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/Stock/services/stock.service';
import { Stock } from 'src/app/Stock/models/stock';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css'],
})
export class PiechartComponent implements OnInit {

  constructor(private Stockservice: StockService) {}

  ngOnInit(): void {
    this.test();
  }

  test() {
    this.Stockservice.getChartsStock().subscribe((res: Stock[]) => {
      const auxData = res.map((stone) => ({
        name: stone.name_crystal,
        y: stone.quantity,
      }));
      this.optionsStock.series = [
        { name: 'Stones', colorByPoint: true, data: auxData },
      ];
      Highcharts.chart('containerStock', this.optionsStock);
    });
  }

  public optionsStock: any = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      width: 920,
      height: 530,
      margin: 30,
      borderRadius: 20,
      backgroundColor: '#FFFFFF',
    },
    title: {
      text: 'Stock Crystal Shop',
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}: {point.percentage:.1f}%</b>'
        },
        showInLegend: true,
      },
    },
    series: []
  }
};
