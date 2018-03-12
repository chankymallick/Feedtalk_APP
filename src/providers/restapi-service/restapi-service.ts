import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Promise } from 'firebase';
import { UtilityProvider} from '../utility/utility';

/*
  Generated class for the RestapiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestapiServiceProvider {

 

  
  constructor(public http: Http,public progress: LoadingController,public utility : UtilityProvider) {
    
  }
  public data;
  public likeStatus;
  public Comments;
  public progressObject;
  public localHOST = "http://192.168.1.6:8080/";
  //public localHOST = "https://feedtalk-api.herokuapp.com/";
 
  public postNewComment(comment:any,feedid:number){  

  this.startProgress("Loading content ...") 
  return new Promise(resolve => {  
    this.http.put(this.localHOST+"feed/comments/new/"+feedid+"/",comment)
      .map(res => res.json())
      .subscribe(data => {               
        if(data == true){
          this.utility.presentToast("Comment Posted Succesfully");
        }
        else{
          this.utility.presentToast("Failed");
        }
        resolve(this.data);
      });
      this.stopProgress();
  });    
  }
  public postNewReply(Reply:any,feedid:number,CommentId:number){  
    
      this.startProgress("Loading content ...") 
      return new Promise(resolve => {  
        this.http.put(this.localHOST+"feed/reply/new/"+feedid+"/"+CommentId+"/",Reply)
          .map(res => res.json())
          .subscribe(data => {               
            if(data == true){
              this.utility.presentToast("Reply Posted Succesfully");
            }
            else{
              this.utility.presentToast("Failed");
            }
            resolve(this.data);
          });
          this.stopProgress();
      });    
      }
  public getLatestFeeds(apiUrl:any) {
    this.startProgress("Loading content ...") 
    return new Promise(resolve => {
      this.http.get(this.localHOST+apiUrl)
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
  public putRequest(ApiLink:string,body:Object,SuccesMessage:string){
    this.startProgress("Loading content ...") 
    return new Promise(resolve => {
      this.http.put(this.localHOST+ApiLink,body)
        .map(res => res.json())
        .subscribe(value => {   
              
          this.likeStatus = value;
          resolve(this.likeStatus);
          

        });
        this.stopProgress();
    });    
  }
  public getRequest(ApiLink:string,SuccesMessage:string){
    this.startProgress("Loading content ...") 
    return new Promise(resolve => {
      this.http.get(this.localHOST+ApiLink)
        .map(res => res.json())
        .subscribe(value => {   
              
          this.Comments = value;
          resolve(this.Comments);
          

        });
        this.stopProgress();
    });    
  }
}
