import React, { useState } from "react";
import { BikeModels, COLORS, dateToLocaleShort, FilterType } from "utils";
import { CalendarDateRangePicker } from "./CalendarDateRangePicker";
import { CustomSelect } from "./CustumSelect";
import { ErrorBoundary } from "./ErrorBoundary";
import { LocationInput } from "./LocationInput";

export const FilterForm: React.FC<{ applyFilters: (filters: FilterType | undefined) => void }> = ({ applyFilters }) => {
    const [location, setLocation] = useState("");
    const [rating, setRating] = useState(0);
    const [color, setColor] = useState("");
    const [model, setModel] = useState("");
    const [dateRange, setDateRange] = React.useState<{ startDate: Date; endDate: Date }>();
    const [calendarVisible, setCalendarVisible] = useState(false);

    const apply = () => {
        applyFilters({
            color,
            rating,
            model,
            location,
            dateRange,
        });
    };

    const cancelFilters = () => {
        applyFilters(undefined);
        setColor("");
        setModel("");
        setDateRange(undefined);
        setRating(0);
        setLocation("");
    };

    return (
        <div className="rounded w-96 shadow-md border p-2 px-4 ml-4">
            <h6 className="text-lg font-bold mb-3">Filters</h6>
            <div className="flex justify-center">
                <button
                    onClick={apply}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                    Apply filters
                </button>
                <button
                    onClick={cancelFilters}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                    Clear filter
                </button>
            </div>
            <form className="mt-5 space-y-3">
                <div>
                    <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900">
                        Color
                    </label>
                    <CustomSelect
                        values={Object.values(COLORS)}
                        value={color}
                        name="color"
                        id="color"
                        onChange={(e) => setColor((e.target as HTMLInputElement).value)}
                    />
                </div>
                <div>
                    <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-900">
                        Model
                    </label>

                    <CustomSelect
                        values={Object.values(BikeModels).sort()}
                        value={model}
                        name="model"
                        id="model"
                        onChange={(e) => setModel((e.target as HTMLInputElement).value)}
                    />
                </div>
                <LocationInput value={location} setLocation={setLocation} />
                <div>
                    <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-900">
                        Minimum rating
                    </label>
                    <input
                        name="rating"
                        id="rating"
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
                        onChange={(e) => setRating(parseInt(e.target.value))}
                        value={rating}
                        max={5}
                    />
                </div>
                <div>
                    <label htmlFor="range" className="block mb-2 text-sm font-medium text-gray-900">
                        Period of availability
                    </label>
                    <input
                        name="range"
                        placeholder="Date Range"
                        id="ramge"
                        disabled
                        value={
                            dateRange
                                ? `${dateToLocaleShort(dateRange.startDate)} to ${dateToLocaleShort(dateRange.endDate)}`
                                : ""
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
                    />
                    <button
                        type="button"
                        onClick={() => setCalendarVisible(true)}
                        className=" block mt-3 w-full justify-center rounded-md border border-transparent hover:text-white bg-yellow-400 px-4 py-2 text-base font-medium text-dark shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2  sm:w-auto sm:text-sm"
                    >
                        Pick a range date
                    </button>
                </div>
            </form>

            <ErrorBoundary>
                <CalendarDateRangePicker
                    visible={calendarVisible}
                    hideCalendar={() => setCalendarVisible(false)}
                    validate={(dateRange) => {
                        setDateRange(dateRange);
                        setCalendarVisible(false);
                    }}
                />
            </ErrorBoundary>
        </div>
    );
};
