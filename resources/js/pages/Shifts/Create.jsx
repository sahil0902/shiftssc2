import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import {
    FormControl,
    FormLabel,
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
import { toast } from 'sonner';
import FlashMessage from '@/Components/FlashMessage';

const ErrorMessage = ({ children }) => {
    if (!children) return null;
    return <p className="mt-1 text-sm text-red-600">{children}</p>;
};

export default function Create({ auth, departments }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        department_id: '',
        start_time: '',
        end_time: '',
        required_employees: '1',
        status: 'open',
        hourly_rate: '0',
    });

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting data:', data);
        
        post(route('shifts.store'), {
            onSuccess: () => {
                console.log('Success! Redirecting...');
            },
            onError: (errors) => {
                console.error('Form submission errors:', errors);
                Object.keys(errors).forEach(key => {
                    toast.error(errors[key]);
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Create Shift"
        >
            <Head title="Create Shift" />
            <FlashMessage />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {errors.error && (
                                <div className="mb-4 rounded-md border border-red-400 bg-red-100 p-4 text-red-700">
                                    {errors.error}
                                </div>
                            )}
                            <form onSubmit={onSubmit} className="space-y-6">
                                <div>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                        />
                                    </FormControl>
                                    <ErrorMessage>{errors.title}</ErrorMessage>
                                </div>

                                <div>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                        />
                                    </FormControl>
                                    <ErrorMessage>{errors.description}</ErrorMessage>
                                </div>

                                <div>
                                    <FormLabel>Department</FormLabel>
                                    <Select
                                        value={data.department_id}
                                        onValueChange={value => setData('department_id', value)}
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
                                    <ErrorMessage>{errors.department_id}</ErrorMessage>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <FormLabel>Start Time</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="datetime-local"
                                                value={data.start_time}
                                                onChange={e => setData('start_time', e.target.value)}
                                            />
                                        </FormControl>
                                        <ErrorMessage>{errors.start_time}</ErrorMessage>
                                    </div>

                                    <div>
                                        <FormLabel>End Time</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="datetime-local"
                                                value={data.end_time}
                                                onChange={e => setData('end_time', e.target.value)}
                                            />
                                        </FormControl>
                                        <ErrorMessage>{errors.end_time}</ErrorMessage>
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <FormLabel>Required Employees</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="1"
                                                value={data.required_employees}
                                                onChange={e => setData('required_employees', e.target.value)}
                                            />
                                        </FormControl>
                                        <ErrorMessage>{errors.required_employees}</ErrorMessage>
                                    </div>

                                    <div>
                                        <FormLabel>Hourly Rate (£)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={data.hourly_rate}
                                                onChange={e => setData('hourly_rate', e.target.value)}
                                            />
                                        </FormControl>
                                        <ErrorMessage>{errors.hourly_rate}</ErrorMessage>
                                    </div>
                                </div>

                                <div>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                        value={data.status}
                                        onValueChange={value => setData('status', value)}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="open">Open</SelectItem>
                                            <SelectItem value="filled">Filled</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <ErrorMessage>{errors.status}</ErrorMessage>
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="ml-4"
                                    >
                                        Create Shift
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