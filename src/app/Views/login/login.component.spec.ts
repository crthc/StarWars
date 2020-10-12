import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('is form invalid when empty', () => {
    let itemEmail = component.form.controls['email'];
    itemEmail.setValue('michael@mns.com');
    let itemPassword = component.form.controls['password'];
    itemPassword.setValue('ggggggggg');
    expect(component.form.valid).toBeTruthy();
  });

  it('is form invalid when email patterns do not match', () => {
    let itemEmail = component.form.controls['email'];
    itemEmail.setValue('michael@mns');
    let itemPassword = component.form.controls['password'];
    itemPassword.setValue('ggggggggg');

    expect(component.form.valid).toBeFalsy(); // Is the form valid or not?
    expect(component.form.controls['email'].valid).toBeFalsy(); // check the control
    expect(itemEmail.errors['pattern']).toBeDefined(); // check patterns email input
  });

  it('is form invalid when password length less than 8', () => {
    let itemEmail = component.form.controls['email'];
    itemEmail.setValue('michael@mns.com');
    let itemPassword = component.form.controls['password'];
    itemPassword.setValue('gggg');

    expect(component.form.valid).toBeFalsy(); // Is the form valid or not?
    expect(component.form.controls['password'].valid).toBeFalsy(); // check the control
    expect(itemPassword.errors['minLength']).toBeDefined(); // check minLength password input
  });

  it('is form invalid when password length greater than 20', () => {
    let itemEmail = component.form.controls['email'];
    itemEmail.setValue('michael@mns.com');
    let itemPassword = component.form.controls['password'];
    itemPassword.setValue('ggggggggggggggggggggggggg');

    expect(component.form.valid).toBeFalsy(); // Is the form valid or not?
    expect(component.form.controls['password'].valid).toBeFalsy(); // check the control
    expect(itemPassword.errors['maxLength']).toBeDefined(); // check maxLength password input
  });
});
