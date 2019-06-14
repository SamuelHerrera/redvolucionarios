import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  getLogoUrl() {
    return '/assets/images/PRI.svg';
  }

  getBackgroundUrl() {
    return "url('/assets/images/bg-bandera-1.jpg')";
  }

  completarEntrevista() {
    this.router.navigate(['entrevista']);
  }

}
