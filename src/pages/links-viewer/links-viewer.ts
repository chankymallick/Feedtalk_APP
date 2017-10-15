import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController, Platform, ViewController } from 'ionic-angular';
/**
 * Generated class for the LinksViewerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-links-viewer',
  templateUrl: 'links-viewer.html',
})
export class LinksViewerPage {

  FeedLinks:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public platform: Platform) {
  this.FeedLinks = navParams.get('feedLinks');
  console.log(this.FeedLinks);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleviewerPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  public getDecodedTrimmedText(encodedText:string){    
    return decodeURI(encodedText);   
  }
}
