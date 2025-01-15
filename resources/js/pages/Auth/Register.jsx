import { useEffect } from 'react'; // Importing React hooks
import { Head, Link, useForm } from '@inertiajs/react'; // Importing necessary components from Inertia.js
import { Input } from '@/Components/ui/input'; // Importing custom Input component
import { Button } from '@/Components/ui/button'; // Importing custom Button component
import InputError from '@/Components/InputError'; // Importing InputError component for displaying validation errors
import GuestLayout from '@/Layouts/GuestLayout'; // Importing layout for guest users
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select'; // Importing custom Select components

export default function Register({ departments }) {
    // Using useForm hook to manage form state and handle submissions
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', // Initial state for name
        email: '', // Initial state for email
        password: '', // Initial state for password
        password_confirmation: '', // Initial state for password confirmation
        department_id: '', // Initial state for department selection
    });

    useEffect(() => {
        // Effect to reset password fields on component unmount
        return () => {
            reset('password', 'password_confirmation'); // Resetting password fields
        };
    }, []);

    const submit = (e) => {
        e.preventDefault(); // Preventing default form submission
        post(route('register'), {
            onSuccess: () => {
                reset('password', 'password_confirmation'); // Resetting password fields on successful registration
            },
            preserveScroll: true, // Preserving scroll position on post
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
                        autoComplete="name" // Auto-complete for name
                        onChange={(e) => setData('name', e.target.value)} // Updating form state on change
                        required // Making this field required
                    />
                    <InputError message={errors.name} className="mt-2" /> {/* Displaying error message for name */}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <Input
                        id="email"
                        type="email" // Specifying input type as email
                        name="email"
                        value={data.email} // Binding input value to form state
                        className="mt-1 block w-full"
                        autoComplete="username" // Auto-complete for email
                        onChange={(e) => setData('email', e.target.value)} // Updating form state on change
                        required // Making this field required
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
                            <SelectValue placeholder="Select your department" /> {/* Placeholder for select input */}
                        </SelectTrigger>
                        <SelectContent>
                            {departments.map((department) => (
                                <SelectItem
                                    key={department.id} // Unique key for each department
                                    value={department.id.toString()} // Setting value as string
                                >
                                    {department.name} {/* Displaying department name */}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <p className="mt-1 text-sm text-gray-500">
                        Note: After registration, only managers can change your department.
                    </p>
                    <InputError message={errors.department_id} className="mt-2" /> {/* Displaying error message for department */}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <Input
                        id="password"
                        type="password" // Specifying input type as password
                        name="password"
                        value={data.password} // Binding input value to form state
                        className="mt-1 block w-full"
                        autoComplete="new-password" // Auto-complete for new password
                        onChange={(e) => setData('password', e.target.value)} // Updating form state on change
                        required // Making this field required
                    />
                    <InputError message={errors.password} className="mt-2" /> {/* Displaying error message for password */}
                </div>

                <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <Input
                        id="password_confirmation"
                        type="password" // Specifying input type as password
                        name="password_confirmation"
                        value={data.password_confirmation} // Binding input value to form state
                        className="mt-1 block w-full"
                        autoComplete="new-password" // Auto-complete for new password confirmation
                        onChange={(e) => setData('password_confirmation', e.target.value)} // Updating form state on change
                        required // Making this field required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" /> {/* Displaying error message for password confirmation */}
                </div>

                <div className="flex items-center justify-between">
                    <Link
                        href={route('login')} // Link to the login page
                        className="text-sm text-gray-600 hover:text-gray-900"
                    >
                        Already registered? {/* Link text for already registered users */}
                    </Link>

                    <Button type="submit" disabled={processing}> {/* Submit button, disabled while processing */}
                        Register
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
