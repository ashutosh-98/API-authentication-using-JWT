import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router'
import {LoginComponent} from '../app/login/login.component'
import {SignupComponent} from '../app/signup/signup.component'
import {HomeComponent} from '../app/home/home.component';
import {AddemployeeComponent} from '../app/addemployee/addemployee.component'
import {EditemployeeComponent} from '../app/editemployee/editemployee.component'


const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"signup", component:SignupComponent},
  {path:"home", component:HomeComponent},
  {path:"editEmployee", component:EditemployeeComponent},
  {path:"addEmployee", component:AddemployeeComponent},
  {path: "", redirectTo: "/login", pathMatch: "full"},
  {path: "**", redirectTo: "/login", pathMatch: "full"}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
