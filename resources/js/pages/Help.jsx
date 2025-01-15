import { Head } from "@inertiajs/react"; // Importing Head component for managing the document head
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"; // Importing layout for authenticated users

export default function Help() {
    // Array of help topics with titles and corresponding items
    const helpTopics = [
        {
            title: "Getting Started", // Title for the first section
            items: [
                "How to log in", // Item 1
                "Setting up your profile", // Item 2
                "Viewing available shifts", // Item 3
                "Applying for shifts", // Item 4
            ],
        },
        {
            title: "For Administrators", // Title for the second section
            items: [
                "Creating new shifts", // Item 1
                "Managing employees", // Item 2
                "Approving shift applications", // Item 3
                "Generating reports", // Item 4
            ],
        },
        {
            title: "Common Issues", // Title for the third section
            items: [
                "Password reset", // Item 1
                "Schedule conflicts", // Item 2
                "Notification settings", // Item 3
                "Account management", // Item 4
            ],
        },
    ];

    return (
        <AuthenticatedLayout> {/* Layout component for authenticated users */}
            <Head title="Help Center" /> {/* Setting the title for the Help Center page */}

            <div className="py-12"> {/* Main container with padding */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> {/* Centering the content with max width */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg"> {/* Card-like container for content */}
                        <div className="p-6"> {/* Padding for inner content */}
                            <h1 className="text-3xl font-bold mb-6">Help Center</h1> {/* Main heading for the Help Center */}

                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"> {/* Grid layout for help topics */}
                                {helpTopics.map((topic, index) => ( // Mapping through help topics
                                    <div key={index} className="bg-gray-50 p-6 rounded-lg"> {/* Card for each topic */}
                                        <h2 className="text-xl font-semibold mb-4">{topic.title}</h2> {/* Title for the topic */}
                                        <ul className="space-y-2"> {/* List for items under the topic */}
                                            {topic.items.map((item, itemIndex) => ( // Mapping through items
                                                <li key={itemIndex} className="text-gray-600 hover:text-primary"> {/* List item styling */}
                                                    <a href="#" className="block py-1"> {/* Link for each item */}
                                                        {item} {/* Displaying the item text */}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 bg-blue-50 p-6 rounded-lg"> {/* Container for additional help information */}
                                <h2 className="text-xl font-semibold mb-4">Need More Help?</h2> {/* Subheading for support section */}
                                <p className="text-gray-600 mb-4"> {/* Support message */}
                                    Can't find what you're looking for? Our support team is here to help.
                                </p>
                                <a 
                                    href={route('contact')} // Link to contact support
                                    className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90" // Button styling
                                >
                                    Contact Support {/* Button text */}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 