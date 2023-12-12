import newRequest from '@/helpers/newRequest';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function useLogin() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    } else {
      setUser(null);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await newRequest.post('/auth/login', { email, password });
      router.push('/dashboard/orders');
      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
    } catch (err) {
      setError(err.response.data);
    }
  };

  const signUp = async (name, email, password) => {
    try {
      const res = await newRequest.post('/auth/signup', {
        name,
        email,
        password,
      });

      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
    } catch (err) {
      setError(err.response.data);
    }
  };

  const logout = async () => {
    try {
      await newRequest.post('/auth/logout');
      router.push('/');
      setUser(null);
      localStorage.removeItem('user');
    } catch (err) {
      setError(err.response.data);
    }
  };

  return { login, signUp, logout, error, user };
}
