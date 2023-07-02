import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react';

export const useInput = (
  intialString: string,
): [string, Dispatch<SetStateAction<string>>, (event: ChangeEvent<HTMLInputElement>) => void] => {
  const [inputValue, setInpuValue] = useState<string>(intialString);
  const onChangeInputValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target) return;
      setInpuValue(() => e.target.value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputValue],
  );

  return [inputValue, setInpuValue, onChangeInputValue];
};
