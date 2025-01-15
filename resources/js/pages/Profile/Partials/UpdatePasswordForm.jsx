import InputError from '@/Components/InputError'; // Importing InputError component for displaying error messages
import InputLabel from '@/Components/InputLabel'; // Importing InputLabel component for form labels
import PrimaryButton from '@/Components/PrimaryButton'; // Importing PrimaryButton component for the submit button
import TextInput from '@/Components/TextInput'; // Importing TextInput component for input fields
import { Transition } from '@headlessui/react'; // Importing Transition component for animations
import { useForm } from '@inertiajs/react'; // Importing useForm hook for form handling
import { useRef } from 'react'; // Importing useRef hook for referencing input elements
import { toast } from 'sonner'; // Importing toast for displaying notifications

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef(); // Reference for the new password input
    const currentPasswordInput = useRef(); // Reference for the current password input

    // Setting up form state and methods using useForm hook
    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '', // Initial state for current password
        password: '', // Initial state for new password
        password_confirmation: '', // Initial state for password confirmation
    });

    // Function to handle password update
    const updatePassword = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Validation checks
        if (data.password !== data.password_confirmation) {
            // Check if new password and confirmation match
            toast.error('Password Mismatch', {
                description: 'Your new password and confirmation must match exactly.' // Error message
            });
            return; // Exit function if passwords do not match
        }

        if (data.password === data.current_password) {
            // Check if new password is the same as current password
            toast.error('Same Password', {
                description: 'Your new password must be different from your current password.' // Error message
            });
            return; // Exit function if passwords are the same
        }

        // Sending a request to update the password
        put(route('password.update'), {
            preserveScroll: true, // Preserve scroll position on success
            onSuccess: () => {
                reset(); // Reset form fields on success
                toast.success('Password Updated', {
                    description: 'Your password has been updated successfully.' // Success message
                });
            },
            onError: (errors) => {
                // Handling errors from the update request
                if (errors.password) {
                    toast.error('Password Error', {
                        description: errors.password // Display specific password error
                    });
                    reset('password', 'password_confirmation'); // Reset password fields
                    passwordInput.current.focus(); // Focus on new password input
                }

                if (errors.current_password) {
                    toast.error('Current Password Error', {
                        description: 'The current password you entered is incorrect.' // Display current password error
                    });
                    reset('current_password'); // Reset current password field
                    currentPasswordInput.current.focus(); // Focus on current password input
                }
            },
        });
    };

    return (
        <section className={className}> {/* Main section for the form */}
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Update Password {/* Header for the form */}
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay
                    secure. {/* Instruction for users */}
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6"> {/* Form submission handler */}
                <div>
                    <InputLabel
                        htmlFor="current_password"
                        value="Current Password" // Label for current password input
                    />
                    <p className="text-sm text-gray-500 mb-2">
                        Enter your existing password {/* Instruction for current password */}
                    </p>
                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput} // Reference for current password input
                        value={data.current_password} // Binding current password state
                        onChange={(e) =>
                            setData('current_password', e.target.value) // Update state on change
                        }
                        type="password" // Input type for password
                        className="mt-1 block w-full"
                        autoComplete="current-password" // Auto-complete attribute
                        placeholder="Your current password" // Placeholder text
                    />

                    <InputError
                        message={errors.current_password} // Display error message for current password
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="New Password" /> {/* Label for new password input */}
                    <p className="text-sm text-gray-500 mb-2">
                        Choose a new, secure password different from your current one {/* Instruction for new password */}
                    </p>
                    <TextInput
                        id="password"
                        ref={passwordInput} // Reference for new password input
                        value={data.password} // Binding new password state
                        onChange={(e) => setData('password', e.target.value)} // Update state on change
                        type="password" // Input type for password
                        className="mt-1 block w-full"
                        autoComplete="new-password" // Auto-complete attribute
                        placeholder="Your new password" // Placeholder text
                    />

                    <InputError message={errors.password} className="mt-2" /> {/* Display error message for new password */}
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm New Password" // Label for password confirmation input
                    />
                    <p className="text-sm text-gray-500 mb-2">
                        Re-enter your new password exactly as above {/* Instruction for password confirmation */}
                    </p>
                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation} // Binding password confirmation state
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value) // Update state on change
                        }
                        type="password" // Input type for password
                        className="mt-1 block w-full"
                        autoComplete="new-password" // Auto-complete attribute
                        placeholder="Confirm your new password" // Placeholder text
                    />

                    <InputError
                        message={errors.password_confirmation} // Display error message for password confirmation
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Update Password</PrimaryButton> {/* Submit button for updating password */}

                    <Transition
                        show={recentlySuccessful} // Show transition if the update was successful
                        enter="transition ease-in-out" // Enter transition classes
                        enterFrom="opacity-0" // Initial state for enter transition
                        leave="transition ease-in-out" // Leave transition classes
                        leaveTo="opacity-0" // Final state for leave transition
                    >
                        <p className="text-sm text-gray-600">
                            Saved. {/* Message indicating the password was saved */}
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
