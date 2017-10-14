import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestapiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestapiServiceProvider {

 
  data;
  
  constructor(public http: Http) {
    
  }

  getLatestFeeds(apiUrl:any) {
    if (this.data) {
      return Promise.resolve(this.data);
    }  
    return new Promise(resolve => {
      this.http.get(apiUrl)
        .map(res => res.json())
        .subscribe(data => {   
                
          this.data = data;
          resolve(this.data);
        });
    });
  }
}
