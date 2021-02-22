import React, {useState} from 'react';
import {Alert, Modal} from 'react-bootstrap';
import {LoadingButton} from '../widgets/LoadingButton/LoadingButton';
import {handleAxiosError} from '../../../common/util/http';
import {ButtonProps} from 'react-bootstrap/Button';

interface Props {
  open: boolean;
  onAccept: () => Promise<void>;
  onDecline: () => Promise<void>;
  prompt: string;
  positiveVariant?: ButtonProps['variant'];
  negativeVariant?: ButtonProps['variant'];
  positiveText?: string;
  negativeText?: string;
}

export function ConfirmationDialog({onAccept, onDecline, positiveVariant, negativeVariant, open, prompt, positiveText = 'Ok', negativeText = 'Cancel'}: Props) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const confirm = (func: () => Promise<void>) => async () => {
    setLoading(true);
    try {
      await func();
    } catch (e) {
      setErrorMessage(handleAxiosError(e));
    }
    setLoading(false);
  };
  return (
    <Modal
      show={open}
      aria-labelledby='contained-modal-title-vcenter'
      centered={true}
    >
      <Modal.Body>
        <Alert show={!!errorMessage} variant='danger'>{errorMessage}</Alert>
        <p>{prompt}</p>
      </Modal.Body>
      <Modal.Footer>
        <LoadingButton loading={loading} variant={negativeVariant ?? 'info'} onClick={confirm(onDecline)} label={negativeText}/>
        <LoadingButton loading={loading} variant={positiveVariant ?? 'primary'} onClick={confirm(onAccept)} label={positiveText}/>
      </Modal.Footer>
    </Modal>
  );
}
