/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { NavController , ActionSheetController , NavParams} from 'ionic-angular';
import { OrderDetailPage } from '../orderDetail/orderDetail';
import { OrderAddDishesPage } from '../order-add-dishes/order-add-dishes';
import { Storage } from '@ionic/storage';
import { NativeService } from '../../../../providers/NativeService';

@Component({
  selector: 'page-orders-list',
  templateUrl: 'orders-list.html'
})
export class OrdersListPage {
  public menuList = [
    {id: 0,title:'外卖'},
    {id: 1,title:'预定'},
    {id: 2,title:'排队'},
    {id: 3,title:'扫码'}
  ]; // 订单列表
  public menuType = [
    {id: 9,title:'全部'},
    {id: 2,title:'支付成功'},
    {id: 3,title:'进行中'},
    {id: 4,title:'完成'},
    {id: 6,title:'退款'}
  ]; // 订单列表
  public defaultList = '0';
  public defaultType= '9';
  public shopId = '';
  public ordersList:any = []

  constructor(
    public http: HttpService,
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public storage: Storage,
    public native: NativeService,
    public params: NavParams
  ) {
    this.shopId = this.params.get('sid');
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
      that.http.post("/api/app/shopAllOrders", {'token':token,'device_id': deviceId,'shop_id':that.shopId,'type':that.defaultList,'status':that.defaultType}).subscribe(res => {
          console.log("res", res);
          if(res.code == 200){
            that.ordersList = res.data.data
          }else if(res.code == 201){
            that.ordersList = []
          }else {
            that.native.alert('提示','',res.info)
          }
      })
    }
    addEquip()
  }

  seeOrders() {
    this.getOrders();
  }

  //点击列表
  listDetail(id,type) {
    this.navCtrl.push(OrderDetailPage,{'order_id':id,'shopId':this.shopId,'order_type':type})
  }

  //点击订单出现删除
  deleteList() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: "删除订单",
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


  //下拉刷新
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  // 拨打电话
  callNumber (e, num) {
    e.stopPropagation();
    this.native.callNumber(num);
  }

}
