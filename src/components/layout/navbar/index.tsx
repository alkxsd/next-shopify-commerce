import MobileMenu from '@/components/layout/navbar/MobileMenu';
import SearchBar from '@/components/layout/navbar/SearchBar';
import LogoSquare from '@/components/LogoSquare';
import ThemeSwitch from '@/components/ThemeSwitch';
import { getMenu } from "@/lib/shopify";
import { Menu } from "@/lib/shopify/types";
import Link from "next/link";
import NavItem from './NavItem';

const Navbar = async () => {
  const menu = await getMenu('next-js-frontend-menu');
  const siteName = process.env.SITE_NAME || 'Shopping';

  return (
    <nav className='relative flex items-center justify-between p-4 lg:px-6 bg-white dark:bg-gray-900'>
      <div className='flex w-full items-center justify-between'>
        <div className='flex items-center'>
          <Link href={'/'} prefetch={true} className='mr-6 flex items-center'>
            <LogoSquare />
            <div className='ml-2 text-sm font-medium uppercase lg:hidden'>{siteName}</div>
          </Link>
          {menu.length > 0 ? (
            <div className='hidden lg:block flex-1 z-50'>
              <div className='flex gap-10 items-center'>
                {menu.map((item: Menu) => (
                  <NavItem key={item.title} item={item} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className='flex items-center gap-4'>
          <div className='hidden lg:block'>
            <SearchBar />
          </div>
          <div>{/* <CartModal /> */}</div>
          <ThemeSwitch />
        </div>
      </div>
      <div className='block flex-none xl:hidden'>
        <MobileMenu menu={menu} />
      </div>
    </nav>
  );
};

export default Navbar;
