
import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { ArticleviewerPage } from '../articleviewer/articleviewer'
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-latest',
  templateUrl: 'latest.html',
})
export class LatestPage {
  @ViewChild(Content) content: Content;
  Types = "All";
  LatestFeed:any;
  

  public getDecodedTrimmedText(encodedText:string){
    
    return decodeURI(encodedText);   
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public restApi: RestapiServiceProvider
  ) {   
    restApi.getLatestFeeds("https://localhost:8443/feed/latest").then(data => {     
      this.LatestFeed =data;      
    });   
  }

  public segmentChanged(eventObj: any) {
    this.content.scrollToTop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LatestPage');
  }
  openModal(Feed:any) {
    let modal = this.modalCtrl.create(ArticleviewerPage, {"feed":Feed});
    modal.present();
  }
  public converDate(date:number){
    var customDate = new Date(date);

  }
}


