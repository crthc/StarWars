import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserModel } from '../../Models/user.model';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: UserModel = new UserModel();
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.createForm();
  }

  ngOnInit(): void {}

  get emailNotValid() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get passwordNotValid() {
    return (
      this.form.get('password').invalid && this.form.get('password').touched
    );
  }

  createForm() {
    this.form = this.fb.group({
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
    });
  }

  sign() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
    this.auth.login(this.user).subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }
}
