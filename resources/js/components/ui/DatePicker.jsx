import * as React from 'react';
import ReactDatePicker from 'react-datepicker';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/Components/ui/Button';
import { cn } from '@/lib/utils';
import 'react-datepicker/dist/react-datepicker.css';

export function DatePicker({
    selected,
    onSelect,
    className,
    showTimeSelect = false,
    placeholderText = 'Pick a date',
    ...props
}) {
    return (
        <div className={cn('grid gap-2', className)}>
            <ReactDatePicker
                selected={selected}
                onChange={onSelect}
                showTimeSelect={showTimeSelect}
                dateFormat={showTimeSelect ? 'MMMM d, yyyy h:mm aa' : 'MMMM d, yyyy'}
                placeholderText={placeholderText}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                customInput={
                    <Button
                        variant="outline"
                        className={cn(
                            'w-full justify-start text-left font-normal',
                            !selected && 'text-gray-400'
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selected ? (
                            showTimeSelect ? (
                                selected.toLocaleString()
                            ) : (
                                selected.toLocaleDateString()
                            )
                        ) : (
                            placeholderText
                        )}
                    </Button>
                }
                {...props}
            />
        </div>
    );
} 