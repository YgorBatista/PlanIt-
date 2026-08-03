'use client ';

import PendenteBtn from '@/app/features/dashboard/components/PendenteBtn';
import FazendoBtn from '@/app/features/dashboard/components/FazendoBtn';
import ConcluidoBtn from '@/app/features/dashboard/components/ConcluidoBtn';
import { TaskFiltersProps } from '@/types/dashboard/TaskFilter';

export function TaskFilters({ filterStatus, pendenteTasks, concluidoTasks, fazendoTasks, onFilterChange }: TaskFiltersProps) {
    return (
        <div className=" flex  justify-evenly  mt-4 gap-1">
            <PendenteBtn filterStatus={filterStatus} pendenteTasks={pendenteTasks} onFilterChange={onFilterChange} />
            <ConcluidoBtn filterStatus={filterStatus} concluidoTasks={concluidoTasks} onFilterChange={onFilterChange} />
            <FazendoBtn filterStatus={filterStatus} fazendoTasks={fazendoTasks} onFilterChange={onFilterChange} />
        </div>
    );
}
