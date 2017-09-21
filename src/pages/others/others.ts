import { Component,ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-others',
  templateUrl: 'others.html',
})
export class OthersPage {
  @ViewChild(Content) content: Content;
  Types = "All";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public segmentChanged(eventObj:any){
   //this.content.scrollToTop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OthersPage');
  }

}
