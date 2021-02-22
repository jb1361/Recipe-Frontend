import * as React from 'react';
import {Button, Spinner} from 'react-bootstrap';
// tslint:disable-next-line:no-submodule-imports
import {ButtonProps} from 'react-bootstrap/Button';
import {SyntheticEvent} from 'react';

interface LoadingButtonProps {
  loading: boolean;
  label: string;
  className?: string;
  type?: ButtonProps['type'];
  variant?: ButtonProps['variant'];
  disabled?: boolean;
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void;
}

export const LoadingButton = ({variant, onClick, className, disabled, label, loading, type}: LoadingButtonProps) => (
  <Button disabled={loading || disabled} variant={variant ?? 'primary'} type={type || 'button'} className={className} onClick={onClick}>
    { loading ?
      <Spinner
        as='span'
        animation='border'
        size='sm'
        role='status'
        aria-hidden='true'
      /> : label}
  </Button>
);
