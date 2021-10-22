import { Button, Stack } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { StoreContext } from 'stores';
import { useRouter } from 'next/router';
import TableCustom from '../../components/TableCustom';
import NavTab from '../../components/Nav';
import NavLeft from '../../components/NavLeft';

const Customer: React.FC = () => {
  const router = useRouter();
  const store = useContext(StoreContext);
  React.useEffect(() => {
    async function fetchMyAPI() {
      const { getAllUser } = store;
      await getAllUser();
    }

    fetchMyAPI();
  }, []);
  const { users } = store;
  return (
    <>
      <NavTab />
      <div style={{ display: 'flex' }}>
        <NavLeft />
        <div>
          <Stack spacing={2} direction="row">
            <h3>Customer</h3>
            <Button variant="contained" onClick={() => router.push('/Customer/new')}>Add Customer</Button>
          </Stack>
          <TableCustom data={users} />
        </div>
      </div>
    </>
  );
};

export default observer(Customer);
