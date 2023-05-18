import { VariantProps, cva } from 'class-variance-authority';
import React, { FC, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const headingVariants = cva(
  `mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900   `,
  {
    variants: {
      variant: {
        default: 'text-gray-700 leading-2',
        red: 'text-red-700',
        blue: 'text-blue-700',
        indigo: 'text-indigo-700',
        yellow: 'text-yellow-700',
      },
      size: {
        default: 'text-xl',
        md: 'text-2xl',
        lg: 'text-4xl',
        xl: 'text-6xl',
        xxl: 'text-8xl',
        biggest: 'text-9xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
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
  heading,
  ...props
}) => {
  const HeadingElement = heading;

  return (
    <HeadingElement
      className={cn(headingVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </HeadingElement>
  );
};

export default Heading;
