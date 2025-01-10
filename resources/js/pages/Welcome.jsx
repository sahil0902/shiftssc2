import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import {
    ArrowRight,
    CheckCircle2,
    Calendar,
    Users,
    Building2,
    BarChart,
} from "lucide-react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const features = [
        {
            title: "Smart Scheduling",
            description:
                "Intelligent shift management with conflict detection and optimization.",
            icon: Calendar,
        },
        {
            title: "Team Management",
            description:
                "Organize your workforce into departments and roles with clear hierarchies.",
            icon: Users,
        },
        {
            title: "Multi-Organization",
            description:
                "Support for multiple organizations with isolated data and settings.",
            icon: Building2,
        },
        {
            title: "Analytics & Insights",
            description:
                "Comprehensive reporting and analytics for better decision making.",
            icon: BarChart,
        },
    ];

    const benefits = [
        "Reduce scheduling conflicts by 95%",
        "Save 10+ hours per week on staff management",
        "Improve employee satisfaction",
        "Real-time shift updates and notifications",
        "Customizable workflows",
        "24/7 Premium support",
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="border-b">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex flex-shrink-0 items-center">
                                <span className="text-2xl font-bold text-primary">
                                    ShiftSync
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="text-sm text-foreground hover:text-primary"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="text-sm text-foreground hover:text-primary"
                                    >
                                        Log in
                                    </Link>
                                    <Link href={route("register")}>
                                        <Button>Get Started</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative isolate overflow-hidden">
                <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pb-32 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                            Streamline Your Workforce Management
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground">
                            The most comprehensive shift management solution for
                            modern businesses. Simplify scheduling, enhance
                            communication, and boost productivity.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link href={route("register")}>
                                <Button size="lg" className="rounded-full">
                                    Start Free Trial
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-muted/50 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Everything you need to manage your workforce
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground">
                            A complete suite of tools designed to make shift
                            management effortless and efficient.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-4">
                            {features.map((feature) => (
                                <div key={feature.title} className="relative">
                                    <dt className="text-base font-semibold leading-7">
                                        <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                            <feature.icon
                                                className="h-6 w-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        {feature.title}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-muted-foreground">
                                        {feature.description}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Transform your business operations
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-muted-foreground">
                                Join thousands of businesses that have revolutionized
                                their workforce management with ShiftSync.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {benefits.map((benefit) => (
                                <div
                                    key={benefit}
                                    className="flex items-center gap-x-3"
                                >
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                    <span>{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t">
                <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
                    <div className="mt-8 md:order-1 md:mt-0">
                        <p className="text-center text-xs leading-5 text-muted-foreground">
                            &copy; 2024 ShiftSync. All rights reserved. Built with
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
