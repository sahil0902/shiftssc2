import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Building2, ClipboardList, Clock, DollarSign, Plus, Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

export default function Dashboard({ auth, shiftStats, departmentShifts, otherShifts, stats }) {
    const isAdmin = auth.user.role === 'admin';

    return (
        <AuthenticatedLayout user={auth.user} header={`Welcome back, ${auth.user.name}`}>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Quick Actions for Admin */}
                    {isAdmin && (
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

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {isAdmin ? (
                            <>
                                <Card className="p-4 flex items-center space-x-4">
                                    <div className="p-3 bg-blue-100 rounded-full">
                                        <ClipboardList className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total Shifts</p>
                                        <p className="text-2xl font-semibold">{stats.totalShifts}</p>
                                    </div>
                                </Card>
                                <Card className="p-4 flex items-center space-x-4">
                                    <div className="p-3 bg-green-100 rounded-full">
                                        <Users className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total Employees</p>
                                        <p className="text-2xl font-semibold">{stats.totalEmployees}</p>
                                    </div>
                                </Card>
                                <Card className="p-4 flex items-center space-x-4">
                                    <div className="p-3 bg-purple-100 rounded-full">
                                        <Building2 className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total Departments</p>
                                        <p className="text-2xl font-semibold">{stats.totalDepartments}</p>
                                    </div>
                                </Card>
                                <Card className="p-4 flex items-center space-x-4">
                                    <div className="p-3 bg-yellow-100 rounded-full">
                                        <ClipboardList className="h-6 w-6 text-yellow-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Open Shifts</p>
                                        <p className="text-2xl font-semibold">{stats.openShifts}</p>
                                    </div>
                                </Card>
                            </>
                        ) : (
                    
                              <>
                            </>
                        )}
                    </div>

                    {/* Charts Section - Show to both admin and employees */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Shifts by Department</h3>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={shiftStats?.byDepartment}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="value" fill="#4F46E5" name="Shifts" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Shifts by Status</h3>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={shiftStats?.byStatus}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="value" fill="#10B981" name="Shifts" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </div>

                    {/* Shifts Section for Employees */}
                    {!isAdmin && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">Your Department Shifts</h3>
                                    <Link href={route('shifts.index', { department: auth.user.department_id })}>
                                        <Button variant="outline" size="sm">
                                            View All
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                                <div className="space-y-4">
                                    {departmentShifts.map((shift) => (
                                        <Link key={shift.id} href={route('shifts.show', shift.id)}>
                                            <Card className="p-4 hover:shadow-md transition-shadow">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-semibold">{shift.title}</h4>
                                                        <p className="text-sm text-gray-500">{shift.description}</p>
                                                        <div className="mt-2 text-sm">
                                                            <p>Start: {format(new Date(shift.start_time), 'PPp')}</p>
                                                            <p>End: {format(new Date(shift.end_time), 'PPp')}</p>
                                                            <p>Rate: {shift.formatted_hourly_rate}/hr</p>
                                                        </div>
                                                    </div>
                                                    <span className={`px-2 py-1 rounded text-sm ${
                                                        shift.status === 'open' ? 'bg-green-100 text-green-800' :
                                                        shift.status === 'filled' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                        {shift.status.charAt(0).toUpperCase() + shift.status.slice(1)}
                                                    </span>
                                                </div>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">Other Department Shifts</h3>
                                    <Link href={route('shifts.index', { exclude_department: auth.user.department_id })}>
                                        <Button variant="outline" size="sm">
                                            View All
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                                <div className="space-y-4">
                                    {otherShifts.map((shift) => (
                                        <Link key={shift.id} href={route('shifts.show', shift.id)}>
                                            <Card className="p-4 hover:shadow-md transition-shadow">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-semibold">{shift.title}</h4>
                                                        <p className="text-sm text-gray-500">{shift.description}</p>
                                                        <div className="mt-2 text-sm">
                                                            <p>Start: {format(new Date(shift.start_time), 'PPp')}</p>
                                                            <p>End: {format(new Date(shift.end_time), 'PPp')}</p>
                                                            <p>Rate: {shift.formatted_hourly_rate}/hr</p>
                                                        </div>
                                                    </div>
                                                    <span className={`px-2 py-1 rounded text-sm ${
                                                        shift.status === 'open' ? 'bg-green-100 text-green-800' :
                                                        shift.status === 'filled' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                        {shift.status.charAt(0).toUpperCase() + shift.status.slice(1)}
                                                    </span>
                                                </div>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
