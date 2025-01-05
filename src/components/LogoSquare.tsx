import clsx from 'clsx';
import LogoIcon from './icons/LogoIcon';

type Props = {
  size?: 'sm' | undefined;
};

function LogoSquare({ size }: Props) {
  return (
    <div
      className={clsx('flex flex-none items-center justify-center border border-neutral-200 bg-white', {
        'h-[40px] w-[40px] rounded-xl': !size,
        'h-[30px] w-[30px] rounded-lg': size === 'sm',
      })}
    >
      <LogoIcon
        className={clsx({
          'h-[16px] w-[16px]': !size,
          'h-[10px] w-[10px]': size === 'sm',
        })}
      />
    </div>
  );
}

export default LogoSquare