import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, Clock, Users } from 'lucide-react';
import { Textarea } from '@/Components/ui/textarea';
import { Card } from '@/Components/ui/card';
import { useEffect } from 'react';

export default function Show({ auth, shift }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        content: '',
    });

    // Debug logging
    useEffect(() => {
        console.log('Shift data:', shift);
        console.log('Auth data:', auth);
    }, [shift, auth]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting comment:', data);
        post(route('shifts.comments.store', shift.id), {
            onSuccess: () => {
                console.log('Comment submitted successfully');
                reset('content');
            },
            onError: (errors) => {
                console.error('Comment submission errors:', errors);
            },
            preserveScroll: true,
        });
    };

    // Add error logging
    useEffect(() => {
        if (errors.content) {
            console.error('Comment submission error:', errors.content);
        }
    }, [errors]);

    if (!shift) {
        return <div>Loading...</div>;
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
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
                    {auth.user && (auth.user.role === 'admin' || auth.user.id === shift.user_id) && (
                        <Link href={route('shifts.edit', shift.id)}>
                            <Button>Edit Shift</Button>
                        </Link>
                    )}
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
                                            {shift.status}
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
    );
} 