import {
  Avatar, Box, Button, Container, ImageList, ImageListItem, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField,
} from '@mui/material';
import axios from 'axios';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import NavTab from 'src/components/Nav';
import NavLeft from 'src/components/NavLeft';
import { StoreContext } from 'stores';
import CancelIcon from '@mui/icons-material/Cancel';
import { num2Str, str2Num } from 'stores/helper/ultil';

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [image, setImage] = React.useState('');
  const [fileArray, setFileArray] = React.useState([]);
  const store = useContext(StoreContext);
  const [age, setAge] = React.useState<string | number>('');

  React.useEffect(() => {
    async function fetchMyAPI() {
      const { getProductsByID, getCategory } = store;
      await getCategory();
      if (id !== 'new') {
        await getProductsByID(id);
      }
    }
    fetchMyAPI();
  }, []);

  const { categories } = store;

  const {
    title, setTitle,
    content, setContent,
    price, setPrice,
    amount, setAmount,
    avatar, setAvatar,
    sumary, setSumary,
    images, addImage,
    category, setCategory,
    removeImage,
  } = store.product;

  const handleChange = (event: SelectChangeEvent<typeof age>) => {
    setCategory(event.target.value);
    setAge(event.target.value);
  };

  const selectAvatar = async (event) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);
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

  const selectImages = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const { files } = event.target;
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        fileArray.push(URL.createObjectURL(files[i]));
        formData.append(files[i].name, files[i]);
      }
      try {
        const res = await axios.post(
          '/api/upload-images',
          formData,
        );
        res.data.forEach((item) => {
          addImage(item);
        });
        console.log(res.data);
      } catch (ex) {
        console.log(ex);
      }
    }
  };

  const onSaveProduct = async () => {
    const { saveProduct, setProductDefault } = store;
    await saveProduct();
    setProductDefault();
    router.push('/Products');
  };

  const onCancel = () => {
    const { setUserDefault } = store;
    router.push('/Products');
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
            <TextField fullWidth label="Title" id="fullWidth" value={title} onChange={(event) => setTitle(event.target.value)} />
            <br />
            <br />
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId=""
              id=""
              value={age}
              label="Category"
              onChange={handleChange}
            >
              {categories.map((categoryItem) => (
                <MenuItem value={categoryItem.id}>{categoryItem.name}</MenuItem>
              ))}
            </Select>
            <br />
            <br />
            <TextField fullWidth multiline maxRows={4} label="Content" id="fullWidth" value={content} onChange={(event) => setContent(event.target.value)} />
            <br />
            <br />
            <TextField fullWidth label="Sumary" id="fullWidth" value={sumary} onChange={(event) => setSumary(event.target.value)} />
            <br />
            <br />
            <TextField
              label="Price"
              id="price"
              sx={{ marginRight: 8, width: '25ch' }}
              value={num2Str(price)}
              onChange={(event) => setPrice(event.target.value)}
              InputProps={{ endAdornment: <InputAdornment position="end">VND</InputAdornment> }}
            />
            <TextField
              label="Amount"
              id="amount"
              value={num2Str(amount)}
              onChange={(event) => setAmount(event.target.value)}
              sx={{ width: '25ch' }}
            />
            <br />
            <br />
            {avatar
              ? (
                <div>
                  <ImageListItem>
                    <img
                      src={`/${avatar}`}
                      alt=""
                      loading="lazy"
                    />
                  </ImageListItem>

                </div>
              )
              : null}
            <Button
              variant="contained"
              component="label"
            >
              Upload avatar
              <input type="file" id="img" name="img" accept="image/*" hidden onChange={selectAvatar} />
            </Button>
            {avatar ? <Button variant="outlined" onClick={() => setAvatar('')}>Remove avatar</Button> : null}
            <br />
            <br />
            {/* <TextField fullWidth label="Address" id="fullWidth" value={address} onChange={(event) => setAddress(event.target.value)} /> */}
            { images.length > 0
              ? (
                <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                  {images.map((item, index) => (
                    <ImageListItem>
                      <CancelIcon onClick={() => removeImage(index)} />
                      <img
                        src={`/${item}`}
                        alt=""
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              )
              : null}
            <Button
              variant="contained"
              component="label"
            >
              Upload image
              <input type="file" id="images" name="images" accept="image/*" multiple hidden onChange={selectImages} />
            </Button>
            <br />
            <br />
          </Box>
          <div style={{ marginTop: 50 }}>
            <Button variant="outlined" onClick={onCancel}>Cancel</Button>
            <Button variant="contained" onClick={onSaveProduct}>Save</Button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default observer(ProductDetail);
