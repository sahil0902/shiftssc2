import React from 'react'; // Importing React library to build user interfaces
import { Head, useForm } from '@inertiajs/react'; // Importing Head for managing the document head and useForm for handling form state
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Importing layout component for authenticated user views
import { Button } from '@/Components/ui/button'; // Importing Button component for form submission
import { Input } from '@/Components/ui/input'; // Importing Input component for text input fields
import InputError from '@/Components/InputError'; // Importing InputError component to display validation error messages
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select'; // Importing Select components for dropdown selection functionality

// Main Edit component for modifying employee details
export default function Edit({ auth, employee, departments }) {
    // Using useForm hook to manage form state and handle submissions
    const { data, setData, put, processing, errors } = useForm({
        name: employee.name || '', // Initializing name field with employee's name or an empty string
        email: employee.email || '', // Initializing email field with employee's email or an empty string
        department_id: employee.department_id ? employee.department_id.toString() : '', // Initializing department_id with employee's department or an empty string
        password: '', // Initializing password field as empty
        password_confirmation: '', // Initializing password confirmation field as empty
    });

    // Function to handle form submission
    const submit = (e) => {
        e.preventDefault(); // Preventing the default form submission behavior
        put(route('employees.update', employee.id)); // Sending a PUT request to update employee details
    };

    return (
        <AuthenticatedLayout
            user={auth.user} // Passing authenticated user information to the layout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Employee {/* Header for the edit employee page */}
                </h2>
            }
        >
            <Head title="Edit Employee" /> {/* Setting the page title for the edit employee view */}

            <div className="py-12"> {/* Main container with vertical padding */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> {/* Centering the content with responsive padding */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg"> {/* Card-like container for the form */}
                        <div className="p-6"> {/* Inner content padding */}
                            <form onSubmit={submit} className="space-y-6"> {/* Form with vertical spacing between elements */}
                                <div>
                                    <label
                                        htmlFor="name" // Label for the name input field
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Name
                                    </label>
                                    <Input
                                        id="name" // Input field for employee's name
                                        type="text"
                                        value={data.name} // Binding input value to form state
                                        onChange={(e) =>
                                            setData('name', e.target.value) // Updating form state on input change
                                        }
                                        required // Making this field mandatory
                                    />
                                    <InputError message={errors.name} /> {/* Displaying error message for name input */}
                                </div>

                                <div>
                                    <label
                                        htmlFor="email" // Label for the email input field
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email
                                    </label>
                                    <Input
                                        id="email" // Input field for employee's email
                                        type="email"
                                        value={data.email} // Binding input value to form state
                                        onChange={(e) =>
                                            setData('email', e.target.value) // Updating form state on input change
                                        }
                                        required // Making this field mandatory
                                    />
                                    <InputError message={errors.email} /> {/* Displaying error message for email input */}
                                </div>

                                <div>
                                    <label
                                        htmlFor="department" // Label for the department selection dropdown
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
                                            <SelectValue placeholder="Select a department" /> {/* Placeholder for the select input */}
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from(
                                                new Map(
                                                    departments.map((dept) => [dept.name, dept]) // Use `name` as the key to ensure uniqueness
                                                ).values()
                                            ).map((department) => (
                                                <SelectItem
                                                    key={department.id} // Unique key for each department item
                                                    value={department.id.toString()} // Value for the select item
                                                >
                                                    {department.name} {/* Displaying department name */}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>

                                    </Select>
                                    <InputError message={errors.department_id} /> {/* Displaying error message for department selection */}
                                </div>

                                <div>
                                    <label
                                        htmlFor="password" // Label for the new password input field
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        New Password
                                    </label>
                                    <Input
                                        id="password" // Input field for new password
                                        type="password"
                                        value={data.password} // Binding input value to form state
                                        onChange={(e) =>
                                            setData('password', e.target.value) // Updating form state on input change
                                        }
                                    />
                                    <InputError message={errors.password} /> {/* Displaying error message for password input */}
                                </div>

                                <div>
                                    <label
                                        htmlFor="password_confirmation" // Label for the password confirmation input field
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Confirm New Password
                                    </label>
                                    <Input
                                        id="password_confirmation" // Input field for confirming new password
                                        type="password"
                                        value={data.password_confirmation} // Binding input value to form state
                                        onChange={(e) =>
                                            setData('password_confirmation', e.target.value) // Updating form state on input change
                                        }
                                    />
                                </div>

                                <div className="flex justify-end"> {/* Flex container for the submit button */}
                                    <Button
                                        type="submit" // Submit button for the form
                                        disabled={processing} // Disabling button while processing the form
                                    >
                                        Update Employee {/* Button text for submission */}
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