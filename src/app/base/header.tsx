import { ToogleTheme } from '@/components/toggleTheme';
import Image from '@/components/Image';
import { LogoutBtn } from '../../components/LoginBtn/LogoutBtn';
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();

    const isTodosPage = pathname === '/todos';
    return (
        <div className=" bg-[#968b74] dark:bg-[#2f4257] w-full h-12  flex font-nunito  justify-between">
            <div className="  flex w-[95%] justify-between items-center mx-auto">
                <div className="flex items-center justify-center">
                    <Image />
                    <h1 className="font-open_sans font-bold text-xs xs:text-sm md:text-base text-white ">PlanIt</h1>
                </div>
                <div className="flex  gap-4">
                    <ToogleTheme />
                    {isTodosPage && <LogoutBtn />}
                </div>
            </div>
        </div>
    );
};

export default Header;
