import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';
import { Plus, Users, Building2, Calendar } from 'lucide-react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card className="p-6">
                                    <div className="flex flex-col items-center text-center">
                                        <Calendar className="h-12 w-12 text-primary mb-2" />
                                        <h4 className="text-lg font-medium mb-2">Create New Shift</h4>
                                        <p className="text-sm text-gray-500 mb-4">Add a new shift to the schedule</p>
                                        <Link href={route('shifts.create')}>
                                            <Button>
                                                <Plus className="h-4 w-4 mr-2" />
                                                Create Shift
                                            </Button>
                                        </Link>
                                    </div>
                                </Card>

                                <Card className="p-6">
                                    <div className="flex flex-col items-center text-center">
                                        <Users className="h-12 w-12 text-primary mb-2" />
                                        <h4 className="text-lg font-medium mb-2">Add New Employee</h4>
                                        <p className="text-sm text-gray-500 mb-4">Register a new employee</p>
                                        <Link href={route('employees.create')}>
                                            <Button>
                                                <Plus className="h-4 w-4 mr-2" />
                                                Add Employee
                                            </Button>
                                        </Link>
                                    </div>
                                </Card>

                                <Card className="p-6">
                                    <div className="flex flex-col items-center text-center">
                                        <Building2 className="h-12 w-12 text-primary mb-2" />
                                        <h4 className="text-lg font-medium mb-2">Add New Department</h4>
                                        <p className="text-sm text-gray-500 mb-4">Create a new department</p>
                                        <Link href={route('departments.create')}>
                                            <Button>
                                                <Plus className="h-4 w-4 mr-2" />
                                                Add Department
                                            </Button>
                                        </Link>
                                    </div>
                                </Card>
                            </div>

                            {auth.user.role === 'employee' && (
                                <div className="mt-8">
                                    <h3 className="text-lg font-medium mb-4">My Shifts</h3>
                                    <Card className="p-6">
                                        <div className="flex flex-col items-center text-center">
                                            <Calendar className="h-12 w-12 text-primary mb-2" />
                                            <h4 className="text-lg font-medium mb-2">Available Shifts</h4>
                                            <p className="text-sm text-gray-500 mb-4">View and claim available shifts</p>
                                            <Link href={route('shifts.index')}>
                                                <Button>
                                                    View Available Shifts
                                                </Button>
                                            </Link>
                                        </div>
                                    </Card>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
