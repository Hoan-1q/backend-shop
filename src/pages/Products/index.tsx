import { Button, Stack } from '@mui/material';
import { observer } from 'mobx-react';
import router from 'next/router';
import React, { useContext } from 'react';
import NavTab from 'src/components/Nav';
// eslint-disable-next-line import/no-cycle
import NavLeft from 'src/components/NavLeft';
import { StoreContext } from 'stores';
import TableProducts from './TableProducts';

const Products: React.FC = () => {
  const store = useContext(StoreContext);
  React.useEffect(() => {
    async function fetchMyAPI() {
      const { getAllProduct } = store;
      await getAllProduct();
    }
    fetchMyAPI();
  }, []);
  const { productList } = store;
  return (
    <>
      <NavTab />
      <div style={{ display: 'flex' }}>
        <NavLeft />
        <div>
          <Stack spacing={2} direction="row">
            <h3>Products</h3>
            <Button variant="contained" onClick={() => router.push('/Products/new')}>Add Product</Button>
          </Stack>
          <TableProducts data={productList} />
        </div>
      </div>
    </>
  );
};

export default observer(Products);
