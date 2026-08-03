'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import LoginAuth from '@/app/features/auth/components/LoginAuth';
import { LoginFormData, loginSchema } from '@/app/features/auth/hooks/schemas/loginSchema';
import { loginUser } from '@/app/utils/loginUser';
import { useRouter } from 'next/navigation';

const LoginForm = ({ onSignUp }: LoginFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onSubmit'
    });

    const router = useRouter();
    const handleSignUpForm = (data: LoginFormData) => {
        const user = loginUser(data);

        if (!user) {
            alert('Email ou senha inválidos');
            return;
        }
        console.log('User logged in:', user);
        router.push('/dashboard');
    };

    return (
        <div className=" w-full flex  flex-col justify-center items-center box-content ">
            <h1 className="font-black  text-black dark:text-neutral-200 sm:pt-4 text-4xl">Acesse sua conta</h1>

            <form onSubmit={handleSubmit(handleSignUpForm)} className="flex flex-col items-center w-[98%] mt-8 px-4 lg:px-8  ">
                <div className="  flex flex-col w-full ">
                    <label className="text-[#475569] dark:text-neutral-200  mb-4">E-mail</label>
                    <input
                        placeholder="Seu e-mail"
                        className=" bg-[#0c7477] dark:bg-neutral-900  bg-opacity-10  border border-[#E2E8F0] rounded-md px-4 py-4   outline-none  text-[#475569] dark:text-neutral-200 placeholder:text-[#475569] dark:placeholder:text-neutral-400"
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
                        className=" bg-[#0c7477] dark:bg-neutral-900  bg-opacity-10  border border-[#E2E8F0] rounded-md px-4 py-4   outline-none text-[#475569] dark:text-neutral-200 placeholder:text-[#475569] dark:placeholder:text-neutral-400"
                        {...register('password')}
                    />

                    <span className="block min-h-7">
                        <p className={`text-red-900 dark:text-red-800 text-xs xs:text-[14px] pt-2 transition-opacity fade-out duration-700 ${errors.password ? 'opacity-100' : 'opacity-0'} `}>
                            {errors.password?.message as string}
                        </p>
                    </span>
                </div>

                <input
                    type="submit"
                    value="Entrar"
                    className="  bg-[#0c7477] bg-opacity-20  text-[#1E293B] dark:text-neutral-300 max-w-[340px] hover:bg-[#1E293B] dark:hover:bg-[#0c7477] hover:text-neutral-100 dark:hover:text-neutral-100  font-black my-6 rounded-md transition-all duration-300 cursor-pointer  px-4 py-4  w-full "
                />
            </form>
            <LoginAuth />

            <p className=" mt-8 text-center text-black dark:text-neutral-100 ">
                não tem uma conta?
                <span className="ml-1">
                    <button onClick={onSignUp} className=" font-bold text-[#0c7477]">
                        criar sua conta grátis.
                    </button>
                </span>
            </p>
        </div>
    );
};

export default LoginForm;
