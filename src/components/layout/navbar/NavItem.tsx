"use client";

import { Menu } from '@/lib/shopify/types';
import { Transition } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const NavItem = ({ item }: { item: Menu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!item.items?.length) {
    return (
      <div>
        <Link href={item.path} prefetch={true} className='text-lg font-bold'>
          {item.title}
        </Link>
      </div>
    );
  }

  return (
    <div ref={menuRef} className='relative min-w-0'>
      <div role='button' tabIndex={0} className='block' onClick={() => setIsOpen(!isOpen)}>
        <div className='flex gap-2 items-center cursor-pointer'>
          <span className='text-lg font-bold leading-none'>{item.title}</span>
          <ChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} size={20} />
        </div>
      </div>

      <Transition
        show={isOpen}
        enter='transition ease-out duration-200'
        enterFrom='transform opacity-0 translate-y-6'
        enterTo='transform opacity-100 translate-y-6'
        leave='transition ease-in duration-150'
        leaveFrom='transform opacity-100 translate-y-6'
        leaveTo='transform opacity-0 translate-y-6'
      >
        <div className='absolute top-full z-50 min-w-full md:min-w-[10rem] left-1/2 -translate-x-1/2 translate-y-6 overflow-hidden'>
          <div className='flex gap-12 items-start justify-center bg-white dark:bg-gray-900 w-[200vw] pb-4 border-b dark:border-gray-400'>
            <div className='flex gap-4 items-center flex-col mt-2'>
              {item.items.map((subItem) => (
                <Link
                  key={subItem.title}
                  href={subItem.path}
                  prefetch={true}
                  className='transition-all inline-block'
                  onClick={() => setIsOpen(false)}
                >
                  <span className='text-base text-center whitespace-nowrap'>{subItem.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default NavItem;