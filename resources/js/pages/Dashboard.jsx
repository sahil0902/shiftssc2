import { Head } from '@inertiajs/react'; // Importing Head component for managing the document head
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Importing layout for authenticated users
import { Card } from '@/Components/ui/card'; // Importing Card component for displaying content
import { Button } from '@/Components/ui/button'; // Importing Button component for actions
import { Link } from '@inertiajs/react'; // Importing Link component for navigation
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Importing chart components from recharts
import { Users, Building2, ClipboardList, Clock, DollarSign, Plus, Calendar, ArrowRight } from 'lucide-react'; // Importing icons for UI
import { format } from 'date-fns'; // Importing date formatting utility

export default function Dashboard({ auth, shiftStats, departmentShifts, otherShifts, stats }) {
    const isAdmin = auth.user.role === 'admin'; // Checking if the user has admin role

    return (
        <AuthenticatedLayout user={auth.user} header={`Welcome back, ${auth.user.name}`}> {/* Layout for authenticated users */}
            <Head title="Dashboard" /> {/* Setting the title for the Dashboard page */}

            <div className="py-12"> {/* Main container with padding */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6"> {/* Centering the content with max width */}
                    {/* Quick Actions for Admin */}
                    {isAdmin && ( // Conditional rendering for admin actions
                        <div>
                            <h3 className="text-2xl font-semibold mb-6">Quick Actions</h3> {/* Section heading for quick actions */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> {/* Grid layout for action cards */}
                                <Card className="group hover:shadow-lg transition-all duration-300"> {/* Card for creating a new shift */}
                                    <div className="p-6">
                                        <div className="flex flex-col items-center text-center space-y-4"> {/* Flex container for card content */}
                                            <div className="p-3 bg-primary/10 rounded-full"> {/* Icon background */}
                                                <Calendar className="h-8 w-8 text-primary" /> {/* Calendar icon */}
                                            </div>
                                            <h4 className="text-xl font-semibold">Create New Shift</h4> {/* Title for action */}
                                            <p className="text-sm text-gray-500">Add a new shift to the schedule</p> {/* Description */}
                                            <Link href={route('shifts.create')} className="w-full"> {/* Link to create shift page */}
                                                <Button className="w-full group-hover:bg-primary/90"> {/* Button for creating shift */}
                                                    <Plus className="h-4 w-4 mr-2" /> {/* Plus icon */}
                                                    Create Shift
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="group hover:shadow-lg transition-all duration-300"> {/* Card for adding a new employee */}
                                    <div className="p-6">
                                        <div className="flex flex-col items-center text-center space-y-4">
                                            <div className="p-3 bg-primary/10 rounded-full">
                                                <Users className="h-8 w-8 text-primary" /> {/* Users icon */}
                                            </div>
                                            <h4 className="text-xl font-semibold">Add New Employee</h4> {/* Title for action */}
                                            <p className="text-sm text-gray-500">Register a new employee</p> {/* Description */}
                                            <Link href={route('employees.create')} className="w-full"> {/* Link to create employee page */}
                                                <Button className="w-full group-hover:bg-primary/90"> {/* Button for adding employee */}
                                                    <Plus className="h-4 w-4 mr-2" /> {/* Plus icon */}
                                                    Add Employee
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="group hover:shadow-lg transition-all duration-300"> {/* Card for adding a new department */}
                                    <div className="p-6">
                                        <div className="flex flex-col items-center text-center space-y-4">
                                            <div className="p-3 bg-primary/10 rounded-full">
                                                <Building2 className="h-8 w-8 text-primary" /> {/* Building icon */}
                                            </div>
                                            <h4 className="text-xl font-semibold">Add New Department</h4> {/* Title for action */}
                                            <p className="text-sm text-gray-500">Create a new department</p> {/* Description */}
                                            <Link href={route('departments.create')} className="w-full"> {/* Link to create department page */}
                                                <Button className="w-full group-hover:bg-primary/90"> {/* Button for adding department */}
                                                    <Plus className="h-4 w-4 mr-2" /> {/* Plus icon */}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"> {/* Grid layout for statistics cards */}
                        {isAdmin ? ( // Conditional rendering for admin stats
                            <>
                                <Card className="p-4 flex items-center space-x-4"> {/* Card for total shifts */}
                                    <div className="p-3 bg-blue-100 rounded-full"> {/* Background for icon */}
                                        <ClipboardList className="h-6 w-6 text-blue-600" /> {/* Clipboard icon */}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total Shifts</p> {/* Label for total shifts */}
                                        <p className="text-2xl font-semibold">{stats.totalShifts}</p> {/* Total shifts value */}
                                    </div>
                                </Card>
                                <Card className="p-4 flex items-center space-x-4"> {/* Card for total employees */}
                                    <div className="p-3 bg-green-100 rounded-full"> {/* Background for icon */}
                                        <Users className="h-6 w-6 text-green-600" /> {/* Users icon */}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total Employees</p> {/* Label for total employees */}
                                        <p className="text-2xl font-semibold">{stats.totalEmployees}</p> {/* Total employees value */}
                                    </div>
                                </Card>
                                <Card className="p-4 flex items-center space-x-4"> {/* Card for total departments */}
                                    <div className="p-3 bg-purple-100 rounded-full"> {/* Background for icon */}
                                        <Building2 className="h-6 w-6 text-purple-600" /> {/* Building icon */}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total Departments</p> {/* Label for total departments */}
                                        <p className="text-2xl font-semibold">{stats.totalDepartments}</p> {/* Total departments value */}
                                    </div>
                                </Card>
                                <Card className="p-4 flex items-center space-x-4"> {/* Card for open shifts */}
                                    <div className="p-3 bg-yellow-100 rounded-full"> {/* Background for icon */}
                                        <ClipboardList className="h-6 w-6 text-yellow-600" /> {/* Clipboard icon */}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Open Shifts</p> {/* Label for open shifts */}
                                        <p className="text-2xl font-semibold">{stats.openShifts}</p> {/* Open shifts value */}
                                    </div>
                                </Card>
                            </>
                        ) : (
                            <>
                            {/* No additional stats for non-admin users */}
                            </>
                        )}
                    </div>

                    {/* Charts Section - Show to both admin and employees */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> {/* Grid layout for charts */}
                        <Card className="p-6"> {/* Card for shifts by department chart */}
                            <h3 className="text-lg font-semibold mb-4">Shifts by Department</h3> {/* Chart title */}
                            <div className="h-[300px]"> {/* Container for chart */}
                                <ResponsiveContainer width="100%" height="100%"> {/* Responsive container for chart */}
                                    <BarChart data={shiftStats?.byDepartment}> {/* Bar chart for shifts by department */}
                                        <CartesianGrid strokeDasharray="3 3" /> {/* Grid lines for the chart */}
                                        <XAxis dataKey="name" /> {/* X-axis with department names */}
                                        <YAxis /> {/* Y-axis */}
                                        <Tooltip /> {/* Tooltip for hover information */}
                                        <Legend /> {/* Legend for chart */}
                                        <Bar dataKey="value" fill="#4F46E5" name="Shifts" /> {/* Bar for shifts */}
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>

                        <Card className="p-6"> {/* Card for shifts by status chart */}
                            <h3 className="text-lg font-semibold mb-4">Shifts by Status</h3> {/* Chart title */}
                            <div className="h-[300px]"> {/* Container for chart */}
                                <ResponsiveContainer width="100%" height="100%"> {/* Responsive container for chart */}
                                    <BarChart data={shiftStats?.byStatus}> {/* Bar chart for shifts by status */}
                                        <CartesianGrid strokeDasharray="3 3" /> {/* Grid lines for the chart */}
                                        <XAxis dataKey="name" /> {/* X-axis with status names */}
                                        <YAxis /> {/* Y-axis */}
                                        <Tooltip /> {/* Tooltip for hover information */}
                                        <Legend /> {/* Legend for chart */}
                                        <Bar dataKey="value" fill="#10B981" name="Shifts" /> {/* Bar for shifts */}
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </div>

                    {/* Shifts Section for Employees */}
                    {!isAdmin && ( // Conditional rendering for employee shifts
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> {/* Grid layout for employee shifts */}
                            <div>
                                <div className="flex justify-between items-center mb-4"> {/* Header for department shifts */}
                                    <h3 className="text-lg font-semibold">Your Department Shifts</h3> {/* Title for department shifts */}
                                    <Link href={route('shifts.index', { department: auth.user.department_id })}> {/* Link to view all department shifts */}
                                        <Button variant="outline" size="sm"> {/* Button to view all shifts */}
                                            View All
                                            <ArrowRight className="h-4 w-4 ml-2" /> {/* Arrow icon */}
                                        </Button>
                                    </Link>
                                </div>
                                <div className="space-y-4"> {/* Container for individual shifts */}
                                    {departmentShifts.map((shift) => ( // Mapping through department shifts
                                        <Link key={shift.id} href={route('shifts.show', shift.id)}> {/* Link to individual shift details */}
                                            <Card className="p-4 hover:shadow-md transition-shadow"> {/* Card for individual shift */}
                                                <div className="flex justify-between items-start"> {/* Flex container for shift details */}
                                                    <div>
                                                        <h4 className="font-semibold">{shift.title}</h4> {/* Shift title */}
                                                        <p className="text-sm text-gray-500">{shift.description}</p> {/* Shift description */}
                                                        <div className="mt-2 text-sm"> {/* Container for shift timing and rate */}
                                                            <p>Start: {format(new Date(shift.start_time), 'PPp')}</p> {/* Start time */}
                                                            <p>End: {format(new Date(shift.end_time), 'PPp')}</p> {/* End time */}
                                                            <p>Rate: {shift.formatted_hourly_rate}/hr</p> {/* Hourly rate */}
                                                        </div>
                                                    </div>
                                                    <span className={`px-2 py-1 rounded text-sm ${
                                                        shift.status === 'open' ? 'bg-green-100 text-green-800' : // Open shift styling
                                                        shift.status === 'filled' ? 'bg-blue-100 text-blue-800' : // Filled shift styling
                                                        'bg-red-100 text-red-800' // Closed shift styling
                                                    }`}>
                                                        {shift.status.charAt(0).toUpperCase() + shift.status.slice(1)} {/* Capitalized status */}
                                                    </span>
                                                </div>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-4"> {/* Header for other department shifts */}
                                    <h3 className="text-lg font-semibold">Other Department Shifts</h3> {/* Title for other department shifts */}
                                    <Link href={route('shifts.index', { exclude_department: auth.user.department_id })}> {/* Link to view all other shifts */}
                                        <Button variant="outline" size="sm"> {/* Button to view all shifts */}
                                            View All
                                            <ArrowRight className="h-4 w-4 ml-2" /> {/* Arrow icon */}
                                        </Button>
                                    </Link>
                                </div>
                                <div className="space-y-4"> {/* Container for individual shifts */}
                                    {otherShifts.map((shift) => ( // Mapping through other department shifts
                                        <Link key={shift.id} href={route('shifts.show', shift.id)}> {/* Link to individual shift details */}
                                            <Card className="p-4 hover:shadow-md transition-shadow"> {/* Card for individual shift */}
                                                <div className="flex justify-between items-start"> {/* Flex container for shift details */}
                                                    <div>
                                                        <h4 className="font-semibold">{shift.title}</h4> {/* Shift title */}
                                                        <p className="text-sm text-gray-500">{shift.description}</p> {/* Shift description */}
                                                        <div className="mt-2 text-sm"> {/* Container for shift timing and rate */}
                                                            <p>Start: {format(new Date(shift.start_time), 'PPp')}</p> {/* Start time */}
                                                            <p>End: {format(new Date(shift.end_time), 'PPp')}</p> {/* End time */}
                                                            <p>Rate: {shift.formatted_hourly_rate}/hr</p> {/* Hourly rate */}
                                                        </div>
                                                    </div>
                                                    <span className={`px-2 py-1 rounded text-sm ${
                                                        shift.status === 'open' ? 'bg-green-100 text-green-800' : // Open shift styling
                                                        shift.status === 'filled' ? 'bg-blue-100 text-blue-800' : // Filled shift styling
                                                        'bg-red-100 text-red-800' // Closed shift styling
                                                    }`}>
                                                        {shift.status.charAt(0).toUpperCase() + shift.status.slice(1)} {/* Capitalized status */}
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
