import newRequest from '@/helpers/newRequest';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function useLogin() {
  const [error, setError] = useState(null);
  const router = useRouter();

  const login = async (email, password) => {
    try {
      await newRequest.post('/auth/login', { email, password });
      router.push('/dashboard/orders');
    } catch (err) {
      setError(err.response.data);
    }
  };

  const signUp = async (name, email, password) => {
    try {
      await newRequest.post('/auth/signup', {
        name,
        email,
        password,
      });
    } catch (err) {
      setError(err.response.data);
    }
  };

  const logout = async () => {
    try {
      await newRequest.post('/auth/logout');
      router.push('/');
    } catch (err) {
      setError(err.response.data);
    }
  };

  return { login, signUp, logout, error };
}
