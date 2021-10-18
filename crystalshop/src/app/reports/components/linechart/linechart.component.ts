import { Component, OnInit } from '@angular/core';
import { Orders } from '../../../Orders/models/orders';
import { OrdersService } from '../../../Orders/services/orders.service';
import * as Highcharts from 'highcharts';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css'],
})

export class LinechartComponent implements OnInit {
  highcharts = Highcharts;
  orders: Orders[] = [];
  Time: any[] = [];
  Quantity: any[] = [];
  date = 'Date';

  constructor(private OrdersService: OrdersService) {
  }

  ngOnInit(): void {
    this.OrdersService.getOrders().subscribe((res: Orders[]) => {      
      if (res) {
        const uniqueValues = res.forEach((orders) => {
          const D = new Date(orders.time);
          const date = dayjs(D).format("MMM D, YYYY h:mm A");
          x: this.Time.push(date);
          y: this.Quantity.push(orders.quantity);
        });
        this.optionsOrders.xAxis['categories'] = this.Time;
        this.optionsOrders.series[0]['data'] = this.Quantity;
      }
      Highcharts.chart('container', this.optionsOrders);
    });
  }

  public optionsOrders: any = {
    chart: {
      width: 920,
      height: 530,
      margin: 100,
      borderRadius: 20,
      backgroundColor: '#FFFFFF',
    },
    title: {
      text: 'Orders Crystal Shop',
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      title: {
        text: 'Orders',
      },
      type: 'logarithmic',
      categories: [],
    },
    series: [
      {
        color: 'rgba(248,161,63,1)',
        name: this.date,
        type: 'spline',
        data: [],
        showInLegend: false
      },
    ],
    credits: {
      enabled: false,
    },
  };
}
