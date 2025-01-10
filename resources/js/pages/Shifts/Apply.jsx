import { Head } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { Badge } from "@/Components/ui/badge";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

const statusColors = {
    draft: "gray",
    published: "blue",
    assigned: "green",
    in_progress: "yellow",
    completed: "purple",
    cancelled: "red",
};

const priorityColors = {
    low: "gray",
    medium: "yellow",
    high: "red",
};

export default function Apply({ id }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            notes: "",
        },
    });

    const { data: shift, isLoading } = useQuery({
        queryKey: ["shift", id],
        queryFn: async () => {
            const response = await axios.get(`/api/shifts/${id}`);
            return response.data;
        },
    });

    const onSubmit = async (data) => {
        try {
            await axios.post(`/api/shifts/${id}/apply`, data);
            router.visit(route("shifts.show", id));
        } catch (error) {
            console.error("Error applying to shift:", error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Head title="Apply for Shift" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Button
                            variant="outline"
                            onClick={() => router.visit(route("shifts.show", id))}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Shift Details
                        </Button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Shift Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>{shift.title}</CardTitle>
                                <CardDescription>
                                    {shift.department.name}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Status
                                        </p>
                                        <Badge
                                            variant={statusColors[shift.status]}
                                        >
                                            {shift.status}
                                        </Badge>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Priority
                                        </p>
                                        <Badge
                                            variant={
                                                priorityColors[shift.priority]
                                            }
                                        >
                                            {shift.priority}
                                        </Badge>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Date
                                        </p>
                                        <p>
                                            {format(
                                                new Date(shift.shift_date),
                                                "PPP"
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Time
                                        </p>
                                        <p>
                                            {format(
                                                new Date(
                                                    `2000-01-01 ${shift.shift_startTime}`
                                                ),
                                                "h:mm a"
                                            )}{" "}
                                            -{" "}
                                            {format(
                                                new Date(
                                                    `2000-01-01 ${shift.shift_endTime}`
                                                ),
                                                "h:mm a"
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Pay Rate
                                        </p>
                                        <p>${shift.pay_rate}/hr</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Break Duration
                                        </p>
                                        <p>{shift.break_duration} hours</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Location
                                    </p>
                                    <p>{shift.shift_location}</p>
                                </div>

                                {shift.required_skills?.length > 0 && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Required Skills
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {shift.required_skills.map(
                                                (skill, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="secondary"
                                                    >
                                                        {skill}
                                                    </Badge>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Application Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Apply for Shift</CardTitle>
                                <CardDescription>
                                    Submit your application for this shift
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="space-y-6"
                                >
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Notes (Optional)
                                        </label>
                                        <Textarea
                                            {...register("notes")}
                                            placeholder="Add any additional notes or information about your application..."
                                            rows={6}
                                        />
                                        {errors.notes && (
                                            <p className="text-sm text-red-500">
                                                {errors.notes.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex justify-end space-x-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                router.visit(
                                                    route("shifts.show", id)
                                                )
                                            }
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit">
                                            Submit Application
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
} 