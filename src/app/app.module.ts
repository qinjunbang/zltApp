import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MultiPickerModule  } from 'ion-multi-picker';
import { IonicStorageModule  } from '@ionic/storage';
import { JPush } from '@jiguang-ionic/jpush';



import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/me/login/login';
import { ShopsListPage } from '../pages/shops/shops-list/shops-list';
import { ShopsAddPage } from '../pages/shops/shops-add/shops-add';
import { MePage } from '../pages/me/me';
import { WePage } from '../pages/me/we/we';
import { WalletPage } from '../pages/me/wallet/wallet';
import { forwardPage } from '../pages/me/wallet/forward/forward';
import { addCardPage } from '../pages/me/wallet/addCard/addCard';
import { addNewCardPage } from '../pages/me/wallet/addCard/addNewCard/addNewCard';
import { DetailsPage } from '../pages/me/wallet/details/details';
import { PrivacyPage } from '../pages/me/privacy/privacy';
import { ShopsManagePage } from '../pages/shops/shops-manage/shops-manage';
import { EmployeesListPage } from '../pages/shops/employees/employees-list/employees-list';
import { EmployeesAddPage } from '../pages/shops/employees/employees-add/employees-add';
import { DishesListPage } from '../pages/shops/dishes/dishes-list/dishes-list';
import { RoomTablesListPage } from '../pages/shops/roomtables/roomtables-list/roomtables-list';
import { EquipmentsListPage } from '../pages/shops/equipments/equipments-list/equipments-list';
import { OrdersListPage } from '../pages/shops/orders/orders-list/orders-list';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { CallNumber } from '@ionic-native/call-number';
import { Network } from '@ionic-native/network';
import { AppMinimize } from '@ionic-native/app-minimize';
import { Toast } from '@ionic-native/toast';
import { File } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';
import { AppVersion } from '@ionic-native/app-version';
import { NativeAudio } from '@ionic-native/native-audio';
import { HttpModule } from '@angular/http';
import { NativeService } from '../providers/NativeService';
import { HttpService } from '../providers/HttpService';
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    ShopsListPage,
    ShopsAddPage,
    MePage,
    WePage,
    WalletPage,
    forwardPage,
    addCardPage,
    addNewCardPage,
    DetailsPage,
    PrivacyPage,
    ShopsManagePage,
    EmployeesListPage,
    DishesListPage,
    RoomTablesListPage,
    EquipmentsListPage,
    OrdersListPage,
    EmployeesAddPage
  ],
  imports: [
    BrowserModule,
    MultiPickerModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
      backButtonIcon:'ios-arrow-back',         //用作后退按钮图标的图标
      mode:'ios',                               //在整个应用程序中使用的模式。
      iconMode: 'ios',                          //在整个应用程序中为所有图标使用的模式。可用选项："ios"，"md"
      activator:'ripple',                      //用于按钮，更改按下按钮的效果。可用选项："ripple"，"highlight"
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      menuType:'reveal',                        //要显示的菜单类型 可用选项："overlay"，"reveal"，"push"
      pageTransition: 'ios-transition',             //更改页面时要使用的转换的名称。可用选项："ios-transition"，"md-transition"，"wp-transition"
      swipeBackEnabled: true,                   //是否启用本地iOS滑盖即可返回功能
      tabsHighlight: false,                       //是否在选择该选项卡时显示高亮线
      scrollPadding: false,
      scrollAssist: false,
      autoFocusAssist: false,
      platforms: {
        ios: {
        },
      }
    }),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    ShopsListPage,
    ShopsAddPage,
    MePage,
    WePage,
    WalletPage,
    forwardPage,
    addCardPage,
    addNewCardPage,
    DetailsPage,
    PrivacyPage,
    ShopsManagePage,
    EmployeesListPage,
    DishesListPage,
    RoomTablesListPage,
    EquipmentsListPage,
    OrdersListPage,
    EmployeesAddPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    CallNumber,
    Network,
    AppMinimize,
    Toast,
    File,
    ImagePicker,
    AppVersion,
    NativeAudio,
    HttpService,
    NativeService,
    Uid,
    AndroidPermissions,
    JPush
  ]
})
export class AppModule {}
