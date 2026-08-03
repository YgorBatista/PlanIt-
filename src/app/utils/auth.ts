import { User } from '@/types/login/User'; 

export const getUsers = (): User[] => {
  const users = localStorage.getItem("users");

  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users: User[]) => {
  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );
};

export const logout = () => {
  localStorage.removeItem('manualName');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('auth');

  document.cookie =
    'manualName=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

  document.cookie =
    'userEmail=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
};''