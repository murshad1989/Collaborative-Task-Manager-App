import React from "react";

const UserSelector = ({ users, selectedUser, onChange }) => {
  return (
    <div>
      <label>Assign To:</label>
      <select value={selectedUser} onChange={onChange}>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelector;
