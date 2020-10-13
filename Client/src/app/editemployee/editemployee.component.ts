import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css']
})
export class EditemployeeComponent implements OnInit {
  employee: Object;
  employeeForm = new FormGroup({
    name : new FormControl("", Validators.required),
    department : new FormControl("", Validators.required),
    contactNumber: new FormControl("", [Validators.required, Validators.pattern("^[0-9]+$")]),
  });

  constructor(private employeeService: EmployeeService) {
    this.employee = this.employeeService.getEmployees();
    this.employeeForm.setValue({
      name : this.employee['name'] || null,
      department : this.employee['department'] || null,
      contactNumber : this.employee['contactNumber'] || null
    });
   }

  ngOnInit(): void {
  }

  updateEmployee(){
    const employee = this.employeeForm.value;
    employee['_id'] = this.employee['_id'];
    this.employeeService.updateEmployee(employee);
  }

}
