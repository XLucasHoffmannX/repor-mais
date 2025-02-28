/* eslint-disable react/prop-types */
import { forwardRef, useState } from 'react';

import { LucideEye, LucideEyeOff } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

import { Button } from './button';
import { IInputProps, Input } from './input';

interface IPasswordInputProps extends IInputProps {
  iconOn?: string;
  iconOff?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, IPasswordInputProps>(
  ({ className, errorMessage, iconOn, iconOff, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const disabled =
      props.value === '' || props.value === undefined || props.disabled;

    return (
      <div className='relative'>
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn('hide-password-toggle pr-10', className)}
          ref={ref}
          {...props}
          errorMessage={errorMessage}
        />

        <Button
          type='button'
          variant='ghost'
          size='sm'
          className='absolute right-0 top-0 h-full max-h-[50px] px-3 py-2 hover:bg-transparent cursor-pointer'
          onClick={() =>
            setShowPassword((prev: boolean) => {
              return !prev;
            })
          }
          disabled={disabled}
        >
          {showPassword && !disabled ? (
            <LucideEye
              className={cn('h-4 w-4', iconOn)}
              aria-hidden='true'
            />
          ) : (
            <LucideEyeOff
              className={cn('h-4 w-4', iconOff)}
              aria-hidden='true'
            />
          )}

          <span className='sr-only'>
            {showPassword ? 'Hide password' : 'Show password'}
          </span>
        </Button>

        {/* hides browsers password toggles */}
        <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
