import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function About() {
    const features = [
        {
            title: "Shift Management",
            description: "Effortlessly create, assign, and manage employee shifts with our intuitive interface."
        },
        {
            title: "Real-time Updates",
            description: "Stay informed with instant notifications about shift changes and updates."
        },
        {
            title: "Employee Portal",
            description: "Give employees easy access to their schedules and the ability to manage their availability."
        },
        {
            title: "Department Organization",
            description: "Organize shifts by department for better workforce management."
        }
    ];

    return (
        <AuthenticatedLayout>
            <Head title="About Us" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h1 className="text-3xl font-bold mb-6">About ShiftsSync</h1>
                            
                            <div className="prose max-w-none">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                                    <p className="text-lg text-gray-600">
                                        At ShiftsSync, we're dedicated to simplifying workforce management through 
                                        innovative technology. Our mission is to make shift scheduling and coordination 
                                        effortless for both employers and employees.
                                    </p>
                                </div>

                                <div className="mb-12">
                                    <h2 className="text-2xl font-semibold mb-6">What We Offer</h2>
                                    <div className="grid gap-6 md:grid-cols-2">
                                        {features.map((feature, index) => (
                                            <div key={index} className="bg-gray-50 p-6 rounded-lg">
                                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                                <p className="text-gray-600">{feature.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-4">Why Choose ShiftsSync?</h2>
                                    <p className="text-lg text-gray-600 mb-4">
                                        ShiftsSync is designed with both administrators and employees in mind. 
                                        Our platform provides:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                        <li>Intuitive and user-friendly interface</li>
                                        <li>Robust scheduling and management tools</li>
                                        <li>Real-time notifications and updates</li>
                                        <li>Secure and reliable platform</li>
                                        <li>Excellent customer support</li>
                                    </ul>
                                </div>

                                <div className="mt-12 bg-blue-50 p-6 rounded-lg">
                                    <h2 className="text-xl font-semibold mb-4">Get Started Today</h2>
                                    <p className="text-gray-600 mb-4">
                                        Ready to transform your workforce management? Contact us to learn more 
                                        about how ShiftsSync can help your organization.
                                    </p>
                                    <a 
                                        href={route('contact')} 
                                        className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                                    >
                                        Contact Us
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 