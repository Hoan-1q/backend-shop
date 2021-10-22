import {
  Avatar, Box, Button, Container, TextField,
} from '@mui/material';
import axios from 'axios';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import NavTab from 'src/components/Nav';
import NavLeft from 'src/components/NavLeft';
import { StoreContext } from 'stores';

const CustomerDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [image, setImage] = React.useState('');
  const store = useContext(StoreContext);

  React.useEffect(() => {
    async function fetchMyAPI() {
      const { getUserByID } = store;
      if (id !== 'new') {
        console.log(id);
        await getUserByID(id);
      }
    }
    fetchMyAPI();
  }, []);

  const {
    name, setName,
    username, setUsername,
    password, setPassword,
    email, setEmail,
    phone, setPhone,
    address, setAddress,
    avatar, setAvatar,
  } = store.user;

  const selectAvatar = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setImage(URL.createObjectURL(img));
      const formData = new FormData();
      formData.append('file', img);
      try {
        const res = await axios.post(
          '/api/upload',
          formData,
        );
        setAvatar(res.data);
      } catch (ex) {
        console.log(ex);
      }
    }
  };

  const onSaveUser = async () => {
    const { saveUser, setUserDefault } = store;
    await saveUser();
    setUserDefault();
    router.push('/Customer');
  };

  const onCancel = () => {
    const { setUserDefault } = store;
    router.push('/Customer');
    setUserDefault();
  };

  return (
    <>
      <NavTab />
      <div style={{ display: 'flex' }}>
        <NavLeft />
        <Container maxWidth="sm">
          <Box
            sx={{
              paddingTop: 5,
              width: 500,
              maxWidth: '100%',
            }}
          >
            <Avatar
              alt=""
              src={image.length > 0 ? image : `/${avatar}`}
              sx={{ width: 70, height: 70 }}
            />
            <br />
            <br />
            <TextField fullWidth label="Username" id="fullWidth" value={username} onChange={(event) => setUsername(event.target.value)} />
            <br />
            <br />
            <TextField fullWidth label="Name" id="fullWidth" value={name} onChange={(event) => setName(event.target.value)} />
            <br />
            <br />
            <TextField fullWidth label="Email" id="fullWidth" value={email} onChange={(event) => setEmail(event.target.value)} />
            <br />
            <br />
            <TextField fullWidth label="Phone number" id="fullWidth" value={phone} onChange={(event) => setPhone(event.target.value)} />
            <br />
            <br />
            <TextField fullWidth type="password" label="Password" id="fullWidth" value={password} onChange={(event) => setPassword(event.target.value)} />
            <br />
            <br />
            <TextField fullWidth label="Address" id="fullWidth" value={address} onChange={(event) => setAddress(event.target.value)} />
            <br />
            <br />
            <Button
              variant="contained"
              component="label"
            >
              Upload avatar
              <input type="file" id="img" name="img" accept="image/*" hidden onChange={selectAvatar} />
            </Button>
          </Box>
          <div style={{ marginTop: 50 }}>
            <Button variant="outlined" onClick={onCancel}>Cancel</Button>
            <Button variant="contained" onClick={onSaveUser}>Save</Button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default observer(CustomerDetail);
