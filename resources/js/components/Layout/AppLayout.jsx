import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import { Button } from '@/Components/ui/Button';
import {
    LayoutGrid,
    Calendar,
    Users,
    Building2,
    Settings,
    LogOut,
    Menu,
    Bell,
} from 'lucide-react';

export default function AppLayout({ children, user }) {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
        { name: 'Shifts', href: '/shifts', icon: Calendar },
        { name: 'Staff', href: '/staff', icon: Users },
        { name: 'Departments', href: '/departments', icon: Building2 },
        { name: 'Settings', href: '/settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div className="flex h-16 items-center justify-center border-b border-gray-200">
                        <h1 className="text-xl font-bold text-gray-900">ShiftsSync</h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 px-2 py-4">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                >
                                    <Icon className="mr-3 h-5 w-5" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User */}
                    <div className="border-t border-gray-200 p-4">
                        <div className="flex items-center">
                            <img
                                src={user?.avatar_path || 'https://ui-avatars.com/api/?name=' + user?.name}
                                alt=""
                                className="h-8 w-8 rounded-full"
                            />
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                                <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            className="mt-4 w-full justify-start text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                            <LogOut className="mr-2 h-5 w-5" />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Top Bar */}
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <Button
                        variant="ghost"
                        className="lg:hidden"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <Menu className="h-6 w-6" />
                    </Button>

                    {/* Search */}
                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <div className="flex flex-1 items-center">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="h-10 w-full rounded-md border border-gray-300 bg-white px-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            <Button variant="ghost" className="relative">
                                <Bell className="h-6 w-6" />
                                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                    3
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <main className="py-8">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
} 