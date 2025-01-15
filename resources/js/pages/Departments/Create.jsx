import React from 'react'; // Importing React library for building user interfaces
import { Head, useForm } from '@inertiajs/react'; // Importing Head for setting page title and useForm for form handling
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Importing the layout component for authenticated users
import { Button } from '@/Components/ui/button'; // Importing Button component for form submission
import { Input } from '@/Components/ui/input'; // Importing Input component for user input
import InputError from '@/Components/InputError'; // Importing InputError component to display validation errors

// Create component for department creation
export default function Create({ auth }) {
    // Using useForm hook to manage form state and handle submissions
    const { data, setData, post, processing, errors } = useForm({
        name: '', // Initial state for the department name
    });

    // Function to handle form submission
    const submit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        post(route('departments.store')); // Send a POST request to store the department
    };

    return (
        <AuthenticatedLayout
            user={auth.user} // Passing authenticated user data to the layout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Department // Header for the create department page
                </h2>
            }
        >
            <Head title="Create Department" /> // Setting the page title

            <div className="py-12"> // Main container with padding
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> // Centering the content with max width
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg"> // Card-like container for the form
                        <div className="p-6"> // Padding for the inner content
                            <form onSubmit={submit} className="space-y-6"> // Form with spacing between elements
                                <div>
                                    <label
                                        htmlFor="name" // Associating label with input
                                        className="block text-sm font-medium text-gray-700" // Styling for the label
                                    >
                                        Name // Label text for the input field
                                    </label>
                                    <Input
                                        id="name" // Input field ID
                                        type="text" // Input type
                                        value={data.name} // Binding input value to form state
                                        onChange={(e) => // Handling input change
                                            setData('name', e.target.value) // Updating form state with input value
                                        }
                                        required // Making the input field required
                                    />
                                    <InputError message={errors.name} /> // Displaying error message if validation fails
                                </div>

                                <div className="flex justify-end"> // Flex container for button alignment
                                    <Button
                                        type="submit" // Button type for form submission
                                        disabled={processing} // Disabling button while processing
                                    >
                                        Create Department // Button text
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