'use client';

import LoginForm from '@/app/features/auth/components/LoginForm';
import SignUpForm from '@/app/features/auth/components/SignUpForm';
import Welcome from '@/app/features/auth/components/Welcome';
import { AnimatePresence, motion } from 'framer-motion';
import { variants } from '@/app/features/auth/hooks/login/useSlideLogin';
import React from 'react';

export const LoginSignUp = () => {
    const [currentForm, setCurrentForm] = React.useState<'login' | 'register'>('register');
    const [direction, setDirection] = React.useState(1);

    return (
        <div className=" w-full  flex-1 md:overflow-hidden flex flex-col lg:flex-row ">
            <Welcome />

            <div className="py-10 flex-1 lg:max-w-3xl overflow-hidden bg-[#F8FAFC] dark:bg-gradient-to-br dark:from-[#1b1b1b] dark:to-[#000000] flex flex-col  md:gap-2  justify-start  text-neutral-200">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentForm}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            type: 'spring',
                            duration: 0.1,
                            ease: 'easeInOut',
                            stiffness: 80,
                            damping: 14
                        }}
                        className=" w-full   flex-1 flex flex-col justify-center items-center  "
                    >
                        {currentForm === 'login' ? (
                            <LoginForm
                                onSignUp={() => {
                                    setDirection(1);
                                    setCurrentForm('register');
                                }}
                            />
                        ) : (
                            <SignUpForm
                                onSignUp={() => {
                                    setDirection(-1);
                                    setCurrentForm('login');
                                }}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
