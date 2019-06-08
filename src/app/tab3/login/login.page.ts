import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private loading: LoadingController,
    private menuCtrl: MenuController,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  async presentLoading() {
    const loading = await this.loading.create({
      message: 'Loading ...',
      duration: 2000
    });
    return await loading.present();
  }

  loginFacebook(): void {
    this.presentLoading();
    this.auth.FacebookAuth();
  }
  loginGoogle(): void {
    this.presentLoading();
    this.auth.GoogleAuth();

  }
  loginTwitter(): void {
    this.presentLoading();
    this.auth.TwitterAuth();
  }


}
