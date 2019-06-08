import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersTable = 'users';

  constructor(
    private afs: AngularFirestore
  ) {

  }

  getUser(uid:string) {
    return this.afs.collection<any>(this.usersTable).doc(uid);
  }

  getUsers() {
    return this.afs.collection<any>(this.usersTable);
  }
  
}