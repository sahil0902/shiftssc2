import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

// Main functional component for updating profile information
export default function UpdateProfileInformation({
    mustVerifyEmail, // Prop to determine if email verification is required
    status, // Prop to hold the status of email verification
    className = '', // Optional className for styling
}) {
    const user = usePage().props.auth.user; // Accessing the authenticated user from Inertia's page props

    // Using the useForm hook to manage form state and submission
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name, // Initial value for name input
            email: user.email, // Initial value for email input
        });

    // Function to handle form submission
    const submit = (e) => {
        e.preventDefault(); // Preventing default form submission behavior

        patch(route('profile.update')); // Sending a PATCH request to update the profile
    };

    return (
        <section className={className}> {/* Main section for the profile update form */}
            <header>
                <h2 className="text-lg font-medium text-gray-900"> {/* Header for the form */}
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600"> {/* Description for the form */}
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6"> {/* Form element with submission handler */}
                <div>
                    <InputLabel htmlFor="name" value="Name" /> {/* Label for name input */}

                    <TextInput
                        id="name" // ID for the input field
                        className="mt-1 block w-full" // Styling for the input field
                        value={data.name} // Binding input value to form state
                        onChange={(e) => setData('name', e.target.value)} // Updating form state on input change
                        required // Making the field required
                        isFocused // Automatically focusing the input
                        autoComplete="name" // Setting autocomplete attribute
                    />

                    <InputError className="mt-2" message={errors.name} /> {/* Displaying error message for name input */}
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" /> {/* Label for email input */}

                    <TextInput
                        id="email" // ID for the input field
                        type="email" // Specifying input type as email
                        className="mt-1 block w-full" // Styling for the input field
                        value={data.email} // Binding input value to form state
                        onChange={(e) => setData('email', e.target.value)} // Updating form state on input change
                        required // Making the field required
                        autoComplete="username" // Setting autocomplete attribute
                    />

                    <InputError className="mt-2" message={errors.email} /> {/* Displaying error message for email input */}
                </div>

                {/* Conditional rendering for email verification notice */}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800"> {/* Message for unverified email */}
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')} // Link to resend verification email
                                method="post" // POST method for the link
                                as="button" // Rendering as a button
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && ( // Conditional rendering for success message
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4"> {/* Container for buttons and status message */}
                    <PrimaryButton disabled={processing}>Save</PrimaryButton> {/* Save button, disabled while processing */}

                    <Transition
                        show={recentlySuccessful} // Show transition based on success status
                        enter="transition ease-in-out" // Enter transition classes
                        enterFrom="opacity-0" // Initial state for enter transition
                        leave="transition ease-in-out" // Leave transition classes
                        leaveTo="opacity-0" // Final state for leave transition
                    >
                        <p className="text-sm text-gray-600"> {/* Status message for successful save */}
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
