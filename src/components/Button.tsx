import { VariantProps, cva } from 'class-variance-authority';
import { title } from 'process';
import React, { ButtonHTMLAttributes, FC } from 'react';

const buttonVariance = cva(
  `px-3 py-2 focus:ring-offset-2 disabled:opacity-50
   disabled:pointer-events-none  rounded-sm text-sm font-medium 
   active:scale-95`,
  {
    variants: {
      variant: {
        default: 'bg-slate-900 text-white hover:bg-slate-800',
        ghost: 'bg-transparent hover:text-slate-900 hover:bg-slate-200',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-2',
        lg: 'h-11 px-8',
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
    VariantProps<typeof buttonVariance> {
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
    <button className='' disabled={isLoading} {...props}>
      {isLoading ? <div>Loading...</div> : null}
      {children}
    </button>
  );
};

export default Button;
