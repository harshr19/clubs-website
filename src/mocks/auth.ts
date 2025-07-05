// src/mocks/auth.ts

export type UserRole = 'student' | 'club' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  branch?: string;
  year?: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'Alice Student', email: 'alice@student.com', role: 'student', branch: 'CSE', year: '2' },
  { id: '2', name: 'Bob Club', email: 'bob@club.com', role: 'club' },
  { id: '3', name: 'Carol Admin', email: 'carol@admin.com', role: 'admin' },
];

export function login(email: string, password: string): Promise<User | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email);
      if (user) {
        localStorage.setItem('mockUser', JSON.stringify(user));
        resolve(user);
      } else {
        resolve(null);
      }
    }, 500);
  });
}

export function signup(name: string, email: string, password: string, role: UserRole, branch?: string, year?: string): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user: User = { id: Date.now().toString(), name, email, role, branch, year };
      mockUsers.push(user);
      localStorage.setItem('mockUser', JSON.stringify(user));
      resolve(user);
    }, 500);
  });
}

export function logout() {
  localStorage.removeItem('mockUser');
}

export function getCurrentUser(): User | null {
  const user = localStorage.getItem('mockUser');
  return user ? JSON.parse(user) : null;
} 