import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, Clock, Users } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

// ErrorBoundary Component to catch errors in child components
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-4 text-red-500">
                    Something went wrong while loading the shift details.
                </div>
            );
        }
        return this.props.children;
    }
}

export default function Show({ can = {}, shift }) {
    console.log('Received can data:', can);
    const { data, setData, post, processing, reset, errors } = useForm({
        content: '',
    });

    // Debug logging
    useEffect(() => {
        console.log('Shift data:', shift);
        console.log('Auth data:', can);
    }, [shift, can]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting comment:', data);
        post(route('shifts.comments.store', shift.id), {
            onSuccess: () => {
                console.log('Comment submitted successfully');
                reset('content');
                toast({
                    title: "Success",
                    description: "Comment added successfully",
                });
            },
            onError: (errors) => {
                console.error('Comment submission errors:', errors);
                toast({
                    title: "Error",
                    description: "Failed to add comment",
                    variant: "destructive",
                });
            },
            preserveScroll: true,
        });
    };

    const handleClaimShift = () => {
        toast("Coming Soon!", {
            description: "The shift claim feature is currently being developed. Please check back later.",
            duration: 5000,
        });
    };

    // Add error logging
    useEffect(() => {
        if (errors.content) {
            console.error('Comment submission error:', errors.content);
        }
    }, [errors]);

    if (!shift) {
        return (
            <div className="p-4 text-gray-500">
                Loading shift details...
            </div>
        );
    }

    if (!can || !can.user) {
        return (
            <div className="p-4 text-red-500">
                Loading permissions... If this persists, please refresh the page.
            </div>
        );
    }

    return (
        <ErrorBoundary>
            <AuthenticatedLayout
                user={can.user}
                header={
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('shifts.index')}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                                Shift Details
                            </h2>
                        </div>
                        <div className="flex gap-2">
                            {shift.status === 'open' && (
                                <Button onClick={handleClaimShift} variant="secondary">
                                    Claim Shift
                                </Button>
                            )}
                            {can.edit_shift && (
                                <Link href={route('shifts.edit', shift.id)}>
                                    <Button>Edit Shift</Button>
                                </Link>
                            )}
                        </div>
                    </div>
                }
            >
                <Head title="Shift Details" />

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <h3 className="text-lg font-medium">
                                            {shift.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500">
                                            {shift.description}
                                        </p>

                                        <div className="mt-6 space-y-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-5 w-5 text-gray-400" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        Start Time
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {shift.start_time && format(
                                                            new Date(shift.start_time),
                                                            'PPp'
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Clock className="h-5 w-5 text-gray-400" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        End Time
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {shift.end_time && format(
                                                            new Date(shift.end_time),
                                                            'PPp'
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Users className="h-5 w-5 text-gray-400" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        Required Employees
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {shift.required_employees}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-6 rounded-lg bg-gray-50 p-4">
                                                <h4 className="text-sm font-medium text-gray-900">
                                                    Wage Information
                                                </h4>
                                                <div className="mt-2 space-y-2">
                                                    <p className="text-sm text-gray-500">
                                                        Hourly Rate: {shift.formatted_hourly_rate}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Shift Duration: {shift.duration_in_hours.toFixed(2)} hours
                                                    </p>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        Total Wage: {shift.formatted_total_wage}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900">
                                                Status
                                            </h4>
                                            <span
                                                className={`mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                    shift.status === 'open'
                                                        ? 'bg-green-100 text-green-800'
                                                        : shift.status === 'filled'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {shift.status.charAt(0).toUpperCase() + shift.status.slice(1)}
                                            </span>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900">
                                                Department
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {shift.department?.name || 'No department assigned'}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900">
                                                Created By
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {shift.user?.name || 'Unknown'}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900">
                                                Created At
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {shift.created_at && format(
                                                    new Date(shift.created_at),
                                                    'PPp'
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Comments Section */}
                                <div className="mt-8">
                                    <div className="mb-4 rounded-md bg-blue-50 p-4">
                                        <p className="text-sm text-blue-700">
                                            Please add a comment, and your manager will contact you if you get the shift.
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
                                                                {comment.user?.name || 'Unknown User'}
                                                            </p>
                                                            <p className="mt-1 text-sm text-gray-500">
                                                                {comment.created_at && format(
                                                                    new Date(comment.created_at),
                                                                    'PPp'
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <p className="mt-2 text-sm text-gray-700">
                                                        {comment.content}
                                                    </p>
                                                </Card>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500">No comments yet.</p>
                                        )}

                                        <form onSubmit={handleSubmit} className="mt-6">
                                            <Textarea
                                                value={data.content}
                                                onChange={(e) => setData('content', e.target.value)}
                                                placeholder="Add a comment..."
                                                className="mt-1"
                                            />
                                            {errors.content && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.content}
                                                </p>
                                            )}
                                            <Button
                                                type="submit"
                                                className="mt-4"
                                                disabled={processing}
                                            >
                                                {processing ? 'Adding...' : 'Add Comment'}
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