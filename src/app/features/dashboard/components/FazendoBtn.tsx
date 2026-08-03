import { TaskFilterFazendoProps } from '@/types/dashboard/TaskFilter';
import { Button } from '@/components/ui/button';
import { Timer } from 'lucide-react';
export default function FazendoBtn({ filterStatus, fazendoTasks, onFilterChange }: TaskFilterFazendoProps) {
    return (
        <Button
            onClick={() => onFilterChange('fazendo')}
            className={`flex flex-col md:flex-row justify-center md:justify-start items-center sm:items-center gap-3 md:gap-8 rounded-xl transition-all duration-300 flex-1 max-w-28 md:max-w-60 h-24 md:h-36 md:border md:border-l-8 sm:border-l-[#2858EC] ${
                filterStatus === 'fazendo' ? 'bg-[#2858EC] hover:bg-[#2858EC] scale-105 text-white' : 'bg-white dark:bg-transparent hover:bg-[#2858EC20] dark:hover:bg-[#2858EC20] text-[#2858EC]'
            }`}
        >
            <Timer
                className={` size-8 p-2 md:mx-4 border rounded-full bg-opacity-20 dark:bg-opacity-40 border-[#ffffff23] box-content ${
                    filterStatus === 'fazendo' ? 'text-white bg-[#ffffff30]' : 'text-[#2858EC] bg-[#2858EC40]'
                }`}
            />

            <div className="flex flex-col items-center md:items-start gap-1">
                <p className="text-xs sm:text-sm font-bold">Fazendo</p>

                <div className="hidden md:block">
                    <p className={`my-2 text-[8px] sm:text-xl ${filterStatus === 'fazendo' ? 'text-white' : 'text-[#2858EC]'}`}>{fazendoTasks}</p>
                    <p>tarefa{fazendoTasks === 1 ? '' : 's'}</p>
                </div>
            </div>
        </Button>
    );
}
