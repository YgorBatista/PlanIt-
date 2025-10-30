'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Header from '../screens/header';
import Footer from '../screens/footer';
import { GoogleBtn } from '../../components/LoginBtn/GoogleBtn';
import { useTasks } from '@/app/hooks/useTasks';
import { motion } from 'framer-motion';
import { GitHubBtn } from '../../components/LoginBtn/GitHubBtn';

const formSchema = z.object({
    name: z.string().min(2, 'O nome deve ter mais de 2 caracteres'),
    email: z.email('Formato inválido').min(1).max(50),
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
        <div className=" bg-[#eee9df] dark:bg-[#1b2632] min-h-screen grid grid-rows-[auto_1fr_auto] font-open_sans">
            <Header />
            <div className="flex flex-row items-center justify-center">
                <div className="  w-11/12 md:w-3/4 max-w-[1200px] h-4/5 sm:h-3/5  rounded-xl md:overflow-hidden flex flex-col lg:flex-row   ">
                    {/* WELCOME  */}
                    <div className="bg-[#c5bba8] text-[#2c3d4b] dark:text-neutral-200 dark:bg-[#141c24] hidden lg:flex flex-col sm:flex-1 justify-around gap-8 lg:gap-64 p-2 lg:p-2 items-center ">
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, ease: 'easeInOut' }} className=" w-full p-2">
                            <p className="mb-4 text-base sm:text-2xl">Olá, seja</p>
                            <span className="font-black text-3xl sm:text-5xl uppercase">bem-vindo!</span>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: 'easeInOut', delay: 1 }}
                            className="w-full p-3 font-bold text-[10px] sm:text-sm pt-20"
                        >
                            Acesse e organize suas tarefas de forma prática.
                        </motion.p>
                    </div>

                    {/* LOGIN */}
                    <div className=" h-full  rounded-md  bg-[#9c8862] dark:bg-[#8495aa] lg:rounded-e-lg  md:p-10 flex flex-col  md:gap-8 items-center justify-around  text-neutral-200   lg:flex-1">
                        <div className=" text-center pt-4">
                            <h1 className="font-black  text-lg lg:text-2xl ">Crie uma conta</h1>
                            <span className="text-neutral-200 dark:text-neutral-300 font-bold text-center  text-[11px] lg:text-sm">use seu E-mail para registrar </span>
                        </div>
                        <form onSubmit={handleSubmit(handleSignUpForm)} className="flex flex-col items-center  w-full  md:w-[500px]  lg:gap-8">
                            <div className=" flex flex-col  w-full px-4">
                                <label className=" mr-4 font-black  xs:text-sm sm:text-lg lg:text-base ">Nome: </label>
                                <input className="bg-neutral-200 p-2 w-80 sm:w-full rounded-md outline-none  text-neutral-600 " {...register('name')} />

                                <span className="min-h-7 block">
                                    <p className={`text-red-900 dark:text-red-800 text-xs xs:text-lg pt-2  transition-opacity duration-700 ${errors.name ? 'opacity-100' : 'opacity-0'}`}>
                                        {errors.name?.message as string}
                                    </p>
                                </span>
                            </div>
                            <div className=" flex flex-col w-full px-4">
                                <label className="mr-4 font-black xs:text-sm sm:text-lg lg:text-base "> E-mail:</label>
                                <input className="bg-neutral-200 p-2 w-80 sm:w-full rounded-md outline-none  text-neutral-600" {...register('email')} />

                                <span className="block min-h-7">
                                    <p className={`text-red-900 dark:text-red-800 pt-2 text-xs xs:text-lg transition-opacity duration-700 ${errors.email ? 'opacity-100' : 'opacity-0'}`}>
                                        {errors.email?.message as string}
                                    </p>
                                </span>
                            </div>
                            <div className=" flex flex-col w-full px-4">
                                <label className="mr-4 font-black  xs:text-sm sm:text-lg lg:text-base ">Senha: </label>
                                <input type="password" className="bg-neutral-200 p-2 w-80 sm:w-full rounded-md outline-none  text-neutral-600" {...register('password')} />

                                <span className="block min-h-7">
                                    <p className={`text-red-900 dark:text-red-800 text-xs xs:text-lg  pt-2 transition-opacity fade-out duration-700 ${errors.password ? 'opacity-100' : 'opacity-0'} `}>
                                        {errors.password?.message as string}
                                    </p>
                                </span>
                            </div>
                            <input
                                onSubmit={handleSignUpForm}
                                type="submit"
                                value="Entrar"
                                className=" bg-neutral-200 border border-neutral-300    text-neutral-800 dark:text-neutral-800  hover:bg-[#66512b] dark:hover:bg-[#2c3d4b] hover:text-neutral-100 dark:hover:text-neutral-100  font-black w-24 hover:w-32 p-2 my-6 rounded-md transition-all duration-300 cursor-pointer"
                            />
                        </form>
                        <div className="flex flex-col pb-4 gap-2 md:gap-3">
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
