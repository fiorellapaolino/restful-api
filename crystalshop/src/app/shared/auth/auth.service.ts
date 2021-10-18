import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../../google-signin/models/user.model';
import { auth } from 'firebase/app';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    public authFire: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    //  <   this.authFire.authState.subscribe((user) => {
    //       debugger;
    //       if (user) {
    //         this.userData = user;
    //         localStorage.setItem('user', JSON.stringify(this.userData));
    //       } else {
    //         localStorage.setItem('user', null!);
    //       }
    //     });>
    this.userData = JSON.parse(localStorage.getItem('user')!);
    console.log(this.userData)
  }

  ngOnInit() {}

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  AuthLogin(provider: any) {
    return this.authFire.auth
      .signInWithPopup(provider)
      .then((result) => {
        this.userData = result.user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.SetUserData(result.user);
        this.ngZone.run(() => {
          this.router.navigate(['stock']);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  get isLoggedIn(): boolean {
    const isLogged = localStorage.getItem('user');
    return isLogged !== null ? true : false;
  }

  SetUserData(user: any) {
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
  }

  SignOut() {
    return this.authFire.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
