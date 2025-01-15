import InputError from '@/Components/InputError'; // Importing the InputError component for displaying validation errors
import InputLabel from '@/Components/InputLabel'; // Importing the InputLabel component for labeling input fields
import PrimaryButton from '@/Components/PrimaryButton'; // Importing the PrimaryButton component for the submit button
import TextInput from '@/Components/TextInput'; // Importing the TextInput component for user input
import GuestLayout from '@/Layouts/GuestLayout'; // Importing the layout for guest users
import { Head, useForm } from '@inertiajs/react'; // Importing Head for setting the page title and useForm for form handling

export default function ConfirmPassword() {
    // Using the useForm hook to manage form state and handle submissions
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '', // Initial state for the password input
    });

    // Function to handle form submission
    const submit = (e) => {
        e.preventDefault(); // Preventing the default form submission behavior

        // Posting the password confirmation to the server
        post(route('password.confirm'), {
            onFinish: () => reset('password'), // Resetting the password field after submission
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" /> {/* Setting the page title */}

            <div className="mb-4 text-sm text-gray-600">
                This is a secure area of the application. Please confirm your
                password before continuing. {/* Informing the user about the password confirmation requirement */}
            </div>

            <form onSubmit={submit}> {/* Form submission handler */}
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" /> {/* Label for the password input */}

                    <TextInput
                        id="password" // ID for the input field
                        type="password" // Input type set to password for security
                        name="password" // Name attribute for the input
                        value={data.password} // Binding the input value to the form state
                        className="mt-1 block w-full" // Styling for the input field
                        isFocused={true} // Automatically focusing the input on render
                        onChange={(e) => setData('password', e.target.value)} // Updating form state on input change
                    />

                    <InputError message={errors.password} className="mt-2" /> {/* Displaying any validation errors */}
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}> {/* Submit button, disabled while processing */}
                        Confirm
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
