/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { NavController, NavParams } from 'ionic-angular';
import { ShopsDetailPage } from '../../shops-detail/shops-detail';
import { FinancialsFindPage } from '../financials-find/financials-find';



@Component({
  selector: 'page-financials-category',
  templateUrl: 'financials-category.html'
})
export class FinancialsCategoryPage {
  public sid; // 店铺id
  public items = ["预定", "扫码", "排队", "外卖"];

  constructor(
    public http: HttpService,
    public navCtrl: NavController,
    public navParams: NavParams,

  ) {
    // 获取店铺ID
    this.sid = navParams.get("sid");
    console.log(this.sid);
  }
  ionViewDidLoad() {

  }


  // 页面跳转
  goToPage (text) {
    console.log("text", text);
    this.navCtrl.push(FinancialsFindPage, {'title': text, 'sid': this.sid});
  }

}
