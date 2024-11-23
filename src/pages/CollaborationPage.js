import React, { useState } from "react";
import SharedTaskList from "../components/SharedTaskList";
import UserSelector from "../components/UserSelector";

const CollaborationPage = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([{ id: 1, name: "John Doe" }, { id: 2, name: "Jane Doe" }]);
  const [selectedUser, setSelectedUser] = useState("");

  const handleAssignTask = (taskId) => {
    console.log(`Assigning task ${taskId} to user ${selectedUser}`);
  };

  return (
    <div>
      <h1>Collaboration</h1>
      <UserSelector users={users} selectedUser={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} />
      <SharedTaskList tasks={tasks} />
    </div>
  );
};

export default CollaborationPage;
