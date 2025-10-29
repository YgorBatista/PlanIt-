import Image from 'next/image';

export default function Header() {
    return (
        <header className="flex items-center   ">
            <Image src="/img/LOGO.png" alt="Logo" width={36} height={36} />
            <h1 className="font-open_sans font-bold text-xl md:text-base text-white ">PlanIt</h1>
        </header>
    );
}
