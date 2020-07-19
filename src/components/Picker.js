import React from "react";

export default class Picker extends React.Component {
    render() {
        const { value, onChange, options } = this.props;
        return (
            <span>
                <h1>{value}</h1>
                <select
                    onChange={event => onChange(event.target.value)}
                    value={value}
                >
                    {options.map(option => (
                        <option value={option} key={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </span>
        );
    }
};