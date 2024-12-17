import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const DeadlinePicker = ({ onDeadlineSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);


  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (onDeadlineSelect) {
      onDeadlineSelect(date);
    }
  };

  return (
    <div className="deadline-picker">
      <h3>Select Task Deadline</h3>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        minDate={new Date()}
        dateFormat="dd/MM/yyyy"
        placeholderText="Choose a deadline"
        className="date-picker-input"
      />
      {selectedDate && (
        <p className="deadline-confirmation">
          Selected Deadline: {selectedDate.toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default DeadlinePicker;
