import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserModel } from '../../Models/user.model';
import { AuthService } from '../../Services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user: UserModel;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.user = new UserModel();

    this.user.email = 'carlos@ulex.es';
  }

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

  createForm() {
    this.form = this.fb.group({
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
    });
  }

  sign() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'wait please...',
    });
    Swal.showLoading();

    this.auth.newUser(this.user).subscribe(
      (resp) => {
        console.log(resp);
        Swal.close();
        this.router.navigateByUrl('/starships');
      },
      (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Authentication error',
          text: err.error.error.message,
        });
      }
    );
  }
}
