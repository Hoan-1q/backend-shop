import { Button, Stack } from '@mui/material';
import React, { useContext } from 'react';
import NavTab from 'src/components/Nav';
import NavLeft from 'src/components/NavLeft';
import { StoreContext } from 'stores';
import TableOrder from './TableOrder';
// import TableCustom from '../../components/TableCustom';

const Order: React.FC = () => {
  const store = useContext(StoreContext);
  React.useEffect(() => {
    async function fetchMyAPI() {
      const { setAllOrders } = store;
      await setAllOrders();
    }
    fetchMyAPI();
  }, []);
  const { orderList } = store;
  return (
    <>
      <NavTab />
      <div style={{ display: 'flex' }}>
        <NavLeft />
        <div>
          <Stack spacing={2} direction="row">
            <h3>Order</h3>
            {/* <Button variant="contained" onClick={() => router.push('/Products/new')}>Add Order</Button> */}
          </Stack>
          <TableOrder data={orderList} />
        </div>
      </div>
    </>
  );
};

export default Order;
