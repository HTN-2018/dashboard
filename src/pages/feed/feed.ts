import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , App} from 'ionic-angular';
import { Observable } from 'rxjs-compat';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import 'rxjs/add/operator/first';



/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {
  uid: string;
  fb_user: Observable<any>;
  events: Observable<any>;
  age_ranges: string[];
  genders: string[];
  times: string[];
  data: any[];
  length: number;

  constructor(public app: App, private storage: AngularFireStorage, private fbAuth: AngularFireAuth, private db: AngularFireDatabase, private iab: InAppBrowser, public navCtrl: NavController, public navParams: NavParams) {
    this.uid = fbAuth.auth.currentUser.uid;
    this.data = [];
    this.age_ranges = [];
    this.genders = [];
    this.times = [];
    this.fb_user = db.object('users/' + this.uid).valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
    this.fb_user.subscribe(res => {
      this.data = Object.keys(res).map(function(k){
        return res[k];
      });
      /*
      for(var i=0; i<this.data.length;i++){
        this.age_ranges.push(this.data[i]['age_range'])
        this.genders.push(this.data[i]['gender'])
        this.times.push(this.data[i]['time'])
      }
      */
      //console.log(this.age_ranges, this.times, this.genders)
      for(var i=0; i<this.data.length; i++){
        this.data[i]['download_url'] = this.storage.ref('images/' +this.uid + '/face' + i + '.jpg').getDownloadURL();
        console.log(this.data[i]['download_url']);
      }

      console.log(this.data)
    });

    



  }


  linkJupyter(){
    const browser = this.iab.create("http://localhost:8888/?token=d68c7f78048e729d35e4dfb3634298e3b6d76be1565bd7a6");
  }

}
