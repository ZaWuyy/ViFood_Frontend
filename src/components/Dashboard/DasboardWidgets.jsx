import React from 'react';
import './DashboardStyles.css';

const DashboardWidgets = () => {
  const widgets = [
    { title: 'Total Sales', value: '$15,230' },
    { title: 'New Orders', value: '120' },
    { title: 'Active Users', value: '450' },
    { title: 'Feedbacks', value: '75' },
  ];

  return (
    <div className="dashboard-widgets">
      {widgets.map((widget, index) => (
        <div key={index} className="widget">
          <div className="widget-title">{widget.title}</div>
          <div className="widget-value">{widget.value}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardWidgets;
