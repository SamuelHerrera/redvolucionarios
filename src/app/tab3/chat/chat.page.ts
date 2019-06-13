import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, IonContent } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { PresenceService } from '../services/presence.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss']
})
export class ChatPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  chatId: string;
  userInput = '';
  me: any;
  otherUid: string;
  userPresence: any;

  chatData: any;

  sending = false;

  formatDay = 'DD-MM-YYYY';
  formatHour = 'HH:mm:ss';

  constructor(
    private menuCtrl: MenuController,
    private route: ActivatedRoute,
    public chatSrv: ChatService,
    public auth: AuthService,
    private presenceSrv: PresenceService
  ) { }

  ngOnInit() {
    const chatId = this.route.snapshot.paramMap.get('id');
    this.chatId = chatId;
    this.auth.getUser().subscribe(user => {
      this.me = user;
      if (user) {
        this.chatSrv.getConversationRef(this.chatId)
          .valueChanges().subscribe((res: any) => {
            this.chatData = res;
            const index = res.users.indexOf(this.me.uid);
            res.users.splice(index, 1);
            this.otherUid = res.users[0];
            this.userPresence = this.presenceSrv.getPresence(this.otherUid);
            console.log(this.otherUid, this.userPresence);
            this.scrollToBottom();
          });
        this.chatSrv.enter(this.chatId);
      }
    });
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'end');
    this.menuCtrl.enable(true, 'start');
  }

  submit() {

    if (this.userInput.length > 0) {
      this.sending = true;
      this.chatSrv.sendMessage(this.chatId, this.userInput).then(() => {
        this.sending = false;
        this.chatSrv.enter(this.chatId);
        this.scrollToBottom();
      });

      this.userInput = '';
    }

  }

  trackByCreated(i, msg) {
    return msg.createdAt;
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom()) {
        this.content.scrollToBottom();
      }
    }, 1000);
  }

}
