import { VariantProps, cva } from 'class-variance-authority';
import React, { FC, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const textAreaVariants = cva(
  `className='

   block
   ring-1
   outline-none 
   focus:outline-none
   focus:ring-2
   ring-teal
   dark:bg-black
   px-2 py-2
   w-[100%]
   rounded-md 
   transition-all

   `,
  {
    variants: {
      variant: {
        default: '',
      },
      inputSize: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'default',
    },
  }
);
interface ComponentProps {
  ring?: boolean;
}
export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textAreaVariants>,
    ComponentProps {}

const Textarea: FC<TextAreaProps> = ({
  name,
  rows,
  className,
  variant,
  inputSize,
  ring = false,
  ...props
}) => {
  return (
    <textarea
      rows={rows}
      className={cn(textAreaVariants({ variant, inputSize, className }))} // Use inputSize instead of size
      {...props}
    />
  );
};

export default Textarea;
