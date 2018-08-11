/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { NavController, ActionSheetController} from 'ionic-angular';

import { addEquipmentsPage } from '../addEquipments/addEquipments';


@Component({
  selector: 'page-equipments-list',
  templateUrl: 'equipments-list.html'
})
export class EquipmentsListPage {

  constructor(
    public http: HttpService,
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController
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
  public addEquipments () {
    this.navCtrl.push(addEquipmentsPage);
  }

  //删除设备
  deleteEquip() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: "删除设备",
          handler: () => {
          }
        },
        {
          text: '取消',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  //查看设备详情
  seeDeatils() {
    //this.navCtrl.push()
  }

}
