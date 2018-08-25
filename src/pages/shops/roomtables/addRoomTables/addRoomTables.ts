import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { NavController , ActionSheetController , NavParams } from 'ionic-angular';
import { NativeService } from '../../../../providers/NativeService';
import { Config } from '../../../../providers/Config';
import { Observable } from 'rxjs';

@Component({
  selector: 'add-room-tables',
  templateUrl: 'addRoomTables.html'
})

export class addRoomTablesPage{
    public shopsList = [
        {id: 1,title:'房间'},
        {id: 0,title:'桌子'}
    ]; // 店铺列表
    public codeList = [
        {id: 1,title:'开启'},
        {id: 0,title:'关闭'}
    ]; // 是否开启二维码列表
    public type = '1';  //0桌子,1房间
    public name = '';   //房间名字
    public hold : Number;   //容纳人数;
    public min_consumption: Number; //最低消费
    public lock_qrcode = '0'    //是否开启二维码,0否，1是
    public note = ''    //备注
    public shopId = '';
    public token = Config.token;
    public deviceId = Config.device_id;
    public imgArr = []; // 图片
    constructor(
        public navCtrl: NavController,
        public actionSheetCtrl: ActionSheetController,
        public native: NativeService,
        public http: HttpService,
        public params: NavParams
    ){
        this.shopId = this.params.get('shopId');
    }


  // 点击上传图片
  chooseImg (text, index) {
    const actionSheet = this.actionSheetCtrl.create({
      title: "获取图片",
      buttons: [{
        text: "从相册中获取",
        handler: () => {
          this.getPictureByLibrary().subscribe(res => {
            if (text === 'add') {
              // 如果是新增，插入一张图片
              this.imgArr.push(Config.app_upload_serve_url + res);
            } else {
              // 如果是原图更新，则更换当前图片的src
              this.imgArr[index] = Config.app_upload_serve_url + res;
            }
          });
        }
      },
        {
          text: "拍照",
          handler: () => {
            this.getPictureByCamera();
          }
        },
        {
          text: '取消',
          role: 'cancel'
        }]
    });

    actionSheet.present();
  }

  //确认修改
  add() {

      let data = {
          'shop_id':this.shopId,
          'token':this.token,
          'device_id':this.deviceId,
          'type': this.type,
          'name': this.name,
          'hold': this.hold,
          'min_consumption': this.min_consumption,
          'lock_qrcode': this.lock_qrcode,
          'note': this.note
      };
      data['thumb'] =  this.getStringImg(this.imgArr);

      this.http.post("/api/app/createRoomTable", data).subscribe(res => {
          console.log(res);
          if(res.code == 200){
              this.navCtrl.pop();
          }else{
              this.native.alert('提示','',res.info)
          }
      })
  }

  // 获取图片字条串拼接
  getStringImg (arr: any) {
      let len = arr.length,
          str: string = "";

      for (let i = 0; i < len; i++) {
        if (i < len -1) {
          str += arr[i] + ';';
        } else {
          str += arr[i];
        }
      }

      return str;
  }
  // 从图库获取图片
  getPictureByLibrary ():Observable<string> {
    return Observable.create(observer => {
      // 以拿到图片原始url 方式拿图片 destinationType 1 ， 0 为base64
      this.native.getPictureByLibrary({destinationType: 1}).subscribe(res => {
        // 上传图片，拿到图片在服务器的url
        this.native.uploadImages(res, 'api/app/shopUpload').subscribe(s => {
          observer.next(s);
        });
      }, err => {
        console.log("err1", err);
      });
    });

  }

  // 拍照获取图片
  getPictureByCamera ():Observable<string> {
    return Observable.create(observer => {
      // 以拿到图片原始url 方式拿图片 destinationType 1 ， 0 为base64
      this.native.getPictureByCamera({destinationType: 1}).subscribe(res => {
        console.log("拍照图片res", res);
        //  // 上传图片，拿到图片在服务器的url
        this.native.uploadImages(res, 'api/app/shopUpload').subscribe(s => {
          observer.next(s);
        });
      }, err => {
        console.log("err", err);
      });
    });
  }
}
