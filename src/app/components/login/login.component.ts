import { Output } from '@angular/core';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() formSubmit = new EventEmitter();

  // Declarations
  public formLogin: FormGroup;

  constructor(
    private FormBuilder: FormBuilder
  ) { }

  // Method to reset form
  private resetForm = ()  => {
    this.formLogin = this.FormBuilder.group({
        email: [ null, Validators.required ],
        password: [ null, Validators.required ]
    });
  };

  ngOnInit() {
    this.resetForm();
  }
}
