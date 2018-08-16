import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { NavController , NavParams , AlertController , ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativeService } from '../../../../providers/NativeService';


@Component({
  selector: 'equipments-details',
  templateUrl: 'equipments-details.html'
})
export class EquipmentsDetailsPage {
    public shopId = '';
    public equip: Object;
    public eqName = '';
    public useAll = 0;
    public dishesSelect = 0;
    public priterNum = 1;
    public id = 0;
    constructor(
      public http: HttpService,
      public navCtrl: NavController,
      public alertCtrl: AlertController,
      public params: NavParams,
      public storage: Storage,
      public native: NativeService,
      public actionSheetCtrl: ActionSheetController
    ) {
      this.shopId = this.params.get('shopId');
      console.log(this.params.get('equip'))
      if(this.params.get('equip') != '' || this.params.get('equip') != undefined){
        this.equip = this.params.get('equip');
        this.eqName = this.params.get('equip').department;
        this.id = this.params.get('equip').id;
        this.useAll = this.params.get('equip').is_useall;
        this.dishesSelect = this.params.get('equip').cuisine;
        this.priterNum = this.params.get('equip').priter_number;
      }else{
          this.equip = ''
      }
    }

    //获取本地设备id和token
    public getToken(){
      return new Promise((resolve) => {
        this.storage.get('token').then((val) => {
            resolve(val)
        });
      })
    }
    public getDeviceId(){
      return new Promise((resolve) => {
        this.storage.get('device_id').then((val) => {
            resolve(val)
        });
      })
    }
    public changeEquip() {
      let that = this
      async function addEquip(){
        let token = await that.getToken();
        let deviceId = await that.getDeviceId();
        that.http.post("/api/app/printerEdit", {'token':token,'device_id': deviceId,'shop_id':that.shopId,'id':that.id,'department':that.eqName,
        'priter_number':that.priterNum,'is_useall':that.useAll,'cuisine':that.dishesSelect}).subscribe(res => {
            console.log("res", res);
            if(res.code == 200){
              that.native.alert('提示','',res.info)
              that.navCtrl.pop()
            }else {
              that.native.alert('提示','',res.info)
            }
        })
      }
      addEquip()
    }

    //删除设备
  deleteEquip() {
    let that = this;
    console.log(that.equip)
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: "删除设备",
          handler: () => {
            async function delEquip(){
                let token = await that.getToken();
                let deviceId = await that.getDeviceId();
                that.http.post("/api/app/printerDel", {'token':token,'device_id': deviceId,'shop_id':that.shopId,'id':that.id}).subscribe(res => {
                    console.log("res", res);
                    if(res.code == 200){
                      that.navCtrl.pop()
                    }else {
                      that.native.alert('提示','',res.info)
                    }
                })
              }
              delEquip()
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

  //是否全部打印
  getSelect(e) {
    console.log(e)
  }
}