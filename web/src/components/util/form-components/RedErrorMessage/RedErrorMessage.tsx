import {ErrorMessage, ErrorMessageProps} from 'formik';
import styles from './RedErrorMessage.module.scss';
import React, {CSSProperties} from 'react';

type Props = ErrorMessageProps & {style?: CSSProperties; genericMessage?: string};

export function RedErrorMessage(props: Props) {
  const {style, genericMessage, ...errorMessageProps} = props;
  return (
    <ErrorMessage
      render={msg => <div style={style} className={styles['form-errors']}>{getErrorMessage(msg, genericMessage)}</div>}
      {...errorMessageProps}
    />
  );
}

const getErrorMessage = (msg: any, genericMessage?: string) => {
  if (typeof msg === 'string') {
    return msg;
  }
  if (Array.isArray(msg) && msg.length > 0 && typeof msg[0] === 'string') {
    return msg.join(', ');
  }
  return genericMessage ?? 'There are errors in the form';
};
