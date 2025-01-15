import { useEffect } from 'react'; // Importing React hooks
import { Head, Link, useForm } from '@inertiajs/react'; // Importing Inertia.js components for form handling
import { Input } from '@/Components/ui/input'; // Importing Input component for text fields
import { Button } from '@/Components/ui/button'; // Importing Button component for form submission
import InputError from '@/Components/InputError'; // Importing InputError component for displaying error messages
import GuestLayout from '@/Layouts/GuestLayout'; // Importing layout component for guest users
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select'; // Importing Select components for dropdown selection

export default function Register({ departments }) {
    // Using useForm hook to manage form state and handle submissions
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', // Initializing name field
        email: '', // Initializing email field
        password: '', // Initializing password field
        password_confirmation: '', // Initializing password confirmation field
        department_id: '', // Initializing department selection
    });

    // Effect to reset password fields on component unmount
    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation'); // Resetting password fields
        };
    }, []);

    // Function to handle form submission
    const submit = (e) => {
        e.preventDefault(); // Preventing default form submission behavior
        post(route('register'), { // Posting form data to the register route
            onSuccess: () => {
                reset('password', 'password_confirmation'); // Resetting password fields on success
            },
            preserveScroll: true, // Preserving scroll position
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" /> {/* Setting the page title */}

            <form onSubmit={submit} className="space-y-6"> {/* Form submission handler */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <Input
                        id="name"
                        name="name"
                        value={data.name} // Binding input value to form state
                        className="mt-1 block w-full"
                        autoComplete="name" // Autocomplete attribute for browsers
                        onChange={(e) => setData('name', e.target.value)} // Updating form state on input change
                        required // Making the field required
                    />
                    <InputError message={errors.name} className="mt-2" /> {/* Displaying error message for name */}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email} // Binding input value to form state
                        className="mt-1 block w-full"
                        autoComplete="username" // Autocomplete attribute for browsers
                        onChange={(e) => setData('email', e.target.value)} // Updating form state on input change
                        required // Making the field required
                    />
                    <InputError message={errors.email} className="mt-2" /> {/* Displaying error message for email */}
                </div>

                <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                        Department
                    </label>
                    <Select
                        value={data.department_id} // Binding selected value to form state
                        onValueChange={(value) => setData('department_id', value)} // Updating form state on selection change
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select your department" /> {/* Placeholder for the select input */}
                        </SelectTrigger>
                        <SelectContent>
                            {departments.map((department) => ( // Mapping through departments to create select items
                                <SelectItem
                                    key={department.id} // Unique key for each item
                                    value={department.id.toString()} // Setting value for each select item
                                >
                                    {department.name} {/* Displaying department name */}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <p className="mt-1 text-sm text-gray-500">
                        Note: After registration, only managers can change your department. {/* Note for users */}
                    </p>
                    <InputError message={errors.department_id} className="mt-2" /> {/* Displaying error message for department */}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password} // Binding input value to form state
                        className="mt-1 block w-full"
                        autoComplete="new-password" // Autocomplete attribute for browsers
                        onChange={(e) => setData('password', e.target.value)} // Updating form state on input change
                        required // Making the field required
                    />
                    <InputError message={errors.password} className="mt-2" /> {/* Displaying error message for password */}
                </div>

                <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation} // Binding input value to form state
                        className="mt-1 block w-full"
                        autoComplete="new-password" // Autocomplete attribute for browsers
                        onChange={(e) => setData('password_confirmation', e.target.value)} // Updating form state on input change
                        required // Making the field required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" /> {/* Displaying error message for password confirmation */}
                </div>

                <div className="flex items-center justify-between"> {/* Flex container for links and button */}
                    <Link
                        href={route('login')} // Link to the login page
                        className="text-sm text-gray-600 hover:text-gray-900"
                    >
                        Already registered? {/* Link text */}
                    </Link>

                    <Button type="submit" disabled={processing}> {/* Submit button */}
                        Register
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}