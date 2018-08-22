/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { NavController, NavParams } from 'ionic-angular';
import { ShopsDetailPage } from '../../shops-detail/shops-detail';
import { EmployeesListPage } from '../../employees/employees-list/employees-list';
import { DishesListPage } from '../../dishes/dishes-list/dishes-list';
import { RoomTablesListPage } from '../../roomtables/roomtables-list/roomtables-list';
import { EquipmentsListPage } from '../../equipments/equipments-list/equipments-list';
import { OrdersListPage } from '../../orders/orders-list/orders-list';
import { FinancialsListPage } from '../financials-list/financials-list';



@Component({
  selector: 'page-financials-find',
  templateUrl: 'financials-find.html'
})
export class FinancialsFindPage {
  public sid; // 店铺id
  public title: string = ''; // 标题类型

  constructor(
    public http: HttpService,
    public navCtrl: NavController,
    public navParams: NavParams,

  ) {
    // 获取店铺ID
    this.sid = navParams.get("sid");
    this.title = navParams.get("title");
    console.log(this.sid);
    console.log(this.title );
  }
  ionViewDidLoad() {

  }



  // 页面跳转
  goToPage (event) {
    console.log("event", event);
    this.navCtrl.push(FinancialsListPage, {'title': this.title, 'sid': this.sid});
  }

}
