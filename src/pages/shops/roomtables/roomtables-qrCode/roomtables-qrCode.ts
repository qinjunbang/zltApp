/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { NavController , AlertController , NavParams} from 'ionic-angular';
import { Config } from '../../../../providers/Config';
import { NativeService } from '../../../../providers/NativeService';

@Component({
  selector: 'page-roomtables-qrCode',
  templateUrl: 'roomtables-qrCode.html'
})
export class RoomTablesQrCodePage {
  public shopId = '';
  public codeList = []; // 二维码数据
  constructor(
    public http: HttpService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public params: NavParams,
    public native: NativeService
  ) {
    this.shopId = this.params.get('sid');
  }
  ionViewWillEnter() {
    this.getRoomTableList();
  }

  // 获取房桌列表
  getRoomTableList () {
    let data = {};
    data['token'] = Config.token;
    data['device_id'] = Config.device_id;
    data['shop_id'] = this.shopId;

    this.http.post("/api/shop/showRoomTable", data).subscribe(res => {
      console.log("res", res);
      let data = res.data;

      if (res.code == 200 && data.length > 0 ) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].lock_qrcode == 1) {
            let obj = {title: data[i].name, value: Config.app_serve_url + "s?id=" + data[i].id}
            this.codeList.push(obj);
          }
        }
      } else {
        this.native.alert(res.info);
      }
    });
  }

  // 点击图片下载
  downCodeImg () {
    console.log("我要下载");
  }

}
