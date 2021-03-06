import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { Items } from '../mocks/providers/items';
import { Settings, User, Api } from '../providers';
import { MyApp } from './app.component';

import {APIInfoPage} from "../pages/APIinfo/APIinfo";
import {HttpModule} from "@angular/http";
import {HTTP} from "@ionic-native/http";
import { LoginServiceProvider } from '../providers/login-service/login-service';
import {GooglePlus} from "@ionic-native/google-plus";
import {NativeStorage} from "@ionic-native/native-storage";
import { InAppBrowser} from "@ionic-native/in-app-browser";
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {FIREBASE_CONFIG} from "./app.firebase.config";
import {AngularFireAuthModule} from  "angularfire2/auth";
import {ItemCreatePage} from "../pages/item-create/item-create";
import {ItemDetailPage} from "../pages/item-detail/item-detail";

import { Connectivity } from '../providers/connectivity-service/connectivity-service';
import { GoogleMaps  } from '../providers/google-maps/google-maps';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';

import firebase from 'firebase';
firebase.initializeApp(FIREBASE_CONFIG);
import { GoogleCloudVisionServiceProvider } from '../providers/google-cloud-vision-service/google-cloud-vision-service';
import {WalmartLab} from "../services/rest/walmartLab";
import {AmazonAws} from "../services/rest/amazon";
import {EbayLab} from "../services/rest/ebay";

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp,
    APIInfoPage,
    ItemCreatePage,
    ItemDetailPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    APIInfoPage,
    ItemCreatePage,
    ItemDetailPage
  ],
  providers: [
    Api,
    Items,
    User,
    Camera,
    SplashScreen,
    StatusBar,
    WalmartLab,
    EbayLab,
    InAppBrowser,
    AmazonAws,
    GooglePlus,
    NativeStorage,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoginServiceProvider,
    GoogleCloudVisionServiceProvider,
    Connectivity,
    GoogleMaps,
    Network,
    Geolocation
  ]
})
export class AppModule { }
