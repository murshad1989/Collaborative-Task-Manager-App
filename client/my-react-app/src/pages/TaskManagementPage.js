import React, { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/Tasklist";
import PrioritySelector from "../components/priorityselector";
import DeadlinePicker from "../components/DeadlinePicker";
import { taskApi } from "../Services/Api";

const TaskManagementPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ priority: "All", deadline: null });


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await taskApi.getAll();
        setTasks(response);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };
    fetchTasks();
  }, []);


  const addTask = async (newTask) => {
    try {
      const response = await taskApi.create(newTask);
      setTasks((prevTasks) => [...prevTasks, response]);
    } catch (error) {
      console.error("Failed to add task", error);
    }
  };


  const deleteTask = async (taskId) => {
    try {
      await taskApi.delete(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };


  const updateTask = async (taskId, updatedData) => {
    try {
      const updatedTask = await taskApi.update(taskId, updatedData);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };


  const filteredTasks = tasks.filter((task) => {
    const matchesPriority =
      filter.priority === "All" || task.priority === filter.priority;
    const matchesDeadline =
      !filter.deadline || new Date(task.deadline) <= new Date(filter.deadline);

    return matchesPriority && matchesDeadline;
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#4A90E2" }}>
        Task Management
      </h1>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <PrioritySelector
          selectedPriority={filter.priority}
          onPriorityChange={(priority) =>
            setFilter((prevFilter) => ({ ...prevFilter, priority }))
          }
        />
        <DeadlinePicker
          selectedDate={filter.deadline}
          onDateChange={(deadline) =>
            setFilter((prevFilter) => ({ ...prevFilter, deadline }))
          }
        />
      </div>
      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={filteredTasks}
        onDeleteTask={deleteTask}
        onUpdateTask={updateTask}
      />
    </div>
  );
};

export default TaskManagementPage;
