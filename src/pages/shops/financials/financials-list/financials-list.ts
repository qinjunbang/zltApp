/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { NavController, NavParams } from 'ionic-angular';




@Component({
  selector: 'page-financials-list',
  templateUrl: 'financials-list.html'
})
export class FinancialsListPage {
  public sid; // 店铺id
  public title: string = ''; // 类型标题
  public listType: string = 'all'; // 列表类型，默认为‘全部’
  constructor(
    public http: HttpService,
    public navCtrl: NavController,
    public navParams: NavParams,

  ) {
    // 获取店铺ID
    this.sid = navParams.get("sid");
    this.title = navParams.get("title");

  }
  ionViewDidLoad() {

  }



  // 上拉加载
  doInfinite (event) {
    console.log("我要上拉加载");
  }

  // 页面跳转
  goToPage (event) {
    console.log("event", event);
    this.navCtrl.push(event, {'sid': this.sid});
  }

}
