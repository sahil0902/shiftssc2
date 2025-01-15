import { Link } from "@inertiajs/react"; // Importing Link component for navigation
import { Button } from "@/Components/ui/button"; // Importing Button component for UI
import {
    ArrowRight, // Icon for the arrow right
    CheckCircle2, // Icon for check circle
    Calendar, // Icon for calendar
    Users, // Icon for users
    Building2, // Icon for building
    BarChart, // Icon for bar chart
} from "lucide-react"; // Importing icons from lucide-react

// Main functional component for the Welcome page
export default function Welcome({ auth, laravelVersion, phpVersion }) {
    // Array of features offered by the application
    const features = [
        {
            title: "Smart Scheduling", // Title of the feature
            description: "Intelligent shift management with conflict detection and optimization.", // Description of the feature
            icon: Calendar, // Icon associated with the feature
        },
        {
            title: "Team Management", // Title of the feature
            description: "Organize your workforce into departments and roles with clear hierarchies.", // Description of the feature
            icon: Users, // Icon associated with the feature
        },
        {
            title: "Multi-Organization", // Title of the feature
            description: "Support for multiple organizations with isolated data and settings.", // Description of the feature
            icon: Building2, // Icon associated with the feature
        },
        {
            title: "Analytics & Insights", // Title of the feature
            description: "Comprehensive reporting and analytics for better decision making.", // Description of the feature
            icon: BarChart, // Icon associated with the feature
        },
    ];

    // Array of benefits provided by the application
    const benefits = [
        "Reduce scheduling conflicts by 95%", // Benefit 1
        "Save 10+ hours per week on staff management", // Benefit 2
        "Improve employee satisfaction", // Benefit 3
        "Real-time shift updates and notifications", // Benefit 4
        "Customizable workflows", // Benefit 5
        "24/7 Premium support", // Benefit 6
    ];

    return (
        <div className="min-h-screen bg-background"> {/* Main container with minimum height and background color */}
            {/* Navigation */}
            <nav className="border-b"> {/* Navigation bar with bottom border */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> {/* Centering the navigation content */}
                    <div className="flex h-16 justify-between"> {/* Flex container for navigation items */}
                        <div className="flex"> {/* Left side of the navigation */}
                            <div className="flex flex-shrink-0 items-center"> {/* Logo container */}
                                <span className="text-2xl font-bold text-primary"> {/* Application name */}
                                    ShiftSync
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4"> {/* Right side of the navigation */}
                            {auth.user ? ( // Conditional rendering based on user authentication
                                <Link
                                    href={route("dashboard")} // Link to the dashboard
                                    className="text-sm text-foreground hover:text-primary" // Link styling
                                >
                                    Dashboard
                                </Link>
                            ) : ( // If user is not authenticated
                                <>
                                    <Link
                                        href={route("login")} // Link to the login page
                                        className="text-sm text-foreground hover:text-primary" // Link styling
                                    >
                                        Log in
                                    </Link>
                                    <Link href={route("register")}> {/* Link to the registration page */}
                                        <Button>Get Started</Button> {/* Button for registration */}
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative isolate overflow-hidden"> {/* Hero section container */}
                <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pb-32 lg:px-8"> {/* Centering the hero content */}
                    <div className="mx-auto max-w-2xl text-center"> {/* Centered text container */}
                        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl"> {/* Main heading */}
                            Effortless Shift Management, Empowered Teams
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground"> {/* Subheading */}
                            Transform your workforce scheduling with ShiftsSync. 
                            Smart scheduling, real-time coordination, and powerful insights 
                            to help your team work better together.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6"> {/* Button container */}
                            <Link href={route("register")}> {/* Link to registration */}
                                <Button size="lg" className="rounded-full"> {/* Large rounded button */}
                                    Start Your Journey
                                    <ArrowRight className="ml-2 h-4 w-4" /> {/* Arrow icon */}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-muted/50 py-24 sm:py-32"> {/* Features section container */}
                <div className="mx-auto max-w-7xl px-6 lg:px-8"> {/* Centering the features content */}
                    <div className="mx-auto max-w-2xl text-center"> {/* Centered text container */}
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl"> {/* Features heading */}
                            Everything you need to manage your workforce
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground"> {/* Features subheading */}
                            A complete suite of tools designed to make shift
                            management effortless and efficient.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24"> {/* Features grid container */}
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-4"> {/* Grid layout for features */}
                            {features.map((feature) => ( // Mapping through features array
                                <div key={feature.title} className="relative"> {/* Feature card */}
                                    <dt className="text-base font-semibold leading-7"> {/* Feature title */}
                                        <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary"> {/* Icon container */}
                                            <feature.icon
                                                className="h-6 w-6 text-white" // Icon styling
                                                aria-hidden="true" // Hiding icon from screen readers
                                            />
                                        </div>
                                        {feature.title} {/* Displaying feature title */}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-muted-foreground"> {/* Feature description */}
                                        {feature.description}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="py-24 sm:py-32"> {/* Benefits section container */}
                <div className="mx-auto max-w-7xl px-6 lg:px-8"> {/* Centering the benefits content */}
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-2"> {/* Grid layout for benefits */}
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl"> {/* Benefits heading */}
                                Transform your business operations
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-muted-foreground"> {/* Benefits subheading */}
                                Join thousands of businesses that have revolutionized
                                their workforce management with ShiftSync.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-4"> {/* Grid layout for benefits list */}
                            {benefits.map((benefit) => ( // Mapping through benefits array
                                <div
                                    key={benefit} // Unique key for each benefit
                                    className="flex items-center gap-x-3" // Flex container for benefit item
                                >
                                    <CheckCircle2 className="h-5 w-5 text-primary" /> {/* Check icon */}
                                    <span>{benefit}</span> {/* Displaying benefit text */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t"> {/* Footer container with top border */}
                <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8"> {/* Centering footer content */}
                    <div className="mt-8 md:order-1 md:mt-0"> {/* Footer text container */}
                        <p className="text-center text-xs leading-5 text-muted-foreground"> {/* Footer text */}
                            &copy; {new Date().getFullYear()} ShiftSync. All rights reserved. Built with
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
