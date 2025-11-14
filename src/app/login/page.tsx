'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Header from '../base/header';
import Footer from '../base/footer';
import { GoogleBtn } from '../../components/LoginBtn/GoogleBtn';
import { useTasks } from '@/app/hooks/useTasks';
import { motion } from 'framer-motion';
import { GitHubBtn } from '../../components/LoginBtn/GitHubBtn';

const formSchema = z.object({
    name: z.string().min(2, 'O nome deve ter mais de 2 caracteres').max(20, 'O nome dev ter no  máximo 20 caracteres.'),
    email: z.string().email('Formato inválido').min(1).max(50),
    password: z
        .string()
        .min(6, 'A senha deve ter mais de 6 caracteres')
        .max(40, 'a senha deve ter no maximo 40 carateres')
        .regex(/[a-z]/, 'a senha deve conter letra minuscula')
        .regex(/[A-Z]/, 'a senha deve conter letra maiuscula')
});

const Page = () => {
    const router = useRouter();

    const { setManualEmail, setManualName } = useTasks();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema),
        mode: 'onSubmit'
    });

    const handleSignUpForm = (data: any) => {
        localStorage.setItem('manualName', data.name);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('auth', 'true');

        document.cookie = `manualName=${encodeURIComponent(data.name)}; path=/`;
        document.cookie = `userEmail=${encodeURIComponent(data.email)}; path=/`;

        setManualName(data.name);
        setManualEmail(data.email);

        window.dispatchEvent(new Event('userLogin'));

        router.push('/todos');
    };

    return (
        <div className=" min-h-screen grid grid-rows-[auto_1fr_auto] font-open_sans">
            {/* Header global */}
            <Header />

            {/* Centra o conteúdo horizontalmente */}
            <div className="flex flex-row bg-gray-200 dark:bg-[#1B2632] items-center justify-center">
                <div className="  w-11/12 md:w-3/4 max-w-[1200px] h-4/5 sm:h-3/5  rounded-xl md:overflow-hidden flex flex-col lg:flex-row  shadow-lg ">
                    <div className="bg-[#EEF2F6]  text-[#2c3d4b] dark:text-neutral-200 dark:bg-[#141c24] hidden lg:flex flex-col sm:flex-1 justify-around gap-8 lg:gap-64 p-2 lg:p-2 items-center ">
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, ease: 'easeInOut' }} className=" w-full p-2">
                            <p className="mb-4 text-base sm:text-2xl">Olá, seja</p>
                            <span className="font-black text-[#2C3E50]  dark:text-neutral-200 text-3xl sm:text-5xl uppercase">bem-vindo!</span>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: 'easeInOut', delay: 1 }}
                            className="w-full p-3 text-[#475569] dark:text-gray-400 font-bold text-[10px] sm:text-sm pt-20"
                        >
                            Acesse e organize suas tarefas de forma prática.
                        </motion.p>
                    </div>

                    <div className=" h-full relative rounded-r-md  bg-[#F8FAFC] dark:bg-[#8495aa] lg:rounded-e-lg  md:p-10 flex flex-col  md:gap-2 items-center justify-around  text-neutral-200   lg:flex-1">
                        <div className=" text-center text-[#1E293B] pt-4 ">
                            <h1 className="font-black text-lg lg:text-2xl ">Crie uma conta</h1>
                            <span className=" font-bold text-center  text-[11px] lg:text-sm">use seu E-mail para registrar </span>
                        </div>

                        <form onSubmit={handleSubmit(handleSignUpForm)} className="flex flex-col justify-evenly items-center  w-full  md:w-[500px] mt-8 ">
                            <div className="flex flex-col w-full px-4">
                                <input
                                    placeholder="Nome"
                                    className="bg-[#E2E8F0] border border-[#E2E8F0] rounded-md px-4 py-2 w-80 xs:w-full  outline-none  text-[#475569] placeholder:text-[#475569]  "
                                    {...register('name')}
                                />

                                <span className="min-h-7 block">
                                    <p className={`text-red-900 dark:text-red-800 text-xs xs:text-[14px] pt-2  transition-opacity duration-700 ${errors.name ? 'opacity-100' : 'opacity-0'}`}>
                                        {errors.name?.message as string}
                                    </p>
                                </span>
                            </div>

                            <div className="  flex flex-col w-full px-4">
                                <input
                                    placeholder="E-mail"
                                    className="bg-[#E2E8F0] border border-[#E2E8F0] rounded-md px-4 py-2 w-80 xs:w-full outline-none  text-[#475569] placeholder:text-[#475569]"
                                    {...register('email')}
                                />

                                <span className="block min-h-7">
                                    <p className={`text-red-900 dark:text-red-800 pt-2 text-xs xs:text-[14px] transition-opacity duration-700 ${errors.email ? 'opacity-100' : 'opacity-0'}`}>
                                        {errors.email?.message as string}
                                    </p>
                                </span>
                            </div>

                            <div className=" flex flex-col w-full px-4">
                                <input
                                    placeholder="Senha"
                                    type="password"
                                    className="bg-[#E2E8F0] border border-[#E2E8F0] rounded-md px-4 py-2 w-80 xs:w-full outline-none text-[#475569] placeholder:text-[#475569]"
                                    {...register('password')}
                                />

                                <span className="block min-h-7">
                                    <p
                                        className={`text-red-900 dark:text-red-800 text-xs xs:text-[14px] pt-2 transition-opacity fade-out duration-700 ${
                                            errors.password ? 'opacity-100' : 'opacity-0'
                                        } `}
                                    >
                                        {errors.password?.message as string}
                                    </p>
                                </span>
                            </div>

                            <input
                                onSubmit={handleSignUpForm}
                                type="submit"
                                value="Entrar"
                                className=" bg-[#E2E8F0]    text-[#1E293B] dark:text-neutral-800  hover:bg-[#1E293B] dark:hover:bg-[#2c3d4b] hover:text-neutral-100 dark:hover:text-neutral-100  font-black w-24 hover:w-32 p-2 my-6 rounded-md transition-all duration-300 cursor-pointer"
                            />
                        </form>

                        <div className="flex justify-center items-center flex-col pb-4 gap-2 md:gap-3">
                            <GoogleBtn />
                            <GitHubBtn />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Page;
