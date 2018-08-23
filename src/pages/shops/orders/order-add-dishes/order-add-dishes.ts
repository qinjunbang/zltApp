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
  public seeRegu = false; //查看多规格
  public reguDish = []; //多规格菜式
  public reguSpec = []; //多规格菜式分类
  public reguPrice = 0; //多规格所选菜式价格;
  public reguName = {}

  constructor(
    public http: HttpService,
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public storage: Storage,
    public native: NativeService,
    public params: NavParams
  ) {
    this.shopId = this.params.get('shop_id');
    this.order_id = this.params.get('order_id');
    this.order_type = this.params.get('order_type');
  }
  ionViewDidLoad() {
     this.addDishes();
  }


  //获取菜式列表
  addDishes() {
    this.http.post("/api/app/showOrderDishes", {'token':this.token,'device_id': this.device_id,'shop_id':this.shopId}).subscribe(res => {
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
    let data = {};
    let arr = [];
    cart['order_id'] = this.order_id;
    cart['dish'] = [];
    this.selectDish.forEach( res => {
      data['dishes_id'] = res.id;
      data['dishes_name'] = res.dishes_name;
      data['goods_number'] = res.num;
      data['price'] = res.price;
      data['sell_price'] = res.discount_price;
      data['is_attr'] = res.is_attr;
      if(res.spec){
        res.spec.forEach( res => {
          arr.push(res.spec_name+"|"+res.spec_price)
        })
      }
      data['spec'] = arr.join(',');
      cart['dish'].push(data);
      data = {}
    })
    console.log(cart);
    if(this.selectDish.length > 0){
      this.http.post("/api/app/reserveAddDishes", {'token':this.token,'device_id': this.device_id,'shop_id':this.shopId,'cart':cart,}).subscribe(res => {
          console.log("res", res);
          if(res.code == 200){
            this.native.alert('提示','',res.info);
          }else {
            this.native.alert('提示','',res.info);
          }
      })
    }
  }

  //点击分类
  menuClick(id) {
    console.log(id);
    this.menuId = id;
  }

  //添加菜式
  add(dish) {
    let flag = true;
    let specFlag = true;
    if(!dish.num){
      dish.num = 1;
    }
    //是否多规格
    if(dish.spec){
      this.selectDish.forEach( res => {
        if(res.id == dish.id){
          res.spec.forEach( (val1,i) => {
            specFlag = true;
            dish['spec'].forEach( (val2,j) => {
              if( i==j){
                if(val1.spec_name != val2.spec_name){
                  specFlag = false;
                  return;
                }
              }
            })
          })
          if(specFlag){
            res.num++;
          }
        }
      })
    }else{
      this.selectDish.forEach( res => {
        if(res.id == dish.id){
          res.num++;
          flag=false;
        }
      })
      if(flag){
        this.selectDish.push(dish)
      }
    }
    console.log(this.selectDish);
  }

  //删减菜式
  desc(dish) {
    let specFlag = true;
    if(dish.spec){
      this.selectDish.forEach( (res,i) => {
        if(res.id == dish.id){
          res.spec.forEach( (val1,i) => {
            specFlag = true;
            dish['spec'].forEach( (val2,j) => {
              if( i==j){
                if(val1.spec_name != val2.spec_name){
                  specFlag = false;
                  return;
                }
              }
            })
          })

          if(specFlag){
            res.num--;
          }
        }
        if(res.num <= 0){
          this.selectDish.splice(i,1)
        }
      })
    }else{
      this.selectDish.forEach( (res,i) => {
        if(res.id == dish.id){
          res.num--;
        }
        if(res.num <= 0){
          this.selectDish.splice(i,1)
        }
      })
    }
    
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
      this.canSee = false;
    }
  }

  //点击多规格
  chooseRegu(dish) {
    this.seeRegu = !this.seeRegu;
    this.reguDish = dish;
  }
  //选择多规格分类
  selectSpec(spec,I) {
    console.log(spec)
    let price = 0;
    this.reguSpec[I] = spec;
    this.reguName[I] = spec.spec_name;
    console.log(this.reguSpec)
    this.reguSpec.forEach( res => {
      price += Number(res.spec_price);
    })
    this.reguPrice = Number(this.reguDish['discount_price']) + Number(price);
  }

  //隐藏多规格
  hiddenRegu() {
    this.seeRegu = !this.seeRegu;
    this.reguSpec = [];
    this.reguName = [];
    this.reguPrice = 0;
  }

  //多规格加入购物车
  joinCart(reguDish) {
    let flag = true;
    let specFlag = true;
    let regu = Object.assign({},reguDish);
    if(this.reguSpec.length == 0){
      return false;
    }
    if(!regu['num']){
      regu['num'] = 1;
    }
    let arr = this.reguSpec;
    regu['spec'] = arr;
    console.log("this.reguSpec", this.reguSpec)

    this.selectDish.forEach( res => {
      if(res.id == regu['id']){
        res.spec.forEach( (val1,i) => {
          regu['spec'].forEach( (val2,j) => {
            if( i==j){
              if(val1.spec_name != val2.spec_name){
                specFlag = false;
              }
            }
          })
        })
        if(specFlag){
          res.num++;
          flag = false;
        }
      }
    })
      console.log("mydata", regu);
   
    if(flag){
      //let a = regu
      this.selectDish.push(regu);
      this.reguSpec = [];
      this.reguName = [];
      this.reguPrice = 0;
      this.native.showToast('已加入购物车!')
    }
    console.log(this.selectDish)
  }

  //字符串转化成数字
  floor(val) {
    return Math.floor(val*100)/100
  }
  //计算多规格价格
  specPrice(dish) {
    let price =0;
    dish.spec.forEach( res => {
      price += Number(res.spec_price)
    })
    return (this.floor(dish.discount_price) + this.floor(price)) * dish.num
  }
  //计算购物车总价格
  allPrice() {
    let price = 0 , allPrice = 0;
    this.selectDish.forEach( res => {
      if(res.spec){
        res.spec.forEach( res => {
          price += Number(res.spec_price)
        })
        allPrice += res.num*(Number(res.discount_price) + Number(price))
      }else{
        allPrice += res.num*res.discount_price
      }
    })
    return allPrice.toFixed(2);
  }

  //计算总数量
  allNum() {
    let allNum = 0;
    this.selectDish.forEach( res => {
      allNum += res.num; 
    })
    return allNum;
  }
  //多规格名字显示
  specName(spec) {
    let arr = [];
    spec.forEach( res => {
      arr.push(res.spec_name+"|"+res.spec_price)
    })
    return arr.join(',');
  }
}
