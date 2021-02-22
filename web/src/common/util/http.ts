import {Stringify} from '../../util';
import {AxiosError} from 'axios';
import {FormikErrors} from 'formik';

export type SetErrors<T> = (errors: FormikErrors<T>) => void;

export function isBadRequest(e: any) {
  return getErrorStatus(e) === 400;
}

export function isServerError(e: any) {
  return getErrorStatus(e) >= 500 && getErrorStatus(e) < 600;
}

export function isUnknownError(e: any) {
  return getErrorStatus(e) === 0;
}

export function getErrorStatus(e: any): number {
  return e.response ? e.response.status : (e.request ? e.request.status : -1);
}

export type ErrorResponse<T> = {
  message: string;
} & Stringify<T>;

export function getResponseData<T>(e: any): T {
  return e.response ? e.response.data : undefined;
}

export function getErrorResponseMessage(e: any): string {
  return e.response ? e.response.data ? e.response.data.message : '' : '';
}

export interface AxiosErrorMessageParams {
  connectionMsg?: string;
  badRequestMsg?: string;
  four04Msg?: string;
  forbiddenMsg?: string;
  serverError?: string;
}

/**
 * Converts a dictionary of keys with "." notation into an object structure
 *
 * eg.
 *
 * {
 *   "item.revisionTitle": ["Required"],
 *   "items[0].name": ["Required"]
 * }
 *
 * into
 *
 * {
 *   "item": {
 *     "revisionTitle": ["Required"]
 *   },
 *   "items": [
 *     {
 *       "name": ["Required"]
 *     }
 *   ]
 * }
 * @param errorsDictionary
 */
function convertAspNetCoreErrorsToFormikErrors(errorsDictionary: {[key: string]: string[]}): FormikErrors<any> {
  const keys = Object.keys(errorsDictionary);
  const errors: any = {};
  for (const key of keys) {
    const currentError = errorsDictionary[key];
    // matches item(.)property, item[(0)].property, and item[(0)](end of string)
    const keyParts = key.split(new RegExp(/\.|\[(\d)\]\.|\[(\d)\]$/)).filter(k => Boolean(k));
    let currentErrors = errors;
    for (let i = 0; i < keyParts.length; i++) {
      const nextKey = (i + 1) < keyParts.length ? keyParts[i + 1] : undefined;
      const currentKey = keyParts[i];

      if (currentErrors[currentKey] === undefined && nextKey !== undefined) {
       if (!isNaN(parseInt(nextKey, 10))) {
         currentErrors[currentKey] = [];
       } else {
         currentErrors[currentKey] = {};
       }
      }
      // hit tail
      if (nextKey === undefined) {
        currentErrors[currentKey] = currentError;
      } else {
        currentErrors = currentErrors[currentKey];
      }
    }
  }
  return errors;
}

export function handleAxiosError(e: AxiosError, params: AxiosErrorMessageParams = {}, setErrors?: SetErrors<any>) {
  if (e.response) {
    if (e.response.status === 400) {
      const defaultMessage = typeof e.response.data === 'object' && e.response.data.message ? e.response.data.message : 'Bad Request';
      if (e.response.data.errors && setErrors) {
        const errors = e.response.data.errors;
        setErrors(convertAspNetCoreErrorsToFormikErrors(errors));
        if (Array.isArray(errors[''])) {
          return errors[''].join('\n');
        }
        return '';
      }

      return params.badRequestMsg || defaultMessage;
    } else if (e.response.status === 403) {
      return params.forbiddenMsg || 'Forbidden';
    } else if (e.response.status === 404) {
        return params.four04Msg || 'Not Found';
    } else if (e.response.status === 500) {
      // tslint:disable-next-line:no-console
      console.error(e);
      return params.serverError || 'A server error occurred, please try again later.';
    } else {
      // tslint:disable-next-line:no-console
      console.error(e);
      return 'Unknown Error';
    }
  } else if (e.request) {
    if (e.request.status === 0) {
      return params.connectionMsg || 'Could not connect to the server';
    } else {
      // tslint:disable-next-line:no-console
      console.error(e);
      return 'Unknown Error';
    }
  }
  throw e;
}
