import React from 'react';
import NavTab from 'src/components/Nav';
import NavLeft from 'src/components/NavLeft';
import Dashboard from '../Dashboard';

const Home: React.FC = () => {
  return (
    <>
      <NavTab />
      <div style={{ display: 'flex' }}>
        <NavLeft />
        <Dashboard />
      </div>
    </>
  );
};

export default Home;
