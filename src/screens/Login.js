import React, { useState } from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Grid,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const Login = ({ store }) => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClick = () => {setShow(!show)}
  const [user, setUser] = useState({
    name: '',
    pass: '',
  });
  const [showError, setShowError] = useState(false);

  const onChange = (e) => {
    setUser({...user, [e.target.name] : e.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (user.name !== 'usuario123' && user.pass !== 'pass123') {
      setShowError(true);
    } else {
      setShowError(false);
      store.dispatch({
        type: 'ADD_USER',
        text: user.name
      })
      navigate('/home');
    }
  }

  return (
    <Grid padding={20} backgroundColor={'#008DA0'}>
      <form onSubmit={onSubmit}>
        <Box marginBottom={10}>
          <Input
            placeholder='Usuario'
            _placeholder={{opacity: 0.5, color: '#ffffff'}}
            name='name'
            value={user.name}
            onChange={onChange}
          />
        </Box>
        <Box marginBottom={10}>
          <InputGroup>
            <Input
              type={show ? 'text' : 'password'}
              placeholder='Contraseńa'
              _placeholder={{opacity: 0.5, color: '#ffffff'}}
              name='pass'
              value={user.pass}
              onChange={onChange}
            />
            <InputRightElement>
              <Button onClick={handleClick}>
                {show ? (
                  <ViewOffIcon />
                ) : (
                  <ViewIcon />
                )}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box width={'100%'} textAlign={'center'}>
          <Button type='submit'>Login</Button>
        </Box>
        <Box padding={5}>
          {showError && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>El usuario y/o la contraseña no son correctos</AlertTitle>
            </Alert>
          )}
        </Box>
      </form>
    </Grid>
  )
}

export default Login;