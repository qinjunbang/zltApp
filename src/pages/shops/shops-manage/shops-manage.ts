/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { HttpService } from '../../../providers/HttpService';
import { NavController } from 'ionic-angular';
import { ShopsListPage } from '../shops-list/shops-list';


@Component({
  selector: 'page-shops-manage',
  templateUrl: 'shops-manage.html'
})
export class ShopsManagePage {
  public menuList = [];
  constructor(
    public http: HttpService,
    public navCtrl: NavController
  ) {
    this.setManageMenu();
  }
  ionViewDidLoad() {

  }

  // 设置菜单
  setManageMenu () {
    this.menuList = [{
      name: '店铺信息',
      comment: ShopsListPage
    },{
      name: '员工管理',
      comment: ShopsListPage
    },{
      name: '菜单管理',
      comment: ShopsListPage
    },{
      name: '房桌管理',
      comment: ShopsListPage
    },{
      name: '设备管理',
      comment: ShopsListPage
    },{
      name: '订单管理',
      comment: ShopsListPage
    }];
  }

  // 页面跳转
  goToPage (event) {
    console.log("event", event);
    this.navCtrl.push(event, {});
  }

}
