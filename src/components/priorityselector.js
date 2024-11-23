import React from "react";

const PrioritySelector = ({ value, onChange }) => {
  return (
    <div>
      <label>Priority:</label>
      <select value={value} onChange={onChange}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
};

export default PrioritySelector;
