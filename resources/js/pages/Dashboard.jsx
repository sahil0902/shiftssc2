import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';
import { Plus, Users, Building2, Calendar, ArrowRight } from 'lucide-react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={`Welcome back, ${auth.user.name}`}
        >
            <Head title="Dashboard" />

            <div className="space-y-8">
                {auth.user.role === 'admin' && (
                    <div>
                        <h3 className="text-2xl font-semibold mb-6">Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="group hover:shadow-lg transition-all duration-300">
                                <div className="p-6">
                                    <div className="flex flex-col items-center text-center space-y-4">
                                        <div className="p-3 bg-primary/10 rounded-full">
                                            <Calendar className="h-8 w-8 text-primary" />
                                        </div>
                                        <h4 className="text-xl font-semibold">Create New Shift</h4>
                                        <p className="text-sm text-gray-500">Add a new shift to the schedule</p>
                                        <Link href={route('shifts.create')} className="w-full">
                                            <Button className="w-full group-hover:bg-primary/90">
                                                <Plus className="h-4 w-4 mr-2" />
                                                Create Shift
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>

                            <Card className="group hover:shadow-lg transition-all duration-300">
                                <div className="p-6">
                                    <div className="flex flex-col items-center text-center space-y-4">
                                        <div className="p-3 bg-primary/10 rounded-full">
                                            <Users className="h-8 w-8 text-primary" />
                                        </div>
                                        <h4 className="text-xl font-semibold">Add New Employee</h4>
                                        <p className="text-sm text-gray-500">Register a new employee</p>
                                        <Link href={route('employees.create')} className="w-full">
                                            <Button className="w-full group-hover:bg-primary/90">
                                                <Plus className="h-4 w-4 mr-2" />
                                                Add Employee
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>

                            <Card className="group hover:shadow-lg transition-all duration-300">
                                <div className="p-6">
                                    <div className="flex flex-col items-center text-center space-y-4">
                                        <div className="p-3 bg-primary/10 rounded-full">
                                            <Building2 className="h-8 w-8 text-primary" />
                                        </div>
                                        <h4 className="text-xl font-semibold">Add New Department</h4>
                                        <p className="text-sm text-gray-500">Create a new department</p>
                                        <Link href={route('departments.create')} className="w-full">
                                            <Button className="w-full group-hover:bg-primary/90">
                                                <Plus className="h-4 w-4 mr-2" />
                                                Add Department
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                )}

                {auth.user.role === 'employee' && (
                    <div>
                        <h3 className="text-2xl font-semibold mb-6">My Shifts</h3>
                        <Card className="group hover:shadow-lg transition-all duration-300">
                            <div className="p-8">
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <div className="p-4 bg-primary/10 rounded-full">
                                        <Calendar className="h-12 w-12 text-primary" />
                                    </div>
                                    <h4 className="text-2xl font-semibold">Available Shifts</h4>
                                    <p className="text-gray-500 max-w-md">
                                        Browse and apply for available shifts that match your schedule
                                    </p>
                                    <Link href={route('shifts.index')} className="w-full max-w-xs">
                                        <Button className="w-full group-hover:bg-primary/90">
                                            View Available Shifts
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
