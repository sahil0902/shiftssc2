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
} from '@/Components/ui/form'; // Form components for structured form layout
import { Input } from '@/Components/ui/input'; // Input component for text input fields
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select'; // Select components for dropdowns
import { Textarea } from '@/Components/ui/textarea'; // Textarea component for multi-line text input
import { format } from 'date-fns'; // Date formatting utility

export default function Edit({ auth, shift, departments }) {
    // Using useForm hook to manage form data and state
    const { data, setData, put, processing, errors } = useForm({
        title: shift.title, // Initial title from the shift object
        description: shift.description || '', // Initial description, defaulting to empty string if undefined
        department_id: shift.department_id.toString(), // Convert department ID to string for controlled input
        start_time: format(new Date(shift.start_time), "yyyy-MM-dd'T'HH:mm"), // Format start time for input
        end_time: format(new Date(shift.end_time), "yyyy-MM-dd'T'HH:mm"), // Format end time for input
        required_employees: shift.required_employees.toString(), // Convert required employees to string
        status: shift.status, // Initial status from the shift object
    });

    // Function to handle form submission
    const submit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        put(route('shifts.update', shift.id)); // Send PUT request to update the shift
    };

    return (
        <AuthenticatedLayout
            user={auth.user} // Pass authenticated user to layout
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
                                            id="title" // Input ID for accessibility
                                            value={data.title} // Controlled input value
                                            onChange={(e) =>
                                                setData('title', e.target.value) // Update title on change
                                            }
                                        />
                                    </FormControl>
                                    {errors.title && ( // Display error message if title has an error
                                        <FormMessage>{errors.title}</FormMessage>
                                    )}
                                </div>

                                <div>
                                    <FormLabel htmlFor="description">
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            id="description" // Textarea ID for accessibility
                                            value={data.description} // Controlled input value
                                            onChange={(e) =>
                                                setData('description', e.target.value) // Update description on change
                                            }
                                        />
                                    </FormControl>
                                    {errors.description && ( // Display error message if description has an error
                                        <FormMessage>{errors.description}</FormMessage>
                                    )}
                                </div>

                                <div>
                                    <FormLabel htmlFor="department_id">
                                        Department
                                    </FormLabel>
                                    <Select
                                        value={data.department_id} // Controlled select value
                                        onValueChange={(value) =>
                                            setData('department_id', value) // Update department ID on change
                                        }
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a department" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {departments.map((department) => ( // Map through departments to create select items
                                                <SelectItem
                                                    key={department.id} // Unique key for each select item
                                                    value={department.id.toString()} // Convert department ID to string
                                                >
                                                    {department.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.department_id && ( // Display error message if department ID has an error
                                        <FormMessage>{errors.department_id}</FormMessage>
                                    )}
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <FormLabel htmlFor="start_time">
                                            Start Time
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="start_time" // Input ID for accessibility
                                                type="datetime-local" // Input type for date and time
                                                value={data.start_time} // Controlled input value
                                                onChange={(e) =>
                                                    setData('start_time', e.target.value) // Update start time on change
                                                }
                                            />
                                        </FormControl>
                                        {errors.start_time && ( // Display error message if start time has an error
                                            <FormMessage>{errors.start_time}</FormMessage>
                                        )}
                                    </div>

                                    <div>
                                        <FormLabel htmlFor="end_time">
                                            End Time
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="end_time" // Input ID for accessibility
                                                type="datetime-local" // Input type for date and time
                                                value={data.end_time} // Controlled input value
                                                onChange={(e) =>
                                                    setData('end_time', e.target.value) // Update end time on change
                                                }
                                            />
                                        </FormControl>
                                        {errors.end_time && ( // Display error message if end time has an error
                                            <FormMessage>{errors.end_time}</FormMessage>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <FormLabel htmlFor="required_employees">
                                        Required Employees
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="required_employees" // Input ID for accessibility
                                            type="number" // Input type for number
                                            min="1" // Minimum value for required employees
                                            value={data.required_employees} // Controlled input value
                                            onChange={(e) =>
                                                setData('required_employees', e.target.value) // Update required employees on change
                                            }
                                        />
                                    </FormControl>
                                    {errors.required_employees && ( // Display error message if required employees has an error
                                        <FormMessage>{errors.required_employees}</FormMessage>
                                    )}
                                </div>

                                <div>
                                    <FormLabel htmlFor="status">Status</FormLabel>
                                    <Select
                                        value={data.status} // Controlled select value
                                        onValueChange={(value) =>
                                            setData('status', value) // Update status on change
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
                                    {errors.status && ( // Display error message if status has an error
                                        <FormMessage>{errors.status}</FormMessage>
                                    )}
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        type="submit" // Button type for form submission
                                        disabled={processing} // Disable button while processing
                                        className="ml-4" // Margin left for spacing
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