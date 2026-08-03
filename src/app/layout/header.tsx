import { ToogleTheme } from '@/components/toggleTheme';
import Image from '@/components/Image';
import { LogoutBtn } from '../features/uiBtns/LogoutBtn';
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();

    const isTodosPage = pathname === '/dashboard';
    return (
        <header
            className=" bg-[#EEF2F6]     dark:bg-gradient-to-r
            dark:from-[#253b44]
            dark:via-[#121d21]
            dark:to-[#0e1619]
    dark:border-b
    dark:border-white/5 w-full h-16  flex font-nunito  justify-between shadow-lg"
        >
            <div className="  flex w-[95%] justify-between items-center mx-auto">
                <div className="flex items-center justify-center">
                    <Image />
                    <h1 className="font-open_sans font-bold text-xs xs:text-sm md:text-base text-[#2c3d4b] dark:text-white  ">PlanIt</h1>
                </div>
                <div className="flex  gap-4">
                    <ToogleTheme />
                    {isTodosPage && <LogoutBtn />}
                </div>
            </div>
        </header>
    );
};

export default Header;
