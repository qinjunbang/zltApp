/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { NavController , AlertController , NavParams} from 'ionic-angular';
import { addRoomTablesPage } from '../addRoomTables/addRoomTables';
import { editRoomTablesPage } from '../editRoomTables/editRoomTables';
import { Config } from '../../../../providers/Config';
import { RoomTablesQrCodePage } from "../roomtables-qrCode/roomtables-qrCode";

@Component({
  selector: 'page-roomtables-list',
  templateUrl: 'roomtables-list.html'
})
export class RoomTablesListPage {
  public shopId = '';
  public token = Config.token;
  public deviceId = Config.device_id;
  public roomList = [];
  public tableList = [];
  public titleList = [
    {id: 1,title:'房间', value: 'room'},
    {id: 0,title:'桌子', value: 'table'}
  ]; // 店铺列表
  public roomType = "room";
  testRadioOpen = false;
  testRadioResult: any;
  constructor(
    public http: HttpService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public params: NavParams
  ) {
    this.shopId = this.params.get('sid');
  }
  ionViewWillEnter() {
    this.getRoomTableList();
  }

  // 获取房桌列表
  public getRoomTableList () {
    console.log("我要获取数据");
    this.http.post("/api/shop/showRoomTable", {'shop_id':this.shopId,'token':this.token,'deviceId':this.deviceId}).subscribe(res => {
      console.log("res", res);
      this.roomList = [];
      this.tableList = [];
      if (res.code == 200) {
        let len = res.data.length,
            data = res.data;
        if (len > 0 && len) {
          for (let i = 0; i < len; i++) {
            if (data[i].type == 1) {
              this.roomList.push(data[i]);
            } else {
              this.tableList.push(data[i]);
            }
          }
        }
      }
    });
  }

  //编辑房桌
  editRoomTables(id) {
    this.navCtrl.push(editRoomTablesPage,{'shopId':this.shopId,'id':id})
  }

  //点击列表
  clickList(id) {
    console.log(id)
  }

  addRoomTablesPage() {
    this.navCtrl.push(addRoomTablesPage,{'shopId':this.shopId})
  }
  handleRoom(e) {
    e.stopPropagation();
    let alert = this.alertCtrl.create();
    alert.setTitle('管理房桌');


    alert.addInput({
      type: 'radio',
      label: '暂停使用',
      value: '暂停使用',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: '立即使用',
      value: '立即使用'
    });


    alert.addButton('取消');
    alert.addButton({
      text: '确定',
      handler: (data: any) => {
        console.log('Radio data:', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });

    alert.present();
  }

  // 跳转到二维码页面
  seeCode () {
    this.navCtrl.push(RoomTablesQrCodePage, {'sid': this.shopId})
  }

}
