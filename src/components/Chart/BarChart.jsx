import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartContainer from './ChartContainer';

const BarChart = ({ data, options }) => {
  return (
    <ChartContainer title="Bar Chart">
      <Bar data={data} options={options} />
    </ChartContainer>
  );
};

export default BarChart;
