/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-orders-list',
  templateUrl: 'orders-list.html'
})
export class OrdersListPage {
  public shopsList = [
    {id: 0},
    {id: 1},
    {id: 2}
  ]; // 店铺列表

  constructor(
    public http: HttpService,
    public navCtrl: NavController
  ) {

  }
  ionViewDidLoad() {
    // this.getShopsList();
  }

  // 获取店铺列表
  public getShopsList () {
    console.log("我要获取数据");
    this.http.post("/api/shop/all", {}).subscribe(res => {
      console.log("res", res);
    });
  }

  // 页面跳转
  public goToPage () {
    console.log('6666');
    // this.navCtrl.push(ShopsAddPage, {});
  }

}
