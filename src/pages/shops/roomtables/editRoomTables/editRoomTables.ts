import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { NavController , ActionSheetController , NavParams } from 'ionic-angular';
import { NativeService } from '../../../../providers/NativeService';
import { Config } from '../../../../providers/Config';

@Component({
  selector: 'edit-room-tables',
  templateUrl: 'editRoomTables.html'
})

export class editRoomTablesPage{
    public roomDetails = [];
    public shopsList = [
        {id: 1,title:'房间'},
        {id: 0,title:'桌子'}
    ]; // 店铺列表
    public codeList = [
        {id: 1,title:'开启'},
        {id: 0,title:'关闭'}
    ]; // 是否开启二维码列表
    public id = 0;
    public type = '1';  //0桌子,1房间
    public name = '';   //房间名字
    public hold: Number;   //容纳人数;
    public min_consumption: Number; //最低消费
    public lock_qrcode = '0'    //是否开启二维码,0否，1是
    public note = ''    //备注
    public thumb = 'http://p3.music.126.net/1xERpbcRGZamJ4Nvm8M2Ew==/1367792474456202.jpg?param=30y30'   //图片
    public shopId = '';
    public token = Config.token;
    public deviceId = Config.device_id;
    constructor(
        public navCtrl: NavController,
        public actionSheetCtrl: ActionSheetController,
        public native: NativeService,
        public http: HttpService,
        public params: NavParams
    ){
        this.shopId = this.params.get('shopId');
        this.id = this.params.get('id');
        this.getRoomDetails();
    }

    // 从图库获取图片
    getPictureByLibrary () {
        console.log("666");
        this.native.getPictureByLibrary().subscribe(res => {
        console.log("res", res);
        }, err => {
        console.log("err1", err);
        });
    }

    // 拍照获取图片
    getPictureByCamera () {
        this.native.getPictureByCamera().subscribe(res => {
        console.log("res", res);
        }, err => {
        console.log("err", err);
        });
    }
    // 点击上传图片
    chooseImg () {
        const actionSheet = this.actionSheetCtrl.create({
        title: "获取图片",
        buttons: [
            {
            text: "从相册中获取",
            handler: () => {
                this.getPictureByLibrary();
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
            }
        ]
        });

        actionSheet.present();
    }

    //获取房桌详细信息
    getRoomDetails() {
        this.http.post("/api/app/showOneRoomTable", {'token':this.token,'device_id':this.deviceId,'id':this.id}).subscribe(res => {
            console.log(res)
            if(res.code == 200){
                this.roomDetails = res.data;
                this.name = res.data.name;
                this.hold = res.data.hold;
                this.min_consumption = res.data.min_consumption;
                this.thumb = res.data.thumb;
                this.note = res.data.note;
            }else{
                this.native.alert('提示','',res.info)
            }
        })
    }

    //确认修改
    edit() {
        let data = {
            'shop_id':this.shopId,
            'token':this.token,
            'device_id':this.deviceId,
            'id': this.id,
            'type': this.type,
            'name': this.name,
            'hold': this.hold,
            'min_consumption': this.min_consumption,
            'lock_qrcode': this.lock_qrcode,
            'thumb': this.thumb,
            'note': this.note
        }
        this.http.post("/api/app/updateRoomTable", data).subscribe(res => {
            console.log(res)
            if(res.code == 200){
                this.navCtrl.pop()
            }else{
                this.native.alert('提示','',res.info)
            }
        })
    }

    //删除房桌
    delete() {
        this.http.post("/api/app/deleteRoomTable", {'id':this.id}).subscribe(res => {
            console.log(res)
            if(res.code == 200){
                this.navCtrl.pop()
            }else{
                this.native.alert('提示','',res.info)
            }
        })
    }
}