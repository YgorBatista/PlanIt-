import { LoginFormData } from "../features/auth/hooks/schemas/loginSchema";
import { getUsers } from "./auth";


  export const loginUser = (data: LoginFormData) => {
        const users = getUsers();

        const user = users.find(user => user.email === data.email && user.password === data.password);

        if (!user) {
            alert('Email ou senha inválidos');
            return;
        }

        localStorage.setItem('manualName', user.name);
        localStorage.setItem('userEmail', user.email);

        localStorage.setItem('auth', 'true');
        document.cookie = `manualName=${encodeURIComponent(user.name)}; path=/`;
        document.cookie = `userEmail=${encodeURIComponent(user.email)}; path=/`;

        console.log('User logged in:', user);

        return user;
    };