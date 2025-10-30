import { Button } from '@/components/ui/button';

type TaskPaginationProps = {
    start: number;
    end: number;
    total: number;
    currentPage: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
};
export default function TaskPagination({ currentPage, totalPages, end, start, total, onPrev, onNext }: TaskPaginationProps) {
    return (
        <div className="flex flex-col mt-4 ">
            <div className="flex items-center justify-center gap-2 ">
                <div className="flex items-center gap-3 ">
                    <Button
                        className="rounded-full font-bold bg-[#bda886] hover:bg-[#9c865d] dark:bg-[#334e6b] dark:hover:bg-[#577799] w-8 h-8"
                        variant="outline"
                        onClick={onPrev}
                        disabled={currentPage === 0}
                    >
                        {'<'}
                    </Button>
                    <span className="w-32 text-center  text-xs xs:text-sm text-neutral-700  dark:text-neutral-50 ">
                        {start} - {end} de {total} tarefas
                    </span>

                    <Button
                        className="rounded-full font-bold bg-[#bda886]  hover:bg-[#9c865d] dark:bg-[#334e6b]  dark:hover:bg-[#577799]  dark:text-white w-8 h-8"
                        variant="outline"
                        onClick={onNext}
                        disabled={currentPage >= totalPages - 1}
                    >
                        {'>'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
