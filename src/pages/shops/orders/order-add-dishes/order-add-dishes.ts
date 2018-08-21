/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { NavController , ActionSheetController , NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativeService } from '../../../../providers/NativeService';
import { Config } from '../../../../providers/Config'

@Component({
  selector: 'order-add-dishes',
  templateUrl: 'order-add-dishes.html'
})
export class OrderAddDishesPage {
  public defaultList = '0';
  public defaultType= '0';
  public shopId = '';
  public ordersList:any = {};
  public order_id = '';
  public order_type = '';
  public menuType = [
    {id: 0,title:'今日特价'},
    {id: 1,title:'店长推荐'},
    {id: 2,title:'特色热卖'}
  ]; // 订单列表
  public token = Config.token;
  public deviceId = Config.device_id;

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
    this.order_type = this.params.get('order_type');
  }
  ionViewDidLoad() {
    // this.getShopsList();
  }


  //获取订单数据


}
