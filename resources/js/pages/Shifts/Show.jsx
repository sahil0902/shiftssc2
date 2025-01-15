import React, { useEffect } from 'react'; // Importing React and useEffect for managing side effects
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Layout component for authenticated users
import { Head, Link, useForm } from '@inertiajs/react'; // Inertia.js hooks for routing and form handling
import { Button } from '@/components/ui/button'; // UI button component
import { format } from 'date-fns'; // Date formatting utility
import { ArrowLeft, Calendar, Clock, Users } from 'lucide-react'; // Icons for UI
import { Textarea } from '@/components/ui/textarea'; // Textarea component for user input
import { Card } from '@/components/ui/card'; // Card component for displaying comments
import { toast } from 'sonner'; // Notification library for user feedback

// ErrorBoundary Component to catch errors in child components
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false }; // State to track if an error has occurred
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }; // Update state to indicate an error
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo); // Log error details
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-4 text-red-500">
                    Something went wrong while loading the shift details. {/* Error message */}
                </div>
            );
        }
        return this.props.children; // Render children if no error
    }
}

export default function Show({ can = {}, shift }) {
    console.log('Received can data:', can); // Log permissions data
    const { data, setData, post, processing, reset, errors } = useForm({
        content: '', // Initial state for comment content
    });

    // Debug logging for shift and auth data
    useEffect(() => {
        console.log('Shift data:', shift);
        console.log('Auth data:', can);
    }, [shift, can]);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        console.log('Submitting comment:', data); // Log comment data
        post(route('shifts.comments.store', shift.id), {
            onSuccess: () => {
                console.log('Comment submitted successfully'); // Log success
                reset('content'); // Reset comment input
                toast({
                    title: "Success",
                    description: "Comment added successfully", // Success notification
                });
            },
            onError: (errors) => {
                console.error('Comment submission errors:', errors); // Log errors
                toast({
                    title: "Error",
                    description: "Failed to add comment", // Error notification
                    variant: "destructive",
                });
            },
            preserveScroll: true, // Preserve scroll position on post
        });
    };

    const handleClaimShift = () => {
        toast("Coming Soon!", {
            description: "The shift claim feature is currently being developed. Please check back later.", // Notification for future feature
            duration: 5000, // Duration for the toast
        });
    };

    // Add error logging for comment submission
    useEffect(() => {
        if (errors.content) {
            console.error('Comment submission error:', errors.content); // Log specific error
        }
    }, [errors]);

    if (!shift) {
        return (
            <div className="p-4 text-gray-500">
                Loading shift details... {/* Loading message */}
            </div>
        );
    }

    if (!can || !can.user) {
        return (
            <div className="p-4 text-red-500">
                Loading permissions... If this persists, please refresh the page. {/* Permissions loading message */}
            </div>
        );
    }

    return (
        <ErrorBoundary>
            <AuthenticatedLayout
                user={can.user} // Pass user data to layout
                header={
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('shifts.index')}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <ArrowLeft className="h-5 w-5" /> {/* Back button */}
                            </Link>
                            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                                Shift Details {/* Page title */}
                            </h2>
                        </div>
                        <div className="flex gap-2">
                            {shift.status === 'open' && (
                                <Button onClick={handleClaimShift} variant="secondary">
                                    Claim Shift {/* Button to claim the shift */}
                                </Button>
                            )}
                            {can.edit_shift && (
                                <Link href={route('shifts.edit', shift.id)}>
                                    <Button>Edit Shift</Button> {/* Button to edit the shift */}
                                </Link>
                            )}
                        </div>
                    </div>
                }
            >
                <Head title="Shift Details" /> {/* Document title */}

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <h3 className="text-lg font-medium">
                                            {shift.title} {/* Shift title */}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500">
                                            {shift.description} {/* Shift description */}
                                        </p>

                                        <div className="mt-6 space-y-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-5 w-5 text-gray-400" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        Start Time {/* Start time label */}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {shift.start_time && format(
                                                            new Date(shift.start_time),
                                                            'PPp' // Format start time
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Clock className="h-5 w-5 text-gray-400" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        End Time {/* End time label */}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {shift.end_time && format(
                                                            new Date(shift.end_time),
                                                            'PPp' // Format end time
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Users className="h-5 w-5 text-gray-400" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        Required Employees {/* Required employees label */}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {shift.required_employees} {/* Display required employees */}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-6 rounded-lg bg-gray-50 p-4">
                                                <h4 className="text-sm font-medium text-gray-900">
                                                    Wage Information {/* Wage information section */}
                                                </h4>
                                                <div className="mt-2 space-y-2">
                                                    <p className="text-sm text-gray-500">
                                                        Hourly Rate: {shift.formatted_hourly_rate} {/* Display hourly rate */}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Shift Duration: {shift.duration_in_hours.toFixed(2)} hours {/* Display shift duration */}
                                                    </p>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        Total Wage: {shift.formatted_total_wage} {/* Display total wage */}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900">
                                                Status {/* Status section */}
                                            </h4>
                                            <span
                                                className={`mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                    shift.status === 'open'
                                                        ? 'bg-green-100 text-green-800' // Open status styling
                                                        : shift.status === 'filled'
                                                        ? 'bg-blue-100 text-blue-800' // Filled status styling
                                                        : 'bg-red-100 text-red-800' // Other status styling
                                                }`}
                                            >
                                                {shift.status.charAt(0).toUpperCase() + shift.status.slice(1)} {/* Display status */}
                                            </span>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900">
                                                Department {/* Department section */}
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {shift.department?.name || 'No department assigned'} {/* Display department name */}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900">
                                                Created By {/* Creator section */}
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {shift.user?.name || 'Unknown'} {/* Display creator name */}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900">
                                                Created At {/* Creation date section */}
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {shift.created_at && format(
                                                    new Date(shift.created_at),
                                                    'PPp' // Format creation date
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Comments Section */}
                                <div className="mt-8">
                                    <div className="mb-4 rounded-md bg-blue-50 p-4">
                                        <p className="text-sm text-blue-700">
                                            Please add a comment, and your manager will contact you if you get the shift. {/* Instruction for comments */}
                                        </p>
                                    </div>
                                    
                                    <h3 className="text-lg font-medium">Comments</h3>
                                    <div className="mt-4 space-y-4">
                                        {shift.comments && shift.comments.length > 0 ? (
                                            shift.comments.map((comment) => (
                                                <Card key={comment.id} className="p-4">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {comment.user?.name || 'Unknown User'} {/* Display commenter's name */}
                                                            </p>
                                                            <p className="mt-1 text-sm text-gray-500">
                                                                {comment.created_at && format(
                                                                    new Date(comment.created_at),
                                                                    'PPp' // Format comment creation date
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <p className="mt-2 text-sm text-gray-700">
                                                        {comment.content} {/* Display comment content */}
                                                    </p>
                                                </Card>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500">No comments yet.</p> 
                                        )}

                                        <form onSubmit={handleSubmit} className="mt-6">
                                            <Textarea
                                                value={data.content}
                                                onChange={(e) => setData('content', e.target.value)} // Update comment content
                                                placeholder="Add a comment..."
                                                className="mt-1"
                                            />
                                            {errors.content && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.content} {/* Display error message for comment input */}
                                                </p>
                                            )}
                                            <Button
                                                type="submit"
                                                className="mt-4"
                                                disabled={processing} // Disable button while processing
                                            >
                                                {processing ? 'Adding...' : 'Add Comment'} {/* Button text based on processing state */}
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </ErrorBoundary>
    );
} 