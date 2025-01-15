import DangerButton from '@/Components/DangerButton'; // Importing a button component for dangerous actions
import InputError from '@/Components/InputError'; // Importing a component to display input errors
import InputLabel from '@/Components/InputLabel'; // Importing a component for input labels
import Modal from '@/Components/Modal'; // Importing a modal component for confirmation dialogs
import SecondaryButton from '@/Components/SecondaryButton'; // Importing a secondary button component
import TextInput from '@/Components/TextInput'; // Importing a text input component
import { useForm } from '@inertiajs/react'; // Importing the useForm hook for form handling
import { useRef, useState } from 'react'; // Importing hooks for state and refs

// Main component for deleting a user account
export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false); // State to manage deletion confirmation modal
    const passwordInput = useRef(); // Ref to focus on password input field

    // Form handling using Inertia's useForm hook
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '', // Initial state for password input
    });

    // Function to confirm user deletion
    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true); // Set state to show the confirmation modal
    };

    // Function to handle user deletion
    const deleteUser = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Call the delete function with the route to destroy the user profile
        destroy(route('profile.destroy'), {
            preserveScroll: true, // Preserve scroll position on delete
            onSuccess: () => closeModal(), // Close modal on successful deletion
            onError: () => passwordInput.current.focus(), // Focus on password input if there's an error
            onFinish: () => reset(), // Reset form state after deletion
        });
    };

    // Function to close the confirmation modal
    const closeModal = () => {
        setConfirmingUserDeletion(false); // Hide the modal

        clearErrors(); // Clear any input errors
        reset(); // Reset form data
    };

    return (
        <section className={`space-y-6 ${className}`}> {/* Main section for the delete user form */}
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Delete Account {/* Header for the delete account section */}
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain. {/* Warning message about data loss */}
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}> {/* Button to trigger deletion confirmation */}
                Delete Account
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}> {/* Modal for confirming account deletion */}
                <form onSubmit={deleteUser} className="p-6"> {/* Form for deletion confirmation */}
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete your account? {/* Confirmation question */}
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account. {/* Instructions for confirming deletion */}
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only" // Screen reader only label
                        />

                        <TextInput
                            id="password" // Input field for password
                            type="password" // Password input type
                            name="password" // Name attribute for the input
                            ref={passwordInput} // Reference for focusing the input
                            value={data.password} // Binding input value to form state
                            onChange={(e) =>
                                setData('password', e.target.value) // Update password in form state
                            }
                            className="mt-1 block w-3/4" // Styling for the input
                            isFocused // Automatically focus on this input
                            placeholder="Password" // Placeholder text for the input
                        />

                        <InputError
                            message={errors.password} // Display error message for password input
                            className="mt-2" // Margin for spacing
                        />
                    </div>

                    <div className="mt-6 flex justify-end"> {/* Container for action buttons */}
                        <SecondaryButton onClick={closeModal}> {/* Button to cancel deletion */}
                            Cancel
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}> {/* Button to confirm deletion */}
                            Delete Account
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
