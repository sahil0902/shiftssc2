import React from 'react'; // Importing React library to build user interfaces
import { Head, useForm } from '@inertiajs/react'; // Importing Head for managing the document title and useForm for handling form state
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

export default function Create({ auth, departments }) {
    // Using useForm hook to manage form state and handle submissions
    const { data, setData, post, processing, errors } = useForm({
        name: '', // Initial value for the employee's name input
        email: '', // Initial value for the employee's email input
        password: '', // Initial value for the employee's password input
        password_confirmation: '', // Initial value for confirming the employee's password
        department_id: '', // Initial value for the selected department
    });

    // Function to handle form submission
    const submit = (e) => {
        e.preventDefault(); // Preventing the default form submission behavior
        post(route('employees.store')); // Sending a POST request to store the new employee data
    };

    return (
        <AuthenticatedLayout
            user={auth.user} // Passing authenticated user data to the layout for access control
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Employee {/* Header for the create employee page */}
                </h2>
            }
        >
            <Head title="Create Employee" /> {/* Setting the page title for the create employee view */}

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
                                        Name {/* Label text for name input */}
                                    </label>
                                    <Input
                                        id="name" // Input ID for accessibility
                                        type="text" // Input type for text
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
                                        Email {/* Label text for email input */}
                                    </label>
                                    <Input
                                        id="email" // Input ID for accessibility
                                        type="email" // Input type for email
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
                                        htmlFor="department" // Label for the department selection
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Department {/* Label text for department selection */}
                                    </label>
                                    <Select
                                        value={data.department_id} // Binding selected value to form state
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
                                        htmlFor="password" // Label for the password input field
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Password {/* Label text for password input */}
                                    </label>
                                    <Input
                                        id="password" // Input ID for accessibility
                                        type="password" // Input type for password
                                        value={data.password} // Binding input value to form state
                                        onChange={(e) =>
                                            setData('password', e.target.value) // Updating form state on input change
                                        }
                                        required // Making this field mandatory
                                    />
                                    <InputError message={errors.password} /> {/* Displaying error message for password input */}
                                </div>

                                <div>
                                    <label
                                        htmlFor="password_confirmation" // Label for the password confirmation input field
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Confirm Password {/* Label text for password confirmation input */}
                                    </label>
                                    <Input
                                        id="password_confirmation" // Input ID for accessibility
                                        type="password" // Input type for password confirmation
                                        value={data.password_confirmation} // Binding input value to form state
                                        onChange={(e) =>
                                            setData('password_confirmation', e.target.value) // Updating form state on input change
                                        }
                                        required // Making this field mandatory
                                    />
                                </div>

                                <div className="flex justify-end"> {/* Flex container for aligning the submit button */}
                                    <Button
                                        type="submit" // Button type for form submission
                                        disabled={processing} // Disabling button while processing the form
                                    >
                                        Create Employee {/* Button text for creating a new employee */}
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