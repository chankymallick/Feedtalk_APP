
declare var unescape:any;
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController, Platform, ViewController } from 'ionic-angular';
import { UtilityProvider } from '../../providers/utility/utility';
import { CommentsPage} from '../comments/comments';

@IonicPage()
@Component({
  selector: 'page-articleviewer',
  templateUrl: 'articleviewer.html',
})
export class ArticleviewerPage {
  public Content:string;
  Feed:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public platform: Platform,
    public utlityProvider : UtilityProvider
   
  ) {
  this.Feed = navParams.get('feed');   
  
  console.log(this.Feed);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleviewerPage');
    
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  public getDecodedTrimmedText(encodedText:string){       
    return unescape(encodedText);
  }
  
}
