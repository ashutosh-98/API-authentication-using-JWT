import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { UserauthService } from '../service/userauth.service'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private myServerUrl: String;
  private employee: Object;

  constructor(private httpClient: HttpClient, private userAuth: UserauthService, private router: Router) {
    this.myServerUrl = environment.myBaseServerUrl;
   }

   getEmployees(){
    const myUrl = this.myServerUrl+"api/employee/get";
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+this.userAuth.getToken());
    //console.log("In header", headers);
    return this.httpClient.get(myUrl,{headers});
  }

  deleteEmployee(id){
    const myUrl = this.myServerUrl+"api/employee/delete";
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+this.userAuth.getToken());
    return this.httpClient.delete(myUrl,{params:{id}, headers});
  }

  updateEmployee(employee){
    const myUrl = this.myServerUrl+"api/employee/update";
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+this.userAuth.getToken());
    this.httpClient.put(myUrl,employee,{headers})
    .subscribe(
      (data)=>{
        this.router.navigateByUrl("/home");
      },(err)=>{
        console.log(err);
      }
    );
  }

  addEmployee(employee){
    const myUrl = this.myServerUrl+"api/employee/add";
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+this.userAuth.getToken());
    console.log("IN add",headers)
    this.httpClient.post(myUrl, employee, {headers})
    .subscribe(
      (data)=>{
        this.router.navigateByUrl("/home");
      },(err)=>{
        console.log(err);
      }
    );
  }

  editEmployee(employee){
    this.employee = employee;
  }
}
