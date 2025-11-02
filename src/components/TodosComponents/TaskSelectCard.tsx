'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type TaskStatusSelectProps = {
    value: string;
    disabled?: boolean;
    onChange: (val: string) => void;
    getStatusColor: (status: string) => string;
};

export function SelectCard({ value, disabled = false, onChange, getStatusColor }: TaskStatusSelectProps) {
    return (
        <Select value={value} disabled={disabled} onValueChange={onChange}>
            <SelectTrigger className={`w-20 xs:w-[96px] h-6 xs:h-8 font-black text-[9px] xs:text-xs text-neutral-100 ${getStatusColor(value)}`}>
                <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="concluido">Concluído</SelectItem>
                    <SelectItem value="fazendo">Fazendo</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
