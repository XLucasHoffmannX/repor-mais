import * as React from 'react';

import { cn } from '@/shared/lib/utils';

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  // eslint-disable-next-line react/prop-types
  ({ className, type, error, errorMessage, ...props }, ref) => {
    return (
      <>
        <input
          type={type}
          className={cn(
            `flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${
              errorMessage && 'border-red-500 focus-visible:ring-0'
            }  ${error && 'border-red-500 focus-visible:ring-0'}`,
            className
          )}
          ref={ref}
          {...props}
        />
        {errorMessage && (
          <span className='text-red-500 text-sm'>{errorMessage as string}</span>
        )}
      </>
    );
  }
);
Input.displayName = 'Input';

export { Input };
