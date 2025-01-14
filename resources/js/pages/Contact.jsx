import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        alert('Thank you for your message. We will get back to you soon!');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Contact Us" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

                            <div className="grid gap-8 md:grid-cols-2">
                                {/* Contact Information */}
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
                                    <p className="text-gray-600 mb-6">
                                        Have questions? We're here to help! Fill out the form and our team 
                                        will get back to you as soon as possible.
                                    </p>

                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-semibold mb-1">Email</h3>
                                            <p className="text-gray-600">support@shiftssync.com</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Phone</h3>
                                            <p className="text-gray-600">+1 (555) 123-4567</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Hours</h3>
                                            <p className="text-gray-600">Monday - Friday: 9am - 5pm EST</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Form */}
                                <div>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <InputLabel htmlFor="name" value="Name" />
                                            <TextInput
                                                id="name"
                                                type="text"
                                                value={formData.name}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="email" value="Email" />
                                            <TextInput
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="subject" value="Subject" />
                                            <TextInput
                                                id="subject"
                                                type="text"
                                                value={formData.subject}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="message" value="Message" />
                                            <textarea
                                                id="message"
                                                value={formData.message}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                                rows={4}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div className="flex justify-end">
                                            <PrimaryButton type="submit">
                                                Send Message
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