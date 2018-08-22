/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { NavController , AlertController , NavParams} from 'ionic-angular';
import { addRoomTablesPage } from '../addRoomTables/addRoomTables';
import { editRoomTablesPage } from '../editRoomTables/editRoomTables';
import { Config } from '../../../../providers/Config';

@Component({
  selector: 'page-roomtables-list',
  templateUrl: 'roomtables-list.html'
})
export class RoomTablesListPage {
  public shopId = '';
  public token = Config.token;
  public deviceId = Config.device_id;
  public roomList = [];
  public shopsList = [
    {id: 1,title:'房间'},
    {id: 0,title:'桌子'}
  ]; // 店铺列表
  public defaultTitle = '房间';
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
    this.getShopsList();
  }

  // 获取店铺列表
  public getShopsList () {
    console.log("我要获取数据");
    this.http.post("/api/shop/showRoomTable", {'shop_id':this.shopId,'token':this.token,'deviceId':this.deviceId}).subscribe(res => {
      console.log("res", res);
      this.roomList = res.data;
    })
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

}
