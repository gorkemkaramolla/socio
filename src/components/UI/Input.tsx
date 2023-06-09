import { VariantProps, cva } from 'class-variance-authority';
import React, { FC, HTMLAttributes, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  `className='

   `,
  {
    variants: {
      variant: {
        default: `
          block
        ring-1
        outline-none 
        focus:outline-none
        focus:ring-2
        ring-teal
      dark:bg-black
       
        px-2 py-1
        w-[100%]
        rounded-md 
        transition-all
        `,

        xxx: `
        block
        border-[1.5px]
        border-pink-400 
        focus:ring
        outline-none 
        focus:outline-none
        ring-pink-400
       
        px-3 py-2
        w-[100%]
        rounded-lg 
        transition-all
        dark:bg-black`,

        formInput: `
        block
        px-3 
        w-full 
        rounded-full 
        outline-none 
        focus:outline-none
        py-2
        transition-all
        bg-white
        dark:bg-black`,
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
    ComponentProps {}

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
