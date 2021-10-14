import { Component, OnInit } from '@angular/core';
import { AuthService } from "./shared/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'crystalshop';

  constructor(public authService: AuthService){}
  
  ngOnInit(): void {}

}
