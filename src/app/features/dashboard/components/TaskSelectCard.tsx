'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Circle } from 'lucide-react';

export function SelectCard({ value, disabled = false, onChange, getStatusColor }: TaskStatusSelectProps) {
    const getBgColorStatus = (status: string) => {
        switch (status) {
            case 'pendente':
                return 'bg-[#FD8C0930]  ';
            case 'concluido':
                return 'bg-[#16653430] ';
            case 'fazendo':
                return 'bg-[#2858EC30] ';
            default:
                return 'bg-neutral-500/30';
        }
    };
    const getTxtColorStatus = (status: string) => {
        switch (status) {
            case 'pendente':
                return 'text-[#FD8C09]  ';
            case 'concluido':
                return 'text-[#166534] ';
            case 'fazendo':
                return 'text-[#2858EC] ';
            default:
                return 'text-neutral-500';
        }
    };

    const bgColor = getBgColorStatus(value);
    const txtColor = getTxtColorStatus(value);
    return (
        <Select value={value} disabled={disabled} onValueChange={onChange}>
            <SelectTrigger className={`w-24  h-6 xs:h-8 font-black text-[10px]  sm:text-xs dark:text-neutral-100 ${bgColor} ${txtColor}  `}>
                <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectItem value="pendente" className="flex">
                        <div className="flex items-center gap-2">
                            <Circle className="size-2 fill-current" />
                            <p>Pendente</p>
                        </div>
                    </SelectItem>
                    <SelectItem value="concluido" className="flex">
                        <div className="flex items-center gap-2">
                            <Circle className="size-2 fill-current" />
                            <p>Concluído</p>
                        </div>
                    </SelectItem>
                    <SelectItem value="fazendo" className="flex">
                        <div className="flex items-center gap-2">
                            <Circle className="size-2 fill-current" />
                            <p>Fazendo</p>
                        </div>
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
