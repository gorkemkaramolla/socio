import { VariantProps, cva } from 'class-variance-authority';
import React, { FC, LabelHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  `className='border-[0.1px]
   border-indigo-600 
   outline-none
   focus:outline-none
   focus:ring-[1px] focus:ring-indigo-600 
   rounded-lg 
   text-pink-400
   z-20
   pl-4
   absolute
   
   
   font-extrabold
   tracking-widest
   transition-all  
   dark:bg-transparent' `,
  {
    variants: {
      variant: {
        default: 'leading-9',
      },
      inputSize: {
        // Rename size to inputSize
        default: 'py-3',
        primary: 'w-full ',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'default', // Rename size to inputSize
    },
  }
);

export interface InputProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof inputVariants> {
  isFocus: React.SetStateAction<boolean>;
}

const Label: FC<InputProps> = ({
  isFocus,
  className,
  variant,
  children,
  ...props
}) => {
  return (
    <label
      className={cn(
        inputVariants({ variant, className }),
        !isFocus
          ? ` 
      transition-all 
      duration-300 
      ease-in-out 
      group-focus-within:-translate-y-10 
      group-focus-within:-translate-x-4 
      group-focus-within:text-sm`
          : '-translate-y-12 -translate-x-4 '
      )} // Use inputSize instead of size
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
