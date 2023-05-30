import { VariantProps, cva } from 'class-variance-authority';
import React, { FC, HTMLAttributes, LabelHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const errorVariants = cva(
  `className='border-[0.1px]
    text-red-500
    transition-all
  ' `,
  {
    variants: {
      variant: {
        default: ' text-red-500',
        error:
          'my-4 p-2 text-center drop-shadow-2xl text-red-500 dark:bg-black border-2 border-red-500 rounded-md leading-6',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface InputProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof errorVariants> {}

const Error: FC<InputProps> = ({ className, variant, children, ...props }) => {
  return (
    <div className={cn(errorVariants({ variant, className }))} {...props}>
      {children}
    </div>
  );
};

export default Error;
