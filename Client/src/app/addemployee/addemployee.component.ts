import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {

  employee: Object;
  employeeForm = new FormGroup({
    name : new FormControl("", Validators.required),
    department : new FormControl("", Validators.required),
    contactNumber: new FormControl("", [Validators.required, Validators.pattern("^[0-9]+$")]),
  });

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  addEmployee(){
    const employee = this.employeeForm.value;
    this.employeeService.addEmployee(employee);
  }
}
