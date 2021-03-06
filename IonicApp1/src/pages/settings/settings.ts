import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { NativeStorage } from "@ionic-native/native-storage";
import { GooglePlus } from "@ionic-native/google-plus";
import { LoginPage } from "../login/login";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { ProfilePage } from "../profile/profile";
import { FirebaseListObservable } from 'angularfire2/database';
import {DiscoveryPage} from "../discovery/discovery";
import {StarsPage} from "../stars/stars";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  // userData = [];
  profileData: FirebaseListObservable<any>;
  private status1: string;
  private buttonControl: boolean;

  constructor(public navCtrl: NavController,
    public nativeStorage: NativeStorage,
    public googlePlus: GooglePlus,
    private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private toast: ToastController) {

    this.afAuth.authState.take(1).subscribe(data => {
      if (data && data.email && data.uid) {
        // @ts-ignore
        this.profileData = this.afDatabase.object(`profile/${data.uid}`);
        if (this.profileData) {
        }
        else {
          // @ts-ignore
          this.profileData = this.afDatabase.object(`profile`);
        }
        this.status1 = "Logout";
        this.buttonControl = true;
      }
      else {
        this.toast.create({
          message: 'Please Login',
          duration: 2000
        }).present();
        // @ts-ignore
        this.profileData = this.afDatabase.object(`profile`)
        this.status1 = "Login";
        this.buttonControl = false;
      }
    });
  }

  signinp() {
    this.navCtrl.push('LoginPage');
  }

  doGoogleLogout() {
    let nav = this.navCtrl;
    let env = this;
    this.googlePlus.logout()
      .then(function (response) {
        env.nativeStorage.remove('user');
        nav.push(LoginPage);
      }, function (error) {
        console.log(error);
      })
  }
  Logout1() {
    this.afAuth.auth.signOut().then(() => {
      this.navCtrl.push('WelcomePage');
    });
  }
  ProfileCreate() {

    this.navCtrl.setRoot('ProfilePage')
  }

  buttonDisabled() {
    return !this.buttonControl;
  }
  toDiscovery() {
    this.navCtrl.push('DiscoveryPage');
  }

  toStars() {
    this.navCtrl.push('StarsPage');

  }
}
