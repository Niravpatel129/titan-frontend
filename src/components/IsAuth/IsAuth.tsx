'use client';
import useLogin from '@/hooks/useLogin';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { user } = useLogin();
    const [auth, setAuth] = useState(false);

    useEffect(() => {
      if (user) {
        setAuth(true);
      }
    }, [user]);

    useEffect(() => {
      if (user === undefined) return;

      if (user === null && !auth) {
        return redirect('/');
      }
    }, [auth, user]);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
