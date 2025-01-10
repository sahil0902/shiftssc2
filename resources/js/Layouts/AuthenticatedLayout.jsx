import { useState } from 'react';
import { Link } from '@inertiajs/react';
import {
    LayoutDashboard,
    Calendar,
    Users,
    Building2,
    Settings,
    Menu,
    X,
} from 'lucide-react';
import { Button } from '@/Components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const navigation = [
        { name: 'Dashboard', href: route('dashboard'), icon: LayoutDashboard },
        { name: 'Shifts', href: route('shifts.index'), icon: Calendar },
        { name: 'Departments', href: route('departments.index'), icon: Building2 },
        { name: 'Employees', href: route('employees.index'), icon: Users },
    ];

    return (
        <div className="min-h-screen bg-background">
            <nav className="border-b">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex flex-shrink-0 items-center">
                                <Link
                                    href={route('dashboard')}
                                    className="text-2xl font-bold text-primary"
                                >
                                    ShiftSync
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                                            route().current(item.href)
                                                ? 'text-primary border-b-2 border-primary'
                                                : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                    >
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="relative h-8 w-8 rounded-full"
                                    >
                                        <span className="sr-only">
                                            Open user menu
                                        </span>
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                            {user.name[0].toUpperCase()}
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <Link
                                            href={route('profile.edit')}
                                            className="w-full"
                                        >
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="w-full text-left"
                                        >
                                            Log Out
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition duration-150 ease-in-out hover:bg-muted hover:text-foreground focus:outline-none"
                            >
                                {showingNavigationDropdown ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={`${
                        showingNavigationDropdown ? 'block' : 'hidden'
                    } sm:hidden`}
                >
                    <div className="space-y-1 pb-3 pt-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center px-4 py-2 text-base font-medium ${
                                    route().current(item.href)
                                        ? 'border-l-4 border-primary bg-muted text-primary'
                                        : 'text-muted-foreground hover:border-l-4 hover:border-primary hover:bg-muted hover:text-foreground'
                                }`}
                            >
                                <item.icon className="mr-4 h-6 w-6" />
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="border-t pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-foreground">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-muted-foreground">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <Link
                                href={route('profile.edit')}
                                className="block px-4 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                            >
                                Profile
                            </Link>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="w-full px-4 py-2 text-left text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                            >
                                Log Out
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
