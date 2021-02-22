import {makeLogger} from '../../util/logger';

const logger = makeLogger();

export function log(message: any, ...optionalParams: any[]) {
  logMessage('info', message, optionalParams);
}

export function info(message: any, ...optionalParams: any[]) {
  logMessage('info', message, optionalParams);
}

export function logError(message?: any, ...optionalParams: any[]) {
  logMessage('error', message, optionalParams);
}

export function warn(message?: any, ...optionalParams: any[]) {
  logMessage('warn', message, ...optionalParams);
}

export function verbose(message?: any, ...optionalParams: any[]) {
  logMessage('verbose', message, ...optionalParams);
}

function logMessage(level: string, message: any, ...optionalParams: any[]) {
  if (typeof message === 'object') {
    logger_log(level, '', ...[message, ...optionalParams]);
  }
  logger_log(level, message, optionalParams);
}

function logger_log(level: string, message: string, ...meta: any[]) {
  if (process.env.NODE_ENV === 'development') {
    // tslint:disable-next-line:no-console
    console.log(level, message, ...meta);
  } else {
    logger.log(level, message, meta);
  }
}

export function throwAndReturn(message: string): any {
  throw new Error(message);
}
