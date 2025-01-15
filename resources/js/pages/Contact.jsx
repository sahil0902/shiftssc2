import { Head } from "@inertiajs/react"; // Importing Head component for managing the document head
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"; // Importing layout for authenticated users
import { useState } from "react"; // Importing useState hook for managing component state
import InputLabel from "@/Components/InputLabel"; // Importing custom InputLabel component
import TextInput from "@/Components/TextInput"; // Importing custom TextInput component
import PrimaryButton from "@/Components/PrimaryButton"; // Importing custom PrimaryButton component

export default function Contact() {
    // State to hold form data
    const [formData, setFormData] = useState({
        name: '', // Name input
        email: '', // Email input
        subject: '', // Subject input
        message: '' // Message input
    });

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        // Handle form submission (e.g., send data to server)
        alert('Thank you for your message. We will get back to you soon!'); // Alert user of successful submission
        // Reset form fields to initial state
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <AuthenticatedLayout> {/* Layout component for authenticated users */}
            <Head title="Contact Us" /> {/* Setting the title for the Contact page */}

            <div className="py-12"> {/* Main container with padding */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> {/* Centering the content with max width */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg"> {/* Card-like container for content */}
                        <div className="p-6"> {/* Padding for inner content */}
                            <h1 className="text-3xl font-bold mb-6">Contact Us</h1> {/* Main heading for the page */}

                            <div className="grid gap-8 md:grid-cols-2"> {/* Grid layout for contact information and form */}
                                {/* Contact Information */}
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">Get in Touch</h2> {/* Subheading for contact info */}
                                    <p className="text-gray-600 mb-6">
                                        Have questions? We're here to help! Fill out the form and our team 
                                        will get back to you as soon as possible. {/* Instruction for users */}
                                    </p>

                                    <div className="space-y-4"> {/* Spacing for contact details */}
                                        <div>
                                            <h3 className="font-semibold mb-1">Email</h3> {/* Email label */}
                                            <p className="text-gray-600">support@shiftssync.com</p> {/* Email address */}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Phone</h3> {/* Phone label */}
                                            <p className="text-gray-600">+1 (555) 123-4567</p> {/* Phone number */}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Hours</h3> {/* Hours label */}
                                            <p className="text-gray-600">Monday - Friday: 9am - 5pm EST</p> {/* Business hours */}
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Form */}
                                <div>
                                    <form onSubmit={handleSubmit} className="space-y-4"> {/* Form with spacing between fields */}
                                        <div>
                                            <InputLabel htmlFor="name" value="Name" /> {/* Label for name input */}
                                            <TextInput
                                                id="name" // Input ID for accessibility
                                                type="text" // Input type
                                                value={formData.name} // Controlled input value
                                                className="mt-1 block w-full" // Styling for input
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })} // Update name in state
                                                required // Marking input as required
                                            />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="email" value="Email" /> {/* Label for email input */}
                                            <TextInput
                                                id="email" // Input ID for accessibility
                                                type="email" // Input type
                                                value={formData.email} // Controlled input value
                                                className="mt-1 block w-full" // Styling for input
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })} // Update email in state
                                                required // Marking input as required
                                            />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="subject" value="Subject" /> {/* Label for subject input */}
                                            <TextInput
                                                id="subject" // Input ID for accessibility
                                                type="text" // Input type
                                                value={formData.subject} // Controlled input value
                                                className="mt-1 block w-full" // Styling for input
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })} // Update subject in state
                                                required // Marking input as required
                                            />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="message" value="Message" /> {/* Label for message input */}
                                            <textarea
                                                id="message" // Input ID for accessibility
                                                value={formData.message} // Controlled input value
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" // Styling for textarea
                                                rows={4} // Number of rows for textarea
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })} // Update message in state
                                                required // Marking input as required
                                            />
                                        </div>

                                        <div className="flex justify-end"> {/* Flex container for button alignment */}
                                            <PrimaryButton type="submit"> {/* Submit button */}
                                                Send Message {/* Button text */}
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 