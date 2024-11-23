import React from "react";
import CompletedTasksChart from "../components/CompletedTasksChart";
import OverdueTasksChart from "../components/OverdueTasksChart";

const AnalyticsPage = () => {
  const completedTasksData = [
    { date: "2024-11-20", count: 5 },
    { date: "2024-11-21", count: 7 },
  ];

  const overdueTasksData = [
    { date: "2024-11-20", count: 2 },
    { date: "2024-11-21", count: 4 },
  ];

  return (
    <div>
      <h1>Analytics</h1>
      <CompletedTasksChart data={completedTasksData} />
      <OverdueTasksChart data={overdueTasksData} />
    </div>
  );
};

export default AnalyticsPage;
