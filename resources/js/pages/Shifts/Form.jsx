import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Calendar } from "@/Components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { router } from "@inertiajs/react";

export default function Form({ shift = null }) {
    const isEditing = !!shift;
    const [selectedDate, setSelectedDate] = useState(
        shift ? new Date(shift.shift_date) : new Date()
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        defaultValues: {
            title: shift?.title || "",
            description: shift?.description || "",
            department_id: shift?.department_id || "",
            pay_rate: shift?.pay_rate || "",
            shift_date: shift?.shift_date || format(new Date(), "yyyy-MM-dd"),
            shift_startTime: shift?.shift_startTime || "09:00:00",
            shift_endTime: shift?.shift_endTime || "17:00:00",
            break_duration: shift?.break_duration || "1",
            shift_location: shift?.shift_location || "",
            required_skills: shift?.required_skills || [],
            priority: shift?.priority || "medium",
            status: shift?.status || "draft",
        },
    });

    const { data: departments } = useQuery({
        queryKey: ["departments"],
        queryFn: async () => {
            const response = await axios.get("/api/departments");
            return response.data;
        },
    });

    const onSubmit = async (data) => {
        try {
            if (isEditing) {
                await axios.put(`/api/shifts/${shift.id}`, data);
            } else {
                await axios.post("/api/shifts", data);
            }
            router.visit(route("shifts.index"));
        } catch (error) {
            console.error("Error saving shift:", error);
        }
    };

    return (
        <>
            <Head title={`${isEditing ? 'Edit' : 'Create'} Shift`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-6">
                                {isEditing ? 'Edit' : 'Create'} Shift
                            </h2>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Title */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Title</label>
                                        <Input
                                            {...register("title", { required: true })}
                                            placeholder="Enter shift title"
                                        />
                                        {errors.title && (
                                            <p className="text-sm text-red-500">Title is required</p>
                                        )}
                                    </div>

                                    {/* Department */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Department</label>
                                        <Select
                                            value={watch("department_id")}
                                            onValueChange={(value) =>
                                                setValue("department_id", value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select department" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {departments?.map((dept) => (
                                                    <SelectItem
                                                        key={dept.id}
                                                        value={dept.id.toString()}
                                                    >
                                                        {dept.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.department_id && (
                                            <p className="text-sm text-red-500">
                                                Department is required
                                            </p>
                                        )}
                                    </div>

                                    {/* Date */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Date</label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !selectedDate &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {selectedDate ? (
                                                        format(selectedDate, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={selectedDate}
                                                    onSelect={(date) => {
                                                        setSelectedDate(date);
                                                        setValue(
                                                            "shift_date",
                                                            format(
                                                                date,
                                                                "yyyy-MM-dd"
                                                            )
                                                        );
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    {/* Time */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">
                                                Start Time
                                            </label>
                                            <Input
                                                type="time"
                                                {...register("shift_startTime")}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">
                                                End Time
                                            </label>
                                            <Input
                                                type="time"
                                                {...register("shift_endTime")}
                                            />
                                        </div>
                                    </div>

                                    {/* Pay Rate */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Pay Rate ($/hr)
                                        </label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            {...register("pay_rate")}
                                        />
                                    </div>

                                    {/* Break Duration */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Break Duration (hours)
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