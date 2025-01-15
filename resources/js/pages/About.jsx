import { Head } from "@inertiajs/react"; // Importing Head component for managing document head
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"; // Importing layout for authenticated users

export default function About() {
    // Defining features of the application in an array of objects
    const features = [
        {
            title: "Shift Management", // Title for the feature
            description: "Effortlessly create, assign, and manage employee shifts with our intuitive interface." // Description of the feature
        },
        {
            title: "Real-time Updates", // Title for the feature
            description: "Stay informed with instant notifications about shift changes and updates." // Description of the feature
        },
        {
            title: "Employee Portal", // Title for the feature
            description: "Give employees easy access to their schedules and the ability to manage their availability." // Description of the feature
        },
        {
            title: "Department Organization", // Title for the feature
            description: "Organize shifts by department for better workforce management." // Description of the feature
        }
    ];

    return (
        <AuthenticatedLayout> {/* Layout component for authenticated users */}
            <Head title="About Us" /> {/* Setting the title for the About page */}

            <div className="py-12"> {/* Main container with padding */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> {/* Centering the content with max width */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg"> {/* Card-like container for content */}
                        <div className="p-6"> {/* Padding for inner content */}
                            <h1 className="text-3xl font-bold mb-6">About ShiftsSync</h1> {/* Main heading for the page */}
                            
                            <div className="prose max-w-none"> {/* Container for styled text */}
                                <div className="mb-8"> {/* Section for mission statement */}
                                    <h2 className="text-2xl font-semibold mb-4">Our Mission</h2> {/* Subheading for mission */}
                                    <p className="text-lg text-gray-600"> {/* Paragraph for mission description */}
                                        At ShiftsSync, we're dedicated to simplifying workforce management through 
                                        innovative technology. Our mission is to make shift scheduling and coordination 
                                        effortless for both employers and employees.
                                    </p>
                                </div>

                                <div className="mb-12"> {/* Section for features offered */}
                                    <h2 className="text-2xl font-semibold mb-6">What We Offer</h2> {/* Subheading for features */}
                                    <div className="grid gap-6 md:grid-cols-2"> {/* Grid layout for features */}
                                        {features.map((feature, index) => ( // Mapping through features array
                                            <div key={index} className="bg-gray-50 p-6 rounded-lg"> {/* Individual feature card */}
                                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3> {/* Feature title */}
                                                <p className="text-gray-600">{feature.description}</p> {/* Feature description */}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-8"> {/* Section for reasons to choose the platform */}
                                    <h2 className="text-2xl font-semibold mb-4">Why Choose ShiftsSync?</h2> {/* Subheading for reasons */}
                                    <p className="text-lg text-gray-600 mb-4"> {/* Paragraph for introduction to reasons */}
                                        ShiftsSync is designed with both administrators and employees in mind. 
                                        Our platform provides:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2 text-gray-600"> {/* List of benefits */}
                                        <li>Intuitive and user-friendly interface</li> {/* Benefit 1 */}
                                        <li>Robust scheduling and management tools</li> {/* Benefit 2 */}
                                        <li>Real-time notifications and updates</li> {/* Benefit 3 */}
                                        <li>Secure and reliable platform</li> {/* Benefit 4 */}
                                        <li>Excellent customer support</li> {/* Benefit 5 */}
                                    </ul>
                                </div>

                                <div className="mt-12 bg-blue-50 p-6 rounded-lg"> {/* Call to action section */}
                                    <h2 className="text-xl font-semibold mb-4">Get Started Today</h2> {/* Subheading for call to action */}
                                    <p className="text-gray-600 mb-4"> {/* Paragraph for call to action description */}
                                        Ready to transform your workforce management? Contact us to learn more 
                                        about how ShiftsSync can help your organization.
                                    </p>
                                    <a 
                                        href={route('contact')} // Link to contact page
                                        className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90" // Button styling
                                    >
                                        Contact Us {/* Button text */}
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