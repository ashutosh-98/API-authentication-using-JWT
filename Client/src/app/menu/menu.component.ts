import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { UserauthService } from '../service/userauth.service'
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user:Object;

  constructor(public router: Router,private userAuth:UserauthService) {
    if(!this.userAuth.getToken())
      router.navigateByUrl("/");

   }

  ngOnInit(): void {
    this.user=this.userAuth.getToken();
  }

  logout(){
    this.userAuth.setToken(null);
    localStorage.clear();
    this.router.navigateByUrl("/")
  }

}
