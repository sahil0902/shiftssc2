
import { Link } from "@inertiajs/inertia-react"; // Importing Link component for navigation

// Functional component to display shifts
export default function index({ shifts }) {
    return (
        <div className="container mx-auto px-4 py-8"> {/* Main container with padding */}
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center"> {/* Main heading for the page */}
                Shifts
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Grid layout for shifts */}
                {shifts.data.map((shift) => ( // Mapping through the shifts data
                    <div
                        key={shift.id} // Unique key for each shift
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6" // Card styling for each shift
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4"> {/* Shift employee name */}
                            {shift.employee_name}
                        </h2>
                        <p className="text-gray-600"> {/* Pay rate information */}
                            Pay Rate: ${shift.pay_rate}
                        </p>
                        <p className="text-gray-600"> {/* Shift date information */}
                            Date: {shift.shift_date}
                        </p>
                        <p className="text-gray-600"> {/* Shift time information */}
                            Time: {shift.shift_startTime} - {shift.shift_endTime}
                        </p>
                        <p className="text-gray-600"> {/* Shift location information */}
                            Location: {shift.shift_location}
                        </p>
                        <p className="text-gray-600"> {/* Shift department information */}
                            Department: {shift.department}
                        </p>
                        <p className="text-gray-600"> {/* Shift status information */}
                            Status: {shift.status}
                        </p>
                        <span>
                            <Link
                                href={route("shifts.show", shift.id)} // Link to view more details about the shift
                                className="block mt-4 text-blue-500 hover:underline" // Link styling
                            >
                                Read more {/* Link text */}
                            </Link>
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-2 mt-8"> {/* Pagination container */}
                {shifts.links && // Check if there are pagination links
                    shifts.links.map((link, index) => // Mapping through pagination links
                        link.url ? ( // If the link has a URL
                            <Link
                                key={index} // Unique key for each link
                                href={link.url} // Link URL
                                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                                    link.active // Conditional styling for active link
                                        ? "bg-gray-800 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }} // Render link label as HTML
                                preserveScroll // Preserve scroll position on link click
                            />
                        ) : ( // If the link does not have a URL
                            <span
                                key={index} // Unique key for each span
                                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-400" // Styling for inactive link
                                dangerouslySetInnerHTML={{ __html: link.label }} // Render link label as HTML
                            />
                        )
                    )}
            </div>
        </div>
    );
}