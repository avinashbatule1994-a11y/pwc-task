export type UserRole = 'ADMIN' | 'MANAGER' | 'USER';

export interface User {
  id: number;
  username: string;
  role: UserRole;
  token: string;
  email:string
  password:string
}
