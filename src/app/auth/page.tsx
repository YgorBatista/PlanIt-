'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    name: z.string().min(2, 'O nome deve ter mais de 2 caracteres'),
    email: z.email('Formato inválido').min(1).max(50),
    password: z
        .string()
        .min(8, 'A senha deve ter mais de 8 caracteres')
        .max(40, 'a senha deve ter no maximo 40 carateres')
        .regex(/[A-Z]/, 'A senha deve conter letra maiuscula')
        .regex(/[a-z]/, 'a senha deve conter letra minuscula')
        .regex(/[0-9]/, ' A senha deve conter número')
        .regex(/[^A-Za-z0-9]/, 'A senha deve conter um caractere especial')
});

const Page = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema),
        mode: 'onSubmit'
    });

    const handleSignUpForm = (data: any) => {
        console.log('dados do formulario', data);
        localStorage.setItem('auth', 'true');
        router.push('/todos');
    };
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className=" flex items-center w-10/12 h-screen border border-black  ">
                <div className="bg-green-400 rounded-s-lg  h-1/2  flex items-center flex-1">ssss</div>

                <div className="bg-slate-200 rounded-e-lg  h-1/2 p-10 flex flex-col   gap-8 items-center justify-evenly flex-1">
                    <div>
                        <h1 className="font-bold text-center">Crie uma conta</h1>
                        <span className="text-neutral-600 text-center">use seu E-mail para registrar </span>
                    </div>
                    <form onSubmit={handleSubmit(handleSignUpForm)} className="flex flex-col items-center gap-3">
                        <div>
                            <label className="mr-2">Nome: </label>
                            <input className="bg-neutral-100 p-2 w-80 rounded-md outline-none " placeholder="nome" {...register('name')} />

                            {errors.name && <p className="text-red-600">{errors.name.message as string}</p>}
                        </div>
                        <div>
                            <label className="mr-2"> E-mail:</label>
                            <input className="bg-neutral-100 p-2 w-80 rounded-md outline-none" placeholder="e-mail" {...register('email')} />

                            {errors.email && <p className="text-red-600">{errors.email.message as string}</p>}
                        </div>
                        <div>
                            <label className="mr-2">Senha: </label>
                            <input type="password" className="bg-neutral-100 p-2 w-80 rounded-md outline-none" placeholder="senha" {...register('password')} />

                            {errors.password && <p className="text-red-600">{errors.password.message as string}</p>}
                        </div>
                        <input onSubmit={handleSignUpForm} type="submit" value="Entrar" className="bg-green-400 w-24 p-2 mt-6 rounded-md" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Page;
