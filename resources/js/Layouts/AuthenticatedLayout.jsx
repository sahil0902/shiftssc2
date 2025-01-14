import { useState } from 'react';
import Navbar from '@/Layouts/Navbar';
import { Footer } from '@/Layouts/Footer';
import { Toaster } from "@/Components/ui/toaster";

export default function AuthenticatedLayout({ user, header, children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <div className="pt-16">
                {header && (
                    <header className="bg-white border-b">
                        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl font-bold text-gray-900">
                                {header}
                            </h2>
                        </div>
                    </header>
                )}

                <main className="py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>

            <Footer />
            <Toaster />
        </div>
    );
}
