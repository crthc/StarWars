import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../Models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyA0ZUUCkxZ0BR7aILd9tjZkiMeNjS-zMxA';

  // Create new user

  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //Log in

  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) {}

  logout() {}

  login(user: UserModel) {
    const authData = {
      ...user,
      returnSecureToken: true,
    };
    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apikey}`,
      authData
    );
  }

  newUser(user: UserModel) {
    const authData = {
      ...user,
      returnSecureToken: true,
    };

    return this.http.post(`${this.url}signUp?key=${this.apikey}`, authData);
  }
}
