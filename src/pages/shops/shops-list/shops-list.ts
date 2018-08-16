/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { HttpService } from '../../../providers/HttpService';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativeService } from '../../../providers/NativeService';

import { ShopsAddPage } from '../shops-add/shops-add';
import { ShopsManagePage } from '../shops-manage/shops-manage';

@Component({
  selector: 'page-shops-list',
  templateUrl: 'shops-list.html'
})
export class ShopsListPage {
  public shopsList = []; // 店铺列表
  public serverUrl = 'https://r.zhanglitong.com'

  public ShopsAddPage = ShopsAddPage; // 添加店铺页面
  public ShopsManagePage = ShopsManagePage; // 店铺管理页面

  constructor(
    public http: HttpService,
    public navCtrl: NavController,
    public storage: Storage,
    public native: NativeService
  ) {
    this.getShopsList();
  }
  ionViewDidLoad() {
    // this.getShopsList();
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

  
  // 获取店铺列表
  public getShopsList () {
    console.log("我要获取数据");
    let that = this;
    async function getshops(){
      let token = await that.getToken();
      let deviceId = await that.getDeviceId();
      that.http.post("/api/app/shopAll", {'token':token,'device_id': deviceId}).subscribe(res => {
          console.log("res", res);
          if(res.code == 200){
            that.shopsList = res.data;
          }else if(res.code == 2001) {
            that.native.alert('提示','','你还没有登录，请先登录！');
          }else {
            that.native.alert('提示','',res.info);
          }
      })
    }
    getshops()
  }

  //删除店铺
  public deleteShop(id) {
    let that = this;
    async function delShops(){
      let token = await that.getToken();
      let deviceId = await that.getDeviceId();
      that.http.post("/api/app/shopDel", {'token':token,'device_id': deviceId,'shop_id':id}).subscribe(res => {
          console.log("res", res);
          if(res.code == 200){
            that.native.alert('提示','','删除店铺成功！');
            that.getShopsList();
          }else {
            that.native.alert('提示','',res.info)
          }
      })
    }
    that.native.confirm('提示','确定要删除此店铺？', function() {
      delShops()
    }) 
  }

  // 页面跳转
  public goToPage (page, sid= '') {
    console.log('6666');
    this.navCtrl.push(page, {sid: sid});
  }

}
