'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { formSchema, SignUpFormData } from '@/app/features/auth/hooks/schemas/signUpSchema';
import { useRouter } from 'next/navigation';
import LoginAuth from '@/app/features/auth/components/LoginAuth';
import { getUsers, saveUsers } from '@/app/utils/auth';

type SignUpFormProps = {
    onSignUp: () => void;
};
// scheme validation

const SignUpForm = ({ onSignUp }: SignUpFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema),
        mode: 'onSubmit'
    });
    const router = useRouter();
    const handleSignUpForm = (data: SignUpFormData) => {
        const users = getUsers();

        const emailExists = users.some(user => user.email === data.email);

        if (emailExists) {
            alert('Este email já está cadastrado');
            return;
        }

        const newUser = {
            name: data.name,
            email: data.email,
            password: data.password
        };

        users.push(newUser);

        saveUsers(users);

        localStorage.setItem('manualName', data.name);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('auth', 'true');

        router.push('/dashboard');
    };
    return (
        <div className=" w-full flex  flex-col justify-center items-center box-content ">
            <h1 className="   text-black dark:text-neutral-200 pt-4 font-black text-center  text-4xl">Crie uma conta</h1>

            <form onSubmit={handleSubmit(handleSignUpForm)} className="flex flex-col items-center w-[98%] mt-8 px-4 lg:px-8  ">
                <div className="flex flex-col w-full ">
                    <label className="text-[#475569] dark:text-neutral-200  mb-4">Nome</label>
                    <input
                        placeholder="Primeiro nome"
                        className="bg-[#0c7477] dark:bg-neutral-900 bg-opacity-10  border border-[#e2e8f023] rounded-md px-4 py-4 outline-none  text-[#475569] dark:text-neutral-200 placeholder:text-[#475569] dark:placeholder:text-neutral-400  "
                        {...register('name')}
                    />

                    <span className="min-h-7 block">
                        <p className={`text-red-900 dark:text-red-800 text-xs xs:text-[14px] pt-2  transition-opacity duration-700 ${errors.name ? 'opacity-100' : 'opacity-0'}`}>
                            {errors.name?.message as string}
                        </p>
                    </span>
                </div>

                <div className="  flex flex-col w-full ">
                    <label className="text-[#475569] dark:text-neutral-200  mb-4">E-mail</label>
                    <input
                        placeholder="Seu e-mail"
                        className=" bg-[#0c7477] dark:bg-neutral-900  bg-opacity-10  border border-[#e2e8f023] rounded-md px-4 py-4   outline-none  text-[#475569] dark:text-neutral-200 placeholder:text-[#475569] dark:placeholder:text-neutral-400"
                        {...register('email')}
                    />

                    <span className="block min-h-7">
                        <p className={`text-red-900 dark:text-red-800 pt-2 text-xs xs:text-[14px] transition-opacity duration-700 ${errors.email ? 'opacity-100' : 'opacity-0'}`}>
                            {errors.email?.message as string}
                        </p>
                    </span>
                </div>

                <div className=" flex flex-col w-full ">
                    <label className="text-[#475569] dark:text-neutral-200  mb-4">Senha</label>
                    <input
                        placeholder="Deve ter no mínimo 6 caracteres"
                        type="password"
                        className=" bg-[#0c7477] dark:bg-neutral-900  bg-opacity-10  border border-[#e2e8f023] rounded-md px-4 py-4   outline-none text-[#475569] dark:text-neutral-200 placeholder:text-[#475569] dark:placeholder:text-neutral-400"
                        {...register('password')}
                    />

                    <span className="block min-h-7">
                        <p className={`text-red-900 dark:text-red-800 text-xs xs:text-[14px] pt-2 transition-opacity fade-out duration-700 ${errors.password ? 'opacity-100' : 'opacity-0'} `}>
                            {errors.password?.message as string}
                        </p>
                    </span>
                </div>
                <div className=" flex flex-col w-full ">
                    <label className="text-[#475569] dark:text-neutral-200  mb-4">Confirme sua senha</label>
                    <input
                        placeholder="Deve ter no mínimo 6 caracteres"
                        type="password"
                        className=" bg-[#0c7477] dark:bg-neutral-900  bg-opacity-10  border border-[#e2e8f023] rounded-md px-4 py-4   outline-none text-[#475569] dark:text-neutral-200 placeholder:text-[#475569] dark:placeholder:text-neutral-400"
                        {...register('confirmPassword')}
                    />

                    <span className="block min-h-7">
                        <p className={`text-red-900 dark:text-red-800 text-xs xs:text-[14px] pt-2 transition-opacity fade-out duration-700 ${errors.confirmPassword ? 'opacity-100' : 'opacity-0'} `}>
                            {errors.confirmPassword?.message as string}
                        </p>
                    </span>
                </div>

                <input
                    type="submit"
                    value="Cadastre-se"
                    className="  bg-[#0c7477] bg-opacity-20  text-[#1E293B] dark:text-neutral-200 max-w-[340px] hover:bg-[#1E293B] dark:hover:bg-[#0c7477] hover:text-neutral-100 dark:hover:text-neutral-100  font-black my-6 rounded-md transition-all duration-300 cursor-pointer  px-4 py-4  w-full "
                />
            </form>
            <LoginAuth />

            <p className=" mt-8  text-center text-black dark:text-neutral-100">
                Tem uma conta?
                <span className="ml-1">
                    <button onClick={onSignUp} className=" font-bold text-[#0c7477]">
                        fazer login.
                    </button>
                </span>
            </p>
        </div>
    );
};

export default SignUpForm;
