import {useCallback, useState} from 'react';

export function useForceUpdate() {
  const [, setForceUpdate] = useState();
  return useCallback(() => setForceUpdate({}), []);
}
