import { VariantProps, cva } from 'class-variance-authority';
import React, { FC, HTMLAttributes, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  `className='
   block
   border-[1.5px]
   border-pink-400 
   outline-none 
  
   px-3 py-2
   w-[100%]
   rounded-lg 
   transition-all
   dark:bg-black
   focus:animate-pulse
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
export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants>,
    ComponentProps {
}

const FormInput: FC<InputProps> = ({
  name,
  className,
  variant,
  inputSize,
  ring = false,
  ...props
}) => {
  return (
    <input
      className={cn(inputVariants({ variant, inputSize, className }))} // Use inputSize instead of size
      {...props}
    />
  );
};

export default FormInput;
