/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { NavController , ActionSheetController} from 'ionic-angular';


@Component({
  selector: 'page-orders-list',
  templateUrl: 'orders-list.html'
})
export class OrdersListPage {
  public menuList = [
    {id: 0,title:'预定'},
    {id: 1,title:'排队'},
    {id: 2,title:'配送'},
    {id: 3,title:'扫码'}
  ]; // 订单列表
  public defaultTitle = '预定'

  constructor(
    public http: HttpService,
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController
  ) {

  }
  ionViewDidLoad() {
    // this.getShopsList();
  }

  //点击列表
  clickList(id) {
    console.log(id)
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

}
