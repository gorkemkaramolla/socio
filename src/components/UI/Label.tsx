import { VariantProps, cva } from 'class-variance-authority';
import React, { FC, LabelHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  `className='border-[0.1px]
   border-indigo-600 
   outline-none 
   focus:outline-none
   focus:ring-2 focus:ring-indigo-600 
   rounded-lg 
   transition-all  
   dark:bg-transparent' `,
  {
    variants: {
      variant: {
        default: 'text-gray-700 leading-2',
      },
      inputSize: {
        // Rename size to inputSize
        default: 'p-3',
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
    VariantProps<typeof inputVariants> {}

const Label: FC<InputProps> = ({ className, variant, children, ...props }) => {
  return (
    <label
      className={cn(inputVariants({ variant, className }))} // Use inputSize instead of size
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
