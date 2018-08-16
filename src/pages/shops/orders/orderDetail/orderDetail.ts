/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { NavController , ActionSheetController , NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativeService } from '../../../../providers/NativeService';

@Component({
  selector: 'order-detail',
  templateUrl: 'orderDetail.html'
})
export class OrderDetailPage {
  public defaultList = '0';
  public defaultType= '0';
  public shopId = '';
  public ordersList:any = {};
  public order_id = ''

  constructor(
    public http: HttpService,
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public storage: Storage,
    public native: NativeService,
    public params: NavParams
  ) {
    this.shopId = this.params.get('shopId');
    this.order_id = this.params.get('order_id');
    this.getOrders()
  }
  ionViewDidLoad() {
    // this.getShopsList();
  }

  //获取本地设备id和token
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
  //获取订单数据
  public getOrders() {
    let that = this
    async function addEquip(){
      let token = await that.getToken();
      let deviceId = await that.getDeviceId();
      that.http.post("/api/app/shopOneOrder", {'token':token,'device_id': deviceId,'shop_id':that.shopId,'order_id':that.order_id}).subscribe(res => {
          console.log("res", res);
          if(res.code == 200){
            that.ordersList = res.data;
            console.log(that.ordersList)
          }else {
            that.native.alert('提示','',res.info)
          }
      })
    }
    addEquip()
  }

}
