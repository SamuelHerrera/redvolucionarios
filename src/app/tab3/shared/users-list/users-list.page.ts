import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PresenceService } from '../../services/presence.service';
import { UidService } from '../../services/uid.service';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { ChatService } from '../../services/chat.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss']
})
export class UsersListPage implements OnInit {

  user$ = [];
  filteredUsers = [];
  searchTerm = '';
  @Input() user: any;

  constructor(
    private userSrv: UserService,
    private presence: PresenceService,
    private uidSrv: UidService,
    private router: Router,
    public modalSrv: ModalService,
    private chatSrv: ChatService,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {

    const ref = this.userSrv.getUsers().snapshotChanges();
    ref.subscribe(actions => {
      this.user$ = actions.map(action => {
        const dataT = action.payload.doc.data();
        const id = action.payload.doc.id;
        const presence = this.presence.getPresence(id);

        return { id, presence, ...dataT };
      }).filter(action => {
        return action.id !== this.user.uid;
      });
      this.filteredUsers = this.user$;
    });

  }

  startChat(u) {

    const cid = this.uidSrv.unique(u.uid, this.user.uid);

    this.chatSrv.getConversationRef(cid).get().subscribe(res => {
      if (res.exists) {
        this.redirectToConversation(res.data().uid);
      } else {
        this.createNewConversation(cid, u);
      }
    });

  }

  private createNewConversation(cid, u) {
    const conversation = {
      uid: cid,
      messages: [],
      lastUpdated: Date.now(),
      users: [u.uid, this.user.uid]
    };

    conversation[this.user.uid] = {
      lastUpdated: Date.now(),
      displayName: this.user.displayName,
      photoURL: this.user.photoURL
    };
    conversation[u.uid] = {
      lastUpdated: Date.now(),
      displayName: u.displayName,
      photoURL: u.photoURL
    };

    this.chatSrv.create(conversation).then(() => {
      this.redirectToConversation(cid);
    });
  }

  private redirectToConversation(cid) {
    this.menuCtrl.close();
    this.router.navigate(['tabs/tab3/chat/chat', cid]);
    this.modalSrv.closeModal();
  }


  filterUser(term) {
    this.filteredUsers = this.user$.filter((a) => {
      return (a.displayName.toLowerCase().indexOf(term.toLowerCase()) > -1);
    });
  }

}
