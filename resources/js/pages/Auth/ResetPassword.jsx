import InputError from '@/Components/InputError'; // Importing InputError component for displaying error messages
import InputLabel from '@/Components/InputLabel'; // Importing InputLabel component for form labels
import PrimaryButton from '@/Components/PrimaryButton'; // Importing PrimaryButton component for the submit button
import TextInput from '@/Components/TextInput'; // Importing TextInput component for input fields
import GuestLayout from '@/Layouts/GuestLayout'; // Importing GuestLayout for consistent layout structure
import { Head, useForm } from '@inertiajs/react'; // Importing Head for setting the page title and useForm for form handling

export default function ResetPassword({ token, email }) {
    // Using useForm hook to manage form state and handle submissions
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token, // Setting the token from props
        email: email, // Setting the email from props
        password: '', // Initializing password field
        password_confirmation: '', // Initializing password confirmation field
    });

    // Function to handle form submission
    const submit = (e) => {
        e.preventDefault(); // Preventing default form submission behavior

        // Posting the form data to the password store route
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'), // Resetting password fields after submission
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" /> {/* Setting the page title */}

            <form onSubmit={submit}> {/* Form submission handler */}
                <div>
                    <InputLabel htmlFor="email" value="Email" /> {/* Label for email input */}

                    <TextInput
                        id="email" // Input ID for accessibility
                        type="email" // Input type for email
                        name="email" // Input name for form data
                        value={data.email} // Binding input value to form state
                        className="mt-1 block w-full" // Tailwind CSS classes for styling
                        autoComplete="username" // Autocomplete attribute for browsers
                        onChange={(e) => setData('email', e.target.value)} // Updating form state on input change
                    />

                    <InputError message={errors.email} className="mt-2" /> {/* Displaying error message for email */}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" /> {/* Label for password input */}

                    <TextInput
                        id="password" // Input ID for accessibility
                        type="password" // Input type for password
                        name="password" // Input name for form data
                        value={data.password} // Binding input value to form state
                        className="mt-1 block w-full" // Tailwind CSS classes for styling
                        autoComplete="new-password" // Autocomplete attribute for browsers
                        isFocused={true} // Automatically focus on this input
                        onChange={(e) => setData('password', e.target.value)} // Updating form state on input change
                    />

                    <InputError message={errors.password} className="mt-2" /> {/* Displaying error message for password */}
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password" // Label for password confirmation input
                    />

                    <TextInput
                        type="password" // Input type for password confirmation
                        id="password_confirmation" // Input ID for accessibility
                        name="password_confirmation" // Input name for form data
                        value={data.password_confirmation} // Binding input value to form state
                        className="mt-1 block w-full" // Tailwind CSS classes for styling
                        autoComplete="new-password" // Autocomplete attribute for browsers
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value) // Updating form state on input change
                        }
                    />

                    <InputError
                        message={errors.password_confirmation} // Displaying error message for password confirmation
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end"> {/* Flex container for button alignment */}
                    <PrimaryButton className="ms-4" disabled={processing}> {/* Submit button with processing state */}
                        Reset Password
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
