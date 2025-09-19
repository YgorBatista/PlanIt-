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
            <Button variant="outline" size="icon" className="bg-neutral-300 dark:bg-neutral-700 hover:dark:bg-neutral-500 relative" onClick={handleToggle} aria-label="Alternar tema">
                <Sun className={`h-[8.9rem] w-[1.2rem] transition-all absolute ${theme === 'dark' ? 'scale-0 rotate-90' : 'scale-100 rotate-0'}`} />

                <Moon className={`h-[1.2rem] w-[1.2rem] transition-all absolute ${theme === 'dark' ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'}`} />
            </Button>
        </div>
    );
}
