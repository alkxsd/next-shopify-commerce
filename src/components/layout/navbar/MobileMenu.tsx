'use client';

import ExpandableMenuItem from '@/components/layout/navbar/ExpandabeMenuItem';
import SearchBar from '@/components/layout/navbar/SearchBar';
import { Menu } from '@/lib/shopify/types';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Menu as MenuIcon, X } from 'lucide-react';
import { Fragment, useState } from 'react';

const MobileMenu = ({ menu }: { menu: Menu[] }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleOpen}
        aria-label='Open mobile menu'
        className='flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors lg:hidden dark:border-neutral-700 dark:text-white'
      >
        <MenuIcon className='h-8 w-8' />
      </button>

      <Transition show={isOpen}>
        <Dialog onClose={toggleOpen} className='relative z-50 lg:hidden'>
          <TransitionChild
            as={Fragment}
            enter='transition-all ease-in-out duration-300'
            enterFrom='opacity-0 backdrop-blur-none'
            enterTo='opacity-100 backdrop-blur-[.5px]'
            leave='transition-all ease-in-out duration-200'
            leaveFrom='opacity-100 backdrop-blur-[.5px]'
            leaveTo='opacity-0 backdrop-blur-none'
          >
            <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
          </TransitionChild>
          <TransitionChild
            as={Fragment}
            enter='transition-all ease-in-out duration-300'
            enterFrom='translate-x-[100%]'
            enterTo='translate-x-0'
            leave='transition-all ease-in-out duration-200'
            leaveFrom='translate-x-0'
            leaveTo='translate-x-[100%]'
          >
            <DialogPanel className='fixed bottom-0 right-0 top-0 flex h-full w-full sm:w-[40%] md:w-1/3 flex-col bg-white pb-6 dark:bg-black'>
              <div className='p-4 flex flex-col'>
                <div className='flex justify-end mb-4'>
                  <button
                    className='flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white'
                    onClick={toggleOpen}
                    aria-label='Close mobile menu'
                  >
                    <X className='h-8 w-8' />
                  </button>
                </div>
                <div className='mb-4 w-full'>
                  <SearchBar />
                </div>
                {menu.length > 0 && (
                  <ul className='flex w-full flex-col'>
                    {menu.map((item) => (
                      <ExpandableMenuItem key={item.title} item={item} onClose={toggleOpen} />
                    ))}
                  </ul>
                )}
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
};

export default MobileMenu;
