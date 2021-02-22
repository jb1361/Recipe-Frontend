import axios, {CancelTokenSource} from 'axios';
import {nullable} from '../common/util';

export function makeAxios(token?: string) {
  token = token ? token : nullable(localStorage.getItem('token'));
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    ...(token ? {
      headers: {Authorization: `Bearer ${token}`}
    } : {}),
    validateStatus: (status: number) => status < 400 || status === 0
  });
}

export function setToken(token?: string) {
  if (token) {
    localStorage.setItem('token', token);
  }
  api = makeAxios(token);
}

export let api = makeAxios();

export interface TemplateSaveResponse<T, R> {
  template: T;
  revision: R;
}

export function getCancelTokenSource(): CancelTokenSource {
  return axios.CancelToken.source();
}
