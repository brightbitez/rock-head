import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import * as moment from 'moment';

@Component({
  selector: 'app-event-action-modify-page',
  templateUrl: './event-action-modify-page.component.html',
  styleUrls: ['./event-action-modify-page.component.css']
})
export class EventActionModifyPageComponent implements OnInit {

  form: FormGroup;
  employee: Employee;
  submitted = false;
  validated = false;
  type = ""
  formTmp: FormGroup;
  modify = [
    {
      element_name: 'firstname',
      isModify: false
    },

    {
      element_name: 'lastname',
      isModify: false
    },
    {
      element_name: 'firstname',
      isModify: false
    },
    {
      element_name: 'firstname',
      isModify: false
    },
    {
      element_name: 'firstname',
      isModify: false
    },
    {
      element_name: 'firstname',
      isModify: false
    }
  ]
  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
  }

  // TODO: Get data by id
  ngOnInit(): void {
    this.employeeService.getEmployee('251182').subscribe(data => {
      console.log(data);
      this.form = this.fb.group({
        passport: new FormControl(data.passport, Validators.required),
        employee_no: new FormControl(data.employee_no, Validators.required),
        firstname: new FormControl(data.firstname, Validators.required),
        lastname: new FormControl(data.lastname, Validators.required),
        position: new FormControl(data.position, Validators.required),
        start_date: new FormControl(moment(data.start_date).format('yyyy-MM-DD'), Validators.required),
        email: new FormControl(data.email, Validators.required),
        phone: new FormControl(data.phone, Validators.required),
      })
      this.formTmp = this.form;
      if (this.form.value.passport.length == 13)
        this.type = "Citizen identity number";
      else
        this.type = "Passport";
    });
  }


  onSubmit(): void {
    if (this.form.valid) {
      const firstname = this.form.value.firstname;
      const lastname = this.form.value.lastname;
      const position = this.form.value.position;
      const start_date = this.form.value.start_date;
      const email = this.form.value.email;
      const phone = this.form.value.phone;
      Swal.fire({
        title: 'Are you sure?',
        html: `
          Firstname: ${firstname}
          <br/>
          Lastname: ${lastname}
          <br/>
          Position: ${position}
          <br/>
          Start Date: ${start_date}
          <br/>
          Email: ${email}
          <br/>
          Phone: ${phone}
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Successful!',
            'Your file has been modified.',
            'success'
          );
        }
      });
    }
    else {
      this.validated = true;
    }
  }
}
