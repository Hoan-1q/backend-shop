import {
  CardContent, Card, Box, TextField, Button, Container,
} from '@mui/material';
import axios from 'axios';
import router from 'next/router';
import React from 'react';

const Login: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const onLogin = async () => {
    const res = await axios.post('/api/login-admin', { data: { username, password } });
    if (res.status === 200) {
      router.push('/home');
    }
  };
  return (
    <Container maxWidth="sm">
      <Box sx={{ minWidth: 275 }} style={{ paddingTop: 300 }}>
        <Card variant="outlined">
          <CardContent style={{ margin: 50 }}>
            <TextField id="standard-basic" fullWidth label="Username" value={username} onChange={(event) => setUsername(event.target.value)} variant="standard" />
            <br />
            <br />
            <TextField id="standard-basic" fullWidth label="Password" value={password} type="password" onChange={(event) => setPassword(event.target.value)} variant="standard" />
            <br />
            <br />
            <Button variant="contained" disableElevation onClick={onLogin}>
              Loggin
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
