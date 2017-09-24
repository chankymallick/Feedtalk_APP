
import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { ArticleviewerPage } from '../articleviewer/articleviewer'

import { ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-latest',
  templateUrl: 'latest.html',
})
export class LatestPage {
  @ViewChild(Content) content: Content;
  Types = "All";
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  public segmentChanged(eventObj: any) {
    this.content.scrollToTop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LatestPage');
  }
  openModal(characterNum) {
    let modal = this.modalCtrl.create(ArticleviewerPage, characterNum);
    modal.present();
  }
}


