import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilityProvider } from '../../providers/utility/utility';
import { AlertController } from 'ionic-angular';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  public getCommentBody(text: string, username: string) {
    var body = {
      "commentText": text,
      "userName": username,
      "hiden": false
    }
    return body;
  }
  public getReplyBody(text: string, username: string) {
    var body = {
      "replyText": text,
      "userName": username
    }
    return body;
  }
  public Comments;
  public FeedId;
  public CommentLikeValue;
  public CommentDislikeValue;



  constructor(public restAPI: RestapiServiceProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public utlityProvider: UtilityProvider) {
    this.Comments = navParams.get('feed').comments;
    this.FeedId = navParams.get('feed').feedId;
    this.CommentDislikeValue = null;
    this.CommentLikeValue = null;

  }

  ionViewDidLoad() {   
  }
  public getTimeInterval(publishedTime: number) {
    return this.utlityProvider.getTimeInterval(publishedTime);
  }
  public refreshCommentData(){
    this.restAPI.getRequest("feed/comments/" + this.FeedId + "/", "Comment Loaded").then(data => {     
      this.Comments = data;
    });  
  }
  public likeComment(CommentID: number) { 
     
    this.restAPI.putRequest("feed/comments/like/" + this.FeedId + "/" + CommentID + "/", {}, "Comment Liked").then(data => {     
      document.getElementById("LikeButton_"+CommentID).innerHTML = '<span class="button-inner"><ion-icon name="thumbs-up" role="img" class="icon icon-md ion-md-thumbs-up" aria-label="thumbs up" ng-reflect-name="thumbs-up"></ion-icon>'+data+'</span><div class="button-effect"></div>';
    });  
    
  }
  public dislikeComment(CommentID: number) {
    //this.CommentDislikeValue = this.restAPI.putRequest("feed/comments/dislike/" + this.FeedId + "/" + CommentID + "/", {}, "Comment Disliked");
    this.restAPI.putRequest("feed/comments/dislike/" + this.FeedId + "/" + CommentID + "/", {}, "Comment Disliked").then(data => {     
      document.getElementById("DislikeButton_"+CommentID).innerHTML = '<span class="button-inner"><ion-icon name="thumbs-down" role="img" class="icon icon-md ion-md-thumbs-down" aria-label="thumbs down" ng-reflect-name="thumbs-down"></ion-icon>'+data+'</span><div class="button-effect"></div>';
    });
  
  }
  public reportComment() {

  }
  public newComment() {
    let prompt = this.alertCtrl.create({
      title: 'Write Comment',
      message: "500 Character Left",
      inputs: [
        {
          name: 'Comment',
          placeholder: 'Comment'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: 'Post',
          handler: data => {
            this.restAPI.postNewComment(this.getCommentBody(data.Comment, "chanky"), this.FeedId).then(data => {     
              this.refreshCommentData();
            });
         
          }
        }
      ]
    });
    prompt.present();
  }
  public newReply(CommentId: number, replyto: string) {
    let prompt = this.alertCtrl.create({
      title: 'Reply To ' + replyto,
      message: "500 Character Left",
      inputs: [
        {
          name: 'Reply',
          placeholder: 'Reply'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: 'Post',
          handler: data => {
            this.restAPI.postNewReply(this.getReplyBody(data.Reply, "chanky"), this.FeedId, CommentId).then(data => {     
              this.refreshCommentData();
            });
           
          }
        }
      ]
    });
    prompt.present();
  }



}
