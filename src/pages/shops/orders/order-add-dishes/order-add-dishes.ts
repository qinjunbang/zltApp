/**
 * Created by HIAPAD on 2018/7/27.
 */
import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { NavController , ActionSheetController , NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativeService } from '../../../../providers/NativeService';
import { Config } from '../../../../providers/Config'

@Component({
  selector: 'order-add-dishes',
  templateUrl: 'order-add-dishes.html'
})
export class OrderAddDishesPage {
  public serveUrl = 'http://r.zhanglitong.com'
  public defaultList = '0';
  public defaultType= '0';
  public shopId = '';
  public ordersList:any = {};
  public order_id = '';
  public order_type = '';
  public menuType = [
    {id: 0,title:'今日特价'},
    {id: 1,title:'店长推荐'},
    {id: 2,title:'特色热卖'}
  ]; // 订单列表
  public token = Config.token;
  public device_id = Config.device_id;
  public dishesList = []; //菜式列表
  public menuId = 0 //分类id

  public dishNum = 0; //菜式数量；
  public allDishPrice = 0;  //所有菜式价格
  public selectDish = []  //自己所选的菜
  public canSee = false;  //查看购物车

  constructor(
    public http: HttpService,
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public storage: Storage,
    public native: NativeService,
    public params: NavParams
  ) {
    this.shopId = this.params.get('shopId');
    this.order_id = this.params.get('order_id');
    this.order_type = this.params.get('order_type');
  }
  ionViewDidLoad() {
     this.addDishes();
  }


  //获取菜式列表
  addDishes() {
    this.http.post("/api/app/showOrderDishes", {'token':this.token,'device_id': this.device_id,'shop_id':4}).subscribe(res => {
        console.log("res", res);
        if(res.code == 200){
          this.dishesList = res.data;
        }else {
          this.native.alert('提示','',res.info);
        }
    })
  }

  //去下单
  buy() {
    let cart = {};
    cart['order_id'] = this.order_id;
    cart['dish'] = this.selectDish;
    this.http.post("/api/app/reserveAddDishes", {'token':this.token,'device_id': this.device_id,'shop_id':4,'cart':cart,}).subscribe(res => {
        console.log("res", res);
        if(res.code == 200){
          this.native.alert('提示','',res.info);
        }else {
          this.native.alert('提示','',res.info);
        }
    })
  }

  //点击分类
  menuClick(id) {
    console.log(id);
    this.menuId = id;
  }

  //添加菜式
  add(dish) {
    let flag = true;
    let allNum = 0;
    let addPrice = 0;
    if(!dish.num){
      dish.num = 1;
    }
    this.selectDish.forEach( res => {
      if(res.id == dish.id){
        res.num++;
        flag=false;
      }
    })
    if(flag){
      this.selectDish.push(dish)
    }
    this.selectDish.forEach( res => {
      allNum += res.num;
      addPrice += res.num*res.discount_price
    })
    this.dishNum = allNum;
    this.allDishPrice = Math.floor(addPrice*100)/100;
    console.log(this.selectDish);
  }

  //删减菜式
  desc(dish) {
    let allNum = 0;
    let addPrice = 0;
    this.selectDish.forEach( (res,i) => {
      if(res.id == dish.id){
        res.num--;
      }
      if(res.num == 0){
        this.selectDish.splice(i,1)
      }
    })
    this.selectDish.forEach( res => {
      allNum += res.num;
      addPrice += res.num*res.discount_price
    })
    this.dishNum = allNum;
    this.allDishPrice = Math.floor(addPrice*100)/100;
    console.log(this.selectDish);
    if(this.selectDish.length == 0){
      this.canSee = false
    }
  }

  //查看购物车
  seeCart(){
    if(this.selectDish.length>0){
      this.canSee = !this.canSee
    }else{
      this.canSee = false
    }
  }

}
