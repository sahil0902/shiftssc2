import InputError from '@/Components/InputError'; // Importing the InputError component for displaying validation errors
import PrimaryButton from '@/Components/PrimaryButton'; // Importing the PrimaryButton component for the submit button
import TextInput from '@/Components/TextInput'; // Importing the TextInput component for user input
import GuestLayout from '@/Layouts/GuestLayout'; // Importing the layout for guest users
import { Head, useForm } from '@inertiajs/react'; // Importing Head for setting the page title and useForm for form handling

export default function ForgotPassword({ status }) { // Defining the ForgotPassword component
    const { data, setData, post, processing, errors } = useForm({ // Using useForm hook to manage form state
        email: '', // Initializing email field
    });

    const submit = (e) => { // Function to handle form submission
        e.preventDefault(); // Preventing default form submission behavior

        post(route('password.email')); // Sending a POST request to the password reset route
    };

    return (
        <GuestLayout> {/* Wrapping the content in GuestLayout for consistent styling */}
            <Head title="Forgot Password" /> {/* Setting the page title */}

            <div className="mb-4 text-sm text-gray-600"> {/* Informative message for the user */}
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            {status && ( // Conditionally rendering the status message if it exists
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status} {/* Displaying the status message */}
                </div>
            )}

            <form onSubmit={submit}> {/* Form element with submit handler */}
                <TextInput
                    id="email" // Setting the id for the input field
                    type="email" // Specifying the input type as email
                    name="email" // Setting the name attribute for the input
                    value={data.email} // Binding the input value to the form state
                    className="mt-1 block w-full" // Applying styling classes
                    isFocused={true} // Automatically focusing the input on render
                    onChange={(e) => setData('email', e.target.value)} // Updating form state on input change
                />

                <InputError message={errors.email} className="mt-2" /> {/* Displaying any validation errors for the email field */}

                <div className="mt-4 flex items-center justify-end"> {/* Container for the submit button */}
                    <PrimaryButton className="ms-4" disabled={processing}> {/* Submit button, disabled while processing */}
                        Email Password Reset Link {/* Button text */}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
