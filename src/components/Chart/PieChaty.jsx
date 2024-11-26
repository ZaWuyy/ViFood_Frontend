import React from 'react';
import { Pie } from 'react-chartjs-2';
import ChartContainer from './ChartContainer';

const PieChart = ({ data, options }) => {
  return (
    <ChartContainer title="Pie Chart">
      <Pie data={data} options={options} />
    </ChartContainer>
  );
};

export default PieChart;
