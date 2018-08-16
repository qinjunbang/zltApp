/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { NavController , NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativeService } from '../../../../providers/NativeService';

import { addDishesPage } from '../addDishes/addDishes';
import { dishesClassPage } from '../dishesClass/dishesClass';


@Component({
  selector: 'page-dishes-list',
  templateUrl: 'dishes-list.html'
})
export class DishesListPage {
  public isToggled: boolean;
  public dishesList = [];
  public shopId = '';
  constructor(
    public http: HttpService,
    public navCtrl: NavController,
    public storage: Storage,
    public native: NativeService,
    public params: NavParams
  ) {
    this.isToggled = true;
    this.shopId = this.params.get('sid');
  }
  ionViewDidLoad() {
     this.getDishesList();
  }
  public getToken(){
    return new Promise((resolve) => {
      this.storage.get('token').then((val) => {
          resolve(val)
      });
    })
  }
  public getDeviceId(){
    return new Promise((resolve) => {
      this.storage.get('device_id').then((val) => {
          resolve(val)
      });
    })
  }

  // 获取菜式列表
  public getDishesList () {
    let that = this;
    async function getDishes(){
      let token = await that.getToken();
      let deviceId = await that.getDeviceId();
      that.http.post("/api/app/dishAllDesign", {'token':token,'device_id': deviceId,'shop_id':that.shopId}).subscribe(res => {
          console.log("res", res);
          if(res.code == 200){
            that.dishesList = res.data;
          }else {
            that.native.alert('提示','',res.info);
          }
      })
    }
    getDishes()
  }

  // 页面跳转
  public addDishes () {
     this.navCtrl.push(addDishesPage,{'shopId':this.shopId});
  }

  dishesClass() {
    this.navCtrl.push(dishesClassPage,{'shopId':this.shopId});
  }

  public toggleFun() {
    console.log("Toggled: "+ this.isToggled); 
  }

}
