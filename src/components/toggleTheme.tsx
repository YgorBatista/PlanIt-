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
            <Button
                variant="outline"
                className="bg-[#ced4da]  rounded-sm h-8 w-8 hover:bg-[#aeb4b9] dark:bg-[#1b2632] hover:dark:bg-[#32669c] relative"
                onClick={handleToggle}
                aria-label="Alternar tema"
            >
                <Sun className="h-[1.2rem] w-[1.2rem] scale-75  rotate-0 transition-all dark:scale-0 dark:-rotate-90 " />

                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-75 dark:rotate-0  " />
            </Button>
        </div>
    );
}
