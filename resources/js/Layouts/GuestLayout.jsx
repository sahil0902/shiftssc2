import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
                <div className="mb-8 text-center">
                    <Link href="/" className="inline-block">
                        <img 
                            src="/logos/logo.jpg" 
                            alt="ShiftsSync Logo" 
                            className="mx-auto h-24 w-auto"
                        />
                        <h1 className="mt-4 text-3xl font-bold text-primary">
                            ShiftsSync
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Effortless Shift Management, Empowered Teams
                        </p>
                    </Link>
                </div>

                <div className="w-full max-w-md">
                    <div className="rounded-xl bg-white px-8 py-6 shadow-lg ring-1 ring-gray-200">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
