/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { NativeService } from '../../../../providers/NativeService';
import { Utils } from '../../../../providers/Utils';
import { NavController , AlertController , NavParams} from 'ionic-angular';
import { addRoomTablesPage } from '../addRoomTables/addRoomTables';
import { editRoomTablesPage } from '../editRoomTables/editRoomTables';
import { Config } from '../../../../providers/Config';
import { RoomTablesQrCodePage } from "../roomtables-qrCode/roomtables-qrCode";
import { OrderAddDishesPage } from '../../orders/order-add-dishes/order-add-dishes';


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
  public nowDate: any = Utils.dateFormat(new Date(), "YYYY-MM-DDTHH:mmZ");
  public timeStarts: any =  Utils.dateFormat(new Date(), "YYYY-MM-DDTHH:mmZ");
  public orderTime: any = '';
  public isDoOrder: boolean = false;
  public name: string = '';
  public phone: string = '';
  public isDoOrderId: any = '';
  constructor(
    public http: HttpService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public params: NavParams,
    public native: NativeService,
  ) {
    this.shopId = this.params.get('sid');

    console.log("this.timeStarts", this.timeStarts);
  }

  ionViewWillEnter() {
    this.getRoomTableList();
  }

  // 刷新当前时间
  refreshTime () {
    this.timeStarts = Utils.dateFormat(new Date(), "YYYY-MM-DDTHH:mmZ");
    this.getRoomTableList();
  }
  // 获取房桌列表
  public getRoomTableList () {
    this.timeStarts = this.getMyTimeString(this.timeStarts);
    console.log("new Date(this.timeStarts)", this.timeStarts);
    let data = {
      'shop_id':this.shopId,
      'token':this.token,
      'device_id':this.deviceId,
      'time': this.timeStarts
    };

    this.http.post("/api/app/showRoomTable", data).subscribe(res => {
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
  handleRoom(e, id, isUse) {
    console.log("isUse", isUse);
    e.stopPropagation();
    let alert = this.alertCtrl.create();
    alert.setTitle('管理房桌');

    if (isUse == 0) {
      alert.addInput({
        type: 'radio',
        label: '电话预定',
        value: '4',
      });
    } else {
      alert.addInput({
        type: 'radio',
        label: '服务信息',
        value: '5',
      });
    }

    alert.addInput({
      type: 'radio',
      label: '点菜',
      value: '0',
      checked: true
    });


    // alert.addInput({
    //   type: 'radio',
    //   label: '暂停使用',
    //   value: '1',
    // });
    //
    // alert.addInput({
    //   type: 'radio',
    //   label: '立即使用',
    //   value: '2'
    // });

    alert.addInput({
      type: 'radio',
      label: '修改资料',
      value: '3'
    });

    alert.addInput({
      type: 'radio',
      label: '绑定服务员',
      value: '6'
    });


    alert.addButton('取消');
    alert.addButton({
      text: '确定',
      handler: (data: any) => {
        console.log('Radio data:', data);


        switch (data) {
          // 0 去点菜
          case '0':
              this.addDishes(id);
            break;
          // 1 暂停使用
          case '1':

          // 2 立即使用
          case '2':
            this.notUseRoomTable(id, data);
            break;
          // 3 去详情页面
          case '3':
            this.editRoomTables(id);
            break;
          case '4':
            this.createOrder(id);
            break;
          case '5':
            this.native.showToast("敬请其待！");
            break;
          case '6':
            this.getEmployeesList(id) ;
            break;
        }

      }
    });

    alert.present();
  }

  // 跳转到二维码页面
  seeCode () {
    this.navCtrl.push(RoomTablesQrCodePage, {'sid': this.shopId})
  }


  //服务员点菜
  addDishes(id) {
    this.navCtrl.push(OrderAddDishesPage,{'shop_id': this.shopId, 'room_id': id})
  }

  // 暂停使用
  notUseRoomTable (id, type) {
    let url:string = '';

    if (type == '1') {
      url = "/api/app/notUseRoomTable";
    } else if (type == '2') {
      url = "/api/app/useRoomTable"
    }
    let data = {
      id: id,
      token: this.token,
      device_id: this.deviceId
    };
    this.http.post(url, data).subscribe(res => {
       this.native.alert(res.info);
       if (res.code == 200) {
         this.getRoomTableList();
       }
    });
  }

  // 电话预定
  createOrder (id) {
    this.isDoOrder = true;
    this.orderTime = Utils.dateFormat(new Date(), "YYYY-MM-DDTHH:mmZ");
    this.isDoOrderId = id;
  }

  // 关闭
  hidePopover () {
    this.isDoOrder = false;
  }

  // doOrder 提交预定
  doOrder () {
    let data = {
      'shop_id': this.shopId, //=>'商家id',
      'id': this.isDoOrderId, //=> '房桌id',
      'arrive_time': this.getMyTimeString(this.orderTime), // => '请选择时间',格式：'2018-10-29 21:00:00'
      'name': this.name, // => '请输入预定人姓名',
      'phone': this.phone, // =>'请输入预定人姓名',
      'token': Config.token, // =>'app的token',
      'device_id': Config.device_id, // =>'手机id',
    };
    console.log("data", data);

    // 验证姓名
    let isname = Utils.isUserName(data['name']);
    if (isname) {
      return this.native.showToast(isname);
    }


    // 验证手机号
    let isphone = Utils.isMobile(data['phone']);
    if (isphone) {
      return this.native.showToast(isphone);
    }

    this.http.post("/api/app/shopOwnReserve", data).subscribe(res => {
     console.log("res", res);
     this.native.showToast(res.info);
     if (res.code == 200) {
       this.hidePopover();
       this.getRoomTableList();
     }
    });


  }

  // 格式化时间字符串
  getMyTimeString (timeString) {
    timeString = timeString.replace(/T/g,' ');
    timeString = timeString.replace(/Z/g,' ');
    timeString = timeString.replace(/-/g,'/');

    return timeString;
  }

  // 显示员工列表
  getEmployeesList (rid) {
    const postData = {
      'shop_id': this.shopId,
      'token': Config.token,
      'device_id': Config.device_id
    };
    this.http.post("/api/app/getSmallTwo", postData).subscribe(res => {
      console.log("res", res);
      if (res.code == 200) {
        const data = res.data;
        const arr = data.map((val) => {
          return {
            type: 'checkbox',
            name: val.name,
            label: val.name,
            value: val.id
          }
        });

        console.log('arr', arr);
        // 显示员工列表
        this.showEmployeesList(arr, rid);
      } else {
        this.native.showToast(res.info);
      }

    });

  }

  // show Employees List
  showEmployeesList (arr, rid) {

    let alert = this.alertCtrl.create({
      title: '员工列表',
      inputs: arr,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
            console.log('data', data);
            this.bingEmployees(data.join('|'), rid);
          }
        }
      ]
    });
    alert.present();
  }

  // 绑定员工
  bingEmployees (elist: string, rid: number) {
    const data = {
      shoper_id: elist,
      token: Config.token,
      device_id: Config.device_id,
      id: rid
    };
    this.http.post("/api/app/BindingSmallTwo", data).subscribe(res => {
        this.native.showToast(res.info);
    });
  }

}
