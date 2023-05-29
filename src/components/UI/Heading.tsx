import { VariantProps, cva } from 'class-variance-authority';
import React, { FC, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const headingVariants = cva(
  `text-4xl font-extrabold  leading-none tracking-wide`,
  {
    variants: {
      variant: {
        default: 'dark:text-gray-100 text-gray-700 leading-2',
        red: 'text-red-700',
        blue: 'text-blue-700',
        indigo: 'text-indigo-600',
        yellow: 'text-yellow-700',
        pink: ' text-transparent  bg-clip-text bg-gradient-to-r from-pink-400 to-pink-500',
      },
      size: {
        default: 'text-lg',
        xs: 'text-md',
        sm: 'text-xl',
        md: 'text-2xl',
        lg: 'text-3xl ',
        xl: 'text-5xl',
      },
      align: {
        default: 'text-left',
        center: 'text-center',
        left: 'text-left',
        right: 'text-right',
      },
      weight: {
        default: 'font-normal',
        bold: 'font-bold',
        extra: 'font-extrabold',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      weight: 'default',
      align: 'default',
    },
  }
);

export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Heading: FC<HeadingProps> = ({
  className,
  children,
  variant,
  size,
  weight,
  heading,
  ...props
}) => {
  const HeadingElement = heading;

  return (
    <HeadingElement
      className={cn(headingVariants({ variant, size, weight, className }))}
      {...props}
    >
      {children}
    </HeadingElement>
  );
};

export default Heading;
