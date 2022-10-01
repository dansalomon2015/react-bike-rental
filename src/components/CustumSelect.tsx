import React from "react";

interface Props extends React.HTMLProps<HTMLSelectElement> {
    values: any[];
}

export const CustomSelect: React.FC<Props> = ({ values, value, onChange, id, name }) => {
    return (
        <select
            name={name}
            id={id}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
            onChange={onChange}
            value={value}
        >
            <option value="">...</option>
            {values.map((m) => (
                <option key={m} value={m}>
                    {m}
                </option>
            ))}
        </select>
    );
};
