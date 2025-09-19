import { ToogleTheme } from '@/components/toggleTheme';

const Header = () => {
    return (
        <div className=" bg-neutral-500 w-screen h-12 flex font-nunito  justify-between">
            <div className="  flex w-[95%] justify-between items-center mx-auto">
                <h1 className="font-open_sans text-white font-bold text-xl">Header</h1>
                <div className=" ">
                    <ToogleTheme />
                </div>
            </div>
        </div>
    );
};

export default Header;
