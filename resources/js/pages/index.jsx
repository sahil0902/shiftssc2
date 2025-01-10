// filepath: /Applications/XAMPP/xamppfiles/htdocs/laravel-react-crud/resources/js/pages/Home.jsx
import { Link } from "@inertiajs/inertia-react";

export default function index({ shifts }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                Shifts
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shifts.data.map((shift) => (
                    <div
                        key={shift.id}
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6"
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {shift.employee_name}
                        </h2>
                        <p className="text-gray-600">
                            Pay Rate: ${shift.pay_rate}
                        </p>
                        <p className="text-gray-600">
                            Date: {shift.shift_date}
                        </p>
                        <p className="text-gray-600">
                            Time: {shift.shift_startTime} - {shift.shift_endTime}
                        </p>
                        <p className="text-gray-600">
                            Location: {shift.shift_location}
                        </p>
                        <p className="text-gray-600">
                            Department: {shift.department}
                        </p>
                        <p className="text-gray-600">
                            Status: {shift.status}
                        </p>
                        <span>
                            <Link
                                href={route("shifts.show", shift.id)}
                                className="block mt-4 text-blue-500 hover:underline"
                            >
                                Read more
                            </Link>
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-2 mt-8">
                {shifts.links &&
                    shifts.links.map((link, index) =>
                        link.url ? (
                            <Link
                                key={index}
                                href={link.url}
                                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                                    link.active
                                        ? "bg-gray-800 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                preserveScroll
                            />
                        ) : (
                            <span
                                key={index}
                                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-400"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        )
                    )}
            </div>
        </div>
    );
}