'use client';
import useLogin from '@/hooks/useLogin';
import { Button, Card, CardBody, Input, Link, Tab, Tabs } from '@nextui-org/react';
import React, { useEffect } from 'react';

export default function LoginPage() {
  const [selected, setSelected]: any = React.useState('login');
  const [formData, setFormData]: any = React.useState({
    name: '',
    email: '',
    password: '',
  });
  const { login, signUp, error }: any = useLogin();
  const [errors, setErrors]: any = React.useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    setFormData({
      email: localStorage.getItem('previousEmail'),
      password: localStorage.getItem('previousPassword'),
    });
  }, []);

  const handleSubmit = (type) => {
    if (formData.email === '') {
      setErrors({ ...errors, email: 'Email is required' });
      return;
    }

    if (formData.password === '') {
      setErrors({ ...errors, password: 'Password is required' });
      return;
    }

    if (formData.password.length < 6) {
      setErrors({ ...errors, password: 'Password must be at least 6 characters' });
      return;
    }

    if (formData.name === '' && type === 'signup') {
      setErrors({ ...errors, name: 'Name is required' });
      return;
    }

    if (type === 'login') {
      login(formData.email, formData.password);
    } else {
      signUp(formData.name, formData.email, formData.password);
    }

    localStorage.setItem('previousEmail', formData.email);
    localStorage.setItem('previousPassword', formData.password);
  };

  const renderError = (key) => {
    return (
      <p className='text-xs -mt-2 text-[#ff2424]'>
        <span className='text-error'>{errors[key]}</span>
      </p>
    );
  };

  const handleInputChange = (e) => {
    setErrors({ ...errors, [e.target.name]: '' });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='flex items-center justify-center'>
      <Card className='w-full max-w-[700px]'>
        <CardBody className='overflow-hidden'>
          <Tabs
            fullWidth
            size='md'
            aria-label='Tabs form'
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key='login' title='Login'>
              <form className='flex flex-col gap-4'>
                <Input
                  isRequired
                  name='email'
                  label='Email'
                  placeholder='Enter your email'
                  type='email'
                  value={formData.email}
                  onChange={(e) => handleInputChange(e)}
                />
                {renderError('email')}
                <Input
                  isRequired
                  name='password'
                  label='Password'
                  placeholder='Enter your password'
                  type='password'
                  value={formData.password}
                  onChange={(e) => handleInputChange(e)}
                />
                {renderError('password')}
                {error && (
                  <p className='text-xs -mt-2 text-[#ff2424]'>
                    <span className='text-error'>{error}</span>
                  </p>
                )}
                <p className='text-center text-small'>
                  Need to create an account?{' '}
                  <Link size='sm' onPress={() => setSelected('sign-up')}>
                    Sign up
                  </Link>
                </p>
                <div className='flex gap-2 justify-end'>
                  <Button fullWidth color='primary' onClick={() => handleSubmit('login')}>
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key='sign-up' title='Sign up'>
              <form className='flex flex-col gap-4 h-[350px]'>
                <Input
                  isRequired
                  label='Name'
                  name='name'
                  placeholder='Enter your name'
                  value={formData.name}
                  onChange={(e) => handleInputChange(e)}
                />
                {renderError('name')}
                <Input
                  isRequired
                  label='Email'
                  name='email'
                  placeholder='Enter your email'
                  type='email'
                  value={formData.email}
                  onChange={(e) => handleInputChange(e)}
                />
                {renderError('email')}
                <Input
                  isRequired
                  label='Password'
                  name='password'
                  placeholder='Enter your password'
                  type='password'
                  value={formData.password}
                  onChange={(e) => handleInputChange(e)}
                />
                {renderError('password')}
                {error && (
                  <p className='text-xs -mt-2 text-[#ff2424]'>
                    <span className='text-error'>{error}</span>
                  </p>
                )}
                <p className='text-center text-small'>
                  Already have an account?{' '}
                  <Link size='sm' onPress={() => setSelected('login')}>
                    Login
                  </Link>
                </p>
                <div className='flex gap-2 justify-end'>
                  <Button fullWidth color='primary' onClick={() => handleSubmit('signup')}>
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
