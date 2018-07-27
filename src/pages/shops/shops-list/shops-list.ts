/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { HttpService } from '../../../providers/HttpService';

@Component({
  selector: 'page-shops-list',
  templateUrl: 'shops-list.html'
})
export class ShopsListPage {
  public shopsList = [
    {id: 0},
    {id: 1},
    {id: 2}
  ]; // 店铺列表

  constructor(
    public http: HttpService
  ) {

  }
  ionViewDidLoad() {
    this.getShopsList();
  }

  // 获取店铺列表
  public getShopsList () {
    console.log("我要获取数据");
    this.http.post("/api/shop/all", {}).subscribe(res => {
      console.log("res", res);
    });
  }
}
