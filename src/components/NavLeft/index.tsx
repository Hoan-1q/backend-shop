import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import router from 'next/router';
import { StoreContext } from 'stores';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 5 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const NavLeft: React.FC = () => {
  // const [value, setValue] = React.useState(0);

  const store = React.useContext(StoreContext);
  const { tab, setTab } = store;

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <div>
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={tab}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="Dashboard" onClick={() => router.push('/home')} {...a11yProps(0)} />
          <Tab label="Customer" onClick={() => router.push('/Customer')} {...a11yProps(1)} />
          <Tab label="Products" onClick={() => router.push('/Products')} {...a11yProps(2)} />
          <Tab label="Order" onClick={() => router.push('/Order')} {...a11yProps(3)} />
        </Tabs>
        {/* <TabPanel value={value} index={0}>
          <Dashboard />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Customer />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Products />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Order />
        </TabPanel> */}
      </Box>
    </div>
  );
};

export default NavLeft;
