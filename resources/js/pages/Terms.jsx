import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Terms() {
    return (
        <AuthenticatedLayout>
            <Head title="Terms of Service" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
                            
                            <div className="prose max-w-none">
                                <p className="text-lg mb-6">
                                    Welcome to ShiftsSync. By using our service, you agree to these terms.
                                    Please read them carefully.
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
                                <p className="mb-6">
                                    By accessing or using ShiftsSync, you agree to be bound by these Terms of Service
                                    and our Privacy Policy. If you disagree with any part of the terms, you may not
                                    access the service.
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">2. User Responsibilities</h2>
                                <ul className="list-disc pl-6 mb-6">
                                    <li>Maintain accurate and up-to-date information</li>
                                    <li>Keep login credentials secure</li>
                                    <li>Follow shift scheduling policies</li>
                                    <li>Respect other users and staff</li>
                                </ul>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">3. Service Usage</h2>
                                <p className="mb-6">
                                    Our service is designed for shift management and workforce coordination.
                                    Users agree to use the service only for its intended purposes and in
                                    compliance with all applicable laws.
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">4. Account Management</h2>
                                <p className="mb-6">
                                    You are responsible for maintaining the confidentiality of your account
                                    and password. Notify your administrator immediately if you suspect any
                                    unauthorized access.
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">5. Modifications</h2>
                                <p className="mb-6">
                                    We reserve the right to modify or replace these terms at any time. We will
                                    provide notice of any significant changes.
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">6. Termination</h2>
                                <p className="mb-6">
                                    We may terminate or suspend access to our service immediately, without prior
                                    notice, for conduct that we believe violates these terms or is harmful to
                                    other users or us.
                                </p>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact</h2>
                                <p className="mb-6">
                                    If you have any questions about these terms, please{" "}
                                    <a href={route('contact')} className="text-primary hover:text-primary/90">
                                        contact us
                                    </a>.
                                </p>

                                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
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