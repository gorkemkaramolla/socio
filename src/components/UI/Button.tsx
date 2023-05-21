import { VariantProps, cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { Loader } from 'lucide-react';
import React, { ButtonHTMLAttributes, FC } from 'react';
import { cn } from '@/lib/utils';

//BUTTON VARIANTS STYLE
const buttonVariants = cva(
  `px-3 py-2 focus:ring-offset-2 disabled:opacity-50
   disabled:pointer-events-none  rounded-sm text-sm font-medium 
   active:scale-95`,
  {
    variants: {
      variant: {
        default: 'w-fit flex items-center rounded bg-slate-900 text-white hover:bg-slate-800',
        ghost: 'w-fit flex items-center bg-transparent ',
        white: 'w-fit flex items-center rounded bg-slate-50 text-slate-900 hover:bg-slate-200',
        rose: 'w-fit flex items-center rounded bg-rose-500 text-violet-50',
        nav: 'flex items-center justify-center rounded'
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-6 p-auto',
        lg: 'h-11 px-8',
        nav: 'w-8 h-8',
        smSquare: 'w-6 h-6'
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}
const Button: FC<ButtonProps> = ({
  className,
  children,
  variant,
  isLoading,
  size,
  ...props
}) => {
  return (
      <button
          className={cn(buttonVariants({variant, size, className}))} // buttonVariants kullan
          disabled={isLoading}
          {...props}
      >
        {isLoading ? <Loader className='h-4 w-4 animate-spin'/> : null}
        {children}
      </button>
  );
};

export default Button;
