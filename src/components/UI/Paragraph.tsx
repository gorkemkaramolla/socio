import { VariantProps, cva } from 'class-variance-authority';
import React, { FC, HTMLProps, LabelHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  `className='border-[0.1px]
   transition-all
   text-md
   dark:text-white
   text-black
   
   dark:bg-transparent'`,
  {
    variants: {
      variant: {
        default: 'text-gray-700 leading-2',
      },
      align: {
        center: 'text-center',
        left: 'text-left',
        right: 'text-right',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ParagraphProps
  extends HTMLProps<HTMLParagraphElement>,
    VariantProps<typeof inputVariants> {}

const Paragraph: FC<ParagraphProps> = ({
  className,
  variant,
  children,
  ...props
}) => {
  return (
    <p className={cn(inputVariants({ variant, className }))} {...props}>
      {children}
    </p>
  );
};

export default Paragraph;
