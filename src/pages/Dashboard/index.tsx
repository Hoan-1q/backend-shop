import React from 'react';
import ChartView from './Chart';
import StatisView from './stati';

const Dashboard: React.FC = () => {
  return (
    <div>
      <div>
        <StatisView />
      </div>
      <div>
        <ChartView />
      </div>
    </div>
  );
};

export default Dashboard;
