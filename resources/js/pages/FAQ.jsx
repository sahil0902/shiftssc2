import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";

export default function FAQ() {
    const faqs = [
        {
            question: "What is ShiftsSync?",
            answer: "ShiftsSync is a comprehensive workforce management solution that helps organizations manage employee shifts, schedules, and team coordination efficiently."
        },
        {
            question: "How do I apply for a shift?",
            answer: "To apply for a shift, log in to your account, navigate to the Shifts page, find an available shift that matches your preferences, and click the 'Apply' button."
        },
        {
            question: "Can I cancel my shift application?",
            answer: "Yes, you can cancel your shift application before it's approved. Go to your dashboard, find the pending application, and click the 'Cancel' button."
        },
        {
            question: "How do I reset my password?",
            answer: "Currently, password reset functionality is being implemented. Please contact your administrator or create a new account if you can't access your current one."
        },
        {
            question: "What happens if I'm late for my shift?",
            answer: "If you're running late, please contact your supervisor immediately. Each organization has its own policies regarding tardiness."
        },
        {
            question: "How far in advance can I see available shifts?",
            answer: "Shift visibility depends on your organization's settings. Typically, shifts are posted 1-4 weeks in advance."
        }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    return (
        <AuthenticatedLayout>
            <Head title="FAQ" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
                            
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <div 
                                        key={index} 
                                        className="border border-gray-200 rounded-lg overflow-hidden"
                                    >
                                        <button
                                            className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
                                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                        >
                                            <span className="font-semibold">{faq.question}</span>
                                            <span className="ml-6">
                                                {openIndex === index ? '−' : '+'}
                                            </span>
                                        </button>
                                        
                                        {openIndex === index && (
                                            <div className="px-6 py-4">
                                                <p className="text-gray-600">{faq.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                                <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
                                <p className="text-gray-600 mb-4">
                                    Can't find the answer you're looking for? Please contact our support team.
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