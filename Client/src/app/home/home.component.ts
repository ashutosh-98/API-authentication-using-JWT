import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  employees;
  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.getEmployees();
  }


  getEmployees(){
    this.employeeService.getEmployees()
    .subscribe(
      (data)=>{
        this.employees = data;
      },(err)=>{
        console.log(err);
      }
    );
  }

  editEmployee(employee){
    this.employeeService.editEmployee(employee);
    this.router.navigateByUrl("/editEmployee")
    return;
  }

  deleteEmployee(_id){
    this.employeeService.deleteEmployee(_id)
    .subscribe(
      (data)=>{
        const pos = this.employees.findIndex((employee)=> employee._id == data['value']['_id']);
        if(pos >= 0){
          this.employees.splice(pos,1);
        }
      },
      (err)=>{
        console.log(err);
      }
    );
  }

}
