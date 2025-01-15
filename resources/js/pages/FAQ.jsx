import { Head } from "@inertiajs/react"; // Importing Head component for managing the document head
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"; // Importing layout for authenticated users
import { useState } from "react"; // Importing useState hook for managing component state

export default function FAQ() {
    // Array of FAQ objects containing questions and answers
    const faqs = [
        {
            question: "What is ShiftsSync?", // FAQ question
            answer: "ShiftsSync is a comprehensive workforce management solution that helps organizations manage employee shifts, schedules, and team coordination efficiently." // Corresponding answer
        },
        {
            question: "How do I apply for a shift?", // FAQ question
            answer: "To apply for a shift, log in to your account, navigate to the Shifts page, find an available shift that matches your preferences, and click the 'Apply' button." // Corresponding answer
        },
        {
            question: "Can I cancel my shift application?", // FAQ question
            answer: "Yes, you can cancel your shift application before it's approved. Go to your dashboard, find the pending application, and click the 'Cancel' button." // Corresponding answer
        },
        {
            question: "How do I reset my password?", // FAQ question
            answer: "Currently, password reset functionality is being implemented. Please contact your administrator or create a new account if you can't access your current one." // Corresponding answer
        },
        {
            question: "What happens if I'm late for my shift?", // FAQ question
            answer: "If you're running late, please contact your supervisor immediately. Each organization has its own policies regarding tardiness." // Corresponding answer
        },
        {
            question: "How far in advance can I see available shifts?", // FAQ question
            answer: "Shift visibility depends on your organization's settings. Typically, shifts are posted 1-4 weeks in advance." // Corresponding answer
        }
    ];

    const [openIndex, setOpenIndex] = useState(null); // State to track which FAQ is currently open

    return (
        <AuthenticatedLayout> {/* Layout component for authenticated users */}
            <Head title="FAQ" /> {/* Setting the title for the FAQ page */}

            <div className="py-12"> {/* Main container with padding */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> {/* Centering the content with max width */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg"> {/* Card-like container for content */}
                        <div className="p-6"> {/* Padding for inner content */}
                            <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1> {/* Main heading for the page */}
                            
                            <div className="space-y-4"> {/* Spacing between FAQ items */}
                                {faqs.map((faq, index) => ( // Mapping through the FAQs array
                                    <div 
                                        key={index} // Unique key for each FAQ item
                                        className="border border-gray-200 rounded-lg overflow-hidden" // Styling for FAQ item
                                    >
                                        <button
                                            className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 flex justify-between items-center" // Button styling
                                            onClick={() => setOpenIndex(openIndex === index ? null : index)} // Toggle open/close FAQ
                                        >
                                            <span className="font-semibold">{faq.question}</span> {/* Displaying the question */}
                                            <span className="ml-6">
                                                {openIndex === index ? '−' : '+'} {/* Toggle icon for open/close state */}
                                            </span>
                                        </button>
                                        
                                        {openIndex === index && ( // Conditional rendering for the answer
                                            <div className="px-6 py-4">
                                                <p className="text-gray-600">{faq.answer}</p> {/* Displaying the answer */}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 p-6 bg-blue-50 rounded-lg"> {/* Container for support information */}
                                <h2 className="text-xl font-semibold mb-4">Still have questions?</h2> {/* Subheading for support */}
                                <p className="text-gray-600 mb-4">
                                    Can't find the answer you're looking for? Please contact our support team. {/* Support message */}
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