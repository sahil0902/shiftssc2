import { Head } from "@inertiajs/react"; // Importing Head component for setting the document title
import { Button } from "@/Components/ui/button"; // Importing Button component for user actions
import { Textarea } from "@/Components/ui/textarea"; // Importing Textarea component for multi-line input
import { Badge } from "@/Components/ui/badge"; // Importing Badge component for displaying status and priority
import { format } from "date-fns"; // Importing format function for date formatting
import { useQuery } from "@tanstack/react-query"; // Importing useQuery hook for data fetching
import axios from "axios"; // Importing axios for making HTTP requests
import { router } from "@inertiajs/react"; // Importing router for navigation
import { useForm } from "react-hook-form"; // Importing useForm hook for form handling
import { ArrowLeft } from "lucide-react"; // Importing ArrowLeft icon for navigation
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"; // Importing card components for layout

// Object to map shift status to corresponding colors
const statusColors = {
    draft: "gray",
    published: "blue",
    assigned: "green",
    in_progress: "yellow",
    completed: "purple",
    cancelled: "red",
};

// Object to map shift priority to corresponding colors
const priorityColors = {
    low: "gray",
    medium: "yellow",
    high: "red",
};

// Main functional component for applying to a shift
export default function Apply({ id }) {
    // Setting up form handling with react-hook-form
    const {
        register, // Registering input fields
        handleSubmit, // Function to handle form submission
        formState: { errors }, // Extracting form errors
    } = useForm({
        defaultValues: {
            notes: "", // Default value for notes field
        },
    });

    // Fetching shift data using react-query
    const { data: shift, isLoading } = useQuery({
        queryKey: ["shift", id], // Unique key for the query
        queryFn: async () => {
            const response = await axios.get(`/api/shifts/${id}`); // Fetching shift data from API
            return response.data; // Returning the fetched data
        },
    });

    // Function to handle form submission
    const onSubmit = async (data) => {
        try {
            await axios.post(`/api/shifts/${id}/apply`, data); // Sending application data to the API
            router.visit(route("shifts.show", id)); // Redirecting to the shift details page
        } catch (error) {
            console.error("Error applying to shift:", error); // Logging any errors
        }
    };

    // Display loading state while fetching data
    if (isLoading) {
        return <div>Loading...</div>; // Loading indicator
    }

    return (
        <>
            <Head title="Apply for Shift" /> {/* Setting the page title */}

            <div className="py-12"> {/* Main container with padding */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> {/* Centering the content */}
                    <div className="mb-6"> {/* Button to go back to shift details */}
                        <Button
                            variant="outline"
                            onClick={() => router.visit(route("shifts.show", id))} // Navigating back to shift details
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" /> {/* Back arrow icon */}
                            Back to Shift Details
                        </Button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2"> {/* Grid layout for shift details and application form */}
                        {/* Shift Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>{shift.title}</CardTitle> {/* Displaying shift title */}
                                <CardDescription>
                                    {shift.department.name} {/* Displaying department name */}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6"> {/* Content area for shift details */}
                                <div className="grid grid-cols-2 gap-4"> {/* Grid layout for details */}
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Status
                                        </p>
                                        <Badge
                                            variant={statusColors[shift.status]} // Displaying status with corresponding color
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
                                                priorityColors[shift.priority] // Displaying priority with corresponding color
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
                                                new Date(shift.shift_date), // Formatting shift date
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
                                                    `2000-01-01 ${shift.shift_startTime}` // Formatting shift start time
                                                ),
                                                "h:mm a"
                                            )}{" "}
                                            -{" "}
                                            {format(
                                                new Date(
                                                    `2000-01-01 ${shift.shift_endTime}` // Formatting shift end time
                                                ),
                                                "h:mm a"
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Pay Rate
                                        </p>
                                        <p>${shift.pay_rate}/hr</p> {/* Displaying pay rate */}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Break Duration
                                        </p>
                                        <p>{shift.break_duration} hours</p> {/* Displaying break duration */}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Location
                                    </p>
                                    <p>{shift.shift_location}</p> {/* Displaying shift location */}
                                </div>

                                {shift.required_skills?.length > 0 && ( // Checking if there are required skills
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Required Skills
                                        </p>
                                        <div className="flex flex-wrap gap-2"> {/* Displaying required skills */}
                                            {shift.required_skills.map(
                                                (skill, index) => (
                                                    <Badge
                                                        key={index} // Unique key for each skill badge
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
                                <CardTitle>Apply for Shift</CardTitle> {/* Title for the application form */}
                                <CardDescription>
                                    Submit your application for this shift {/* Description for the form */}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form
                                    onSubmit={handleSubmit(onSubmit)} // Handling form submission
                                    className="space-y-6"
                                >
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Notes (Optional) {/* Label for notes input */}
                                        </label>
                                        <Textarea
                                            {...register("notes")} // Registering notes input
                                            placeholder="Add any additional notes or information about your application..." // Placeholder text
                                            rows={6} // Number of rows for the textarea
                                        />
                                        {errors.notes && ( // Displaying error message if notes input has errors
                                            <p className="text-sm text-red-500">
                                                {errors.notes.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex justify-end space-x-4"> {/* Buttons for form actions */}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                router.visit(
                                                    route("shifts.show", id) // Cancel button to go back to shift details
                                                )
                                            }
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit"> {/* Submit button for the application */}
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