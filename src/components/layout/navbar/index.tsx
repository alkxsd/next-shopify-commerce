import Logo from '@/components/icons/Logo';
import MobileMenu from '@/components/layout/navbar/MobileMenu';
import SearchBar from '@/components/layout/navbar/SearchBar';
import { getMenu } from "@/lib/shopify";
import { Menu } from "@/lib/shopify/types";
import Link from "next/link";


async function Navbar() {
  const menu = await getMenu('next-js-frontend-menu');
  const siteName = process.env.SITE_NAME || 'Shopping';

  return (
    <nav className='flex items-center justify-between p-4 lg:px-6'>
      <div className='block flex-none md:hidden'>
        <MobileMenu menu={menu} />
      </div>
      <div className='flex w-full items-center'>
        <div className='flex w-full md:w-1/3'>
          <Link href={'/'} prefetch={true} className='mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6'>
            <Logo />
            <div className='ml-2 flex-none text-sm font-medium uppercase md:hidden lg'>{siteName}</div>
          </Link>
          {menu.length > 0 ? (
            <ul className='hidden gap-6 text-sm md:flex md:items-center'>
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className='text-gray-700 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300'
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className='hidden justify-center md:flex md:w-1/3'>
          <SearchBar />
        </div>
        <div>
          {/* <CartModal /> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
