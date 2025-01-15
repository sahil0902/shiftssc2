import React from 'react'; // Importing React library for building user interfaces
import { Head, useForm } from '@inertiajs/react'; // Importing Head for managing document head and useForm for form handling
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Importing the layout component for authenticated users
import { Button } from '@/Components/ui/button'; // Importing Button component for user actions
import { Input } from '@/Components/ui/input'; // Importing Input component for user input fields
import InputError from '@/Components/InputError'; // Importing InputError component to display validation errors

// Main functional component for editing a department
export default function Edit({ auth, department }) {
    // Using useForm hook to manage form state and handle submission
    const { data, setData, put, processing, errors } = useForm({
        name: department.name, // Initializing form data with the department's current name
    });

    // Function to handle form submission
    const submit = (e) => {
        e.preventDefault(); // Preventing default form submission behavior
        put(route('departments.update', department.id)); // Sending a PUT request to update the department
    };

    return (
        <AuthenticatedLayout
            user={auth.user} // Passing authenticated user data to the layout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Department // Header for the edit page
                </h2>
            }
        >
            <Head title="Edit Department" /> // Setting the document title

            <div className="py-12"> // Main container with padding
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> // Centering the content with responsive padding
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg"> // Card-like container for the form
                        <div className="p-6"> // Inner container with padding
                            <form onSubmit={submit} className="space-y-6"> // Form element with submit handler and spacing
                                <div>
                                    <label
                                        htmlFor="name" // Associating label with input field
                                        className="block text-sm font-medium text-gray-700" // Styling for the label
                                    >
                                        Name // Label text
                                    </label>
                                    <Input
                                        id="name" // Input field ID
                                        type="text" // Input type
                                        value={data.name} // Binding input value to form data
                                        onChange={(e) =>
                                            setData('name', e.target.value) // Updating form data on input change
                                        }
                                        required // Making the input field required
                                    />
                                    <InputError message={errors.name} /> // Displaying error message if validation fails
                                </div>

                                <div className="flex justify-end"> // Flex container for button alignment
                                    <Button
                                        type="submit" // Button type
                                        disabled={processing} // Disabling button while processing
                                    >
                                        Update Department // Button text
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