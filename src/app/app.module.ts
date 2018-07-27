import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';



import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/me/login/login';

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
// import { HTTP } from '@ionic-native/http';
import { HttpModule } from '@angular/http';
import { NativeService } from '../providers/NativeService';
import { HttpService } from '../providers/HttpService';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage
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
    NativeService


  ]
})
export class AppModule {}
