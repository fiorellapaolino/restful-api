import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../shared/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-google-signin',
  templateUrl: './google-signin.component.html',
  styleUrls: ['./google-signin.component.css']
})

export class GoogleSigninComponent implements OnInit {
  title = 'crystalshop';

    constructor(
      public authService: AuthService, 
      public router: Router){}

  ngOnInit(): void {}

}