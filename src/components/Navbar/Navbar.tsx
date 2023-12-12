import { AcmeLogo } from '@/assets/AcmeLogo';
import useLogin from '@/hooks/useLogin';
import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import { usePathname } from 'next/navigation';

export default function GlobalNavbar() {
  const { user, logout } = useLogin();
  const pathName = usePathname();

  const isActive = (path: string) => pathName === path;

  return (
    <Navbar
      classNames={{
        item: [
          'flex',
          'relative',
          'h-full',
          'items-center',
          "data-[active=true]:after:content-['']",
          'data-[active=true]:after:absolute',
          'data-[active=true]:after:bottom-0',
          'data-[active=true]:after:left-0',
          'data-[active=true]:after:right-0',
          'data-[active=true]:after:h-[2px]',
          'data-[active=true]:after:rounded-[2px]',
          'data-[active=true]:after:bg-primary',
        ],
      }}
    >
      <NavbarBrand>
        <AcmeLogo />
        <p className='font-bold text-inherit'>Titan</p>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem isActive={isActive('/')}>
          <Link color='foreground' href='/'>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isActive('/dashboard/orders')}>
          <Link color='foreground' href='/dashboard/orders' aria-current='page'>
            Orders
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isActive('/dashboard/shipping')}>
          <Link color='foreground' href='/dashboard/shipping'>
            Shipping
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        {!user ? (
          <NavbarItem isActive={isActive('/login')}>
            <Button as={Link} color='primary' href='/login' variant='flat'>
              Login
            </Button>
          </NavbarItem>
        ) : (
          <NavbarItem isActive={isActive('/login')}>
            <Button as={Link} color='primary' href='/login' variant='flat'>
              Logout
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
