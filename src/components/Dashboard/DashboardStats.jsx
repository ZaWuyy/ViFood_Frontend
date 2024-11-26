import React from 'react';
import './DashboardStyles.css';

const DashboardStats = () => {
  const stats = [
    { title: 'Monthly Revenue', value: '$50,000' },
    { title: 'Customer Satisfaction', value: '92%' },
    { title: 'Products Sold', value: '1,200' },
    { title: 'Average Order Value', value: '$150' },
  ];

  return (
    <div className="dashboard-stats">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-title">{stat.title}</div>
          <div className="stat-value">{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
