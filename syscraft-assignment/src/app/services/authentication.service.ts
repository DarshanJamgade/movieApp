import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(private router: Router) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    const user = {
      username: username,
      role: '',
    };

    if (username.toLowerCase() === 'admin' && password.toLowerCase() === 'admin') {
      user.role = 'Admin';
    } else if (username.toLowerCase() === 'user' && password.toLowerCase() === 'user') {
      user.role = 'User';
    } else {
      return throwError('Invalid Username or Password');
    }

    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
    return of(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
