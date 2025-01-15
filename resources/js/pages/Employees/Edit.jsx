import React from 'react'; // Importing React library for building user interfaces
import { Head, useForm } from '@inertiajs/react'; // Importing Head for setting the document head and useForm for form handling
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Importing the layout component for authenticated users
import { Button } from '@/Components/ui/button'; // Importing Button component for form submission
import { Input } from '@/Components/ui/input'; // Importing Input component for text input fields
import InputError from '@/Components/InputError'; // Importing InputError component to display validation errors
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select'; // Importing Select components for dropdown selection

// Main Edit component for editing employee details
export default function Edit({ auth, employee, departments }) {
    // Using useForm hook to manage form state and handle submissions
    const { data, setData, put, processing, errors } = useForm({
        name: employee.name || '', // Initializing name with employee's name or empty string
        email: employee.email || '', // Initializing email with employee's email or empty string
        department_id: employee.department_id ? employee.department_id.toString() : '', // Initializing department_id
        password: '', // Initializing password field
        password_confirmation: '', // Initializing password confirmation field
    });

    // Function to handle form submission
    const submit = (e) => {
        e.preventDefault(); // Preventing default form submission behavior
        put(route('employees.update', employee.id)); // Sending PUT request to update employee details
    };

    return (
        <AuthenticatedLayout
            user={auth.user} // Passing authenticated user to the layout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Employee // Header for the edit employee page
                </h2>
            }
        >
            <Head title="Edit Employee" /> // Setting the page title

            <div className="py-12"> // Main container with padding
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> // Centering the content
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg"> // Card-like container for the form
                        <div className="p-6"> // Padding for the inner content
                            <form onSubmit={submit} className="space-y-6"> // Form with spacing between elements
                                <div>
                                    <label
                                        htmlFor="name" // Label for the name input
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Name
                                    </label>
                                    <Input
                                        id="name" // Input for employee's name
                                        type="text"
                                        value={data.name} // Binding input value to form state
                                        onChange={(e) =>
                                            setData('name', e.target.value) // Updating form state on input change
                                        }
                                        required // Making this field required
                                    />
                                    <InputError message={errors.name} /> // Displaying error message for name
                                </div>

                                <div>
                                    <label
                                        htmlFor="email" // Label for the email input
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email
                                    </label>
                                    <Input
                                        id="email" // Input for employee's email
                                        type="email"
                                        value={data.email} // Binding input value to form state
                                        onChange={(e) =>
                                            setData('email', e.target.value) // Updating form state on input change
                                        }
                                        required // Making this field required
                                    />
                                    <InputError message={errors.email} /> // Displaying error message for email
                                </div>

                                <div>
                                    <label
                                        htmlFor="department" // Label for the department selection
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Department
                                    </label>
                                    <Select
                                        value={data.department_id ? data.department_id.toString() : ''} // Binding selected value to form state
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
                                                    key={department.id} // Unique key for each select item
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
                                        htmlFor="password" // Label for the password input
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        New Password
                                    </label>
                                    <Input
                                        id="password" // Input for new password
                                        type="password"
                                        value={data.password} // Binding input value to form state
                                        onChange={(e) =>
                                            setData('password', e.target.value) // Updating form state on input change
                                        }
                                    />
                                    <InputError message={errors.password} /> // Displaying error message for password
                                </div>

                                <div>
                                    <label
                                        htmlFor="password_confirmation" // Label for the password confirmation input
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Confirm New Password
                                    </label>
                                    <Input
                                        id="password_confirmation" // Input for confirming new password
                                        type="password"
                                        value={data.password_confirmation} // Binding input value to form state
                                        onChange={(e) =>
                                            setData('password_confirmation', e.target.value) // Updating form state on input change
                                        }
                                    />
                                </div>

                                <div className="flex justify-end"> // Flex container for the button
                                    <Button
                                        type="submit" // Submit button for the form
                                        disabled={processing} // Disabling button while processing
                                    >
                                        Update Employee // Button text
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