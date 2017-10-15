import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UtilityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilityProvider {

  constructor(public http: Http) {
    console.log('Hello UtilityProvider Provider');
  }
  public getTimeInterval(time1:number){
    try{
      var date_now = new Date(time1).getTime();
      var date_future = new Date().getTime();
      var delta = Math.abs(date_future - date_now) / 1000;
      var days = Math.floor(delta / 86400);
      delta -= days * 86400;
      var hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;
      var minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;
      var seconds = delta % 60;
      
      if(days != 0){
        return days + " Days Ago";
      }
      if(hours != 0){
        return hours + " hours Ago";
      }
      if(minutes != 0){
        return minutes + " minutes Ago";
      }
      if(minutes == 0){
        return "just now";
      }
    }
    catch(err){
      return null;
    } 
  }

}
