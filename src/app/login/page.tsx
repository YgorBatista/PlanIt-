'use client';

// ---------------------------
// Página de Login (Sign Up)
// ---------------------------
// Esta página contém:
// - Esquema de validação com Zod (`formSchema`)
// - Integração com React Hook Form para controle do formulário e exibição de erros
// - Uso do hook `useTasks` apenas para atualizar o estado manual (fallback de autenticação)
// - Botões de login social (Google / GitHub) que redirecionam para o fluxo do NextAuth
// - Layout dividido em duas colunas: painel de boas-vindas (apenas em telas grandes) e formulário de cadastro
// - Animações via Framer Motion nas partes do painel de boas-vindas
// ---------------------------

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

// ---------------------------
// 1) Validação do formulário
// - Usamos Zod para descrever o formato esperado dos dados
// - name: string entre 2 e 20 caracteres
// - email: string no formato de e-mail, tamanho limitado
// - password: regras de complexidade (minúscula, maiúscula, tamanho)
// O zodResolver conecta o esquema Zod ao React Hook Form para validação automática
// ---------------------------
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

// ---------------------------
// Componente da página
// ---------------------------
const Page = () => {
    // Router do Next para redirecionamento programático após cadastro/login
    const router = useRouter();

    // useTasks: hook local que armazena informações de login manual (fallback sem NextAuth)
    // - setManualName / setManualEmail são usados aqui para persistir as credenciais "manuais"
    //   (quando o usuário se registra via formulário em vez de usar OAuth). Isso permite que
    //   a aplicação trate ambos os casos (NextAuth e login manual) de forma similar.
    const { setManualEmail, setManualName } = useTasks();

    // React Hook Form: configura o form com um resolver do Zod e retorna helpers
    // - register: conecta inputs ao RHF
    // - handleSubmit: handler que valida e chama nossa função when form is valid
    // - errors: objeto com mensagens de erro do validador (usado para exibir feedback)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema),
        mode: 'onSubmit'
    });

    // ---------------------------
    // handleSignUpForm
    // - Recebe os dados validados do formulário
    // - Persiste no localStorage e em cookies (para simular sessão em ausência de NextAuth)
    // - Atualiza o estado compartilhado via `useTasks`
    // - Dispara um evento customizado `userLogin` (outras partes da app escutam isso)
    // - Redireciona para a rota `/todos`
    // Observação: este fluxo equivale a um "registro manual" — em produção você poderia
    // integrá-lo a um backend real ou substituir inteiramente pelo fluxo NextAuth.
    // ---------------------------
    const handleSignUpForm = (data: any) => {
        // Persistência local para simular autenticação
        localStorage.setItem('manualName', data.name);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('auth', 'true');

        // Cookies auxiliares (alguns fluxos ou middleware podem checar cookies)
        // Atenção: o cookie simples aqui não tem flags Secure/HttpOnly — apenas usado localmente.
        document.cookie = `manualName=${encodeURIComponent(data.name)}; path=/`;
        document.cookie = `userEmail=${encodeURIComponent(data.email)}; path=/`;

        // Atualiza o estado do hook useTasks (para refletir o usuário manualmente logado)
        setManualName(data.name);
        setManualEmail(data.email);

        // Notifica outros componentes (Header/NameUser) que o usuário logou manualmente
        window.dispatchEvent(new Event('userLogin'));

        // Redireciona para a área de tarefas
        router.push('/todos');
    };

    // ---------------------------
    // JSX: layout da página
    // - Grid principal para header / conteúdo / footer
    // - Container responsivo com duas colunas:
    //   * Painel de boas-vindas (apenas em telas larges: hidden em mobile)
    //   * Formulário de criação de conta + botões sociais
    // - Uso de Framer Motion para animações do painel de boas-vindas
    // ---------------------------
    return (
        <div className=" min-h-screen grid grid-rows-[auto_1fr_auto] font-open_sans">
            {/* Header global */}
            <Header />

            {/* Centra o conteúdo horizontalmente */}
            <div className="flex flex-row bg-gray-200 dark:bg-[#1B2632] items-center justify-center">
                <div className="  w-11/12 md:w-3/4 max-w-[1200px] h-4/5 sm:h-3/5  rounded-xl md:overflow-hidden flex flex-col lg:flex-row  shadow-lg ">
                    {/*
                        WELCOME PANEL
                        - Visível apenas em telas grandes (class `hidden lg:flex`)
                        - Contém títulos e texto explicativo
                        - Animações com Framer Motion para entrada suave
                    */}
                    <div className="bg-[#EEF2F6]  text-[#2c3d4b] dark:text-neutral-200 dark:bg-[#141c24] hidden lg:flex flex-col sm:flex-1 justify-around gap-8 lg:gap-64 p-2 lg:p-2 items-center ">
                        {/* Animação do título: entra com opacidade e deslocamento em x */}
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, ease: 'easeInOut' }} className=" w-full p-2">
                            <p className="mb-4 text-base sm:text-2xl">Olá, seja</p>
                            <span className="font-black text-[#2C3E50]  dark:text-neutral-200 text-3xl sm:text-5xl uppercase">bem-vindo!</span>
                        </motion.div>

                        {/* Parágrafo adicional com delay na animação */}
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: 'easeInOut', delay: 1 }}
                            className="w-full p-3 text-[#475569] dark:text-gray-400 font-bold text-[10px] sm:text-sm pt-20"
                        >
                            Acesse e organize suas tarefas de forma prática.
                        </motion.p>
                    </div>

                    {/*
                        LOGIN / SIGNUP PANEL
                        - Área principal para o formulário de criação de conta
                        - Inclui entradas com validação visual (mensagens de erro)
                        - Também expõe botões de login social (Google/GitHub)
                    */}
                    <div className=" h-full relative rounded-r-md  bg-[#F8FAFC] dark:bg-[#8495aa] lg:rounded-e-lg  md:p-10 flex flex-col  md:gap-2 items-center justify-around  text-neutral-200   lg:flex-1">
                        {/* Títulos do formulário */}
                        <div className=" text-center text-[#1E293B] pt-4 ">
                            <h1 className="font-black text-lg lg:text-2xl ">Crie uma conta</h1>
                            <span className=" font-bold text-center  text-[11px] lg:text-sm">use seu E-mail para registrar </span>
                        </div>

                        {/*
                            Formulário de registro
                            - onSubmit chama handleSubmit(handleSignUpForm)
                            - Cada input está registrado via `register('fieldName')`
                            - As mensagens de erro (errors.field) são exibidas abaixo de cada campo
                        */}
                        <form onSubmit={handleSubmit(handleSignUpForm)} className="flex flex-col justify-evenly items-center  w-full  md:w-[500px] mt-8 ">
                            {/* Nome */}
                            <div className="flex flex-col w-full px-4">
                                <input
                                    placeholder="Nome"
                                    className="bg-[#E2E8F0] border border-[#E2E8F0] rounded-md px-4 py-2 w-80 xs:w-full  outline-none  text-[#475569] placeholder:text-[#475569]  "
                                    {...register('name')}
                                />

                                {/*
                                    Mensagem de erro para o campo `name`.
                                    - Usamos classes CSS para animar a opacidade entre 0 e 1
                                    - `errors.name?.message` é gerado pelo Zod via React Hook Form
                                */}
                                <span className="min-h-7 block">
                                    <p className={`text-red-900 dark:text-red-800 text-xs xs:text-[14px] pt-2  transition-opacity duration-700 ${errors.name ? 'opacity-100' : 'opacity-0'}`}>
                                        {errors.name?.message as string}
                                    </p>
                                </span>
                            </div>

                            {/* E-mail */}
                            <div className="  flex flex-col w-full px-4">
                                <input
                                    placeholder="E-mail"
                                    className="bg-[#E2E8F0] border border-[#E2E8F0] rounded-md px-4 py-2 w-80 xs:w-full outline-none  text-[#475569] placeholder:text-[#475569]"
                                    {...register('email')}
                                />

                                {/* Mensagem de erro para o campo `email` */}
                                <span className="block min-h-7">
                                    <p className={`text-red-900 dark:text-red-800 pt-2 text-xs xs:text-[14px] transition-opacity duration-700 ${errors.email ? 'opacity-100' : 'opacity-0'}`}>
                                        {errors.email?.message as string}
                                    </p>
                                </span>
                            </div>

                            {/* Senha */}
                            <div className=" flex flex-col w-full px-4">
                                <input
                                    placeholder="Senha"
                                    type="password"
                                    className="bg-[#E2E8F0] border border-[#E2E8F0] rounded-md px-4 py-2 w-80 xs:w-full outline-none text-[#475569] placeholder:text-[#475569]"
                                    {...register('password')}
                                />

                                {/* Mensagem de erro para o campo `password` (regras de complexidade) */}
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

                            {/* Botão submit
                                - input type=submit com value "Entrar"
                                - classes incluem transições visuais para hover
                            */}
                            <input
                                onSubmit={handleSignUpForm}
                                type="submit"
                                value="Entrar"
                                className=" bg-[#E2E8F0]    text-[#1E293B] dark:text-neutral-800  hover:bg-[#1E293B] dark:hover:bg-[#2c3d4b] hover:text-neutral-100 dark:hover:text-neutral-100  font-black w-24 hover:w-32 p-2 my-6 rounded-md transition-all duration-300 cursor-pointer"
                            />
                        </form>

                        {/*
                            Botões de login social
                            - `GoogleBtn` e `GitHubBtn` chamam `signIn` do NextAuth e redirecionam
                            - Úteis para permitir OAuth sem precisar de cadastro manual
                        */}
                        <div className="flex justify-center items-center flex-col pb-4 gap-2 md:gap-3">
                            <GoogleBtn />
                            <GitHubBtn />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer global */}
            <Footer />
        </div>
    );
};

export default Page;
