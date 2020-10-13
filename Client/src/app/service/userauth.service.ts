import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserauthService {
  private myServerUrl: string;
  private token;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.myServerUrl = environment.myBaseServerUrl;
    this.token = localStorage.getItem('token');
   }

   authenticate(user){
    const myUrl = this.myServerUrl+"api/user/authenticate";
    console.log(user);
    let headers = new HttpHeaders();
    headers = headers.append('user',JSON.stringify(user));
    this.httpClient.get(myUrl,{headers})
    .subscribe(
      (data)=>{
        this.token = data['token']
        localStorage.setItem('token', this.token);
        console.log("This is it",this.token);
        this.router.navigateByUrl('/home');
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  getToken(){
    return this.token;
  }

  setToken(token){
    this.token = token;
  }
}
