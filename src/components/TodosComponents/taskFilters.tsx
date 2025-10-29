'use client ';
import { Button } from '@/components/ui/button';

type TaskFiltersProps = {
    filterStatus: string;
    pendenteTasks: number;
    concluidoTasks: number;
    fazendoTasks: number;
    onFilterChange: (status: string) => void;
};

export function TaskFilters({ filterStatus, pendenteTasks, concluidoTasks, fazendoTasks, onFilterChange }: TaskFiltersProps) {
    return (
        <div className=" flex container justify-evenly  px-2 mt-8 gap-6">
            <Button
                onClick={() => onFilterChange('pendente')}
                className={` flex-col rounded-xl  justify-around items-center flex-1 transition-all duration-300 delay-0 max-w-60 h-1/2 sm:h-28 ${
                    filterStatus === 'pendente'
                        ? 'bg-[#8f723f] dark:bg-[#334e6b] hover:dark:bg-[#41658b] hover:bg-[#5e5036] scale-110 text-white delay-0'
                        : 'bg-[#998865] hover:bg-[#5e5036] dark:bg-[#243649] hover:dark:bg-[#41658b]'
                } `}
            >
                <span className="text-xs sm:text-sm font-bold">Pendentes</span>{' '}
                <p className="text-neutral-200  text-[8px] sm:text-xs">
                    {pendenteTasks} tarefa{pendenteTasks > 1 ? 's' : ''}
                </p>
            </Button>

            <Button
                onClick={() => onFilterChange('concluido')}
                className={` flex  flex-col  rounded-xl transition-all duration-300 delay-75 justify-around items-center flex-1 max-w-60 h-1/2 sm:h-28 ${
                    filterStatus === 'concluido'
                        ? 'bg-[#8f723f]  dark:bg-[#334e6b] hover:dark:bg-[#41658b] hover:bg-[#5e5036] scale-110 text-white delay-0'
                        : 'bg-[#998865] hover:bg-[#5e5036] dark:bg-[#243649]  hover:dark:bg-[#41658b]'
                }`}
            >
                <span className="text-xs sm:text-sm font-bold">Concluído</span>{' '}
                <p className="text-neutral-200  text-[8px] sm:text-xs">
                    {concluidoTasks} tarefa{concluidoTasks > 1 ? 's' : ''}
                </p>
            </Button>
            <Button
                onClick={() => onFilterChange('fazendo')}
                className={`  flex  flex-col  rounded-xl transition-all duration-300 delay-75 justify-around items-center flex-1  max-w-60 h-1/2 sm:h-28  ${
                    filterStatus === 'fazendo'
                        ? 'bg-[#8f723f]  dark:bg-[#334e6b] hover:dark:bg-[#41658b] hover:bg-[#5e5036] scale-110 text-white delay-0'
                        : 'bg-[#998865] hover:bg-[#5e5036] dark:bg-[#243649] hover:dark:bg-[#41658b] '
                }`}
            >
                <span className="text-xs sm:text-sm font-bold">Fazendo</span>{' '}
                <p className="text-neutral-200  text-[8px] sm:text-xs">
                    {fazendoTasks} tarefa{fazendoTasks > 1 ? 's' : ''}
                </p>
            </Button>
        </div>
    );
}
