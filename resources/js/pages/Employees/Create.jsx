import React from 'react'; // Importing React library for building user interfaces
import { Head, useForm } from '@inertiajs/react'; // Importing Head for setting page title and useForm for form handling
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Importing the layout component for authenticated users
import { Button } from '@/Components/ui/button'; // Importing Button component for form submission
import { Input } from '@/Components/ui/input'; // Importing Input component for text inputs
import InputError from '@/Components/InputError'; // Importing InputError component to display validation errors
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select'; // Importing Select components for dropdown selection

export default function Create({ auth, departments }) {
    // Using useForm hook to manage form state and handle submissions
    const { data, setData, post, processing, errors } = useForm({
        name: '', // Initial state for name input
        email: '', // Initial state for email input
        password: '', // Initial state for password input
        password_confirmation: '', // Initial state for password confirmation input
        department_id: '', // Initial state for department selection
    });

    // Function to handle form submission
    const submit = (e) => {
        e.preventDefault(); // Preventing default form submission behavior
        post(route('employees.store')); // Sending a POST request to store the employee data
    };

    return (
        <AuthenticatedLayout
            user={auth.user} // Passing authenticated user data to the layout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Employee // Header for the create employee page
                </h2>
            }
        >
            <Head title="Create Employee" /> // Setting the page title

            <div className="py-12"> // Main container with padding
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> // Centering the content with max width
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg"> // Card-like container for the form
                        <div className="p-6"> // Padding for the inner content
                            <form onSubmit={submit} className="space-y-6"> // Form with spacing between elements
                                <div>
                                    <label
                                        htmlFor="name" // Associating label with input
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Name // Label for name input
                                    </label>
                                    <Input
                                        id="name" // Input ID for accessibility
                                        type="text" // Input type
                                        value={data.name} // Binding input value to form state
                                        onChange={(e) =>
                                            setData('name', e.target.value) // Updating form state on input change
                                        }
                                        required // Making this field mandatory
                                    />
                                    <InputError message={errors.name} /> // Displaying error message for name input
                                </div>

                                <div>
                                    <label
                                        htmlFor="email" // Associating label with input
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email // Label for email input
                                    </label>
                                    <Input
                                        id="email" // Input ID for accessibility
                                        type="email" // Input type
                                        value={data.email} // Binding input value to form state
                                        onChange={(e) =>
                                            setData('email', e.target.value) // Updating form state on input change
                                        }
                                        required // Making this field mandatory
                                    />
                                    <InputError message={errors.email} /> // Displaying error message for email input
                                </div>

                                <div>
                                    <label
                                        htmlFor="department" // Associating label with input
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Department // Label for department selection
                                    </label>
                                    <Select
                                        value={data.department_id} // Binding selected value to form state
                                        onValueChange={(value) =>
                                            setData('department_id', value) // Updating form state on selection change
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a department" /> // Placeholder for the select input
                                        </SelectTrigger>
                                        <SelectContent>
                                            {departments.map((department) => ( // Mapping through departments to create select items
                                                <SelectItem
                                                    key={department.id} // Unique key for each item
                                                    value={department.id.toString()} // Value for the select item
                                                >
                                                    {department.name} // Displaying department name
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.department_id} /> // Displaying error message for department selection
                                </div>

                                <div>
                                    <label
                                        htmlFor="password" // Associating label with input
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Password // Label for password input
                                    </label>
                                    <Input
                                        id="password" // Input ID for accessibility
                                        type="password" // Input type
                                        value={data.password} // Binding input value to form state
                                        onChange={(e) =>
                                            setData('password', e.target.value) // Updating form state on input change
                                        }
                                        required // Making this field mandatory
                                    />
                                    <InputError message={errors.password} /> // Displaying error message for password input
                                </div>

                                <div>
                                    <label
                                        htmlFor="password_confirmation" // Associating label with input
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Confirm Password // Label for password confirmation input
                                    </label>
                                    <Input
                                        id="password_confirmation" // Input ID for accessibility
                                        type="password" // Input type
                                        value={data.password_confirmation} // Binding input value to form state
                                        onChange={(e) =>
                                            setData('password_confirmation', e.target.value) // Updating form state on input change
                                        }
                                        required // Making this field mandatory
                                    />
                                </div>

                                <div className="flex justify-end"> // Flex container for aligning button
                                    <Button
                                        type="submit" // Button type for form submission
                                        disabled={processing} // Disabling button while processing
                                    >
                                        Create Employee // Button text
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