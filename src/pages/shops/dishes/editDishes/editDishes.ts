import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { NavController , AlertController , ActionSheetController , NavParams} from 'ionic-angular';
import { NativeService } from '../../../../providers/NativeService';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'edit-dishes',
  templateUrl: 'editDishes.html'
})
export class editDishesPage {
    public testRadioOpen = false;
    public dishName = '';
    public dishPrice = '';
    public shopId = '';
    public dishesList = '';
    public dishesListSelect = 0;
    public discount = 0.9;
    public text = '';
    public id = 0;
    public dishesMess = '';
    public img = '';
    constructor(
        public http: HttpService,
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public native: NativeService,
        public actionSheetCtrl: ActionSheetController,
        public params: NavParams,
        public storage: Storage
    ){
        this.shopId = this.params.get('shopId');
        this.id = this.params.get('id');
        this.getDishesList();
        this.getDishesMess();
    }

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

    // 获取菜式列表
    public getDishesList () {
        let that = this;
        async function getDishes(){
        let token = await that.getToken();
        let deviceId = await that.getDeviceId();
        that.http.post("/api/app/dishAllDesign", {'token':token,'device_id': deviceId,'shop_id':that.shopId}).subscribe(res => {
            console.log("res", res);
            if(res.code == 200){
                that.dishesList = res.data;
            }else {
                that.native.alert('提示','',res.info);
            }
        })
        }
        getDishes()
    }

    // 获取菜式信息
    public getDishesMess () {
        let that = this;
        async function getDishes(){
        let token = await that.getToken();
        let deviceId = await that.getDeviceId();
        that.http.post("/api/app/dishOne", {'token':token,'device_id': deviceId,'shop_id':that.shopId,'id':that.id}).subscribe(res => {
            console.log("res", res);
            if(res.code == 200){
                that.dishesMess = res.data;
                that.dishName = res.data.dishes_name;
                that.dishPrice = res.data.price;
                that.dishesListSelect = res.data.menu_id;
                that.discount = res.data.discount;
                that.text = res.data.description;
            }else {
                that.native.alert('提示','',res.info);
            }
        })
        }
        getDishes()
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

    addDishes() {
        let that = this;
        async function dishEdit(){
            console.log(that.dishName)
            let token = await that.getToken();
            let deviceId = await that.getDeviceId();
            let data={
                'token':token,
                'device_id': deviceId,
                'shop_id':that.shopId,
                'dishes_name':that.dishName,
                'menu_id': that.dishesListSelect,
                'price': that.dishPrice,
                'discount': that.discount,
                'is_attr':0,
                'thumb':'../../../../assets/imgs1.jpg',
                'description':that.text,
                'id':that.id
            }
            that.http.post("/api/app/dishEdit", data).subscribe(res => {
                console.log("res", res);
                if(res.code == 200){
                    that.dishesList = res.data;
                    that.navCtrl.pop();
                }else {
                    that.native.alert('提示','',res.info);
                }
            })
        }
        if(that.dishName== '' || that.dishPrice=='' || !that.dishesListSelect || that.text==""){
            that.native.alert('提示','','请把信息补充完整')
        } else if(that.discount<0 || that.discount>1){
            that.native.alert('提示','','折扣请填写0~1范围数字')
        } else{
            dishEdit()
        }
    }
}