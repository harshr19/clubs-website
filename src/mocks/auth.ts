// Mock authentication system for development
// This simulates a real auth backend for testing purposes

export type UserRole = 'student' | 'club' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  branch?: string;
  year?: string;
}

// Sample users for testing
const mockUsers: User[] = [
  { 
    id: '1', 
    name: 'harsh Rajpal', 
    email: 'harsh@student.com', 
    role: 'student', 
    branch: 'CSE', 
    year: '2' 
  },
  { 
    id: '2', 
    name: 'krish kant', 
    email: 'krish@club.com', 
    role: 'club' 
  },
  { 
    id: '3', 
    name: 'Arpit Bala', 
    email: 'arpit @admin.com', 
    role: 'admin' 
  },
];

// Simulate login API call
export function login(email: string, password: string): Promise<User | null> {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser) {
        // Store user in localStorage to persist session
        localStorage.setItem('mockUser', JSON.stringify(foundUser));
        resolve(foundUser);
      } else {
        resolve(null);
      }
    }, 500);
  });
}

// Simulate signup API call
export function signup(name: string, email: string, password: string, role: UserRole, branch?: string, year?: string): Promise<User> {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const newUser: User = { 
        id: Date.now().toString(), 
        name, 
        email, 
        role, 
        branch, 
        year 
      };
      mockUsers.push(newUser);
      // Store user in localStorage to persist session
      localStorage.setItem('mockUser', JSON.stringify(newUser));
      resolve(newUser);
    }, 500);
  });
}

// Clear user session
export function logout() {
  localStorage.removeItem('mockUser');
}

// Get current user from localStorage
export function getCurrentUser(): User | null {
  const userData = localStorage.getItem('mockUser');
  return userData ? JSON.parse(userData) : null;
} 