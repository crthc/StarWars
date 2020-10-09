import { Component, OnInit } from '@angular/core';
import { ValidatorsService } from '../../Services/validators.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  user = {
    name: '',
  };

  constructor(private fb: FormBuilder, private validators: ValidatorsService) {
    this.createForm();
  }

  ngOnInit(): void {}

  get nameNotValid() {
    return this.form.get('name').invalid && this.form.get('name').touched;
  }

  get lastNameNotValid() {
    return (
      this.form.get('lastName').invalid && this.form.get('lastName').touched
    );
  }

  get emailNotValid() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get passwordNotValid() {
    return (
      this.form.get('password').invalid && this.form.get('password').touched
    );
  }

  get confirmPasswordNotValid() {
    const password = this.form.get('password').value;
    const confirmPassword = this.form.get('confirmPassword').value;

    return password === confirmPassword ? false : true;
  }

  createForm() {
    this.form = this.fb.group(
      {
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
          ],
        ],
      },
      {
        validators: this.validators.samePasswords(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  sign() {
    console.log(this.form);

    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }
}