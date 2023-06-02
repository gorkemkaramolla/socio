import { VariantProps, cva } from 'class-variance-authority';
import React, { FC, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const textAreaVariants = cva(
  `className='
   block
        px-3 
        w-full 
        rounded-2xl 
      
        outline-none 
        focus:outline-none
        
        py-2
        transition-all
        bg-white/80
        dark:bg-black/80
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
