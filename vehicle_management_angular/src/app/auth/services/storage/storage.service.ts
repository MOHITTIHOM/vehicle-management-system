import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  

  constructor() { }

  private static isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  static saveToken(token: string): void {
    if (this.isBrowser()) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.setItem(TOKEN, token);
    }
  }

  static saveUser(user: any): void {
    if (this.isBrowser()) {
      window.localStorage.removeItem(USER);
      window.localStorage.setItem(USER, JSON.stringify(user));
    }
  }

  static getToken() {
    return this.isBrowser() ? window.localStorage.getItem(TOKEN) : null;
  }

  static getUser() {
    if (this.isBrowser()) {
      try {
        const userJson = window.localStorage.getItem(USER);
        if (userJson) {
          return JSON.parse(userJson);
        }
        return null;
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        return null;
      }
    }
    return null;
  }

  static getUserId(): string {
    const user = this.getUser();
    if(user == null){ return '';}
    return user.id;
  }

  static getUserRole(): string {
    const user = this.getUser();
    if (user == null) return "";
    return user.role;
  }

  static isAdminLoggedIn(): boolean {
    if (this.getToken() == null) return false;
    const role: string = this.getUserRole();
    return role === "ADMIN";
  }

  static isCustomerLoggedIn(): boolean {
    if (this.getToken() == null) return false;
    const role: string = this.getUserRole();
    return role === "CUSTOMER";
  }

  static logout(): void {
    if (this.isBrowser()) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.removeItem(USER);
    }
  }
}
