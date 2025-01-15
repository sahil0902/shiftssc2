import { Head } from "@inertiajs/react"; // Importing Head component for managing document head
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"; // Importing the layout for authenticated users

// Privacy component definition
export default function Privacy() {
    return (
        <AuthenticatedLayout> {/* Wrapping content in AuthenticatedLayout for consistent styling */}
            <Head title="Privacy Policy" /> {/* Setting the title for the Privacy Policy page */}

            <div className="py-12"> {/* Adding vertical padding */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> {/* Centering content with max width */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg"> {/* Card-like container for content */}
                        <div className="p-6"> {/* Adding padding to the inner content */}
                            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1> {/* Main heading for the policy */}
                            
                            <div className="prose max-w-none"> {/* Using prose for better typography */}
                                <p className="text-lg mb-6">
                                    At ShiftsSync, we take your privacy seriously. This policy describes how we collect,
                                    use, and protect your personal information.
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2> {/* Subheading for collected information */}
                                <ul className="list-disc pl-6 mb-6"> {/* List of information collected */}
                                    <li>Name and contact information</li>
                                    <li>Employment details</li>
                                    <li>Shift preferences and availability</li>
                                    <li>Login and usage data</li>
                                </ul>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2> {/* Subheading for usage of information */}
                                <p className="mb-4">
                                    We use your information to:
                                </p>
                                <ul className="list-disc pl-6 mb-6"> {/* List of purposes for using information */}
                                    <li>Manage shift schedules and assignments</li>
                                    <li>Process shift applications</li>
                                    <li>Send notifications about shifts and updates</li>
                                    <li>Improve our services</li>
                                </ul>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2> {/* Subheading for data security measures */}
                                <p className="mb-6">
                                    We implement appropriate security measures to protect your personal information
                                    from unauthorized access, alteration, or disclosure.
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2> {/* Subheading for user rights */}
                                <p className="mb-4">
                                    You have the right to:
                                </p>
                                <ul className="list-disc pl-6 mb-6"> {/* List of user rights */}
                                    <li>Access your personal information</li>
                                    <li>Request corrections to your data</li>
                                    <li>Request deletion of your data</li>
                                    <li>Opt-out of certain data processing</li>
                                </ul>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2> {/* Subheading for contact information */}
                                <p className="mb-6">
                                    If you have any questions about our privacy policy or how we handle your data,
                                    please <a href={route('contact')} className="text-primary hover:text-primary/90">contact us</a>.
                                </p>

                                <div className="mt-8 p-4 bg-gray-50 rounded-lg"> {/* Footer section for last updated info */}
                                    <p className="text-sm text-gray-600">
                                        Last updated: January 2024
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 