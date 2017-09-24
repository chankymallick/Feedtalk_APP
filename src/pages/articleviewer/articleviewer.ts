import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController, Platform, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-articleviewer',
  templateUrl: 'articleviewer.html',
})
export class ArticleviewerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleviewerPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}

