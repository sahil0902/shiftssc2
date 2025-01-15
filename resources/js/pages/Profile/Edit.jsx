import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Importing the layout for authenticated users
import { Head } from '@inertiajs/react'; // Importing Head component for managing the document head
import DeleteUserForm from './Partials/DeleteUserForm'; // Importing the component for deleting user account
import UpdatePasswordForm from './Partials/UpdatePasswordForm'; // Importing the component for updating user password
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm'; // Importing the component for updating profile information

// Main functional component for editing user profile
export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile {/* Header for the profile editing page */}
                </h2>
            }
        >
            <Head title="Profile" /> {/* Setting the title for the profile page */}

            <div className="py-12"> {/* Main container with padding */}
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8"> {/* Centering the content with max width */}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8"> {/* Card for updating profile information */}
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail} // Passing props to the profile update form
                            status={status} // Passing status for email verification
                            className="max-w-xl" // Setting max width for the form
                        />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8"> {/* Card for updating password */}
                        <UpdatePasswordForm className="max-w-xl" /> {/* Rendering the password update form */}
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8"> {/* Card for deleting user account */}
                        <DeleteUserForm className="max-w-xl" /> {/* Rendering the delete user form */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
