import {object, string, StringSchema, ValidationError} from 'yup';
import {toMutable} from './util';
import {EnvironmentFileNotConfiguredException} from './exceptions/EnvironmentFileNotConfiguredException';

export const Environments = [ 'development', 'production', 'test'] as const;

const EnvironmentSchema = object<typeof process.env>({
  NODE_ENV: string().oneOf(toMutable(Environments)) as StringSchema<typeof process.env.NODE_ENV>,
  REACT_APP_API_URL: string().required('Required'),
  PUBLIC_URL: string(),
  REACT_APP_DARK_MODE: string().notRequired(),
  REACT_APP_HOST_URL: string().required('Required')
});
export function validateEnvironment() {
  try {
    EnvironmentSchema.validateSync(process.env, {
      abortEarly: false
    });
  } catch (e) {
    const validationErrors = e.inner as ValidationError[];
    const errorMessages = validationErrors.map(v => `${v.path}: ${v.errors.join(', ')}`).join('\n');

    throw new EnvironmentFileNotConfiguredException(errorMessages +
      '\nPlease configure values in the .env file, or copy .env.example to .env to get started');
  }

}
