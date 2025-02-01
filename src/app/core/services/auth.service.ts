// core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor() {
    // Initialize from localStorage
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    this.isAuthenticatedSubject.next(isAuthenticated);
    this.isAdminSubject.next(isAdmin);
  }

  login(username: string, password: string): boolean {
    // Mock authentication
    if (username === 'admin' && password === 'admin') {
      this.isAuthenticatedSubject.next(true);
      this.isAdminSubject.next(true);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('isAdmin', 'true');
      return true;
    } else if (username === 'user' && password === 'user') {
      this.isAuthenticatedSubject.next(true);
      this.isAdminSubject.next(false);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('isAdmin', 'false');
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.isAdminSubject.next(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdmin');
  }

  register(username: string, email: string, password: string): Observable<boolean> {
    // Mock registration - in a real app, this would make an API call
    // For demo purposes, consider registration always successful
    return of(true);
  }
}
