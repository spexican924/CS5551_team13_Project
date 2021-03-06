import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {APIInfoPage} from "../APIinfo/APIinfo";
import {ItemDetailPage} from "../item-detail/item-detail";

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  arrDataS= [];
  itemsHome= [];
  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private fdb: AngularFireDatabase
  ) {

    this.afAuth.authState.take(1).subscribe(auth =>{
      this.fdb.list(`product/public`).subscribe(_data =>{
        this.arrDataS = _data;
        this.itemsHome = this.arrDataS;
        console.log(this.arrDataS);
      });
    });
  }

  initializeItems() {
    this.itemsHome = this.arrDataS;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    var q = searchbar.srcElement.value;
    if (!q) {
      return;
    }
    // if the value is an empty string don't filter the items
    this.itemsHome = this.itemsHome.filter((item) => {
      if(item.name && q) {
        if (item.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    })
  }


  itemDetail(item) {

    this.navCtrl.push(ItemDetailPage, {apiItem: item });

  }






}
