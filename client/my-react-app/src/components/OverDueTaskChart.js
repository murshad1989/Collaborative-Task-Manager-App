import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { analyticsApi } from "../Services/Api";

ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend);

const OverDueTaskChart = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverdueTasks = async () => {
      try {
        const data = await analyticsApi.getOverdueTasks();
        const chartFormattedData = formatChartData(data);
        setChartData(chartFormattedData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load overdue task data.");
        setLoading(false);
      }
    };

    fetchOverdueTasks();
  }, []);

  const formatChartData = (data) => {
    const labels = data.map((task) => task.date);
    const values = data.map((task) => task.count);

    return {
      labels,
      datasets: [
        {
          label: "Overdue Tasks",
          data: values,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Overdue Tasks Overview</h2>
      {chartData && <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />}
    </div>
  );
};

export default OverDueTaskChart;
