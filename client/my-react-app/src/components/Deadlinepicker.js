import React from "react";

const DeadlinePicker = ({ value, onChange }) => {
  return (
    <div>
      <label>Deadline:</label>
      <input type="date" value={value} onChange={onChange} />
    </div>
  );
};

export default DeadlinePicker;
