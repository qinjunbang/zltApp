/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { NavController } from 'ionic-angular';

import { addDishesPage } from '../addDishes/addDishes';
import { dishesClassPage } from '../dishesClass/dishesClass';


@Component({
  selector: 'page-dishes-list',
  templateUrl: 'dishes-list.html'
})
export class DishesListPage {
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
  public addDishes () {
     this.navCtrl.push(addDishesPage);
  }

  dishesClass() {
    this.navCtrl.push(dishesClassPage);
  }

}
