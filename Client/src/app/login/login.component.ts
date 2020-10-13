import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators } from '@angular/forms'
import {UserauthService} from '../service/userauth.service'
//import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  uservalidationFailedmessage:string;
  loginForm= new FormGroup({
    userName:new FormControl("",Validators.required),
    password:new FormControl("",[Validators.required,Validators.minLength(8)])
  })

  constructor(private router: Router, private userAuth:UserauthService) {
    if(this.userAuth.getToken())
      this.router.navigateByUrl("/home")
   }

  ngOnInit(): void {
  }

  loginEventHandler(){
    var user={
      userName:this.loginForm.value.userName,
      password:this.loginForm.value.password
    }
    this.userAuth.authenticate(user);
    // console.log(user);
  }
}
