import { Link } from '@inertiajs/react'; // Importing Link component from Inertia.js for navigation

// Defining the GuestLayout functional component that accepts children as props
export default function GuestLayout({ children }) {
    return (
        // Main container with a gradient background and minimum height for full screen
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
                {/* Logo and title section */}
                <div className="mb-8 text-center">
                    <Link href="/" className="inline-block"> {/* Link to the homepage */}
                        <img 
                            src="/logos/logo.jpg"  // Logo image source
                            alt="ShiftsSync Logo"  // Alternative text for the logo
                            className="mx-auto h-24 w-auto" // Centering the logo with auto margins and setting its height
                        />
                        <h1 className="mt-4 text-3xl font-bold text-primary"> {/* Main title */}
                            ShiftsSync
                        </h1>
                        <p className="mt-1 text-sm text-gray-600"> {/* Subtitle with a brief description */}
                            Effortless Shift Management, Empowered Teams
                        </p>
                    </Link>
                </div>

                {/* Container for the children components with styling */}
                <div className="w-full max-w-md">
                    <div className="rounded-xl bg-white px-8 py-6 shadow-lg ring-1 ring-gray-200"> {/* Card-like appearance */}
                        {children} {/* Rendering child components passed to the layout */}
                    </div>
                </div>
            </div>
        </div>
    );
}
