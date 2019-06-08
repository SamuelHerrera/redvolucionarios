import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { firestore } from 'firebase/app';
import { map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: any;

  conversationsTable = 'conversations';

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private userSrv: UserService
  ) {

  }

  getConversationRef(chatId) {
    return this.afs
      .collection<any>(this.conversationsTable)
      .doc(chatId);
  }

  getConversation(chatId) {
    return this.getConversationRef(chatId)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return { id: doc.payload.id, ...doc.payload.data() };
        })
      );
  }

  getConversations(uid:string) {
    return this.afs
      .collection<any>(this.conversationsTable, 
      ref => ref.where('users', 'array-contains', uid)
      .orderBy('lastUpdated', 'desc')
      );

  }
  create(conversation) {
    return this.afs.collection<any>(this.conversationsTable).doc(conversation.uid).set(conversation, {merge: false});
  }

  async enter(chatId) {
    const { uid, displayName, photoURL } = await this.auth.getUser();

    if (uid) {
      const ref = this.afs.collection(this.conversationsTable).doc(chatId);

      let msgToSave = {};

      msgToSave[uid] = {
        lastUpdated: Date.now(),
        displayName: displayName,
        photoURL: photoURL
      };
      return ref.update(msgToSave);
    }
  }

  async sendMessage(chatId, content) {
    const { uid, displayName, photoURL } = await this.auth.getUser();

    const data = {
      uid,
      content,
      createdAt: Date.now()
    };

    if (uid) {
      const ref = this.afs.collection(this.conversationsTable).doc(chatId);

      let msgToSave = {
        messages: firestore.FieldValue.arrayUnion(data),
        lastUpdated: Date.now()
      };

      msgToSave[uid] = {
        lastUpdated: Date.now(),
        displayName: displayName,
        photoURL: photoURL
      };
      return ref.update(msgToSave);
    }
  }

}