import {useState} from 'react';
import {handleAxiosError} from '../common/util/http';
import {SetStateFunctional} from '../util';

export type LoadableResourceState<T> = {
  loading: boolean; setLoading: SetStateFunctional<boolean>;
  errorMessage: string | undefined; setErrorMessage: SetStateFunctional<string | undefined>;
  alert: string | undefined; setAlert: SetStateFunctional<string | undefined>;
  resource: T; setResource: SetStateFunctional<T>;
};

export function useLoadableResource<T>() {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [resource, setResource] = useState<T | undefined>();
  const [alert, setAlert] = useState<string | undefined>();
  return {
    loading, setLoading,
    errorMessage, setErrorMessage,
    resource, setResource,
    alert, setAlert
  };
}

export function makeLoadResource<T>(state: LoadableResourceState<T>, getter: () => Promise<T>, error: boolean = true, resetErrorsBefore: boolean = true) {
  const {setErrorMessage, setLoading, setResource, setAlert} = state;
  return async () => {
    if (resetErrorsBefore) {
      resetErrors(state);
    }
    try {
      setResource(await getter());
      if (!resetErrorsBefore) {
        resetErrors(state);
      }
    } catch (e) {
      const setError = error ? setErrorMessage : setAlert;
      setError(handleAxiosError(e));
    }
    setLoading(false);
  };
}

function resetErrors(state: LoadableResourceState<any>) {
  const {errorMessage, setErrorMessage, setAlert, alert} = state;
  if (errorMessage) {
    setErrorMessage(undefined);
  }
  if (alert) {
    setAlert(undefined);
  }
}
