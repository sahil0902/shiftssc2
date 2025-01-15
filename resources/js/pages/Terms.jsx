import { Head } from "@inertiajs/react"; // Importing Head component to manage the document head
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"; // Importing layout for authenticated users

// Main functional component for Terms of Service
export default function Terms() {
    return (
        <AuthenticatedLayout> {/* Wrapping content in AuthenticatedLayout for consistent styling */}
            <Head title="Terms of Service" /> {/* Setting the title for the Terms of Service page */}

            <div className="py-12"> {/* Main container with vertical padding */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> {/* Centering content with max width */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg"> {/* Card-like container for content */}
                        <div className="p-6"> {/* Adding padding to the inner content */}
                            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1> {/* Main heading for the Terms of Service */}

                            <div className="prose max-w-none"> {/* Using prose for better typography */}
                                <p className="text-lg mb-6"> {/* Introduction paragraph */}
                                    Welcome to ShiftsSync. By using our service, you agree to these terms.
                                    Please read them carefully.
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2> {/* Section heading */}
                                <p className="mb-6"> {/* Explanation of acceptance */}
                                    By accessing or using ShiftsSync, you agree to be bound by these Terms of Service
                                    and our Privacy Policy. If you disagree with any part of the terms, you may not
                                    access the service.
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">2. User Responsibilities</h2> {/* Section heading */}
                                <ul className="list-disc pl-6 mb-6"> {/* List of user responsibilities */}
                                    <li>Maintain accurate and up-to-date information</li> {/* Responsibility 1 */}
                                    <li>Keep login credentials secure</li> {/* Responsibility 2 */}
                                    <li>Follow shift scheduling policies</li> {/* Responsibility 3 */}
                                    <li>Respect other users and staff</li> {/* Responsibility 4 */}
                                </ul>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">3. Service Usage</h2> {/* Section heading */}
                                <p className="mb-6"> {/* Explanation of service usage */}
                                    Our service is designed for shift management and workforce coordination.
                                    Users agree to use the service only for its intended purposes and in
                                    compliance with all applicable laws.
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">4. Account Management</h2> {/* Section heading */}
                                <p className="mb-6"> {/* Explanation of account management */}
                                    You are responsible for maintaining the confidentiality of your account
                                    and password. Notify your administrator immediately if you suspect any
                                    unauthorized access.
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">5. Modifications</h2> {/* Section heading */}
                                <p className="mb-6"> {/* Explanation of modifications */}
                                    We reserve the right to modify or replace these terms at any time. We will
                                    provide notice of any significant changes.
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">6. Termination</h2> {/* Section heading */}
                                <p className="mb-6"> {/* Explanation of termination policy */}
                                    We may terminate or suspend access to our service immediately, without prior
                                    notice, for conduct that we believe violates these terms or is harmful to
                                    other users or us.
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact</h2> {/* Section heading */}
                                <p className="mb-6"> {/* Contact information */}
                                    If you have any questions about these terms, please{" "}
                                    <a href={route('contact')} className="text-primary hover:text-primary/90"> {/* Link to contact */}
                                        contact us
                                    </a>.
                                </p>

                                <div className="mt-8 p-4 bg-gray-50 rounded-lg"> {/* Footer section for last updated info */}
                                    <p className="text-sm text-gray-600"> {/* Last updated information */}
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