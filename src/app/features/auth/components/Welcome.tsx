import { CheckCircle, Focus, PinIcon, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const heroContainer = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15
        }
    }
};

const featuresContainer = {
    hidden: {},
    show: {
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.15
        }
    }
};

const item = {
    hidden: {
        opacity: 0,
        y: 20,
        filter: 'blur(10px)'
    },
    show: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.3
        }
    }
};

const Welcome = () => {
    return (
        <div className="bg-[#0c7477] bg-opacity-10  text-[#2c3d4b] dark:text-neutral-200 dark:bg-gradient-to-tr dark:from-[#000000] dark:to-[#0c74770e] hidden lg:flex flex-col flex-1  justify-evenly gap-8 lg:gap-64 p-8  items-start ">
            <motion.div variants={heroContainer} initial="hidden" animate="show" className=" w-full p-2">
                <motion.div variants={item} className="flex items-center justify-start w-72 gap-2 bg-[#0c7477] py-2 rounded-2xl bg-opacity-10 dark:bg-opacity-40 ">
                    <PinIcon className="w-4 h-4 ml-4 text-[#0c7477]" />
                    <h4 className="font-black text-xs text-[#0c7477] dark:text-neutral-200">Seu dia mais produtivo começa aqui.</h4>
                </motion.div>

                <motion.h1 variants={item} className="font-semibold text-5xl leading-[54px] w-[500px] mt-6   border-black">
                    Organize suas tarefas de forma <span className="font-bold text-[#0c7477]">simples e eficiente</span>.
                </motion.h1>

                <motion.p variants={item} className="mt-8 w-96 text-lg leading-6 text-gray-600 dark:text-gray-300 font-medium">
                    Planeje, priorize e acompanhe seu progresso em um só lugar.
                </motion.p>
            </motion.div>

            <motion.div variants={featuresContainer} initial="hidden" animate="show" className="flex flex-col items-center justify-start gap-4 mb-6 ">
                <motion.div variants={item} className="flex items-center gap-4 mb-6">
                    <CheckCircle className="w-10 h-10 p-4 border rounded-lg bg-[#0c7477] bg-opacity-20 dark:bg-opacity-40 border-[#e2e8f03f] box-content" />
                    <div className="w-96">
                        <h5 className="font-bold mb-2 ">Visualize suas tarefas por status</h5>
                        <p className="text-gray-400 leading-5">Veja o que está pentende, em andamente ou concluído em um só lugar</p>
                    </div>
                </motion.div>
                <motion.div variants={item} className="flex items-center gap-4 mb-6">
                    <TrendingUp className="w-10 h-10 p-4 border rounded-lg bg-[#0c7477] bg-opacity-20 dark:bg-opacity-40 border-[#e2e8f03f] box-content" />
                    <div className="w-96">
                        <h5 className="font-bold mb-2">Acompanhe seu progresso</h5>
                        <p className="text-gray-400 leading-5">Tenha clareza do que já foi feito e do que ainda falta concluir. </p>
                    </div>
                </motion.div>
                <motion.div variants={item} className="flex justify-center items-center gap-4 mb-6">
                    <Focus className="w-10 h-10 p-4 border rounded-lg bg-[#0c7477] bg-opacity-20 dark:bg-opacity-40 border-[#e2e8f03f] box-content" />
                    <div className="w-96">
                        <h5 className="font-bold mb-2">Foque no que importa</h5>
                        <p className="text-gray-400 leading-5">Adicione tarefas e mantenha tudo organizado para não esquecer nada.</p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Welcome;
