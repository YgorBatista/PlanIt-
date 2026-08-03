import { GitHubBtn } from '@/app/features/uiBtns/GitHubBtn';
import { GoogleBtn } from '@/app/features/uiBtns/GoogleBtn';

const LoginAuth = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full   ">
            <div className="flex items-center justify-center gap-6 my-6  font-bold  sm:text-sm pt-2">
                <div className="border  w-52 border-neutral-600"></div>
                <span className="text-[#475569] dark:text-gray-400  ">ou</span>
                <div className=" border w-52 border-neutral-600"></div>
            </div>
            <div className="flex flex-wrap justify-center items-center  px-4   gap-2 md:gap-3  ">
                <GoogleBtn />
                <GitHubBtn />
            </div>
        </div>
    );
};

export default LoginAuth;
