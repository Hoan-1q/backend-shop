import React from 'react';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { Paper } from '@mui/material';

const data = [
  { argument: 1, value: 10 },
  { argument: 2, value: 20 },
  { argument: 3, value: 30 },
];

const ChartView: React.FC = () => {
  return (
    <Paper style={{ width: 1700 }}>
      <Chart
        data={data}
      >
        <ArgumentAxis />
        <ValueAxis />

        <LineSeries valueField="value" argumentField="argument" />
      </Chart>
    </Paper>
  );
};

export default ChartView;
