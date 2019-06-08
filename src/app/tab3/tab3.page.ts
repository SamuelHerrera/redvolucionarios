import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';
import { ModalService } from './services/modal.service';
import { PresenceService } from './services/presence.service';
import { ChatService } from './services/chat.service';
import { UsersListPage } from './shared/users-list/users-list.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  user: any;
  chat$ = [];
  loading = true;

  spinner = 'assets/images/spinner.gif';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private auth: AuthService,
    private menuCtrl: MenuController,
    private modalSrv: ModalService,
    private presence: PresenceService,
    private chatSrv: ChatService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.loadAll();
    });
  }

  async loadAll() {
    this.auth.getUser().then(user => {
      this.user = user;
      if (user) {
        this.loadConversations(this.user);
      }
    });
  }

  showChat(chat) {
    this.menuCtrl.toggle();
    this.router.navigate(['chat', chat.id]);
  }

  openUsersList() {
    this.modalSrv.presentModal(UsersListPage, { user: this.user });
  }

  loadConversations(user) {

    this.chatSrv.getConversations(user.uid).snapshotChanges()
      .subscribe(actions => {
        this.chat$ = actions.map(action => {
          const dataT = action.payload.doc.data();
          const id = action.payload.doc.id;

          const index = dataT.users.indexOf(user.uid);
          dataT.users.splice(index, 1);

          const otherUid = dataT.users[0];
          const presence = this.presence.getPresence(otherUid);
          this.loading = false;
          return { id, otherUid, presence, ...dataT };
        });

      });

  }

  goSettings() {
    this.router.navigate(['tabs/tab3/chat/settings']);
  }

  logout() {
    this.presence.setPresence('offline');
    this.auth.signOut();
  }

}
