import { useState } from 'react'; // Importing useState hook from React for state management
import Navbar from '@/Layouts/Navbar'; // Importing Navbar component for navigation
import { Footer } from '@/Layouts/Footer'; // Importing Footer component for page footer
import { Toaster } from 'sonner'; // Importing Toaster for displaying notifications

// Defining the AuthenticatedLayout component
export default function AuthenticatedLayout({ user, header, children }) {
    return (
        <div className="min-h-screen bg-gray-50"> {/* Main container with minimum height and background color */}
            <Toaster position="top-right" richColors /> {/* Notification toaster positioned at the top-right */}
            <Navbar /> {/* Rendering the Navbar component */}
            
            <div className="pt-16"> {/* Padding top for spacing */}
                {header && ( // Conditional rendering of header if it exists
                    <header className="bg-white border-b"> {/* Header section with background and border */}
                        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8"> {/* Centered container with responsive padding */}
                            {typeof header === 'string' ? ( // Check if header is a string
                                <h2 className="text-3xl font-bold text-gray-900"> {/* Header text styling */}
                                    {header} {/* Displaying the header text */}
                                </h2>
                            ) : (
                                header // If header is not a string, render it directly
                            )}
                        </div>
                    </header>
                )}

                <main className="py-8"> {/* Main content area with vertical padding */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Centered container for children */}
                        {children} {/* Rendering child components */}
                    </div>
                </main>
            </div>

            <Footer /> {/* Rendering the Footer component */}
        </div>
    );
}
