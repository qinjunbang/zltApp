import { Component , NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpService } from '../../../../providers/HttpService';
import { NavController , NavParams , AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativeService } from '../../../../providers/NativeService';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule  // <--- import into the NgModule
  ],
  /* Other module metadata */
})
@Component({
  selector: 'add-equipments',
  templateUrl: 'addEquipments.html'
})
export class addEquipmentsPage {
    public shopId = '';
    public eqName = '';
    public machinecode = '4004556655';
    public machinekey = '82qs8btsqtwz';
    constructor(
      public http: HttpService,
      public navCtrl: NavController,
      public alertCtrl: AlertController,
      public params: NavParams,
      public storage: Storage,
      public native: NativeService
    ) {
      this.shopId = this.params.get('shopId')
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
    public add() {
      let that = this
      async function addEquip(){
        let token = await that.getToken();
        let deviceId = await that.getDeviceId();
        that.http.post("/api/app/printerAdd", {'token':token,'device_id': deviceId,'shop_id':that.shopId,'machinecode':that.machinecode,'machinekey':that.machinekey,'department':that.eqName}).subscribe(res => {
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

    getNum() {
      console.log("this.eqName", this.eqName);
    }
}