import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Help() {
    const helpTopics = [
        {
            title: "Getting Started",
            items: [
                "How to log in",
                "Setting up your profile",
                "Viewing available shifts",
                "Applying for shifts",
            ],
        },
        {
            title: "For Administrators",
            items: [
                "Creating new shifts",
                "Managing employees",
                "Approving shift applications",
                "Generating reports",
            ],
        },
        {
            title: "Common Issues",
            items: [
                "Password reset",
                "Schedule conflicts",
                "Notification settings",
                "Account management",
            ],
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Help Center" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h1 className="text-3xl font-bold mb-6">Help Center</h1>
                            
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {helpTopics.map((topic, index) => (
                                    <div key={index} className="bg-gray-50 p-6 rounded-lg">
                                        <h2 className="text-xl font-semibold mb-4">{topic.title}</h2>
                                        <ul className="space-y-2">
                                            {topic.items.map((item, itemIndex) => (
                                                <li key={itemIndex} className="text-gray-600 hover:text-primary">
                                                    <a href="#" className="block py-1">
                                                        {item}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 bg-blue-50 p-6 rounded-lg">
                                <h2 className="text-xl font-semibold mb-4">Need More Help?</h2>
                                <p className="text-gray-600 mb-4">
                                    Can't find what you're looking for? Our support team is here to help.
                                </p>
                                <a 
                                    href={route('contact')} 
                                    className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                                >
                                    Contact Support
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 