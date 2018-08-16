import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { addNewCardPage } from './addNewCard/addNewCard';
import { Config } from '../../../../providers/Config';
import { HttpService } from '../../../../providers/HttpService';
import { NativeService } from '../../../../providers/NativeService';

@Component({
    selector: 'add-card',
    templateUrl: 'addCard.html'
})

export class addCardPage {
    public userInfo = Config.userInfo;
    public token = Config.token;
    public deviceId = Config.device_id;
    public cardsList = ''
    constructor(
        public navCtrl: NavController,
        public http: HttpService,
        public native: NativeService
    ) {
        console.log(Config.userInfo)
    }
    ionViewWillEnter() {
        this.getCardList()
    }

    getCardList() {
        this.http.post("/api/app/showCards", {'token':this.token,'device_id': this.deviceId}).subscribe(res => {
            console.log("res", res);
            if(res.code == 200){
             // this.cardsList = res.data.data
            }else {
              this.native.alert('提示','',res.info)
            }
        })
    }
    addCard() {
        this.navCtrl.push(addNewCardPage)
    }
}