import { Component, OnInit } from '@angular/core';
import * as chartData from '../../shared/data/dashboard/ecommerce'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  sale: any = 5000;
  profitData: any = 2400;
  public todayTotalSale = chartData.todayTotalSale;
  public totalVisit = chartData.totalVisit;
  public profit = chartData.profit;
  public riskFactor = chartData.riskFactor;

  public lat_m1: number = 20.593683;
  public lng_m1: number = 78.962883;
  public zoom_m1: number = 4;
  constructor() { }

  ngOnInit() {
  }

}
