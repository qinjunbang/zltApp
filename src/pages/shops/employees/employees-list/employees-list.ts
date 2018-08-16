/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { Config } from '../../../../providers/Config';
import { NavController, NavParams } from 'ionic-angular';
import { EmployeesAddPage } from '../employees-add/employees-add';


@Component({
  selector: 'page-employees-list',
  templateUrl: 'employees-list.html'
})
export class EmployeesListPage {
  public shop_id: string = ''; // 店铺ID
  public shopsList: any = []; // 店铺列表

  constructor(
    public http: HttpService,
    public navCtrl: NavController,
    public navParam: NavParams
  ) {
    this.shop_id = this.navParam.get("sid");
  }
  ionViewDidLoad() {
     this.getShopsList();
  }

  // 获取店铺列表
  public getShopsList () {
    console.log("我要获取数据");
    this.http.post("/api/app/clerkAll", {token: Config.token, device_id: Config.device_id, shop_id: this.shop_id}).subscribe(res => {
      console.log("res", res);
      if (res.code == 200) {
        this.shopsList = res.data;
      }
    });
  }

  // 页面跳转
  public goToPage () {
    this.navCtrl.push(EmployeesAddPage, {"sid": this.shop_id});
  }

}
