// Authentication State Store
const TOKEN_KEY = 'resolveiq_jwt';
const USER_KEY = 'resolveiq_user';

class AuthState {
  constructor() {
    this.token = localStorage.getItem(TOKEN_KEY) || null;
    try {
      this.user = JSON.parse(localStorage.getItem(USER_KEY)) || null;
    } catch {
      this.user = null;
    }
    this.listeners = [];
  }

  isAuthenticated() {
    return !!this.token;
  }

  getToken() {
    return this.token;
  }

  getUser() {
    return this.user;
  }

  getRole() {
    return this.user ? this.user.role : null;
  }

  getEmail() {
    return this.user ? this.user.email : null;
  }

  login(token, email, role) {
    this.token = token;
    this.user = { email, role };
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(this.user));
    this.notify();
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn(this.user));
  }
}

export const authState = new AuthState();
