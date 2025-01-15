import Checkbox from '@/Components/Checkbox'; // Importing Checkbox component for "Remember me" functionality
import InputError from '@/Components/InputError'; // Importing InputError component to display validation errors
import InputLabel from '@/Components/InputLabel'; // Importing InputLabel component for labeling input fields
import PrimaryButton from '@/Components/PrimaryButton'; // Importing PrimaryButton component for the submit button
import TextInput from '@/Components/TextInput'; // Importing TextInput component for user input fields
import GuestLayout from '@/Layouts/GuestLayout'; // Importing GuestLayout for consistent styling
import { Head, Link, useForm } from '@inertiajs/react'; // Importing necessary hooks and components from Inertia.js
import { useState } from 'react'; // Importing useState hook for managing local state

export default function Login({ status, canResetPassword }) {
    const [showResetMessage, setShowResetMessage] = useState(false); // State to control visibility of reset message
    const { data, setData, post, processing, errors, reset } = useForm({ // Using useForm hook to manage form state
        email: '', // Initial state for email input
        password: '', // Initial state for password input
        remember: false, // Initial state for remember me checkbox
    });

    const submit = (e) => { // Function to handle form submission
        e.preventDefault(); // Preventing default form submission behavior
        post(route('login'), { // Sending a POST request to the login route
            onFinish: () => reset('password'), // Resetting password field after submission
        });
    };

    const handleResetClick = (e) => { // Function to handle click on "Forgot password?" link
        e.preventDefault(); // Preventing default link behavior
        setShowResetMessage(true); // Showing the reset message
    };

    return (
        <GuestLayout> {/* Wrapping the login form in GuestLayout for consistent styling */}
            <Head title="Log in" /> {/* Setting the page title for the login page */}

            {status && ( // Conditionally rendering status message if it exists
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status} {/* Displaying the status message */}
                </div>
            )}

            <form onSubmit={submit}> {/* Form element with submit handler */}
                <div>
                    <InputLabel htmlFor="email" value="Email" /> {/* Label for email input */}
                    <TextInput
                        id="email" // ID for the email input field
                        type="email" // Input type set to email for validation
                        name="email" // Name attribute for the input
                        value={data.email} // Binding the input value to the form state
                        className="mt-1 block w-full" // Applying styling classes
                        autoComplete="username" // Setting autocomplete attribute
                        isFocused={true} // Automatically focusing the input on render
                        onChange={(e) => setData('email', e.target.value)} // Updating form state on input change
                    />
                    <InputError message={errors.email} className="mt-2" /> {/* Displaying validation errors for email */}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" /> {/* Label for password input */}
                    <TextInput
                        id="password" // ID for the password input field
                        type="password" // Input type set to password for security
                        name="password" // Name attribute for the input
                        value={data.password} // Binding the input value to the form state
                        className="mt-1 block w-full" // Applying styling classes
                        autoComplete="current-password" // Setting autocomplete attribute
                        onChange={(e) => setData('password', e.target.value)} // Updating form state on input change
                    />
                    <InputError message={errors.password} className="mt-2" /> {/* Displaying validation errors for password */}
                </div>

                <div className="mt-4 flex items-center justify-between"> {/* Container for checkbox and forgot password link */}
                    <label className="flex items-center"> {/* Label for the checkbox */}
                        <Checkbox
                            name="remember" // Name attribute for the checkbox
                            checked={data.remember} // Binding the checkbox state to form data
                            onChange={(e) => setData('remember', e.target.checked)} // Updating form state on checkbox change
                        />
                        <span className="ml-2 text-sm text-gray-600"> {/* Text next to the checkbox */}
                            Remember me
                        </span>
                    </label>

                    {canResetPassword && ( // Conditionally rendering the forgot password link if allowed
                        <button
                            onClick={handleResetClick} // Handling click event
                            className="text-sm text-primary hover:text-primary/90" // Styling for the link
                        >
                            Forgot password? {/* Link text */}
                        </button>
                    )}
                </div>

                {showResetMessage && ( // Conditionally rendering the reset message if visible
                    <div className="mt-4 rounded-md bg-blue-50 p-4"> {/* Styling for the message box */}
                        <div className="text-sm text-blue-700">
                            Password reset is coming soon! Please create a new account 
                            or contact your administrator to reset your password. {/* Message content */}
                        </div>
                    </div>
                )}

                <div className="mt-6 flex flex-col space-y-4"> {/* Container for buttons and links */}
                    <PrimaryButton className="w-full justify-center" disabled={processing}> {/* Submit button */}
                        Log in {/* Button text */}
                    </PrimaryButton>

                    <div className="relative"> {/* Container for the divider */}
                        <div className="absolute inset-0 flex items-center"> {/* Flex container for the divider line */}
                            <div className="w-full border-t border-gray-200"></div> {/* Divider line */}
                        </div>
                        <div className="relative flex justify-center text-sm"> {/* Centered text for the divider */}
                            <span className="bg-white px-2 text-gray-500">New to ShiftsSync?</span> {/* Text content */}
                        </div>
                    </div>

                    <Link
                        href={route('register')} // Link to the registration page
                        className="inline-flex w-full justify-center rounded-md border border-primary bg-white px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/5" // Styling for the link
                    >
                        Create an account {/* Link text */}
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
