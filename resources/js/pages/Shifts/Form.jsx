import { useState, useEffect } from "react"; // Importing React hooks for state and effect management
import { Head } from "@inertiajs/react"; // Importing Head component for setting the document head
import { Button } from "@/Components/ui/button"; // Importing Button component for UI
import { Input } from "@/Components/ui/input"; // Importing Input component for text input
import { Textarea } from "@/Components/ui/textarea"; // Importing Textarea component for multi-line text input
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"; // Importing Select components for dropdowns
import { Calendar } from "@/Components/ui/calendar"; // Importing Calendar component for date selection
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover"; // Importing Popover components for date picker
import { format } from "date-fns"; // Importing date-fns for date formatting
import { Calendar as CalendarIcon } from "lucide-react"; // Importing calendar icon from lucide-react
import { cn } from "@/lib/utils"; // Importing utility function for class name manipulation
import { useForm } from "react-hook-form"; // Importing useForm hook for form handling
import axios from "axios"; // Importing axios for making HTTP requests
import { useQuery } from "@tanstack/react-query"; // Importing useQuery for data fetching
import { router } from "@inertiajs/react"; // Importing router for navigation

export default function Form({ shift = null }) {
    const isEditing = !!shift; // Determine if we are editing an existing shift
    const [selectedDate, setSelectedDate] = useState(
        shift ? new Date(shift.shift_date) : new Date() // Set initial date based on shift data or current date
    );

    const {
        register, // Register function to register inputs
        handleSubmit, // Function to handle form submission
        formState: { errors }, // Object containing form errors
        setValue, // Function to set form values
        watch, // Function to watch form values
    } = useForm({
        defaultValues: { // Setting default values for the form
            title: shift?.title || "", // Title of the shift
            description: shift?.description || "", // Description of the shift
            department_id: shift?.department_id || "", // Selected department ID
            pay_rate: shift?.pay_rate || "", // Pay rate for the shift
            shift_date: shift?.shift_date || format(new Date(), "yyyy-MM-dd"), // Shift date
            shift_startTime: shift?.shift_startTime || "09:00:00", // Start time of the shift
            shift_endTime: shift?.shift_endTime || "17:00:00", // End time of the shift
            break_duration: shift?.break_duration || "1", // Break duration
            shift_location: shift?.shift_location || "", // Location of the shift
            required_skills: shift?.required_skills || [], // Required skills for the shift
            priority: shift?.priority || "medium", // Priority of the shift
            status: shift?.status || "draft", // Status of the shift
        },
    });

    const { data: departments } = useQuery({ // Fetching departments data
        queryKey: ["departments"], // Query key for caching
        queryFn: async () => { // Function to fetch departments
            const response = await axios.get("/api/departments"); // Making GET request to fetch departments
            return response.data; // Returning the data
        },
    });

    const onSubmit = async (data) => { // Function to handle form submission
        try {
            if (isEditing) { // If editing an existing shift
                await axios.put(`/api/shifts/${shift.id}`, data); // Update the shift
            } else { // If creating a new shift
                await axios.post("/api/shifts", data); // Create a new shift
            }
            router.visit(route("shifts.index")); // Redirect to shifts index page
        } catch (error) {
            console.error("Error saving shift:", error); // Log any errors
        }
    };

    return (
        <>
            <Head title={`${isEditing ? 'Edit' : 'Create'} Shift`} /> {/* Set the page title */}

            <div className="py-12"> {/* Main container with padding */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> {/* Centered container */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg"> {/* Card style container */}
                        <div className="p-6"> {/* Padding for inner content */}
                            <h2 className="text-2xl font-semibold mb-6"> {/* Header for form */}
                                {isEditing ? 'Edit' : 'Create'} Shift
                            </h2>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6"> {/* Form with submission handler */}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2"> {/* Responsive grid layout */}
                                    {/* Title */}
                                    <div className="space-y-2"> {/* Container for title input */}
                                        <label className="text-sm font-medium">Title</label> {/* Title label */}
                                        <Input
                                            {...register("title", { required: true })} // Registering title input
                                            placeholder="Enter shift title" // Placeholder text
                                        />
                                        {errors.title && ( // Display error if title is required
                                            <p className="text-sm text-red-500">Title is required</p>
                                        )}
                                    </div>

                                    {/* Department */}
                                    <div className="space-y-2"> {/* Container for department selection */}
                                        <label className="text-sm font-medium">Department</label> {/* Department label */}
                                        <Select
                                            value={watch("department_id")} // Watch department ID value
                                            onValueChange={(value) =>
                                                setValue("department_id", value) // Set department ID on change
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select department" /> {/* Placeholder for department selection */}
                                            </SelectTrigger>
                                            <SelectContent>
                                                {departments?.map((dept) => ( // Map through departments to create options
                                                    <SelectItem
                                                        key={dept.id} // Unique key for each item
                                                        value={dept.id.toString()} // Value for the select item
                                                    >
                                                        {dept.name} {/* Display department name */}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.department_id && ( // Display error if department is required
                                            <p className="text-sm text-red-500">
                                                Department is required
                                            </p>
                                        )}
                                    </div>

                                    {/* Date */}
                                    <div className="space-y-2"> {/* Container for date selection */}
                                        <label className="text-sm font-medium">Date</label> {/* Date label */}
                                        <Popover> {/* Popover for date picker */}
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal", // Button styling
                                                        !selectedDate &&
                                                            "text-muted-foreground" // Muted text if no date selected
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" /> {/* Calendar icon */}
                                                    {selectedDate ? ( // Display selected date or placeholder
                                                        format(selectedDate, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0"> {/* Content of the popover */}
                                                <Calendar
                                                    mode="single" // Single date selection mode
                                                    selected={selectedDate} // Currently selected date
                                                    onSelect={(date) => { // Handle date selection
                                                        setSelectedDate(date); // Update selected date
                                                        setValue(
                                                            "shift_date", // Set shift date value
                                                            format(
                                                                date,
                                                                "yyyy-MM-dd" // Format date for storage
                                                            )
                                                        );
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    {/* Time */}
                                    <div className="grid grid-cols-2 gap-4"> {/* Grid for time inputs */}
                                        <div className="space-y-2"> {/* Container for start time input */}
                                            <label className="text-sm font-medium">
                                                Start Time
                                            </label>
                                            <Input
                                                type="time" // Time input type
                                                {...register("shift_startTime")} // Registering start time input
                                            />
                                        </div>
                                        <div className="space-y-2"> {/* Container for end time input */}
                                            <label className="text-sm font-medium">
                                                End Time
                                            </label>
                                            <Input
                                                type="time" // Time input type
                                                {...register("shift_endTime")} // Registering end time input
                                            />
                                        </div>
                                    </div>

                                    {/* Pay Rate */}
                                    <div className="space-y-2"> {/* Container for pay rate input */}
                                        <label className="text-sm font-medium">
                                            Pay Rate ($/hr)
                                        </label>
                                        <Input
                                            type="number" // Number input type
                                            step="0.01" // Step value for decimal input
                                            {...register("pay_rate")} // Registering pay rate input
                                        />
                                    </div>

                                    {/* Break Duration */}
                                    {/* Break Duration Input */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Break Duration (hours) {/* Label for break duration input */}
                                        </label>
                                        <Input
                                            type="number"
                                            step="0.25"
                                            {...register("break_duration")}
                                        />
                                    </div>

                                    {/* Location */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Location
                                        </label>
                                        <Input
                                            {...register("shift_location")}
                                            placeholder="Enter shift location"
                                        />
                                    </div>

                                    {/* Priority */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Priority
                                        </label>
                                        <Select
                                            value={watch("priority")}
                                            onValueChange={(value) =>
                                                setValue("priority", value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select priority" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">Low</SelectItem>
                                                <SelectItem value="medium">
                                                    Medium
                                                </SelectItem>
                                                <SelectItem value="high">
                                                    High
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Status */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Status
                                        </label>
                                        <Select
                                            value={watch("status")}
                                            onValueChange={(value) =>
                                                setValue("status", value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">
                                                    Draft
                                                </SelectItem>
                                                <SelectItem value="published">
                                                    Published
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Description
                                    </label>
                                    <Textarea
                                        {...register("description")}
                                        placeholder="Enter shift description"
                                        rows={4}
                                    />
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                            router.visit(route("shifts.index"))
                                        }
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit">
                                        {isEditing ? "Update" : "Create"} Shift
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 