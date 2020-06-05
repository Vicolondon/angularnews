import { Output } from '@angular/core';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() formSubmit = new EventEmitter();

  // Declarations
  public formRegister: FormGroup;

  constructor(
    private FormBuilder: FormBuilder
  ) { }

  // Method to reset form
  private resetForm = ()  => {
    this.formRegister = this.FormBuilder.group({
        email: [ null, Validators.required ],
        password: [ null, Validators.required ],
        firstname: [ null, Validators.required ],
        lastname: [ null, Validators.required ]
    });
  };

  ngOnInit() {
    this.resetForm();
  }
}
