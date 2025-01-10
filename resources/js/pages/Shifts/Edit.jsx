import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import { format } from 'date-fns';

export default function Edit({ auth, shift, departments }) {
    const { data, setData, put, processing, errors } = useForm({
        title: shift.title,
        description: shift.description || '',
        department_id: shift.department_id.toString(),
        start_time: format(new Date(shift.start_time), "yyyy-MM-dd'T'HH:mm"),
        end_time: format(new Date(shift.end_time), "yyyy-MM-dd'T'HH:mm"),
        required_employees: shift.required_employees.toString(),
        status: shift.status,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('shifts.update', shift.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Shift
                </h2>
            }
        >
            <Head title="Edit Shift" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <FormLabel htmlFor="title">Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) =>
                                                setData('title', e.target.value)
                                            }
                                        />
                                    </FormControl>
                                    {errors.title && (
                                        <FormMessage>{errors.title}</FormMessage>
                                    )}
                                </div>

                                <div>
                                    <FormLabel htmlFor="description">
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    'description',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </FormControl>
                                    {errors.description && (
                                        <FormMessage>
                                            {errors.description}
                                        </FormMessage>
                                    )}
                                </div>

                                <div>
                                    <FormLabel htmlFor="department_id">
                                        Department
                                    </FormLabel>
                                    <Select
                                        value={data.department_id}
                                        onValueChange={(value) =>
                                            setData('department_id', value)
                                        }
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a department" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {departments.map((department) => (
                                                <SelectItem
                                                    key={department.id}
                                                    value={department.id.toString()}
                                                >
                                                    {department.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.department_id && (
                                        <FormMessage>
                                            {errors.department_id}
                                        </FormMessage>
                                    )}
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <FormLabel htmlFor="start_time">
                                            Start Time
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="start_time"
                                                type="datetime-local"
                                                value={data.start_time}
                                                onChange={(e) =>
                                                    setData(
                                                        'start_time',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        {errors.start_time && (
                                            <FormMessage>
                                                {errors.start_time}
                                            </FormMessage>
                                        )}
                                    </div>

                                    <div>
                                        <FormLabel htmlFor="end_time">
                                            End Time
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="end_time"
                                                type="datetime-local"
                                                value={data.end_time}
                                                onChange={(e) =>
                                                    setData(
                                                        'end_time',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        {errors.end_time && (
                                            <FormMessage>
                                                {errors.end_time}
                                            </FormMessage>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <FormLabel htmlFor="required_employees">
                                        Required Employees
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="required_employees"
                                            type="number"
                                            min="1"
                                            value={data.required_employees}
                                            onChange={(e) =>
                                                setData(
                                                    'required_employees',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </FormControl>
                                    {errors.required_employees && (
                                        <FormMessage>
                                            {errors.required_employees}
                                        </FormMessage>
                                    )}
                                </div>

                                <div>
                                    <FormLabel htmlFor="status">Status</FormLabel>
                                    <Select
                                        value={data.status}
                                        onValueChange={(value) =>
                                            setData('status', value)
                                        }
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="open">
                                                Open
                                            </SelectItem>
                                            <SelectItem value="filled">
                                                Filled
                                            </SelectItem>
                                            <SelectItem value="cancelled">
                                                Cancelled
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && (
                                        <FormMessage>
                                            {errors.status}
                                        </FormMessage>
                                    )}
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="ml-4"
                                    >
                                        Update Shift
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 