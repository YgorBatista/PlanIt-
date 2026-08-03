import Image from 'next/image';

const Footer = () => {
    return (
        <div
            className="relative bg-[#EEF2F6]   dark:bg-gradient-to-r
            dark:from-[#253b44]
            dark:via-[#121d21]
            dark:to-[#0e1619]
    dark:border-b
    dark:border-white/5  text-[#2c3d4b] dark:text-white font-nunito w-full  h-10 xs:h-12 flex justify-center items-center"
        >
            <a className="flex items-center gap-0.5 px-3 py-1 rounded-md hover:gap-3 group transition-all duration-300" href="https://github.com/YgorBatista">
                <span>feito por</span>
                <Image
                    src="/github-icon.png"
                    alt="GitHub Icon"
                    width={32}
                    height={32}
                    className="w-3 h-3 opacity-0 scale-75 group-hover:opacity-80 group-hover:scale-[200%] transition-all duration-300"
                />
                <span className="font-bold transition-all duration-300 -ml-3 group-hover:-ml-0  ">Ygor</span>
            </a>
        </div>
    );
};

export default Footer;
