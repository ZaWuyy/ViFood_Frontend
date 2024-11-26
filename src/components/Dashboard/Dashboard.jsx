import React from 'react';
import DashboardWidgets from './DashboardWidgets';
import DashboardStats from './DashboardStats';
import BarChart from '../Chart/BarChart';
import PieChart from '../Chart/PieChart';
import './DashboardStyles.css';

const Dashboard = () => {
  const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Revenue',
        data: [5000, 10000, 15000, 20000, 25000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ['Electronics', 'Clothing', 'Furniture', 'Groceries'],
    datasets: [
      {
        data: [300, 500, 100, 400],
        backgroundColor: [
          '#6a11cb',
          '#2575fc',
          '#00c851',
          '#ffbb33',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Dashboard</h1>
      <DashboardWidgets />
      <DashboardStats />
      <div style={{ marginTop: '20px', display: 'grid', gap: '20px' }}>
        <BarChart data={barChartData} options={chartOptions} />
        <PieChart data={pieChartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
