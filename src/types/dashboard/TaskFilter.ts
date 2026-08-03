export type TaskFiltersProps = {
    filterStatus: string;
    pendenteTasks: number;
    concluidoTasks: number;
    fazendoTasks: number;
    onFilterChange: (status: string) => void;
}



export type TaskFilterPendenteProps = {
    filterStatus: string;
    pendenteTasks: number;
    onFilterChange: (status: string) => void;
};

export type TaskFilterConcluidoProps = {
    filterStatus: string;
    concluidoTasks: number;
    onFilterChange: (status: string) => void;
};

export type TaskFilterFazendoProps = {
    filterStatus: string;
    fazendoTasks: number;
    onFilterChange: (status: string) => void;
};