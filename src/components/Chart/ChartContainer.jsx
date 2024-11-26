import React from 'react';
import PropTypes from 'prop-types';
import './ChartStyles.css';

const ChartContainer = ({ title, children }) => {
  return (
    <div className="chart-container">
      {title && <div className="chart-title">{title}</div>}
      {children}
    </div>
  );
};

ChartContainer.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default ChartContainer;
