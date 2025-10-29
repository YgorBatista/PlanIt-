import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';

export function ToogleTheme() {
    const { theme, setTheme } = useTheme();
    const handleToggle = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    return (
        <div>
            <Button variant="outline" className="bg-[#cab69b] h-10 md:h-8 w-10 hover:bg-[#af9b80] dark:bg-[#1b2632] hover:dark:bg-[#32669c] relative" onClick={handleToggle} aria-label="Alternar tema">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100  rotate-0 transition-all dark:scale-0 dark:-rotate-90 " />

                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0  " />
            </Button>
        </div>
    );
}
