import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { analyticsApi } from "../Services/Api";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CompletedTaskChart = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const response = await analyticsApi.getCompletedTasks();
        const data = response.data;
        const chartFormattedData = formatChartData(data);
        setChartData(chartFormattedData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load completed task data.");
        setLoading(false);
      }
    };

    fetchCompletedTasks();
  }, []);

  const formatChartData = (data) => {
    const labels = data.map((task) => task.date);
    const values = data.map((task) => task.count);

    return {
      labels,
      datasets: [
        {
          label: "Completed Tasks",
          data: values,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Completed Tasks Overview</h2>
      {chartData && <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />}
    </div>
  );
};

export default CompletedTaskChart;
