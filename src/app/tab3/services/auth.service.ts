import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  user$: Observable<any>;
  authState: any;
  windowRef: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public ngZone: NgZone,
    private userSrv: UserService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.userSrv.getUser(user.uid).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  isLogged(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if (user) {
          resolve(true);
        } else {
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }

  getUser() {
    return this.user$.pipe(first()).toPromise();
  }

  private updateUserData({ uid, email, displayName, photoURL }) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      displayName,
      photoURL
    };

    return userRef.set(data, { merge: true });
  }

  signup(phone: string, appVerifier: any) {
    this.windowRef = this.windowReference();
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible'
    });
    this.afAuth.auth
      .signInWithPhoneNumber(phone, appVerifier)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }
  TwitterAuth() {
    return this.AuthLogin(new auth.TwitterAuthProvider());
  }

  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.updateUserData(result.user).then(res => {
            this.router.navigate(['tabs/tab3/chat/home']);
          });
        });

      }).catch((error) => {
        window.alert(error);
      });
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['tabs/tab1']);
    });
  }

  windowReference() {
    return window;
  }

}
