import { Menu } from "@/lib/shopify/types";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ExpandableMenuItemProps {
  item: Menu;
  onClose?: () => void;
}

const ExpandableMenuItem = ({ item, onClose }: ExpandableMenuItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubItems = item.items && item.items.length > 0;

  const handleClick = () => {
    if (hasSubItems) {
      setIsExpanded(!isExpanded);
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <li className='border-b border-neutral-100 dark:border-neutral-800 last:border-none'>
      <div className='flex items-center justify-between py-3'>
        {hasSubItems ? (
          <button
            className='flex w-full items-center justify-between text-xl text-black dark:text-white'
            onClick={handleClick}
          >
            <span>{item.title}</span>
            <ChevronDown className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        ) : (
          <Link
            href={item.path}
            className='w-full text-xl text-black dark:text-white'
            onClick={onClose}
            prefetch={true}
          >
            {item.title}
          </Link>
        )}
      </div>
      {hasSubItems && isExpanded && (
        <ul className='ml-4 pb-3'>
          {item?.items?.map((subItem) => (
            <li key={subItem.title} className='py-2'>
              <Link
                href={subItem.path}
                className='text-lg text-neutral-600 dark:text-neutral-400'
                onClick={onClose}
                prefetch={true}
              >
                {subItem.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export  default ExpandableMenuItem;