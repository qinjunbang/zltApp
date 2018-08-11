/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { NavController , AlertController} from 'ionic-angular';
import { addRoomTablesPage } from '../addRoomTables/addRoomTables';


@Component({
  selector: 'page-roomtables-list',
  templateUrl: 'roomtables-list.html'
})
export class RoomTablesListPage {
  public shopsList = [
    {id: 0,title:'包间'},
    {id: 1,title:'大厅'},
    {id: 2,title:'卡座'}
  ]; // 店铺列表
  public defaultTitle = '包间';
  testRadioOpen = false;
  testRadioResult: any;
  constructor(
    public http: HttpService,
    public navCtrl: NavController,
    public alertCtrl: AlertController
  ) {

  }
  ionViewDidLoad() {
    // this.getShopsList();
  }

  // 获取店铺列表
  public getShopsList () {
    console.log("我要获取数据");
    this.http.post("/api/shop/all", {}).subscribe(res => {
      console.log("res", res);
    })
  }

  //点击列表
  clickList(id) {
    console.log(id)
  }

  addRoomTablesPage() {
    this.navCtrl.push(addRoomTablesPage)
  }
  handleRoom() {
    let alert = this.alertCtrl.create();
    alert.setTitle('管理房桌');

    alert.addInput({
      type: 'radio',
      label: '删除房桌信息',
      value: '删除房桌信息',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: '暂停使用',
      value: '暂停使用'
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
