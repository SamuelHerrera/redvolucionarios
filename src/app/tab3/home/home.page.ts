import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MenuController } from '@ionic/angular';
import { UsersListPage } from '../shared/users-list/users-list.page';
import { ModalService } from '../services/modal.service';
import { Tab3Page } from '../tab3.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  user: any;

  constructor(
    private menuCtrl: MenuController,
    private auth: AuthService,
    private modalSrv: ModalService,
    private app: Tab3Page
  ) {

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.app.loadAll();
    this.auth.getUser().subscribe(user => {
      this.user = user;
      console.log(this.user);
    });
  }

  openUsersList() {
    this.modalSrv.presentModal(UsersListPage, { user: this.user });
  }

  loginWithGoogle() {
    this.auth.GoogleAuth().then(() => {
      console.log('logged in!');
    });
  }

  getBackgroundUrl() {
    return "url('/assets/images/bg-2.jpg')";
  }

  logout() {
    this.auth.signOut();
  }

}
