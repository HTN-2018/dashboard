import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('email') email;
  @ViewChild('password') password;
  @ViewChild('password_confirm') password_confirm;

  constructor(private alertCtrl: AlertController, private db: AngularFireDatabase, private fireAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  alert(message: string){
    this.alertCtrl.create({
      title: 'Info',
      subTitle: message,
      buttons: ['OK']
    }).present(); 
  } 
 
  registerUser(){ 
    if(this.password. value == this.password_confirm.value){
      this.fireAuth.auth.createUserWithEmailAndPassword(this.email.value, this.password.value).then(data => {
        console.log('user registered', data.user.uid);
        this.alert('Registered!');
        this.navCtrl.push(HomePage);
      }).catch(error => {
        console.log('error', error);
        this.alert(error.message);
      });
    }else{
      this.alert('Passwords do not match.')
    }
  }

}
