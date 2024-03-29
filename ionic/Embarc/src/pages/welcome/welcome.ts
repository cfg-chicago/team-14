import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  pleaseWait: string;

  constructor(public navCtrl: NavController) { }

  login() {
    this.pleaseWait = "Loading...";
    setTimeout(()=>{
      this.pleaseWait = "";
      this.navCtrl.push('ListMasterPage');
    }, 1000);


  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
