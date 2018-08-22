/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { NavController , NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativeService } from '../../../../providers/NativeService';
import { Config } from '../../../../providers/Config';

import { addDishesPage } from '../addDishes/addDishes';
import { editDishesPage } from '../editDishes/editDishes';
import { dishesClassPage } from '../dishesClass/dishesClass';


@Component({
  selector: 'page-dishes-list',
  templateUrl: 'dishes-list.html'
})
export class DishesListPage {
  public dishesList = [];
  public shopId = '';
  public serverUrl = 'https://r.zhanglitong.com'
  constructor(
    public http: HttpService,
    public navCtrl: NavController,
    public storage: Storage,
    public native: NativeService,
    public params: NavParams
  ) {
    this.shopId = this.params.get('sid');
  }
  ionViewWillEnter() {
    this.getDishesList();
  }


  // 获取菜式列表
  public getDishesList () {
    this.http.post("/api/app/dishAllDesign", {'token': Config.token,'device_id': Config.device_id,'shop_id': this.shopId}).subscribe(res => {
      console.log("res", res);
      if(res.code == 200){
        this.dishesList = res.data;
      }else {
        this.native.alert('提示','',res.info);
      }
    })
  }

  // 增加菜式
  public addDishes () {
     this.navCtrl.push(addDishesPage,{'shopId':this.shopId});
  }
  // 编辑菜式
  public editDishes (id) {
    this.navCtrl.push(editDishesPage,{'shopId':this.shopId,'id':id});
 }

  dishesClass() {
    this.navCtrl.push(dishesClassPage,{'shopId':this.shopId});
  }

  public toggleFun(e) {
    console.log(e._value);
  }

}
