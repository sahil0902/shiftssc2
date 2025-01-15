import { useState } from 'react'; // Importing useState hook for managing local state
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Importing layout for authenticated users
import { Head, useForm } from '@inertiajs/react'; // Importing Head for document title and useForm for form handling
import { Button } from '@/Components/ui/button'; // Importing Button component for form submission
import {
    FormControl,
    FormLabel,
} from '@/Components/ui/form'; // Importing form control components for structured forms
import { Input } from '@/Components/ui/input'; // Importing Input component for text input fields
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select'; // Importing Select components for dropdowns
import { Textarea } from '@/Components/ui/textarea'; // Importing Textarea component for multi-line input
import { toast } from 'sonner'; // Importing toast for displaying notifications
import FlashMessage from '@/Components/FlashMessage'; // Importing FlashMessage component for displaying messages

// Component to display error messages
const ErrorMessage = ({ children }) => {
    if (!children) return null; // Return null if no error message is provided
    return <p className="mt-1 text-sm text-red-600">{children}</p>; // Render error message with styling
};

// Main functional component for creating a shift
export default function Create({ auth, departments }) {
    // Setting up form state and methods using useForm hook
    const { data, setData, post, processing, errors } = useForm({
        title: '', // Initial state for title input
        description: '', // Initial state for description input
        department_id: '', // Initial state for department selection
        start_time: '', // Initial state for start time input
        end_time: '', // Initial state for end time input
        required_employees: '1', // Initial state for required employees input
        status: 'open', // Initial state for status selection
        hourly_rate: '0', // Initial state for hourly rate input
    });

    // Function to handle form submission
    const onSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        console.log('Submitting data:', data); // Log the data being submitted
        
        // Sending a POST request to store the shift data
        post(route('shifts.store'), {
            onSuccess: () => {
                console.log('Success! Redirecting...'); // Log success message
            },
            onError: (errors) => {
                console.error('Form submission errors:', errors); // Log any submission errors
                Object.keys(errors).forEach(key => {
                    toast.error(errors[key]); // Display each error message using toast
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user} // Passing authenticated user to layout
            header="Create Shift" // Setting the header for the layout
        >
            <Head title="Create Shift" /> 
            <FlashMessage /> 

            <div className="py-12"> {/* Main container with padding */}
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8"> {/* Centering the content */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg"> {/* Card for the form */}
                        <div className="p-6"> {/* Padding for the card content */}
                            {errors.error && ( // Conditional rendering for general errors
                                <div className="mb-4 rounded-md border border-red-400 bg-red-100 p-4 text-red-700">
                                    {errors.error} {/* Displaying general error message */}
                                </div>
                            )}
                            <form onSubmit={onSubmit} className="space-y-6"> {/* Form element with submission handler */}
                                <div>
                                    <FormLabel>Title</FormLabel> {/* Label for title input */}
                                    <FormControl>
                                        <Input
                                            value={data.title} // Binding input value to form state
                                            onChange={e => setData('title', e.target.value)} // Updating form state on input change
                                        />
                                    </FormControl>
                                    <ErrorMessage>{errors.title}</ErrorMessage> {/* Displaying error message for title input */}
                                </div>

                                <div>
                                    <FormLabel>Description</FormLabel> {/* Label for description input */}
                                    <FormControl>
                                        <Textarea
                                            value={data.description} // Binding textarea value to form state
                                            onChange={e => setData('description', e.target.value)} // Updating form state on input change
                                        />
                                    </FormControl>
                                    <ErrorMessage>{errors.description}</ErrorMessage> {/* Displaying error message for description input */}
                                </div>

                                <div>
                                    <FormLabel>Department</FormLabel> {/* Label for department selection */}
                                    <Select
                                        value={data.department_id} // Binding select value to form state
                                        onValueChange={value => setData('department_id', value)} // Updating form state on value change
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a department" /> {/* Placeholder for select */}
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {departments.map((department) => ( // Mapping through departments to create select items
                                                <SelectItem
                                                    key={department.id} // Unique key for each department
                                                    value={department.id.toString()} // Setting value for select item
                                                >
                                                    {department.name} {/* Displaying department name */}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <ErrorMessage>{errors.department_id}</ErrorMessage> {/* Displaying error message for department selection */}
                                </div>

                                <div className="grid gap-4 md:grid-cols-2"> {/* Grid layout for time inputs */}
                                    <div>
                                        <FormLabel>Start Time</FormLabel> {/* Label for start time input */}
                                        <FormControl>
                                            <Input
                                                type="datetime-local" // Input type for date and time
                                                value={data.start_time} // Binding input value to form state
                                                onChange={e => setData('start_time', e.target.value)} // Updating form state on input change
                                            />
                                        </FormControl>
                                        <ErrorMessage>{errors.start_time}</ErrorMessage> {/* Displaying error message for start time input */}
                                    </div>

                                    <div>
                                        <FormLabel>End Time</FormLabel> {/* Label for end time input */}
                                        <FormControl>
                                            <Input
                                                type="datetime-local" // Input type for date and time
                                                value={data.end_time} // Binding input value to form state
                                                onChange={e => setData('end_time', e.target.value)} // Updating form state on input change
                                            />
                                        </FormControl>
                                        <ErrorMessage>{errors.end_time}</ErrorMessage> {/* Displaying error message for end time input */}
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2"> {/* Grid layout for employee and rate inputs */}
                                    <div>
                                        <FormLabel>Required Employees</FormLabel> {/* Label for required employees input */}
                                        <FormControl>
                                            <Input
                                                type="number" // Input type for number
                                                min="1" // Minimum value for input
                                                value={data.required_employees} // Binding input value to form state
                                                onChange={e => setData('required_employees', e.target.value)} // Updating form state on input change
                                            />
                                        </FormControl>
                                        <ErrorMessage>{errors.required_employees}</ErrorMessage> {/* Displaying error message for required employees input */}
                                    </div>

                                    <div>
                                        <FormLabel>Hourly Rate (£)</FormLabel> {/* Label for hourly rate input */}
                                        <FormControl>
                                            <Input
                                                type="number" // Input type for number
                                                min="0" // Minimum value for input
                                                step="0.01" // Step value for decimal input
                                                value={data.hourly_rate} // Binding input value to form state
                                                onChange={e => setData('hourly_rate', e.target.value)} // Updating form state on input change
                                            />
                                        </FormControl>
                                        <ErrorMessage>{errors.hourly_rate}</ErrorMessage> {/* Displaying error message for hourly rate input */}
                                    </div>
                                </div>

                                <div>
                                    <FormLabel>Status</FormLabel> {/* Label for status selection */}
                                    <Select
                                        value={data.status} // Binding select value to form state
                                        onValueChange={value => setData('status', value)} // Updating form state on value change
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" /> {/* Placeholder for select */}
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="open">Open</SelectItem> {/* Select item for open status */}
                                            <SelectItem value="filled">Filled</SelectItem> {/* Select item for filled status */}
                                            <SelectItem value="cancelled">Cancelled</SelectItem> {/* Select item for cancelled status */}
                                        </SelectContent>
                                    </Select>
                                    <ErrorMessage>{errors.status}</ErrorMessage> {/* Displaying error message for status selection */}
                                </div>

                                <div className="flex justify-end"> {/* Flex container for button alignment */}
                                    <Button
                                        type="submit" // Setting button type to submit
                                        disabled={processing} // Disabling button while processing
                                        className="ml-4" // Adding margin to the left
                                    >
                                        Create Shift {/* Button text */}
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