/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { HttpService } from '../../../providers/HttpService';
import { NavController, NavParams } from 'ionic-angular';
import { ShopsDetailPage } from '../shops-detail/shops-detail';
import { EmployeesListPage } from '../employees/employees-list/employees-list';
import { DishesListPage } from '../dishes/dishes-list/dishes-list';
import { RoomTablesListPage } from '../roomtables/roomtables-list/roomtables-list';
import { EquipmentsListPage } from '../equipments/equipments-list/equipments-list';
import { OrdersListPage } from '../orders/orders-list/orders-list';
import { FinancialsCategoryPage } from '../financials/financials-category/financials-category';



@Component({
  selector: 'page-shops-manage',
  templateUrl: 'shops-manage.html'
})
export class ShopsManagePage {
  public menuList = [];
  public sid; // 店铺id
  public ShopsDetailPage: any = ShopsDetailPage; // 修改店铺资料页面
  constructor(
    public http: HttpService,
    public navCtrl: NavController,
    public navParams: NavParams,

  ) {
    // 获取店铺ID
    this.sid = navParams.get("sid");
    console.log(this.sid);
    this.setManageMenu();
  }
  ionViewDidLoad() {

  }

  // 设置菜单
  setManageMenu () {
    // console.log("666");
    this.menuList = [{
      name: '员工管理',
      comment: EmployeesListPage
    },{
      name: '菜单管理',
      comment: DishesListPage
    },{
      name: '房桌管理',
      comment: RoomTablesListPage
    },{
      name: '设备管理',
      comment: EquipmentsListPage
    },{
      name: '订单管理',
      comment: OrdersListPage
    },{
      name: '财务管理',
      comment: FinancialsCategoryPage
    }];
  }

  // 页面跳转
  goToPage (event) {
    console.log("event", event);
    this.navCtrl.push(event, {'sid': this.sid});
  }

}
