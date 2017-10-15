import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestapiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestapiServiceProvider {

 

  
  constructor(public http: Http,public progress: LoadingController) {
    
  }
  data;
  progressObject;
  getLatestFeeds(apiUrl:any) {
    this.startProgress("Loading content ...") 
    return new Promise(resolve => {
      this.http.get(apiUrl)
        .map(res => res.json())
        .subscribe(data => {   
                
          this.data = data;
          resolve(this.data);

        });
        this.stopProgress();
    });    
  }
  public startProgress(val) {
    this.progressObject = this.progress.create({
      content: val,

      dismissOnPageChange: true
    });
    this.progressObject.present();
  }
  public stopProgress() {
    this.progressObject.dismiss();
  }
}
