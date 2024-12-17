import React, { useState } from "react";

const PrioritySelector = ({ onSelect }) => {
  const [selectedPriority, setSelectedPriority] = useState("");

  const priorities = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "urgent", label: "Urgent" },
  ];

  const handleChange = (event) => {
    const priority = event.target.value;
    setSelectedPriority(priority);
    if (onSelect) onSelect(priority);
  };

  return (
    <div style={styles.container}>
      <label htmlFor="prioritySelector" style={styles.label}>
        Select Priority:
      </label>
      <select
        id="prioritySelector"
        value={selectedPriority}
        onChange={handleChange}
        style={styles.select}
      >
        <option value="">-- Choose Priority --</option>
        {priorities.map((priority) => (
          <option key={priority.value} value={priority.value}>
            {priority.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const styles = {
  container: {
    margin: "20px 0",
    fontFamily: "Arial, sans-serif",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "1em",
    color: "#2c3e50",
  },
  select: {
    width: "100%",
    padding: "10px",
    fontSize: "1em",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#f4f4f9",
    outline: "none",
  },
};

export default PrioritySelector;
